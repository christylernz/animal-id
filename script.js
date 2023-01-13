let animals = getAnimals() || {};
let currentAnimals = animals;
let previousNode;
let currentNode;
let guessing = true;

class Node {
    constructor(question, yes, no, animal) {
      // The question that is used to distinguish this animal from others
      this.question = question;
      // The node for the "yes" branch of the decision tree
      this.yes = yes;
      // The node for the "no" branch of the decision tree
      this.no = no;
      // The name of the animal that this node represents
      this.animal = animal;
    }
  }

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('yes-button').addEventListener('click', handleYes);
document.getElementById('no-button').addEventListener('click', handleNo);
document.getElementById('add-button').addEventListener('click', addAnimals);
document.getElementById('reset-button').addEventListener('click', clearAnimals);

function startGame() {
  currentNode = animals;
  guessing = true;
  document.getElementById('animal-name').value = "";
  document.getElementById('distinguishing-question').value = "";
  document.getElementById('result').style.display = 'none';
  document.getElementById('start-button').style.display = 'none';
  if (Object.keys(animals).length === 0) {
    document.getElementById('add-animal').style.display = 'block';
  } else {
    document.getElementById('question').innerHTML = currentNode.question;
    document.getElementById('question').style.display = 'block';
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('add-animal').style.display = 'none';
  }
}

function handleYes() {
  previousNode = currentNode;

  if (guessing) {
    if (currentNode.question) {
      document.getElementById('question').innerHTML = currentNode.question;
    } else {
      guessing = false;
      document.getElementById('result').style.display = 'block';
      document.getElementById('result').innerHTML = `Is it a ${currentNode}?`;
      document.getElementById('buttons').style.display = 'block';
      document.getElementById('question').style.display = 'none';
    }
  } else {
    document.getElementById('result').innerHTML = "I win, it is a " + currentNode + "!";
    document.getElementById('start-button').style.display = 'block';
    document.getElementById('buttons').style.display = 'none';
  }
  currentNode = currentNode.yes;
}

function handleNo() {
  if (guessing) {
    previousNode = currentNode;
    currentNode = currentNode.no;
    if (currentNode.question) {
      document.getElementById('question').innerHTML = currentNode.question;
    } else {

    }
  } else {
    guessing = false;
    document.getElementById('result').innerHTML = `I was wrong, what animal were you thinking of?`;
    document.getElementById('add-animal').style.display = 'block';
    document.getElementById('buttons').style.display = 'none';
  }
}

function addAnimals() {
    // Get the name of the animal to be added
    let animalName = document.getElementById('animal-name').value;
    // Get the distinguishing question for the animal
    let distinguishingQuestion = document.getElementById('distinguishing-question').value;
  
    if (currentNode.question) {
      console.log("existing question");
      // If the current node already has a question, add the new animal as a child node
      let yesNode = new Node(distinguishingQuestion, animalName, null, animalName);
      currentNode.yes = yesNode;
      currentNode = currentNode.yes;
    } else {
      console.log("new question");
      // If the current node does not have a question, add the new animal as the first node in the tree
      //let yesNode = new Node(distinguishingQuestion, null, null, animalName);
      currentNode.question = distinguishingQuestion;
      currentNode.yes = animalName;
      currentNode.no = new Node(null, null, null, null);
      currentNode = currentNode.yes;
    }
    saveAnimals(animals);
    document.getElementById('result').style.display = 'none';
    document.getElementById('add-animal').style.display = 'none';
    document.getElementById('start-button').style.display = 'block';
  }

function saveAnimals(animals) {
  localStorage.setItem('animals', JSON.stringify(animals));
}

function getAnimals() {
  return JSON.parse(localStorage.getItem('animals'));
}

function clearAnimals() {
  localStorage.removeItem('animals');
  animals = {};
  startGame();
}