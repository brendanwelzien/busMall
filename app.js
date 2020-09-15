'use strict';
/*
1. 3 random image generator
2. make event clicker for which image user likes, track clicks, times shown, and stop after 25 votes
3. count votes of what is liked and what is shown
4. results
*/

// Global Variables
var productArray = [];
var clickCounter = 0;
var newImage;
var sumArray=[];
var summ;




// Constructor Function : name of product and file path of image along with 
function Product(productName, filePath){
    this.productName = productName;
    this.filePath = filePath;
    this.timesClicked = 0;
    this.timesShown = 0;
    productArray.push(this);
}


// Display Setup of the Images and Reference
var leftElement = document.getElementById("left");
var middleElement = document.getElementById("middle");
var rightElement = document.getElementById("right");
var setupDisplay= [leftElement, middleElement, rightElement];

// Event Listener
leftElement.addEventListener('click', clickBomb);
middleElement.addEventListener('click', clickBomb);
rightElement.addEventListener('click', clickBomb);

//random image generator (3 items)
function randomImage() {
    var randomNumbers = Math.floor(Math.random() * productArray.length);
    newImage = productArray[randomNumbers];
    
    // now store it
    newImage.timesShown++;
    return newImage;
}

// actual survey
function clickBomb(event) {
   // add counter variable +1 
   clickCounter++;

   // count image selection
   var currentItem = event.target.alt;
   for (var p = 0; p < productArray.length; p++){
       if(currentItem === productArray[p].productName){
           productArray[p].timesClicked++;
       }
   }
   // change and randomize
   for (var r = 0; r < setupDisplay.length; r++){
       newImage = randomImage();
       setupDisplay[r].alt = newImage.productName;
       setupDisplay[r].src = newImage.filePath;
   }

   //end function after 25
   if (clickCounter > 24) {
       leftElement.removeEventListener('click',clickBomb);
       middleElement.removeEventListener('click', clickBomb);
       rightElement.removeEventListener('click', clickBomb);
        findResults();
        returnResults();
   }
}
// finding results function, use number of times chosen divided by shown, turn into non-decimal?
function findResults (){
    for (var p = 0; p < productArray.length; p++){
        summ = Math.floor((productArray[p].timesClicked / productArray[p].timesShown) * 100);
        sumArray.push(summ);
    }
}

var unorderedListElement = document.getElementById('summary');

//returning the results (use ul from html)
function returnResults(){
    for ( var r = 0; r < sumArray.length; r++){
        var listElement = document.createElement('li');
        listElement.textContent = (`${productArray[r].productName} has been clicked ${productArray[r].timesClicked} times when it was shown ${productArray[r].timesShown} times, accounting for ${sumArray[r]}%`);
        unorderedListElement.appendChild(listElement);
    }
}

// products that need to be constructed
new Product('Bag', './img/bag.jpg');
productArray[0].timesShown = 1;

new Product ('Banana', './img/banana.jpg');
productArray[1].timesShown = 1;

new Product ('Restroom', './img/bathroom.jpg');
productArray[1].timesShown = 1;

// check to see if I need to add these to the array as well for times shown
new Product ('Boots', './img/boots.jpg');
new Product ('Breakfast', './img/breakfast.jpg');
new Product ('Bubblegum', './img/bubblegum.jpg');
new Product ('Chair', './img/chair.jpg');
new Product ('Cthulhu', './img/cthulhu.jpg');
new Product ('Dog-duck', './img/dog-duck.jpg');
new Product ('Dragon', './img/dragon.jpg');
new Product ('Pen', './img/pen.jpg');
new Product ('Pet-Sweep', './img/pet-sweep.jpg');
new Product ('Scissors', './img/scissors.jpg');
new Product ('Shark', './img/shark.jpg');
new Product ('Sweep', './img/sweep.png');
new Product ('Tauntaun', './img/tauntaun.jpg');
new Product ('Unicorn', './img/unicorn.jpg');
new Product ('Usb', './img/usb.gif');
new Product ('Water-can', './img/water-can.jpg');
new Product ('Wine-glass', './img/wine-glass.jpg');