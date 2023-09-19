# Blue Buff Analytics

This is a full-stack project for the League of Legends Global Power Rankings hackathon (https://lolglobalpowerrankings.devpost.com/).

Frontend built using Next.js, TypeScript, Tailwind.

Backend built using Python and AWS Chalice (Lambda).

## Frontend setup

- Install Node
- Navigate to the frontend directory using "cd frontend"
- run "npm install"
- use "npm run dev" to run the development server

## Backend setup

- Install Python
- Navigate to the backend directory using "cd backend"
- Run "pip install -r requirements.txt"
- Run "py scripts/only_fixtures_data.py" to get team and tournament data from riot's S3
- Run "py scripts/generate_derived_data.py" to generate data for the API to pass to the frontend. This should take a few minutes.
- Test chalice locally with "chalice local"
- Get the environment variables for chalice and put them in .env in the .chalice folder
- Deploy chalice to AWS Lambda using "chalice deploy". Use "chalice destroy" to remove it.
