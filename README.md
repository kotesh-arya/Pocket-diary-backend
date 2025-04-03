# Parkaroo Backend

Parkaroo is a platform that helps users find and list nearby parking spaces. This repository contains the backend service built using Node.js and Express, with Firebase Firestore as the database. The backend handles authentication, parking space data management, and integrates with the frontend.

## Features Implemented

### 1. Server Setup

Built with Node.js and Express.js

Handles API requests for user authentication and parking space management


### 2. Database Integration

Uses Firebase Firestore for storing parking space data

Plans to use Firebase Cloud Functions for secure backend operations


### 3. API Requests & Communication

Uses Axios for making API calls between frontend and backend


### 4. Hosting & Deployment

Hosted on AWS EC2 Instance (Amazon Linux, t3.micro instance)

Configured Nginx as a reverse proxy to manage server requests


## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)

- npm or yarn

- Firebase CLI (for deploying Cloud Functions, if needed)


## Steps to Run Locally

### 1. Clone this repository:
```
git clone https://github.com/kotesh-arya/parkaroo-backend.git
cd parkaroo-backend
```

### 2. Install dependencies:
```
npm install
```

3. Set up your environment variables (e.g., Firebase credentials) in a .env file:
```
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
PORT=3000
```

4. Start the server:
```
npm start
```

5. The backend will be running at http://localhost:3000

## WIP list

- API Endpoints

- Authentication

- Parking Space Management

- Deployment on AWS EC2

- Deployed on an AWS EC2 t3.micro instance (Amazon Linux)

- Nginx is used as a reverse proxy to manage traffic

- Backend runs on port 3000

## Steps followed:

1. Launched an EC2 instance and installed Node.js


2. Set up Nginx to proxy requests to the Node.js server


3. Started the backend service




## Future Enhancements

- Firebase Cloud Functions for better security & performance

- Role-based access control (RBAC) for different user roles

- Real-time updates using Firebase listeners


## Contributing

If you would like to contribute:

1. Fork the repository


2. Create a new branch (git checkout -b feature-branch)


3. Make your changes and commit (git commit -m "Added new feature")


4. Push to the branch (git push origin feature-branch)


5. Open a pull request



