//Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  //create Span
  let span = document.createElement("span");

  //Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Tha Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});



fetch("/data.json")
.then(response => {
  return response.json()
}).then((data) => {
  let words = data
  
// // Object Of Words + Category
// const words = {
//   programming: [
//     "php",
//     "javascript",
//     "go",
//     "scala",
//     "fortran",
//     "r",
//     "mysql",
//     "python",
//   ],
//   movies: [
//     "prestige",
//     "inception",
//     "parasite",
//     "interstellar",
//     "whiplash",
//     "memento",
//     "coco",
//     "up",
//   ],
//   people: [
//     "albert einstein",
//     "hitchcock",
//     "Alexander",
//     "Cleopatra",
//     "mahatma Ghandi",
//   ],
//   countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
// };
 

// Get Random Property
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".category span").innerHTML = randomPropName;

// Select Letters Guess element
let letterGuessContainer = document.querySelector(".letters-guess");

// convert Chosen word To Array
let letterAndSpace = Array.from(randomValueValue);

// Create span Depend On Words
letterAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");

  // If Letter Is Space
  if (letter === " ") {
    // Add class To The span
    emptySpan.className = "with-space";
  }

  // Append Span To The Guess Container
  letterGuessContainer.appendChild(emptySpan);
});

//Select Guess Span
let guessSpan = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

//Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Select Alerts
let fail = document.querySelector(".fail");
let success = document.querySelector(".success");



// Handel Clicking on Letters
document.addEventListener("click", (e) => {
  // Set The Chose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let TheClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen word
    let TheChosenWord = Array.from(randomValueValue.toLowerCase());

    TheChosenWord.forEach((wordLetter, wordIndex) => {
      // If The clicked Letter Equal To One Of The Chosen Word Letter
      if (TheClickedLetter == wordLetter) {
        // Set Status
        theStatus = true;

        // Loop On Guess Span
        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = TheClickedLetter;
            
          }
        });
      }
    });

    //Outside loop
    

    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase The wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Sound And Alert Fail
      document.getElementById("fail").play();
      fail.classList.add("show");
     
    setTimeout(function() {
      fail.classList.remove("show");
    }, 1000);
      

      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      // Alert Success
      document.getElementById("success").play();
      success.classList.add("show");
      setTimeout(function() {
        success.classList.remove("show");
      }, 1000);
      
    }
  }
});

// End game Function
function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue}`
  );

  div.appendChild(divText);
  div.className = "popup";

  document.body.appendChild(div);
}
})