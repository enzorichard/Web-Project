// Stocker les résultats de chaque essai
const resultatsEssais = [];

// Récupérer les données du fichier CSV
fetch('testbdd.csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const animals = lines.map(line => {
      // Ajuste ici selon la nouvelle structure de ta base de données
      const [name, habitat, regimeAlimentaire, type, pelage, couleur, taille, statutConservation] = line.split(';');
      return { name, habitat, regimeAlimentaire, type, pelage, couleur, taille, statutConservation };
    });

    const animalChoisi = animals[Math.floor(Math.random() * animals.length)];
    console.log("Animal choisi au hasard :", animalChoisi.name);

    document.getElementById('userInput').addEventListener('change', function() {
      const userInput = this.value.trim().toLowerCase();
      this.value = "";
      const animalEntree = animals.find(animal => animal.name.toLowerCase() === userInput);
      const animalPresent = resultatsEssais.find(res => res.animalEntree.name.toLowerCase() === userInput);

      if (animalPresent != null) {
        afficherMessageErreur("Cet animal a déjà été entré");
        return;
      }

      if (!animalEntree) {
        afficherMessageErreur("L'animal n'appartient pas à la base de données");
        return;
      }

      document.getElementById('animauxList').innerHTML = "";
      const index = animalNames.findIndex(animal => animal === (userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase()));
      animalNames.splice(index, 1);

      const resultatEssai = {
        userInput,
        animalEntree,
        correspondances: calculerCorrespondances(animalEntree, animalChoisi),
      };

      resultatsEssais.push(resultatEssai);
      afficherResultatsEssais(animalChoisi);
    });
  })
  .catch(error => console.error('Erreur lors de la récupération des données:', error));

function afficherMessageErreur(message) {
  const erreurElement = document.getElementById('erreur');
  erreurElement.innerHTML = `<div style="color: red;">${message}</div>`;
  //erreurElement.innerHTML = message;
}

function calculerCorrespondances(animalEntree, animalChoisi) {
  return {
    habitat: animalEntree.habitat === animalChoisi.habitat,
    regimeAlimentaire: animalEntree.regimeAlimentaire === animalChoisi.regimeAlimentaire,
    type: animalEntree.type === animalChoisi.type,
    pelage: animalEntree.pelage === animalChoisi.pelage,
    couleur: animalEntree.couleur === animalChoisi.couleur,
    taille: animalEntree.taille === animalChoisi.taille,
    statutConservation: animalEntree.statutConservation === animalChoisi.statutConservation,
  };
}

