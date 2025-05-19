# Verification Token Example

This repository demonstrates how to implement third party authentication using Idle Clans' new verification 
token (JWT) feature. It consists of a frontend built using React + TypeScript + Vite and a backend using 
Node.js + Express + TypeScript.

## What is this?

Idle Clans allows players to generate signed JWT tokens from within the game. These tokens include the 
player's username and can be used for authentication on external websites and services.

This demo shows how third party developers can:

- Accept and verify these tokens on a backend server
- Use them to establish user sessions
- Display authenticated content in a web frontend

> [!WARNING]
> This project is meant as a demonstration and should only be used as such. A lot of production level features
> such as persistent sessions, data, and error handling have been omitted.

## Contributing

This is a demo project to illustrate how authentication with Idle Clans JWTs can be implemented. While issues 
and bug reports are welcome and will be addressed, new features and enhancements are generally not needed or 
planned.

If you notice something broken or unclear, feel free to open an issue or submit a pull request to improve 
clarity or functionality.

## License

MIT License

Copyright (c) 2025 Uraxys

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.