var TopPot = function(location, minCustomers, maxCustomers, avgDonuts) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgDonuts = avgDonuts;

  this.dailyTotal = 0;
  this.hourlyArray = [];
}

// Formula for generating donut numbers based on max and min
// customers, and average donuts sold per customer. +++++++++++++++++++++++++++
TopPot.prototype.hourlyDonutsBought = function() {
  var hourlyCustomers = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers)) + this.minCustomers;

  return hourlyCustomers * this.avgDonuts;
}

// Now, creating total numbers of donuts sold within each of 11 hrs
// that the store is open. ++++++++++++++++++++++++++++++++++++++++++++++++++++
TopPot.prototype.dailyDonutsBought = function() {
  var totalEachHour = 0;

  for (var i = 0; i < 13; i++) {

    totalEachHour = this.hourlyDonutsBought();
    this.hourlyArray[i] = (Math.round(totalEachHour));
    };

 // Now, we are summing all those 11 hourly donut
 // totals to make one daily total.
  var hourlyArraySummedUp = this.hourlyArray.reduce(function(a, b) {
    return a + b;
  });
  this.dailyTotal = hourlyArraySummedUp;

}

// DOM manipulation here. +++++++++++++++++++++++++++++++++++++++++++++++++++++
TopPot.prototype.create = function() {

// Appending donut shop location to table.
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = this.location;
    tr.appendChild(td);

// Appending the hourly totals.
  for (var i = 0; i <= this.hourlyArray.length; i++) {

    td = document.createElement('td');
    td.innerHTML = this.hourlyArray[i];
    td.id = this.location + i;
    tr.appendChild(td);
  }

// Appending the daily totals.
  var appendTotal = document.getElementById('td');
  td.innerHTML = this.dailyTotal;
  tr.appendChild(td);
  document.getElementById('donutShop').appendChild(tr);

// Append location name to drop-down select box
  var getDropDown = document.getElementById('existingLocation');
  var addLocation = document.createElement('option');
  addLocation.innerHTML = this.location;
  getDropDown.add(addLocation);
}

TopPot.prototype.update = function() {

// Update existing row of total donuts sold by the hour
  for (var i = 0; i < this.hourlyArray.length; i++) {
    var td = document.getElementById(this.location + i);
    td.innerHTML = this.hourlyArray[i];
  }
// Update total donuts sold for the day
var total = document.getElementById(this.location + '13');
total.innerHTML = this.dailyTotal;
}


// End of functions, begin objects ++++++++++++++++++++++++++++++++++++++++++++

var loc1 = new TopPot('Downtown', 8, 43, 4.50);
var loc2 = new TopPot('Capitol Hill', 4, 37, 2.00);
var loc3 = new TopPot('South Lake Union', 9, 23, 6.33);
var loc4 = new TopPot('Wedgewood', 2, 28, 1.25);
var loc5 = new TopPot('Ballard', 8, 58, 3.75);

var allLocations = [loc1, loc2, loc3, loc4, loc5];

allLocations.forEach(function(location) {
  location.dailyDonutsBought();
  location.create();

})

//  EASTER EGG event listeners! ************************************************

// Click on the heading, get gif animations to right!
var partytime = document.getElementById('header');

partytime.addEventListener('click', function() {
  var span = document.getElementById('partytime');
  span.innerHTML = "<img src='images/cannon.gif' /><img src='images/noisemaker.gif' />"
}, false);

// Click on the page break below table, get 20 instances ******
// of confetti gif, and one instance of cannon gif.
var pageBreakParty = document.getElementById('party');

function confetti() {
  party.innerHTML += "<img height='60' src='images/confetti.gif' />";
}

pageBreakParty.addEventListener('click', function() {
  for (var i = 0; i < 20; i++) {
    confetti();
  };
  party.innerHTML +="<img height='60' src='images/cannon.gif' />";

}, false);

// User input event listener ++++++++++++++++++++++++++++++++++++++++++++++++++

var userInput = document.getElementById('userInput');

// Click Submit button event listener
userInput.addEventListener('submit', function(event) {
  event.preventDefault();

  var getSelect = document.getElementById("existingLocation");

  // First, error-checking ****************************************************
  if (getSelect.value == "selectLocation" && event.target.location.value == '') {
    // If BOTH fields are NULL ****
      alert("D'OH! You didn't enter a location. Try again!");
    }

  else if (getSelect.value !== "selectLocation" && event.target.location.value !== '') {
    // If BOTH fields have input from user ****
      alert("Can't create a new shop AND update an existing one! Try again.");
    }

  else {

    if (getSelect.value !== "selectLocation") { // User updates existing location

        var getSelect = document.getElementById("existingLocation");
        var getOption = getSelect.options[getSelect.selectedIndex].text;
        // Gets the text from the drop-down option that was selected.

        // Now checking for TopPot objects whose location property value is
        // equal to the text saved within getOption variable, above.

        var getExistingObject;
        for(var i = 0; i < allLocations.length; i++) {
           var checkObj = allLocations[i];
           if(checkObj.location == getOption) {
             getExistingObject = checkObj;
             break;
           }
        }

        var existingDonutShop = getExistingObject;
        existingDonutShop.minCustomers = event.target.minCustomersPh.value;
        existingDonutShop.maxCustomers = event.target.maxCustomersPh.value;
        existingDonutShop.avgDonuts = event.target.averageDonutsPc.value;


        existingDonutShop.dailyDonutsBought();
        existingDonutShop.update();

      } else { // User inputs new location and data ***************************
        var newDonutShop = new TopPot(event.target.location.value, event.target.minCustomersPh.value, event.target.maxCustomersPh.value, event.target.averageDonutsPc.value);

        newDonutShop.dailyDonutsBought();
        newDonutShop.create();
      }
  }
}, false);
