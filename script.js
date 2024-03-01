// Stocker les résultats de chaque essai
const resultatsEssais = [];

// Récupérer les données du fichier CSV
fetch('testbdd.csv')
  .then(response => response.text())
  .then(data => {
    // Analyser les données CSV
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const animals = lines.map(line => {
      const [name, habitat, alimentation, couleur, taille, poids, type] = line.split(';');
      return { name, habitat, alimentation, couleur, taille, poids, type };
    });

    // Choisir un animal au hasard
    const animalChoisi = animals[Math.floor(Math.random() * animals.length)];
    console.log("Animal choisi au hasard :", animalChoisi);

    document.getElementById('userInput').addEventListener('change', function() {
      const userInput = this.value.trim().toLowerCase();

      // Vérifier si l'animal entré est dans la base de données
      const animalEntree = animals.find(animal => animal.name.toLowerCase() === userInput);
      if (!animalEntree) {
        afficherMessageErreur("L'animal n'appartient pas à la base de données");
        return;
      }

      // Comparer les caractéristiques et stocker les résultats
      const resultatEssai = {
        userInput,
        animalEntree,
        correspondances: calculerCorrespondances(animalEntree, animalChoisi),
      };

      // Ajouter les informations de l'essai au tableau des résultats des essais
      resultatsEssais.push(resultatEssai);

      // Afficher les informations de chaque essai sur le site
      afficherResultatsEssais();
    });
  })
  .catch(error => console.error('Erreur lors de la récupération des données:', error));

// Fonction pour afficher un message d'erreur sur le site
function afficherMessageErreur(message) {
  const erreurElement = document.getElementById('resultat');
  erreurElement.innerHTML = `<div style="color: red;">${message}</div>`;
}

// Fonction pour calculer les correspondances entre l'animal entré et l'animal à deviner
function calculerCorrespondances(animalEntree, animalChoisi) {
  return {
    habitat: animalEntree.habitat === animalChoisi.habitat,
    alimentation: animalEntree.alimentation === animalChoisi.alimentation,
    couleur: animalEntree.couleur === animalChoisi.couleur,
    taille: animalEntree.taille === animalChoisi.taille,
    poids: animalEntree.poids === animalChoisi.poids,
    type: animalEntree.type === animalChoisi.type,
  };
}

// Fonction pour afficher les résultats de chaque essai sur le site
function afficherResultatsEssais() {
  const resultatElement = document.getElementById('resultat');
  resultatElement.innerHTML = resultatsEssais.map((resultatEssai, index) => `
    <div class="essai">
      <div class="essai-info">Essai ${index + 1}: ${resultatEssai.userInput}</div>
      <div class="caracteristiques">
        <div class="${resultatEssai.correspondances.type ? 'vrai' : 'faux'}">Type: ${resultatEssai.animalEntree.type}</div>
        <div class="${resultatEssai.correspondances.habitat ? 'vrai' : 'faux'}">Habitat: ${resultatEssai.animalEntree.habitat}</div>
        <div class="${resultatEssai.correspondances.alimentation ? 'vrai' : 'faux'}">Alimentation: ${resultatEssai.animalEntree.alimentation}</div>
        <div class="${resultatEssai.correspondances.couleur ? 'vrai' : 'faux'}">Couleur: ${resultatEssai.animalEntree.couleur}</div>
        <div class="${resultatEssai.correspondances.taille ? 'vrai' : 'faux'}">Taille: ${resultatEssai.animalEntree.taille} cm</div>
        <div class="${resultatEssai.correspondances.poids ? 'vrai' : 'faux'}">Poids: ${resultatEssai.animalEntree.poids} kg</div>
      </div>
    </div>
  `).join('');
}

function effacerSurEntree(event) {
    if (event.keyCode === 13) {
        document.getElementById('userInput').value = '';
    }
}










