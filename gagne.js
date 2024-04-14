const urlParams = new URLSearchParams(window.location.search);
const animal = urlParams.get('animal');

document.getElementById("animalMystere").textContent = animal;

const divIm = document.getElementById("imageAnimal");
divIm.innerHTML = '<img src=\"images/' + animal.toLowerCase() + '.jpg\" alt=\"' + animal.toLowerCase() + '\" class=\"imageAnimal\">';