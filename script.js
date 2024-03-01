// Stocker les résultats de chaque essai
const resultatsEssais = [];

// Récupérer les données du fichier CSV
fetch('testbdd.csv')
  .then(response => response.text())
  .then(data => {
    // Analyser les données CSV
    const lines = data.split('\n');
    const animals = lines.slice(1).map(line => {
      const [name, habitat, alimentation, couleur, taille, poids, type] = line.split(';');
      return { name, habitat, alimentation, couleur, taille, poids, type };
    });

    // Choisir un animal au hasard
    const animalChoisi = animals[Math.floor(Math.random() * animals.length)];
    console.log("Animal choisi au hasard :", animalChoisi);

    // Fonction pour afficher les informations de l'animal entré par l'utilisateur et les correspondances
    document.getElementById('userInput').addEventListener('change', function() {
      const userInput = this.value.trim().toLowerCase();

      // Vérifier si l'animal entré est dans la base de données
      const animalEntree = animals.find(animal => animal.name.toLowerCase() === userInput);
      if (!animalEntree) {
        afficherMessageErreur("L'animal n'appartient pas à la base de données");
        return; // Ne pas compter cet essai si l'animal n'est pas trouvé
      }

      // Stocker les informations de l'essai actuel
      const resultatEssai = {
        userInput,
        animalEntree,
        correspondances: {
          habitat: animalEntree ? animalEntree.habitat === animalChoisi.habitat : false,
          alimentation: animalEntree ? animalEntree.alimentation === animalChoisi.alimentation : false,
          couleur: animalEntree ? animalEntree.couleur === animalChoisi.couleur : false,
          taille: animalEntree ? animalEntree.taille === animalChoisi.taille : false,
          poids: animalEntree ? animalEntree.poids === animalChoisi.poids : false,
          type: animalEntree ? animalEntree.type === animalChoisi.type : false,
        }
      };

      // Ajouter les informations de l'essai au tableau des résultats des essais
      resultatsEssais.push(resultatEssai);

      // Afficher les informations de chaque essai sur le site
      afficherResultatsEssais();
    });
  })
  .catch(error => console.error('Erreur lors de la récupération des données:', error));

// Fonction pour afficher les résultats de chaque essai sur le site
function afficherResultatsEssais() {
  const resultatElement = document.getElementById('resultat');
  resultatElement.innerHTML = `
    <table>
      <tr>
        <th>Essai</th>
        <th>Animal entré</th>
        <th>Habitat</th>
        <th>Alimentation</th>
        <th>Couleur</th>
        <th>Taille</th>
        <th>Poids</th>
        <th>Type</th>
      </tr>
      ${resultatsEssais.map((resultatEssai, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${resultatEssai.userInput}</td>
          <td>${resultatEssai.correspondances.habitat ? 'Vrai' : 'Faux'}</td>
          <td>${resultatEssai.correspondances.alimentation ? 'Vrai' : 'Faux'}</td>
          <td>${resultatEssai.correspondances.couleur ? 'Vrai' : 'Faux'}</td>
          <td>${resultatEssai.correspondances.taille ? 'Vrai' : 'Faux'}</td>
          <td>${resultatEssai.correspondances.poids ? 'Vrai' : 'Faux'}</td>
          <td>${resultatEssai.correspondances.type ? 'Vrai' : 'Faux'}</td>
        </tr>
      `).join('')}
    </table>
  `;
}

// Fonction pour afficher un message d'erreur sur le site
function afficherMessageErreur(message) {
  const erreurElement = document.getElementById('erreur');
  erreurElement.textContent = message;
  erreurElement.style.color = 'red';
}

// Fonction pour afficher les résultats de chaque essai sur le site
function afficherResultatsEssais() {
  const resultatElement = document.getElementById('resultat');
  resultatElement.innerHTML = `
    <table>
      <tr>
        <th>Essai</th>
        <th>Animal entré</th>
        <th>Habitat</th>
        <th>Alimentation</th>
        <th>Couleur</th>
        <th>Taille</th>
        <th>Poids</th>
        <th>Type</th>
      </tr>
      ${resultatsEssais.map((resultatEssai, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${resultatEssai.userInput}</td>
          <td>${resultatEssai.animalEntree.habitat}</td>
          <td>${resultatEssai.animalEntree.alimentation}</td>
          <td>${resultatEssai.animalEntree.couleur}</td>
          <td>${resultatEssai.animalEntree.taille}</td>
          <td>${resultatEssai.animalEntree.poids}</td>
          <td>${resultatEssai.animalEntree.type}</td>
        </tr>
        <tr>
          <th colspan="8">Correspondance</th>
        </tr>
        <tr>
          <td>${index + 1}</td>
          <td>${resultatEssai.correspondances.habitat ? 'Vrai' : 'Faux'}</td>
          <td>${resultatEssai.correspondances.alimentation ? 'Vrai' : 'Faux'}</td>
          <td>${resultatEssai.correspondances.couleur ? 'Vrai' : 'Faux'}</td>
          <td>${resultatEssai.correspondances.taille ? 'Vrai' : 'Faux'}</td>
          <td>${resultatEssai.correspondances.poids ? 'Vrai' : 'Faux'}</td>
          <td>${resultatEssai.correspondances.type ? 'Vrai' : 'Faux'}</td>
        </tr>
      `).join('')}
    </table>
  `;
}
