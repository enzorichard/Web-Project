// Stocker les résultats de chaque essai
const resultatsEssais = [];

// Récupérer les données du fichier CSV
fetch('testbdd.csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const animals = lines.map(line => {
      // Ajuste ici selon la nouvelle structure de ta base de données
      const [name, habitat, regimeAlimentaire, type, taille, statutConservation] = line.split(';');
      return { name, habitat, regimeAlimentaire, type, taille, statutConservation };
    });

    const animalChoisi = animals[Math.floor(Math.random() * animals.length)];
    console.log("Animal choisi au hasard :", animalChoisi);

    document.getElementById('userInput').addEventListener('change', function() {
      const userInput = this.value.trim().toLowerCase();
      const animalEntree = animals.find(animal => animal.name.toLowerCase() === userInput);
      
      if (!animalEntree) {
        afficherMessageErreur("L'animal n'appartient pas à la base de données");
        return;
      }

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
  const erreurElement = document.getElementById('resultat');
  erreurElement.innerHTML = `<div style="color: red;">${message}</div>`;
}

function calculerCorrespondances(animalEntree, animalChoisi) {
  return {
    habitat: animalEntree.habitat === animalChoisi.habitat,
    regimeAlimentaire: animalEntree.regimeAlimentaire === animalChoisi.regimeAlimentaire,
    type: animalEntree.type === animalChoisi.type,
    taille: animalEntree.taille === animalChoisi.taille,
    statutConservation: animalEntree.statutConservation === animalChoisi.statutConservation,
  };
}
function afficherResultatsEssais(animalChoisi) {
  const resultatElement = document.getElementById('resultat');

  const dernierEssai = resultatsEssais[resultatsEssais.length - 1];

  if (dernierEssai && dernierEssai.userInput === animalChoisi.name.toLowerCase()) {
    // URL de la page de victoire ou toute autre page que tu souhaites afficher
    const urlDeVictoire = 'http://localhost/projet%20web/gagne.html'; // Assure-toi que l'URL est correcte
    
    // Affiche un message de succès avant de rediriger
    resultatElement.innerHTML = `<div class="succes">Bien joué §</div>`;
    
    // Utilise setTimeout pour laisser un peu de temps afin que l'utilisateur puisse lire le message
    setTimeout(() => {
      window.location.href = urlDeVictoire;
    }, 2000); // Redirige après 2 secondes
  } else {
    // Continue à afficher les essais si l'animal mystère n'a pas encore été trouvé
    resultatElement.innerHTML = resultatsEssais.map((resultatEssai, index) => {
      const cheminImage = `chemin/vers/images/${animalChoisi.name.toLowerCase()}.jpg`; // Ajuste selon ton schéma de nommage des images
      
      return `
        <div class="essai">

          
          <div class="caracteristiques">
            <img src="${cheminImage}" alt="Image de ${animalChoisi.name}" style="width:100px; height:100px;">
            <p>${animalChoisi.name}</p>
            <div class="${resultatEssai.correspondances.type ? 'vrai' : 'faux'}">Type: ${animalChoisi.type}</div>
            <div class="${resultatEssai.correspondances.habitat ? 'vrai' : 'faux'}">Habitat: ${animalChoisi.habitat}</div>
            <div class="${resultatEssai.correspondances.regimeAlimentaire ? 'vrai' : 'faux'}">Régime: ${animalChoisi.regimeAlimentaire}</div>
            <div class="${resultatEssai.correspondances.taille ? 'vrai' : 'faux'}">Taille: ${animalChoisi.taille}</div>
            <div class="${resultatEssai.correspondances.statutConservation ? 'vrai' : 'faux'}">Conservation: ${animalChoisi.statutConservation}</div>
          </div>
        </div>
      `;
    }).join('');
  }
}




document.getElementById('userInput').addEventListener('keyup', function(event) {
  if (event.keyCode === 13) { // KeyCode 13 est la touche Entrée
    this.value = ''; // Vide le champ input
  }
});

function effacerSurEntree(event) {
    if (event.keyCode === 13) {
        document.getElementById('userInput').value = '';
    }
}










