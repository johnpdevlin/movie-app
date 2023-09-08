<!-- @format -->

# Movie App Readme

This is the readme for running the Movie App application. Below, you will find instructions on how to perform various tasks such as testing, building, and running the application using the provided npm scripts.

## Prerequisites

Before you can run the Movie App application, make sure you have the following prerequisites installed on your system:

- Node.js: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

## Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone <https://github.com/johnpdevlin/movie-app>
   ```

2. Change to the project directory:
   cd movie-app
3. Install project dependencies:
   npm install

## Available Scripts

### Testing

#### Run tests once:####

npm test

#### Run tests in watch mode:####

npm run test:watch

### Building

To build the Movie App for production, use the following script:
npm run build
This command will clean the ./dist directory and compile the TypeScript code into JavaScript.

### Starting the Application

Once the application is built, you can start the server using the following script:
npm start

### Development Mode

To run the application in development mode, use the following script:
npm start

This command will concurrently watch for TypeScript changes (npx tsc -w) and start the server using nodemon. It's useful for development, as it automatically restarts the server when code changes are detected.

## Environment Variables

The Movie App may require certain environment variables to be set. Check the .env file in the project directory for a list of required variables.
