'use strict';
// ------------------------------ Global Variables ----------------------------//
const tableElem = document.getElementById('sales');
// for hours of opperation
const hoursOfOpperation = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// -------------------------------- Constructor ------------------------------//
function Store(minCust, maxCust, avgCookiePerSale, name) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiePerSale = avgCookiePerSale;
  this.salesHourly = [];
  Store.allStores.push(this)
}

// -------------------------------- constructor related -------------------------//
Store.allStores = [];
Store.prototype.randomCustInRange = function() {
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
}
Store.prototype.calculateSalesPerHour = function() {
  for (let i = 0; i < hoursOfOpperation.length; i++) {
    const thisHoursSale = Math.ceil(this.randomCustInRange() * this.avgCookiePerSale);
    this.salesHourly.push(thisHoursSale);
  }
}

// prototype method for render()
Store.prototype.renderStore = function(bodyElem) {
  let grandTotal = 0;
  const rowElement = document.createElement('tr');
  bodyElem.appendChild(rowElement);
  const locationTHElem = document.createElement('th');
  locationTHElem.textContent = this.name;
  rowElement.appendChild(locationTHElem);
  for (let i = 0; i < this.salesHourly.length; i++) {
    const hourlyTotal = this.salesHourly[i]
    const tdElem = document.createElement('td');
    tdElem.textContent = hourlyTotal;
    grandTotal += hourlyTotal;
    rowElement.appendChild(tdElem);
  }
  const grandTotalTHElem = document.createElement('th');
  grandTotalTHElem.textContent = grandTotal;
  rowElement.appendChild(grandTotalTHElem);
}

// -------------------------------- global functions ----------------------------//// makes elements and adds them to the dom
function makeElement(tagName, parent, textContent) {
  let element = document.createElement(tagName);
  if (textContent) {
    element.textContent = textContent;
  }
  parent.appendChild(element);
  return element;
}


// renders header
function renderHeader() {
  const headerElem = makeElement('thead', tableElem, null);
  const rowElem = makeElement('tr', headerElem, null);
  makeElement('td', rowElem, null);
  for (let i = 0; i < hoursOfOpperation.length; i++) {
    makeElement('th', rowElem, hoursOfOpperation[i]);
  }
}

function rendersAllStores() {
  // create the tbody and append it to the table
  const bodyElem = makeElement('tbody', tableElem, null);
  for (let i = 0; i < Store.allStores.length; i++) {
    let currentStore = Store.allStores[i];
    currentStore.calculateSalesPerHour();
    currentStore.renderStore(bodyElem);
  }
}

// renders footer
function renderFooter() {
  const tfootElem = makeElement('tfoot', tableElem, null);
  const rowElem = makeElement('tr', tfootElem, null);
  let hourlyTotal = 0;
  let grandTotal = 0;
  makeElement('th', rowElem, 'Hourly Totals')
  for (let i = 0; i < hoursOfOpperation.length; i++){
    for (let j = 0; j < Store.allStores.length; j++) {
      let storesSalesAtHour = Store.allStores[j].salesHourly[i];
      hourlyTotal += storesSalesAtHour;
    }
    makeElement('th', rowElem, hourlyTotal);
    grandTotal += hourlyTotal;
    hourlyTotal = 0;
  }
  makeElement('th', rowElem, grandTotal);

}

// ------------------------------ call functions ----------------------------//
const seattle = new Store(23, 65, 6.3, 'Seattle');
const tokyo = new Store(3, 24, 1.2, 'Tokyo');
const dubai = new Store(11,38,3.7, 'Dubai');
const paris = new Store(20,38,2.3,'Paris');
const lima = new Store(2, 16, 4.6, 'Lima');
renderHeader();
rendersAllStores();
renderFooter();