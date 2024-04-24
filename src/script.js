let startTime;
let stopTime;
let hints = ['Pay attention to the shape of the shark\'s tails!', 'Notice any recognizable markings on the sharks? Scars, fin shapes, black fin tips...', 'Do you recognize a pattern in the any of the shark\'s spots?'];
let specificSharkHints = new Map([
    ['Claud', 'One of your sharks has a unique, long pointy tail with a notch at the tip'],
    ['Maylon', 'One of your sharks has something dangling from his nose!'],
    ['Tippy', 'One of your sharks has a unique, wide fan shaped tail'],
  ['RipTorn', 'One of your sharks has some bright white scarring on his head and fin'],
  ]);

function checkMatch(event) {
  isMessageDisplayed = document.getElementById('success').style.display === 'block' || document.getElementById('failure').style.display === 'block';

  if (isMessageDisplayed) {
    return;
  }

  event.currentTarget.classList.add('selected');
  var selectedItems = document.getElementsByClassName('selected');

  if (selectedItems.length > 1) {
    var isMatch = selectedItems[0].name === selectedItems[1].name
    console.log(isMatch);
    if (isMatch) {
      document.getElementById('hint').style.display = 'none';
      document.getElementById('success').style.display = 'block';

      successMessage = document.getElementById('success').innerHTML;

      document.getElementById('success').innerHTML = document.getElementById('success').innerHTML + selectedItems[0].name;

      setTimeout(() => {
        document.getElementById('success').style.display = 'none'; document.getElementById('success').innerHTML = successMessage;

        selectedItems[0].classList.add('matched');
        selectedItems[1].classList.add('matched');
        selectedItems[0].classList.remove('selected');
        selectedItems[0].classList.remove('selected');
        ;

        var totalSharks = document.getElementsByClassName('shark-image');
        var matchedSharks = document.getElementsByClassName('matched');
        if (matchedSharks.length == totalSharks.length) {
          //Stop the timer once all the sharks are matched
          stopTimer();
          console.log(stopTime - startTime);
        }
      }, '2500');

    }
    else {
      document.getElementById('hint').style.display = 'none';
      document.getElementById('failure').style.display = 'block';
      selectedItems[0].classList.add('incorrect');
      selectedItems[1].classList.add('incorrect');
      setTimeout(() => {
        document.getElementById('failure').style.display = 'none';

        selectedItems[0].classList.remove('incorrect');
        selectedItems[1].classList.remove('incorrect');
        selectedItems[0].classList.remove('selected');
        selectedItems[0].classList.remove('selected');

      }, '2500');

    }
  }
}

function startTimer() {
  startTime = new Date().getTime();
}

function stopTimer() {
  stopTime = new Date().getTime();
  window.location.href = 'results.html?time=' + (stopTime - startTime);
  // need query string to use this on the results page because navigating to a new page resets info in script.js
  console.log(stopTime - startTime);
}

function getTime() {
  //Gets the time we put in the url to pass to the results page
  const searchParams = new URLSearchParams(window.location.search);
  //Have to use parseInt here because its a string '20000' and we need a number to divide it by 1000 to turn ms into s
  let gameTime = parseInt(searchParams.get('time')) / 1000;
  //Get the time header element on the page and set its innerHTML value to our game time in seconds
  const messageElement = document.getElementById('time');
  messageElement.innerHTML = Math.floor(gameTime) + ' seconds!';

  //Timeout to restart the game without someone pressing the button
  setTimeout(() => {
    window.location.href = '../index.html';
  }, 10000);
}


