# Nuxt-Form-API
This is the API to serve the Nuxt Forms project

## Installation
First you must have Node installed. See:
https://nodejs.org/en/download/

Run the code below to install dependencies:
``npm install``
or
``yarn install``

## Configuration
The project uses MongoDB, so it is required to add a .env file on the root folder with the key DATABASE_URL containing a string of the remote or local MongoDB Server.

.env
``DATABASE_URL=mongodb+srv://<username>:<password>@<url>/forms?retryWrites=true&w=majority``

## Running
To start the server run:
``npm run start``
or
``yarn start``
