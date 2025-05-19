# Backend

This is a Node.js + Express + TypeScript backend that demonstrates how to implement authentication using 
Idle Clans' new verification token (JWT) feature.

## Overview

Idle Clans now allows players to generate a signed verification token (JWT) from within the game. These tokens 
include the player's username and can be used for authentication on external websites and services.

This backend module provides the API endpoints for authenticating users by using the public key provided Idle Clans. 
It verifies the JSON web token issued by the game and manages the user sessions. There is no form for long-term
storage as this is mainly a demonstration on how it can be used.

> [!WARNING]
> This project is meant as a demonstration and should only be used as such. A lot of production level features
> such as persistent sessions, data, and error handling have been omitted.

## How It Works

- The frontend sends a JWT token obtained from Idle Clans.
- The backend verifies the token using the public key.
- If valid, the backend extracts the username from the token and creates a session.
- The session is maintained using cookies.

## API Endpoints

### Auth
- **POST /api/auth/login**: Authenticates a user with a JWT token.
- **POST /api/auth/logout**: Logs out the user by destroying the session.
- **GET /api/auth/me**: Returns the authenticated user's information.
### User
- **GET /api/user/profile**: Returns the user's profile.
- **GET /api/user/stats**: Returns the user's skills and achievements.
- **GET /api/user/upgrades**: Returns the user's upgrades.

## Project Structure

- `src/authentication.ts`: Contains the JWT verification logic
- `src/routes/auth.ts`: Authentication-related API endpoints
- `src/routes/user.ts`: User-related API endpoints
- `src/database`: Simple in-memory database for user data
- `src/app.ts`: Express application setup