function randomizeSharks() {
  // Multidimensional array of all of our shark images grouped by shark
  let imageNamesByShark = [['Cecil-1.png', 'Cecil-2.png', 'Cecil-3.jpg', 'Cecil-4.png'], ['Claud-1.jpg', 'Claud-2.jpg', 'Claud-3.jpg', 'Claud-4.jpg', 'Claud-5.jpg', 'Claud-6.jpg', 'Claud-7.jpg', 'Claud-8.jpg'], ['GingerBear-1.png', 'GingerBear-2.png'], ['Maylon-1.JPG', 'Maylon-2.JPG', 'Maylon-3.png'], ['RipTorn-1.jpg', 'RipTorn-2.jpg', 'RipTorn-3.jpg'], ['Tippy-1.png', 'Tippy-2.png']];

  //All the image tags on the page, they'll be empty/broken images at this point but they will display an image once we give them a src
  const images = Array.from(document.getElementsByClassName('shark-image'));
  //Array to store all of the shark images we select for the game
  let selectedSharks = [];

  //For loop going in multiples of 2 because were setting 2 images for the same shark at a time
  for (let i = 0; i < images.length; i = i + 2) {
    // Randomly getting an inner list from imageNamesByShark, aka a list of all the images we have for a particular shark
    let allImagesForOneShark = imageNamesByShark[Math.floor(Math.random() * imageNamesByShark.length)];

    // Removes the inner list that we just got (allImagesForOneShark) from our multidimensional array, so we don't get the same image twice
    imageNamesByShark = imageNamesByShark.filter((sharkGroup) => sharkGroup != allImagesForOneShark);

    // Randomly getting one shark image from our list of shark images for the same shark ex. [Claud-1.jpg, Claud-2.jpg...] => Claud-1.jpg
    let sharkPath = allImagesForOneShark[Math.floor(Math.random() * allImagesForOneShark.length)];
    //Add that randomly selected shark image to our final list of selectedSharks
    selectedSharks.push(sharkPath);

    //Removes the shark we just used from the list of all the images we have for that shark
    allImagesForOneShark = allImagesForOneShark.filter(shark => shark !== sharkPath);

    //This chunk does the same thing as the chunk above it but for the next image in the list (i+1), this is why our for loop increments by 2 instead of 1, the next time it loops these indexes will be 2 & 3 instead of 0 & 1
    sharkPath = allImagesForOneShark[Math.floor(Math.random() * allImagesForOneShark.length)];
    selectedSharks.push(sharkPath);
    allImagesForOneShark = allImagesForOneShark.filter(shark => shark !== sharkPath);
  }
  //Now, outside of the first for loop, we should have an array of SelectedSharks, it has 2 images for each shark but they are next to eachother in the array. Now we need to shuffle that array of sharks
  selectedSharks.sort(() => Math.random() - 0.5);
  for (let i = 0; i < images.length; i++) {
    //This for loop goes through all the images we need to populate one by one and sets their image src/path and name to the shark from the selectedSharks array
    images[i].src = images[i].src + selectedSharks[i];
    images[i].name = selectedSharks[i].split('-')[0];
  }
  //Once our sharks are shuffled and visible we will start the game timer!
  startTimer();
}

function giveHint() {
  document.getElementById('success').style.display = 'none';
  document.getElementById('failure').style.display = 'none';
  document.getElementById('hint').style.display = 'block';
  if(hints.length == 0) {
    for (let [name, hint] of specificSharkHints) {
      if(document.getElementsByName(name).length !== 0 && !document.getElementsByName(name)[0].classList.contains('matched')) {
        let hintDisplayed = hint;
        document.getElementById('hint').innerHTML = hintDisplayed;
        specificSharkHints.delete(name);
        return;
      }
      else {
        specificSharkHints.delete(name);
      }
    };
    if(specificSharkHints.size === 0) {
      document.getElementById('hint').innerHTML = 'All out of hints!';
      return;
    }
  }
  const hintGiven = hints[Math.floor(Math.random() * hints.length)];
  document.getElementById('hint').innerHTML = hintGiven;
  hints = hints.filter((hint) => hint !== hintGiven);
}

function navigateToGame(level) {
  window.location.href = 'src/'+level+'.html';
}