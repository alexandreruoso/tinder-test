### Epic: Profile Swiping

#### Story 1: View a Profile

* **As a user,** I want to see one profile at a time,
* **so that** I can decide if I am interested in them.

**Acceptance Criteria:**
* Given the application has loaded,
* Then I see a card displaying a profile picture, name, and age.
* And I see a "Like" button and a "Dislike" button.

---

#### Story 2: Dislike a Profile

* **As a user,** I want to press a "Dislike" button,
* **so that** I can dismiss the current profile and see the next one.

**Acceptance Criteria:**
* Given I am viewing a profile,
* When I click the "Dislike" button,
* Then the current profile is removed from view.
* And a `POST` request is sent to the `/profiles/:profileId/dislike` endpoint.
* And a new profile is loaded and displayed.

---

#### Story 3: Like a Profile (No Match)

* **As a user,** I want to press a "Like" button,
* **so that** I can express interest and see the next profile.

**Acceptance Criteria:**
* Given I am viewing a profile,
* When I click the "Like" button,
* Then the current profile is removed from view.
* And a `POST` request is sent to the `/profiles/:profileId/like` endpoint.
* And the API responds with `{"match": false}`.
* And a new profile is loaded and displayed without any special notification.

---

### Epic: Matching Flow

#### Story 4: Getting a Match

* **As a user,** when I "Like" someone who has also "Liked" me,
* **I want to** be shown a match notification.

**Acceptance Criteria:**
* Given I am viewing a profile,
* When I click the "Like" button,
* And the API responds with `{"match": true}`,
* Then a "You got match!" screen appears, overlaying the swiping interface.
* And this screen shows the matched person's name and photo.
* And the "Like" button on this screen is disabled, and an "Okay" button is visible.

---

#### Story 5: Dismissing a Match Notification

* **As a user,** after getting a match,
* **I want to** press "Okay" to continue swiping.

**Acceptance Criteria:**
* Given I am on the "You got match!" screen,
* When I click the "Okay" button,
* Then the match screen is dismissed.
* And the application displays the next profile from the deck.

---

### Epic: System States & Edge Cases

#### Story 6: Running Out of Profiles

* **As a user,** when there are no more people to see,
* **I want to** be shown a clear message so I know I've reached the end.

**Acceptance Criteria:**
* Given I have made a decision on the last available profile,
* When the app requests the next profile and the API returns an empty state (e.g., 404 Not Found),
* Then the swiping interface is replaced with a message like "You've swiped through everyone!".
* And the "Like" and "Dislike" buttons are no longer visible.

---

#### Story 7: Loading State

* **As a user,** I want to see a loading indicator while the next profile is being fetched,
* **so that** I know the app is working and not frozen.

**Acceptance Criteria:**
* Given I have just made a `Decision` (Like/Dislike),
* While the application is waiting for the API response for the next profile,
* Then a loading indicator (e.g., a spinner or a skeleton card) is displayed.
* And the loading indicator disappears once the next profile is rendered.

---

#### Story 8: API Error Handling

* **As a user,** if the application fails to fetch new profiles,
* **I want to** see an informative error message.

**Acceptance Criteria:**
* Given the application fails to get a successful response from the API (e.g., network error, 500 server error),
* Then the swiping interface is replaced with an error message (e.g., "Failed to load profiles. Please try again later.").
* And a "Retry" button may be present to attempt the API call again.