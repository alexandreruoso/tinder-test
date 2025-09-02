import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import apiClient from '../api/client'
import type { ProfileDto, LikeResponseDto } from '../types/api'

// This function contains the actual API logic for fetching the next profile.
const fetchNextProfile = async () => {
    const { data } = await apiClient.get<ProfileDto>('/profiles/next')
    return data
}

/**
 * A custom hook to manage the state and API calls for the swiping functionality,
 * powered by TanStack Query.
 */
export const useSwipeApi = () => {
    const queryClient = useQueryClient()
    const [isMatch, setIsMatch] = useState<boolean>(false)

    // useQuery handles fetching, caching, loading, and error states for us.
    const {
        data: profile,
        isLoading,
        error,
        isError,
    } = useQuery<ProfileDto, Error>({
        queryKey: ['profile', 'next'],
        queryFn: fetchNextProfile,
        retry: (failureCount, error) => {
            // Do not retry on 404, it's the "finished" state.
            if (isAxiosError(error) && error.response?.status === 404) {
                return false
            }
            // Retry on other errors up to 3 times.
            return failureCount < 3
        },
    })

    // useMutation handles POST/PUT/DELETE requests and their states.
    const { mutate: likeProfile, isPending: isLiking } = useMutation({
        mutationFn: (profileId: string) =>
            apiClient.post<LikeResponseDto>(`/profiles/${profileId}/like`),
        // Make the onSuccess handler async to await the invalidation.
        onSuccess: async (response) => {
            if (response.data.match) {
                setIsMatch(true)
            } else {
                // Awaiting this promise ensures the mutation stays pending
                // until the new profile has been fetched.
                await queryClient.invalidateQueries({
                    queryKey: ['profile', 'next'],
                })
            }
        },
    })

    const { mutate: dislikeProfile, isPending: isDisliking } = useMutation({
        mutationFn: (profileId: string) =>
            apiClient.post(`/profiles/${profileId}/dislike`),
        // Make the onSuccess handler async to await the invalidation.
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['profile', 'next'],
            })
        },
    })

    const closeMatchDialog = () => {
        setIsMatch(false)
        queryClient.invalidateQueries({ queryKey: ['profile', 'next'] })
    }

    // Determine the finished state based on the query result.
    const isFinished =
        !isLoading &&
        isError &&
        isAxiosError(error) &&
        error.response?.status === 404

    // The component is busy if it's loading a profile OR processing a like/dislike.
    const isBusy = isLoading || isLiking || isDisliking

    return {
        profile,
        isLoading: isBusy,
        error: isError && !isFinished ? 'Failed to load profiles.' : undefined,
        isFinished,
        isMatch,
        likeProfile,
        dislikeProfile,
        closeMatchDialog,
    }
}
