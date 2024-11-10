document.getElementById('predictBtn').addEventListener('click', async () => {
    const loading = document.getElementById('loading');
    const resultLabel = document.getElementById('resultLabel');
    const predictBtn = document.getElementById('predictBtn');

    // Afficher le cercle de chargement et désactiver le bouton
    loading.style.display = 'block';
    predictBtn.disabled = true;
    resultLabel.textContent = 'Prediction: ...';

    // Extraire les valeurs des inputs
    const features = {
        age: parseInt(document.getElementById('age').value),
        sex: parseInt(document.getElementById('sex').value),
        cp: parseInt(document.getElementById('cp').value),
        trestbps: parseInt(document.getElementById('trestbps').value),
        chol: parseInt(document.getElementById('chol').value),
        fbs: parseInt(document.getElementById('fbs').value),
        restecg: parseInt(document.getElementById('restecg').value),
        thalach: parseInt(document.getElementById('thalach').value),
        exang: parseInt(document.getElementById('exang').value),
        oldpeak: parseFloat(document.getElementById('oldpeak').value),
        slope: parseInt(document.getElementById('slope').value),
        ca: parseInt(document.getElementById('ca').value),
        thal: parseInt(document.getElementById('thal').value),
    };

    try {
        // Envoyer la requête POST à l'API
        const response = await fetch('http://localhost:3000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ features }),
        });

        const data = await response.json();
        // Afficher le résultat de la prédiction
        resultLabel.textContent = `Prediction: ${data.prediction}`;
    } catch (error) {
        console.error('Error:', error);
        resultLabel.textContent = 'Prediction: Error';
    } finally {
        // Masquer le cercle de chargement et réactiver le bouton
        loading.style.display = 'none';
        predictBtn.disabled = false;
    }
});
