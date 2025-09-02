import { useState, useEffect, useRef } from 'react' // Import useEffect and useRef
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import apiClient from '../api/client'
import type { ProfileDto, LikeResponseDto } from '../types/api'

const fetchNextProfile = async () => {
    const { data } = await apiClient.get<ProfileDto>('/profiles/next')
    return data
}

export const useSwipeApi = () => {
    const queryClient = useQueryClient()
    const [isMatch, setIsMatch] = useState<boolean>(false)
    const [isIdle, setIsIdle] = useState<boolean>(false)

    // Use a ref to track if this is the initial mount
    const isInitialMount = useRef(true)

    const {
        data: profile,
        isLoading,
        error,
        isError,
    } = useQuery<ProfileDto, Error>({
        queryKey: ['profile', 'next'],
        queryFn: fetchNextProfile,
        retry: (failureCount, error) => {
            if (isAxiosError(error) && error.response?.status === 404) {
                return false
            }
            return failureCount < 3
        },
    })

    // This effect will run when the profile data changes
    useEffect(() => {
        // Skip the effect on the very first load
        if (isInitialMount.current) {
            if (profile) {
                isInitialMount.current = false
            }
            return
        }

        // When a new profile is loaded, we are no longer idle
        if (profile) {
            setIsIdle(false)
        }
    }, [profile])

    const { mutate: likeProfile, isPending: isLiking } = useMutation({
        mutationFn: (profileId: string) =>
            apiClient.post<LikeResponseDto>(`/profiles/${profileId}/like`),
        onSuccess: async (response) => {
            if (response.data.match) {
                setIsMatch(true)
                setIsIdle(true)
            } else {
                await queryClient.invalidateQueries({
                    queryKey: ['profile', 'next'],
                })
            }
        },
    })

    const { mutate: dislikeProfile, isPending: isDisliking } = useMutation({
        mutationFn: (profileId: string) =>
            apiClient.post(`/profiles/${profileId}/dislike`),
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

    const isFinished =
        !isLoading &&
        isError &&
        isAxiosError(error) &&
        error.response?.status === 404

    const isBusy = isLoading || isLiking || isDisliking

    return {
        profile,
        isLoading: isBusy || isIdle,
        error: isError && !isFinished ? 'Failed to load profiles.' : undefined,
        isFinished,
        isMatch,
        likeProfile,
        dislikeProfile,
        closeMatchDialog,
    }
}
