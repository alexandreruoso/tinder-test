import { http, HttpResponse, delay } from 'msw'
import type { ProfileDto } from '../types/api'

// --- Mock Data ---
const profiles: ProfileDto[] = [
    {
        id: '1',
        name: 'Jessica',
        age: 23,
        imageId: '64',
    },
    {
        id: '2',
        name: 'Ben',
        age: 27,
        imageId: '237',
    },
    {
        id: '3',
        name: 'Chloe',
        age: 22,
        imageId: '177',
    },
    {
        id: '4',
        name: 'David',
        age: 25,
        imageId: undefined,
    },
]

let currentIndex = 0

// --- API Route Handlers ---
const baseUrl = import.meta.env.VITE_API_URL
export const handlers = [
    // 1. Get the next profile
    http.get(baseUrl + '/profiles/next', async () => {
        // Simulate network delay
        await delay(400)

        if (currentIndex >= profiles.length) {
            // If we've run out of profiles, return a 404
            return new HttpResponse(
                JSON.stringify({ message: 'No more profiles available' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        }

        const profile = profiles[currentIndex]
        return HttpResponse.json(profile)
    }),

    // 2. Like a profile
    http.post(baseUrl + '/profiles/:profileId/like', async () => {
        await delay(300)

        // Logic to decide if it's a match
        // For this demo, let's say Ben is a guaranteed match
        const isMatch = profiles[currentIndex]?.id === '1'
        currentIndex++ // Move to the next profile after the action

        return HttpResponse.json({ match: isMatch })
    }),

    // 3. Dislike a profile
    http.post(baseUrl + '/profiles/:profileId/dislike', async () => {
        await delay(300)

        currentIndex++ // Move to the next profile
        return new HttpResponse(null, { status: 200 })
    }),
]
