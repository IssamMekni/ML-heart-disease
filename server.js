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
        // Extraire les données envoyées par l'utilisateur
        const features = req.body.features;

        // Vérifier si les features sont envoyées correctement
        if (!features || Object.keys(features).length === 0) {
            return res.status(400).send('No features provided');
        }

        // Lancer le script Python en utilisant spawn
        const python = spawn('python3', ['script.py']);

        // Envoyer les données de features au script Python via stdin
        python.stdin.write(JSON.stringify(features));
        python.stdin.end();

        // Récupérer la sortie du script Python
        python.stdout.on('data', (data) => {
            const prediction = data.toString().trim();
            res.json({ prediction });
        });

        // Gestion des erreurs du script Python
        python.stderr.on('data', (data) => {
            const errorMessage = data.toString();
            console.error(`stderr: ${errorMessage}`);
            res.status(500).json({ error: 'Error executing Python script', details: errorMessage });
        });
        

        // Vérifier la fermeture du processus Python
        python.on('close', (code) => {
            if (code !== 0) {
                console.error(`Python script exited with code ${code}`);
                res.status(500).send('Python script failed');
            }
        });
    } catch (error) {
        // Gestion des erreurs côté serveur
        console.error('Error in /predict route:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
