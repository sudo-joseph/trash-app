# Trash App

Trash App is a MERN prototype single page web app built to provide an alternative way to search for recycling centers that can accept specific materials. Based on kickstartcoding's [react-MERN-prototyping-starter](https://github.com/kickstartcoding/react-mern-prototyping-starter).

**DO NOT** use this project in production. It exposes an API to MongoDB without
any sort of security. The only purpose of the API is to allow rapid front-end
prototyping without much (or any) backend modifications.

## Back End
Backend is a nodejs express server written for trash-app project. This server provides REST api accessing to backend data stored in both MongoDB and external API servers.

### REST APIs

| api end point    | Are           |
| ---------------- |:-------------:|
| /api/items       | right-aligned |
| /api/users       | centered      |
| /api/facilities  | are neat      |

## Front End
Front end is built with create-react-app. Main features are multi-select search box and search results being displayed in map. Additional features include card results and a results modal.

### NPM Components
The following npm components were used:

| Component             | Version    |
| --------------------- |:----------:|
|react                  | ^16.12.0   |
|react-css-burger       | ^0.2.0     |
|react-dom              | ^16.12.0   |
|react-map-gl           | ^5.2.3     |
|react-router-dom       | ^5.1.2     |
|react-scripts          | ^3.4.0     |
|react-select           | ^3.0.8     |
|react-sidebar          | ^3.0.2     |
|react-transition-group | ^4.3.0     |
|react-zipcode          | ^1.0.1     |
|set-value              | ^3.0.1     |
|styled-components      | ^5.0.1"    |

## Database
Database is provided by MongoDB. The database is not really utilizes in this version of the project, however future work will be aimed at caching API results in the database to improve search results and reduce load on external earth911 api.

## Earth911 API
Site requires an [Earth911](https://api.earth911.com/) API Key to function. This API provides the locations of recycling facilities in requested location that can accept specific materials.

## Development Setup
To set up your development environment, follow these steps:

1. Clone repo to your machine:
  `git clone https://github.com/sudo-joseph/trash-app.git`

2. Install Back End Dependencies:
```
  cd trash-app
  npm install
```
3. Install Front End Dependencies:
```
  cd client
  npm install
```
4. Set up .env file. See Secrets file for required env variables.
5. Run:
  a. In trash-app directory, run local development server:
    ```
    nodemon server.js
    ```
  b. Run Front End Development Server
    ```
    cd client
    npm run start
    ```
### Secrets
Your .env file should have the following environment variables:
  MONGODB_URI=''
  PORT=8080
  API_KEY_TRASHNOTHING=''
  API_KEY_EARTH911=''

## Build
To build front end, run the build script:
```
./client/build.sh
```

## Attribution
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
