# NOT DEVASTATED

<br>

# Quick Compo

<br>

## Description

This is an app to create potential concerts and present them to the users so they can vote/fund for the concert to happen. The idea is that the app can reunite a minimum number of attendees/funds in order to close a deal with the artists and, in that way, connect them with their fans.

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so that I can have the user's features available.
-  **User Login:** As a user I can login to the platform so that I can access my profile and start checking and voting/funding for concerts to happen and also be able to see the list of concerts I've voted/contributed for.
-  **Admin Login:** As a admin I can login to the platform and start creating and posting concerts.
-  **Logout:** As a logged in user and admin I can logout from the platform so no one else can use it.
-  **User Profile Page**: As a logged in user I can visit my profile page so that I can access and edit it.
-  **Admin Profile Page**: As a logged in admin I can have access to the admin features, like creating, editing and deleting concerts, apart from editing my profile details.
-  **Edit Concerts:** As a logged in admin I can access the edit concerts page so that I can edit and delete the concerts I created.
-  **All Concerts Page:** A page where both user and admin can see a list of all concerts posted.
-  **Concert Details:** Both user and admin can have access to the concert details page so that they can check the status of the contributions and if the concert is happening or not.



## Backlog

- users can contribute
- add search concerts for artists
  


<br>


# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/user/login`                     | UserLoginPage            | anon only `<AnonRoute>`    | Login form, navigates to concerts page after login.           |
| `/admin/login`                     | AdminLoginPage            | anon only `<AnonRoute>`    | Login form, navigates to concerts page after login.           |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to login page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile/:userId`              | ProfilePage          | user only `<PrivateRoute>` | User profile details page.             |
| `/user-profile/edit/:userId`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/add-concert`           | CreateConcertPage        | admin only `<PrivateRoute>`  | Create new concert form.                               |
| `/concerts`               | ConcertsPage   | user and admin `<PrivateRoute>` | All concerts list.                                         |
| `/concerts/fund/:concertId` | FundPage          | user only `<PrivateRoute>` | Shows a form to input an amount to fund a specific concert. |
| `/concerts/edit/:concertId` | EditConcertPage | admin only `<PrivateRoute>` | Concerts to be edited by the admin. |
| `/fundedconcerts` |     FundedConcertsPage     |  user only `<PrivateRoute>` | Shows a list ofconcerts funded by the user. |
                              

## Components

Pages:

- UserLoginPage

- AdminLoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- CreateConcertPage [admin only]

- ConcertsPage
  
- EditConcertPage [admin only]

- FundPage [user only]

- FundedConcertsPage [user only]

  


Components:

- UserCard
- AdminCard
- ConcertCard
- Navbar
- DropDownMenu


## Services

- **Auth Service**

  - `authService` :
    - `.login(user & admin)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **GetArtist Service**

  - `GetArtistService` :
    - `.getArtist()`
  
<br>


# Server / Backend


## Models

**User model**

```javascript
{
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, required: true},
	  fundedConcerts: [{ type: Schema.Types.ObjectId, ref:'Concert'}],
    creditCard:{ type: Number, required: true},
    profilePicture: String
    admin: Boolean
}
```

**Artist model**

```javascript
{
    name: { type: String, required: true},
    concerts: [{ type: Schema.Types.ObjectId, ref:'Concert'}]
}
```


**Concert model**

```javascript
 {
   artist: { type: Schema.Types.ObjectId, ref:'Artist'}
   img: { type: String, required: true },
   date: Date,
   city: { type: String, required: true},
   venue: { type: String, required: true},
   budget: Number,
   deadline: Date,
   usersFunding: [{ type: Schema.Types.ObjectId, ref:'User'}]
 }
```

<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`         | {firstName, lastName, email, password, city, fundedConcerts, creditCard, profilePicture}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| GET        | `/auth/user/login`          | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| GET        | `/auth/admin/login`          | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/user-login`          | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/admin-login`          | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |
| GET         | `/api/concerts`     |                              |                | 400          | Show all concerts                                         |
| GET         | `api/concerts/fund/:concertId` |                         |                |              | Shows a page with a form to fund for a concert
| POST         | `api/concerts/fund/:concertId` |                       |                |              | add                                    |
| POST        | `/api/concerts`     | { artist, venue, city, date, budget, users_funding }       | 201            | 400          | Create and save a new concert                             |
| PUT         | `/api/concerts/:id` | { artist, venue, city, date, budget, users_funding}       | 200            | 400          | edit concert                  |
| DELETE      | `/api/concerts/:id` |              | 201            | 400          | delete concert                                            |
| GET         | `/api/user-profile/:id`     |                              |                |              | show specific user                                         | |
| PUT         | `/api/user-profile/edit/:userId`     | {firstName, lastName, email, password, city, fundedConcerts, creditCard, profilePicture}      | 201            | 400          | edit user                                                  |                                            |                                                |


<br>

## API's

**Last.fm API:** http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=YOUR_API_KEY&format=json

<br>

## Packages

<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/napoligab/project3-client)

[Server repository Link](https://github.com/napoligab/project3-server)

[Deployed App Link]()

### Slides

[Slides Link](http://slides.com) - The url to your *public* presentation slides

### Contributors

Gabriella Hevesy - https://github.com/napoligab - <https://www.linkedin.com/in/napoligabriella>

Brenda Lopes - https://github.com/Brenda-Lop - <https://www.linkedin.com/in/brenda--lopes>