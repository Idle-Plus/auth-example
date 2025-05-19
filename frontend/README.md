# Frontend

This is a React + TypeScript + Vite application that demonstrates how to implement authentication using 
Idle Clans' new verification token (JWT) feature.

## Overview

Idle Clans now allows players to generate a signed verification token (JWT) from within the game. These tokens
include the player's username and can be used for authentication on external websites and services.

This frontend example provides a simple user interface to demonstrate how to:
- Accept an Idle Clans JWT from a user.
- Send it to a backend server for validation.
- Handle authenticated state and user sessions in a React application.

> [!WARNING]
> This project is meant as a demonstration and should only be used as such. A lot of production level features
> such as persistent sessions, data, and error handling have been omitted.

## Project Structure

- `src/context/AuthContext.tsx`: Provides global authentication state and helpers
- `src/services/api.tsx`: Contains API functions for communicating with the backend
- `src/pages/Logic.tsx`: JWT submission page
- `src/pages/Dashboard.tsx`: Protected page shown after successful login
- `src/App.tsx`: Application root with routing logic
- `src/main.tsx`: Application entry point