# Heart Disease Prediction Web Application

## Project Overview
This is a web application for predicting heart disease risk using machine learning. this project is implementation of the machine learning model that i have trained using python.

## Technologies Used
- Node.js
- Express.js
- Python
- Scikit-learn
- Joblib

## Project Structure
- `server.js`: Express server handling API requests
- `script.py`: Python script for model prediction
- `modele_regression_logistique.joblib`: Pre-trained machine learning model
- `public/`: Frontend static files
- `requirements.txt`: Python dependencies
- `package.json`: Node.js dependencies

## Setup and Installation

### Prerequisites
- Node.js
- Python 3.x
- pip
- npm

### Installation Steps
1. Clone the repository
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Application
```bash
npm start
```

## API Endpoints
- `GET /hello`: Health check endpoint
- `POST /predict`: Submit features for heart disease prediction

## Environment Variables
Configure in `.env`:
- `PORT`: Server port
- `API_URL`: API base URL

## Model Prediction
The application uses a pre-trained logistic regression model to predict heart disease risk based on input features.
