# PLP HACKATHON SOLUTION
Eco-Friendly Transportation Tracker
Welcome to the Eco-Friendly Transportation Tracker! This application helps you log and track your transportation activities with an emphasis on reducing your carbon footprint. Our goal is to promote eco-friendly transportation options and provide users with insights into their carbon emissions, fostering a community of environmentally conscious individuals.

# Features
## Core Features
User Authentication: Secure registration and login system. Trip Logging: Easily log trips with details like mode of transportation, distance, and duration. Dashboard: View a comprehensive log of your trips with carbon footprint calculations. Trip Deletion: Delete any logged trip directly from the dashboard. Advanced Features Badges and Rewards: Earn badges for reaching milestones such as long distances or specific modes of transportation.

# Getting Started
## Prerequisites
Node.js Python Flask

# Installation
Clone the repository:

bash Copy code git clone https://github.com/yourusername/eco-friendly-transportation-tracker.git cd eco-friendly-transportation-tracker

## Backend Setup:
bash Copy code cd server python3 -m venv venv source venv/bin/activate # On Windows use venv\Scripts\activate pip install -r requirements.txt flask run

## Frontend Setup:
bash Copy code cd client npm install npm start Access the Application: Open your browser and navigate to http://localhost:3000

## API Endpoints
GET /api/trips: Retrieve all logged trips. POST /log_trip: Log a new trip. DELETE /delete_trip/:id: Delete a trip by ID. GET /api/badges: Retrieve all badges for a user. Usage Register: Create a new account using the signup form. Login: Access your account using the login form. Log Trips: Use the dashboard to log your trips, providing details such as mode, distance, and duration. View Badges: Check your earned badges in the dashboard. Delete Trips: Manage your trips by deleting any that are no longer needed.

Fork the repository. Create a new branch: git checkout -b feature-name Commit your changes: git commit -m 'Add some feature' Push to the branch: git push origin feature-name Create a pull request. License This project is licensed under the MIT License - see the LICENSE file for details.

# AUTHOR
Victor Muhoro(email - victormuhoro7@gmail.com)
