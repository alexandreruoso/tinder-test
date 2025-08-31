# Tinder-Like Swiping Prototype (React Test Assignment)

This project is a React implementation of a Tinder-like user interface for liking or disliking profiles. It was created as a test assignment for a React developer position.

The application is built with React, TypeScript, and Vite, uses Material-UI for its component library, and is fully tested with Vitest and React Testing Library to ensure 100% test coverage.

## Features

- View user profiles one by one.
- "Like" or "Dislike" a profile.
- Receive a "match" notification for mutual likes.
- Gracefully handles running out of profiles.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.x or higher)
- npm (v10.x or higher)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd tinder-test
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Now, open the `.env` file and set the required variables, such as the API URL.
    ```env
    VITE_API_BASE_URL=http://localhost:3001/api
    ```

### Running in Development Mode

To start the application locally with hot-reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🧪 Running Tests

This project is configured to have 100% test coverage.

- **Run tests once:**

    ```bash
    npm test
    ```

- **Run tests in watch mode:**
    ```bash
    npm run test:watch
    ```

---

## 📝 Client-Backend REST API Contract

The front-end application expects the following REST API to be available. All request and response bodies are in JSON format.

### Endpoints

#### 1. Get Next Profile

Fetches the next available user profile to be displayed.

- **URL:** `/profiles/next`
- **Method:** `GET`
- **Success Response (200 OK):**
    ```json
    {
        "id": "a1b2c3d4",
        "name": "Sarah",
        "age": 21,
        "imageUrl": "[https://example.com/images/sarah.jpg](https://example.com/images/sarah.jpg)"
    }
    ```
- **Error Response (404 Not Found):**
  Returned when there are no more profiles left to show.
    ```json
    {
        "message": "No more profiles available"
    }
    ```

---

#### 2. Like a Profile

Submits a "like" action for a specific user profile.

- **URL:** `/profiles/:profileId/like`
- **Method:** `POST`
- **URL Params:**
    - `profileId` (string, required): The ID of the profile being liked.
- **Request Body:** (empty)
- **Success Response (200 OK):**
  The response indicates whether the "like" resulted in a mutual match.
    ```json
    {
        "match": true
    }
    ```
    _or_
    ```json
    {
        "match": false
    }
    ```

---

#### 3. Dislike a Profile

Submits a "dislike" action for a specific user profile. This action simply moves to the next profile without the possibility of a match.

- **URL:** `/profiles/:profileId/dislike`
- **Method:** `POST`
- **URL Params:**
    - `profileId` (string, required): The ID of the profile being disliked.
- **Request Body:** (empty)
- **Success Response (200 OK):**
    ```json
    {
        "success": true
    }
    ```
