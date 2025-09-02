# Domain Definition: Swiping & Matching

This document outlines the core concepts of the application based on Domain-Driven Design (DDD) principles, establishing a clear vocabulary and structure for the domain.

## Bounded Context: Swiping

The entire application operates within a single Bounded Context focused on the user's swiping experience.

## Ubiquitous Language & Core Concepts

- **User**: The person actively using the application and making decisions.

- **Profile**: Represents another person in the system. As an **Entity**, each `Profile` is unique and identified by an `id`. It contains properties such as `name`, `age`, and `imageId`.

- **Deck**: Represents the collection of `Profiles` available for the `User` to view. It acts as the **Aggregate Root**, controlling access to the profiles within it. Its responsibilities include:
    - Providing the next `Profile` to be viewed.
    - Tracking which `Profiles` have already been seen.
    - Handling the end of the collection.

- **Decision**: A **Value Object** representing the action a `User` takes on a `Profile`. It has no identity of its own and is defined by its value, which can be either `Like` or `Dislike`.

- **Match**: A significant **Domain Event** that occurs when a `User`'s `Like` `Decision` is mutual with another person who has also "Liked" them.

## Key Domain Events

These events represent important occurrences within our domain that the application must react to.

- `ProfileLoaded`: A new profile has been successfully fetched and is ready to be displayed.
- `ProfileLiked`: The `User` has made a `Like` `Decision` on the current `Profile`.
- `ProfileDisliked`: The `User` has made a `Dislike` `Decision` on the current `Profile`.
- `MatchFound`: A `ProfileLiked` event resulted in a mutual connection, triggering a special UI state.
- `DeckExhausted`: The `Deck` has run out of `Profiles` to show.
- `ProfileFetchFailed`: An external error (e.g., network) occurred while trying to load the next `Profile`.
