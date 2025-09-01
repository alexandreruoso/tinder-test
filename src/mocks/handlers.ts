import { http, HttpResponse, delay } from 'msw'

// --- Mock Data ---
const profiles = [
    {
        id: '1',
        name: 'Jessica',
        age: 23,
        imageUrl: 'https://i.pravatar.cc/400?u=woman',
    },
    {
        id: '2',
        name: 'Ben',
        age: 27,
        imageUrl: 'https://i.pravatar.cc/400?u=jefferson',
    },
    {
        id: '3',
        name: 'Chloe',
        age: 22,
        imageUrl: 'https://i.pravatar.cc/400?u=chloe',
    },
]

let currentIndex = 0

// --- API Route Handlers ---

export const handlers = [
    // 1. Get the next profile
    http.get('/api/profiles/next', async () => {
        // Simulate network delay
        await delay(400)

        if (currentIndex >= profiles.length) {
            // If we've run out of profiles, return a 404
            return new HttpResponse(null, {
                status: 404,
                statusText: 'No more profiles',
            })
        }

        const profile = profiles[currentIndex]
        return HttpResponse.json(profile)
    }),

    // 2. Like a profile
    http.post('/api/profiles/:profileId/like', async () => {
        await delay(300)

        // Logic to decide if it's a match
        // For this demo, let's say Ben is a guaranteed match
        const isMatch = profiles[currentIndex]?.name === 'Chloe'
        currentIndex++ // Move to the next profile after the action

        return HttpResponse.json({ match: isMatch })
    }),

    // 3. Dislike a profile
    http.post('/api/profiles/:profileId/dislike', async () => {
        await delay(300)

        currentIndex++ // Move to the next profile
        return new HttpResponse(null, { status: 200 })
    }),
]
