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
      afficherResultatsEssais();
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

function afficherResultatsEssais() {
  const resultatElement = document.getElementById('resultat');
  resultatElement.innerHTML = resultatsEssais.map((resultatEssai, index) => `
    <div class="essai">
      <div class="essai-info">Essai ${index + 1}: ${resultatEssai.userInput}</div>
      <div class="caracteristiques">
        <div class="${resultatEssai.correspondances.type ? 'vrai' : 'faux'}">Type: ${resultatEssai.animalEntree.type}</div>
        <div class="${resultatEssai.correspondances.habitat ? 'vrai' : 'faux'}">Habitat: ${resultatEssai.animalEntree.habitat}</div>
        <div class="${resultatEssai.correspondances.regimeAlimentaire ? 'vrai' : 'faux'}">Régime: ${resultatEssai.animalEntree.regimeAlimentaire}</div>
        <div class="${resultatEssai.correspondances.taille ? 'vrai' : 'faux'}">Taille: ${resultatEssai.animalEntree.taille}</div>
        <div class="${resultatEssai.correspondances.statutConservation ? 'vrai' : 'faux'}">Conservation: ${resultatEssai.animalEntree.statutConservation}</div>
      </div>
    </div>
  `).join('');
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

siuuuuuuuuuuuuuuuuuuu