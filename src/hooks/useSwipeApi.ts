import { useState, useEffect, useCallback } from 'react'
import { isAxiosError } from 'axios'
import apiClient from '../api/client'
import type { ProfileDto, LikeResponseDto } from '../types/api'

/**
 * A custom hook to manage the state and API calls for the swiping functionality.
 *
 * @returns An object containing the current state of the swiping interface
 * and functions to interact with the API.
 */
export const useSwipeApi = () => {
    const [profile, setProfile] = useState<ProfileDto | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | undefined>(undefined)
    const [isFinished, setIsFinished] = useState<boolean>(false)
    const [isMatch, setIsMatch] = useState<boolean>(false)

    const fetchNextProfile = useCallback(async () => {
        setIsLoading(true)
        setError(undefined)
        setIsMatch(false)

        try {
            const response = await apiClient.get<ProfileDto>('/profiles/next')
            setProfile(response.data)
        } catch (err: unknown) {
            if (isAxiosError(err) && err.response?.status === 404) {
                setIsFinished(true)
                setProfile(undefined)
            } else {
                setError('Failed to load profiles. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        // Automatically fetch the first profile on component mount.
        fetchNextProfile()
    }, [fetchNextProfile])

    const likeProfile = async (profileId: string) => {
        try {
            const response = await apiClient.post<LikeResponseDto>(
                `/profiles/${profileId}/like`
            )
            if (response.data.match) {
                setIsMatch(true)
            } else {
                fetchNextProfile()
            }
        } catch (_err: unknown) {
            console.error(_err)
            setError('An error occurred while liking the profile.')
        }
    }

    const dislikeProfile = async (profileId: string) => {
        try {
            await apiClient.post(`/profiles/${profileId}/dislike`)
            fetchNextProfile()
        } catch (_err: unknown) {
            console.error(_err)
            setError('An error occurred while disliking the profile.')
        }
    }

    const closeMatchDialog = () => {
        setIsMatch(false)
        fetchNextProfile()
    }

    return {
        profile,
        isLoading,
        error,
        isFinished,
        isMatch,
        likeProfile,
        dislikeProfile,
        closeMatchDialog,
    }
}