function afficherResultatsEssais(animalChoisi) {
  const resultatElement = document.getElementById('resultat');

  // Si l'utilisateur a trouvé l'animal mystère dans son dernier essai, redirige vers une autre page
  const dernierEssai = resultatsEssais[resultatsEssais.length - 1];
  if (dernierEssai && dernierEssai.userInput === animalChoisi.name.toLowerCase()) {
    // URL de la page de victoire ou toute autre page que tu souhaites afficher
    //const urlDeVictoire = 'http://localhost/projet%20web/gagne.html';
    const urlDeVictoire = './gagne.html?animal=';

    // Affiche un message de succès avant de rediriger
    //resultatElement.innerHTML = `<div class="succes">Bien joué, c'était : ${animalChoisi.name}</div>`;

    window.location.href = urlDeVictoire + encodeURIComponent(animalChoisi.name);

    //document.getElementById("animalMystere").textContent = "TEST"; //animalChoisi.name;

    // Utilise setTimeout pour laisser un peu de temps afin que l'utilisateur puisse lire le message
    // setTimeout(() => {
    //   window.location.href = urlDeVictoire;
    // }, 2000); // Redirige après 2 secondes
  } else {
    afficherMessageErreur("")
    let essaisHTML = ''; // Initialise une chaîne vide pour stocker les essais sous forme HTML

    // Commence le tableau
    essaisHTML += '<table>';

    // Ajoute les entêtes de tableau
    essaisHTML += `
        <tr>
          <th>Nom</th>
          <th>Animal</th>
          <th>Type</th>
          <th>Habitat</th>
          <th>Régime</th>
          <th>Pelage</th>
          <th>Couleur</th>
          <th>Taille</th>
          <th>Conservation</th>
        </tr>
      `;

    // Parcours le tableau des résultats dans l'ordre inverse
    for (let i = resultatsEssais.length - 1; i >= 0; i--) {
      const resultatEssai = resultatsEssais[i];
      const cheminImage = `images/${resultatEssai.animalEntree.name.toLowerCase()}.jpg`; // Ajuste selon le schéma de nommage de tes images

      // Début d'une nouvelle ligne de tableau
      essaisHTML += '<tr>';

      // Ajoute les informations de l'essai dans des cellules de tableau
      essaisHTML += `
          <td>${resultatEssai.animalEntree.name}</td>
          <td><img src="${cheminImage}" alt="Image de ${resultatEssai.animalEntree.name}"></td>    
          <td class="${resultatEssai.correspondances.type ? 'vrai' : 'faux'}">${resultatEssai.animalEntree.type}</td>
          <td class="${resultatEssai.correspondances.habitat ? 'vrai' : 'faux'}">${resultatEssai.animalEntree.habitat}</td>
          <td class="${resultatEssai.correspondances.regimeAlimentaire ? 'vrai' : 'faux'}">${resultatEssai.animalEntree.regimeAlimentaire}</td>
          <td class="${resultatEssai.correspondances.pelage ? 'vrai' : 'faux'}">${resultatEssai.animalEntree.pelage}</td>
          <td class="${resultatEssai.correspondances.couleur ? 'vrai' : 'faux'}">${resultatEssai.animalEntree.couleur}</td>
          <td class="${resultatEssai.correspondances.taille ? 'vrai' : 'faux'}">${resultatEssai.animalEntree.taille}</td>
          <td class="${resultatEssai.correspondances.statutConservation ? 'vrai' : 'faux'}">${resultatEssai.animalEntree.statutConservation}</td>
        `;

      // Fin de la ligne de tableau
      essaisHTML += '</tr>';
    }

    // Fin du tableau
    essaisHTML += '</table>';

    // Affiche le tableau des essais dans le conteneur de résultats
    resultatElement.innerHTML = essaisHTML;
  }
}


function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Stocker les noms d'animaux pour les suggestions
let animalNames = [];

// Récupérer les données du fichier CSV
fetch('testbdd.csv')
  .then(response => response.text())
  .then(data => {
    // Séparer les lignes et exclure la première ligne (en-têtes)
    const lines = data.split('\n').slice(1).filter(line => line.trim() !== '');

    // Extraire les noms d'animaux de chaque ligne
    animalNames = lines.map(line => line.split(';')[0].trim());

    animalNames.sort();

    // Afficher les suggestions lors de la saisie dans l'input
    const userInput = document.getElementById('userInput');
    userInput.addEventListener('input', function() {
      //const inputText = removeAccents(this.value.toLowerCase()); // Convertir en minuscules
      const inputText = this.value.toLowerCase();
      //console.log("entrée : " + inputText);
      if (inputText.length > 0) {
        //console.log("animalName : " + removeAccents(animalNames[89].toLowerCase()));
        // if (removeAccents(animalNames[89].toLowerCase()).startsWith(inputText))
        //   console.log("TEST");
        //const suggestions = animalNames.filter(name => removeAccents(name.toLowerCase()).startsWith(inputText));

        const suggestions = animalNames.filter(name => name.toLowerCase().startsWith(inputText));
        //console.log("Nombre de suggestions : " + suggestions.length);
        updateSuggestions(suggestions);
      }
      else {
        document.getElementById('animauxList').innerHTML = "";
      }
    });
  })
  .catch(error => console.error('Erreur lors de la récupération des données:', error));

// Mettre à jour la liste de suggestions
function updateSuggestions(suggestions) {
  const datalist = document.getElementById('animauxList');
  datalist.innerHTML = ''; // Effacer les suggestions précédentes
  suggestions.forEach(animal => {
    const option = document.createElement('option');
    option.value = animal;
    datalist.appendChild(option);
  });
}



