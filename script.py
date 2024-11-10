import sys
import joblib
import json

try:
    # Charger le modèle
    model = joblib.load('modele_regression_logistique.joblib')

    # Lire les features depuis stdin
    input_data = sys.stdin.read()
    features = json.loads(input_data)

    # Faire une prédiction
    prediction = model.predict([list(features.values())])

    # Afficher la prédiction
    print(prediction[0])

except Exception as e:
    # Afficher l'erreur dans stderr
    print(f"Erreur : {e}", file=sys.stderr)
    sys.exit(1)
