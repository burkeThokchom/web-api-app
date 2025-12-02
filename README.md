# Enterprise Express.js API (JavaScript)

## Overview
Production-ready API scaffold built with:
- Express.js
- Neo4j (Graph DB)
- Redis (JWT blacklist, caching, OTP)
- Passport.js (JWT + OAuth)
- Swagger API Documentation
- Dockerized for production

## Features
- Email/password authentication
- Phone OTP authentication (mocked)
- OAuth with Google & GitHub
- JWT authentication & Redis blacklist
- Rate limiting, CORS, Helmet security
- Modular architecture (Controllers, Services, Routes)
- Swagger documentation at `/docs`

## Setup
1. Copy `.env.example` to `.env` and configure.
2. Run services:
   ```bash
   docker-compose up --build
3. API server runs on http://localhost:4000.

4. Swagger docs: http://localhost:4000/docs

5. Scripts
npm install
npm run dev   # Start with nodemon
npm start     # Production mode
