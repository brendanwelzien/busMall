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

var shownArray = [];
var clicksArray = [];
var setOfImages = 3;
var productNameArray = [];
var retrieveRandomIndex;
var priorIndexNumber = [];
var tIndexArray = [];


var displayArray = [];


// Constructor Function : name of product and file path of image along with 
function Product(productName, filePath){
    this.productName = productName;
    this.filePath = filePath;
    this.timesClicked = 0;
    this.timesShown = 0;
    productArray.push(this);
}


// add first of image function
function firstofImage() {
for(var i = 0; i < setOfImages; i++){
    displayArray.push(document.getElementById(i));
    do {
        var storage = Math.floor(Math.random() * productArray.length);
        } while(tIndexArray.includes(storage));
            tIndexArray.push(storage);
            displayArray[i].src = productArray[storage].filePath;
            displayArray[i].alt = productArray[storage].productName;
    }
}

// getting more images function
function grabMoreImages(){
    for (var i = 0; i < displayArray.length; i++){
        newImage = randomImage();
        displayArray[i].src = newImage.filePath;
        displayArray[i].alt = newImage.productName;
    }
    priorIndexNumber = tIndexArray;
    tIndexArray = []; // store images in this array
}



//random image generator (3 items)
function randomImage() {
    do {
     retrieveRandomIndex = Math.floor(Math.random() * productArray.length);
    } while (priorIndexNumber.includes(retrieveRandomIndex) || tIndexArray.includes(retrieveRandomIndex));
    
    // now store it
    newImage = productArray[retrieveRandomIndex];
    newImage.timesShown++;
    tIndexArray.push[retrieveRandomIndex];
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
   grabMoreImages();


   //end function after 25
   if (clickCounter > 24) {
        findResults();
        removeImages();
        createGraph();
        removeListener();

        var productStringify = JSON.stringify(productArray);
        localStorage.setItem('productResults', productStringify);
   }
}


// finding results function, use number of times chosen divided by shown, turn into non-decimal?
function findResults (){
    for (var p = 0; p < productArray.length; p++){
        if(productArray[p].timesShown !==0){
        summ = Math.floor((productArray[p].timesClicked / productArray[p].timesShown) * 100);
        sumArray.push(summ);
        }
    sumArray.push(0);
    productNameArray.push(productArray[p].productName);
    shownArray.push(productArray[p].timesShown);
    clicksArray.push(productArray[p].timesClicked);
    }
}

function createGraph(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
// type of graph
        type:'bar',
        data: { // labels should be the names of products and the results
            labels:productNameArray,
            datasets: [{
                label: '% for times clicked vs. shown',
                data: sumArray,
                backgroundColor: 'rgb(210, 89, 140)',
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// remove image function
function removeImages(){
    for (var r = 0; r < displayArray.length; r++){
        var imageProperty = document.getElementById(r).style.visibility = "hidden"; // this hides images after re-rendering!
    }
}
if (localStorage.getItem('productResults') === null){
// products that need to be constructed
new Product('Bag', './img/bag.jpg');
new Product ('Banana', './img/banana.jpg');
new Product ('Restroom', './img/bathroom.jpg');
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
} else { 
    var productStringify = localStorage.getItem('productResults');
    productArray = JSON.parse(productStringify);
}
firstofImage();
// Event Listener 
// use array length?
for (var l = 0; l < displayArray.length; l++){
    displayArray[l].addEventListener('click', clickBomb);
}



// Remove Listener 
 function removeListener(){
    for(var r = 0; r < displayArray.length; r++){
        displayArray[r].removeEventListener('click', clickBomb);
    }
}