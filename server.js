const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

// Middleware pour parser le corps de la requête
app.use(express.json());

app.use(express.static("public"))
app.get("/hello",(req,res)=>{
    res.send("hi ! this is heart disease predictor");
})
app.post('/predict', (req, res) => {
    try {
        // Extract features sent by the user
        const features = req.body.features;

        // Validate if 'features' is an object and has the required keys
        const requiredKeys = [
            "age", "sex", "cp", "trestbps", "chol",
            "fbs", "restecg", "thalach", "exang",
            "oldpeak", "slope", "ca", "thal"
        ];

        // Check if features are provided and are not undefined/null
        if (!features || typeof features !== 'object') {
            return res.status(400).json({ error: 'Invalid input: Features object is missing or invalid' });
        }

        // Validate each key in the features object
        for (const key of requiredKeys) {
            if (!(key in features) || features[key] === undefined || features[key] === null || isNaN(features[key])) {
                return res.status(400).json({ error: `Invalid value for feature: ${key}` });
            }
        }

        // Launch the Python script using spawn
        const python = spawn('python3', ['script.py']);

        // Send features to the Python script via stdin
        python.stdin.write(JSON.stringify(features));
        python.stdin.end();

        // Handle the Python script output
        python.stdout.on('data', (data) => {
            const prediction = data.toString().trim();
            res.json({ prediction });
        });

        // Handle errors from the Python script
        python.stderr.on('data', (data) => {
            const errorMessage = data.toString();
            console.error(`stderr: ${errorMessage}`);
            res.status(500).json({ error: 'Error executing Python script', details: errorMessage });
        });

        // Handle process closure
        python.on('close', (code) => {
            if (code !== 0) {
                console.error(`Python script exited with code ${code}`);
                res.status(500).json({ error: 'Python script failed to execute' });
            }
        });
    } catch (error) {
        // Handle server-side errors
        console.error('Server error in /predict route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
