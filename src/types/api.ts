// src/types/api.ts

/**
 * Data Transfer Object for a user profile received from the API.
 */
export interface ProfileDto {
    id: string
    name: string
    age: number
    imageId?: string
}

/**
 * Data Transfer Object for the response after liking a profile.
 */
export interface LikeResponseDto {
    match: boolean
}
