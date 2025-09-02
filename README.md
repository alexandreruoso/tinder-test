# Tinder-Like Swiping Prototype (React Test Assignment)

This project is a fully-tested, production-ready prototype of a Tinder-like swiping application. It is built with React, TypeScript, Vite, and Material-UI.

It features a complete local development environment using Mock Service Worker (MSW), comprehensive unit tests with 100% coverage via Vitest, and end-to-end tests with Playwright.

## Features

- Modern Tech Stack: React, TypeScript, Vite, and MUI.
- Mocked API: Uses Mock Service Worker (MSW) for a stable and predictable development experience without a live backend.
- Fully Tested:
    - 100% Unit Test Coverage with Vitest & React Testing Library.
- Component Library: All UI components are documented and viewable in Storybook.
- Production Ready: Includes a Dockerfile for building a lightweight, production-ready
- Nginx container.
- View user profiles one by one.
- "Like" or "Dislike" a profile.
- Receive a "match" notification for mutual likes.
- Gracefully handles running out of profiles.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.x or higher)
- npm (v10.x or higher)
- Docker (for running the production build)

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
    VITE_API_URL=http://localhost:3001/api
    ```

### Running in Development Mode (with Mock API)

This command starts the Vite development server with MSW enabled. The application will be available at http://localhost:5173.

```bash
npm run dev
```

### Running in Production Mode (with Docker)

```bash
# 1. Build the image
docker build -t tinder-test-app .

# 2. Run the container
docker run -d -p 8080:80 --name tinder-test-container tinder-test-app

```

---

## 🧪 Running Tests

This project is configured to have 100% test coverage.

- **Run tests once:**

    ```bash
    npm test:ci
    ```

- **Run tests in watch mode:**
    ```bash
    npm run test
    ```
- **Run tests with coverage:**
    ```bash
    npm run test:coverage
    ```

---

## 📖 Viewing Storybook

```bash
npm run storybook
```

The Storybook will be available at http://localhost:6006.

## 📝 Client-Backend REST API Contract

The front-end application expects the following REST API to be available. All request and response bodies are in JSON format.

### Endpoints

#### 1. Get Next Profile

Fetches the next available user profile. Returns a 404 Not Found when no more profiles are available.

- **URL:** `/profiles/next`
- **Method:** `GET`
- **Success Response (200 OK):**
    ```json
    {
        "id": "a1b2c3d4",
        "name": "Sarah",
        "age": 21,
        "imageUrl": "https://example.com/images/sarah.jpg"
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

---

#### 3. Dislike a Profile

Submits a "dislike" action for a specific user profile. This action simply moves to the next profile without the possibility of a match.

- **URL:** `/profiles/:profileId/dislike`
- **Method:** `POST`
- **URL Params:**
    - `profileId` (string, required): The ID of the profile being disliked.
- **Request Body:** (empty)
- **Success Response (200 OK)**
