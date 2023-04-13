
//Track state & cash out 
const dogButton = document.querySelector('#dog-button');
const dogImage = document.querySelector('#dog-image');

//const dogBreeds = ['husky', 'pug', 'dalmatian', 'golden retriever', 'labrdor', 'rottweiler']; // declaring a variable named dogBreeds and assigns it to an array of dog breeds

const dogList = document.querySelector("#dogList");

let dogImageElements = [];
let targetBreed;
let scoreEl = document.querySelector("#score");
let score = 0;

const qEl = document.querySelector("#bigQ");
const mEl = document.querySelector("#message");
const mEl2 = document.querySelector("#message");
let correctAnswer = "";
let roundCount = 0;


dogButton.addEventListener('click', function() { // adds another click event listener to the dogButton element 
  dogButton.style.display = "none" //hide itself
  startGame();

});

function startGame() { // i am defining function updateDogImage which takes a single argument named breed  
    
  console.log("start game")
  roundCount++ //adds a round so that we can stop at round 5
  removeAllChildNodes(dogList); //empty the list
  dogImageElements = []; //empty dog element list


  //ends the game
  if(roundCount == 5){
    console.log("game over")
    GameOver()
    return false;
  }


  //i am getting 4 random dogs
  for (let i = 0; i < 4; i++) { // iterate four times, starting with the value of i at 0 and incrementing by 1 each time until i is no longer less than 4.
    fetch(`https://dog.ceo/api/breeds/image/random`) // fetch request to the Dog API to get a random image of a dog of the breed specified by the breed argument. new URL is received 
      .then((response) => response.json()) // the first Promise to convert the response object from the API into a JSON object.
      .then((data) => { // second Promise defines a callback function that will be executed after the response data is successfully converted to JSON
        

        let randomBreed = data.message.split("/")[4]; //i get breed from url

        //creating a dog image element 
        const dogImage = document.createElement('img'); // we need to create a new image element & assign it to a variable in this case the variable "dogImage"
        dogImage.setAttribute("src", data.message); // set the src attribute of the dogImage element to the data.message property, which contains the URL of the randomly generated dog image from the Dog API
        dogImage.setAttribute('data-breed',randomBreed) // add data-breed attribute to dogImage element and set its value to breed
        dogImage.addEventListener('click',checkDog);

        //add dog image to a list
        dogImageElements.push(dogImage); //i just added 3
        
        //add dogs to the html
        addDogsToDom()
        //STEP 2 - function is invoked and conditional is activated once the Selectedbreed is passed in as an argument in the  dogBreed function. This is done in step 3
        //const correctBreed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)]; // generates a random integer between 0 and the length of the dogBreeds array minus 1, and uses that integer as an index to select a random breed from the dogBreeds array. The selected breed is then assigned to the constant variable correctBreed.
      }) // function closes 
  }

}

// STEP # 1 - declare your array of breeds, iterate over them, fetch request to api to get dog images, first promise, second promise a call back function to executed after data is converted to JSON. 
function addDogsToDom(){

  dogImageElements = shuffle(dogImageElements); //shuffle the dogs

  if(dogImageElements.length >= 4){ //once i have 4 dogs then add them to the html

    //add image
    dogImageElements.map(d=>{
      dogList.appendChild(d)
    })

    //get random dog from my four
    let randomIndex = Math.floor(Math.random() * 4); //get random out of 4
    console.log("get random dog:", randomIndex, dogImageElements[randomIndex].getAttribute("data-breed"));
    
    //save one of the as them correct answer
    correctAnswer = dogImageElements[randomIndex].getAttribute("data-breed");
    //write the question
    qEl.textContent = "Find the " + correctAnswer ;




  }

}

function checkDog(e){
  // adds click event listener to the 'dogimage' element , user is clicking image 
  let clickedBreed = this.getAttribute("data-breed");

  //compare
  console.log("i am comparing", clickedBreed , "&&", correctAnswer)
 
   // const clickedBreed = this.src.split('/')[4]; // This extracts the breed name from the src attribute of the clicked image. It does this by splitting the src string using the forward slash as the separator and then taking the 4th item from the resulting array (since the breed name is the 4th item in the URL).
   if (clickedBreed === correctAnswer) { //  conditional checker for breed name of the clicked image matches the correctBreed
     score += 3;
     scoreEl.textContent = score;
     mEl.textContent = "You scored 3 points"
     startGame(); //do another round

   } else { // If the breed name of the clicked image does not match the correctBreed, this line starts the "else" block.
     e.target.style.display = "none";
     mEl.textContent = "You got a 5 point penalty"
    
     score += -5;
     scoreEl.textContent = score
   }

   //removes the message after 1 second
   setInterval(function () {   mEl.textContent = ""}, 1000);

}

//i need to clear all the dog images in the dogList
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}



function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.looked this up on the internet 
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}




function GameOver(){
  document.querySelector("#message2").textContent = "Game Over - Your score is: " + score;
  qEl.textContent = "";

}
  


 