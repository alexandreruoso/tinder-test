// src/api/client.ts
import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // From your .env file
    headers: {
        'Content-Type': 'application/json',
    },
})

export default apiClient
