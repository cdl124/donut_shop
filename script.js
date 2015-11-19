var TopPot = function(location, minCustomers, maxCustomers, avgDonuts) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgDonuts = avgDonuts;
  this.dailyTotal = 0;
  this.hourlyArray = [];

}

// Formula for generating donut numbers based on max and min customers, and average donuts sold per customer.
TopPot.prototype.hourlyDonutsBought = function() {
  var hourlyCustomers = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers)) + this.minCustomers;

  return hourlyCustomers * this.avgDonuts;
}

// Now, creating total numbers of donuts sold within each of 11 hrs
// that the store is open.
TopPot.prototype.dailyDonutsBought = function() {
  var totalEachHour = 0;

  for (var i = 0; i < 13; i++) {

    totalEachHour = this.hourlyDonutsBought();
    this.hourlyArray.push(Math.round(totalEachHour));

    };

 // Now, we are summing all those 11 hourly donut totals to make one daily total.
  var hourlyArraySummedUp = this.hourlyArray.reduce(function(a, b) {
    return a + b;
  });
  this.dailyTotal = hourlyArraySummedUp;
}

// DOM manipulation here.
TopPot.prototype.render = function() {

// Appending donut shop location.
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = this.location;
    tr.appendChild(td);

// Appending the hourly totals.
  for (var i = 0; i <= this.hourlyArray.length; i++) {

    td = document.createElement('td');
    td.innerHTML = this.hourlyArray[i];
    tr.appendChild(td);
  }

// Appending the daily totals.
  var appendTotal = document.getElementById('td');
  td.innerHTML = this.dailyTotal;
  tr.appendChild(td);
  document.getElementById('donut-shop').appendChild(tr);
}

var loc1 = new TopPot('Downtown', 8, 43, 4.50);
var loc2 = new TopPot('Capitol Hill', 4, 37, 2.00);
var loc3 = new TopPot('South Lake Union', 9, 23, 6.33);
var loc4 = new TopPot('Wedgewood', 2, 28, 1.25);
var loc5 = new TopPot('Ballard', 8, 58, 3.75);

loc1.dailyDonutsBought();
loc1.render();

loc2.dailyDonutsBought();
loc2.render();

loc3.dailyDonutsBought();
loc3.render();

loc4.dailyDonutsBought();
loc4.render();

loc5.dailyDonutsBought();
loc5.render();
