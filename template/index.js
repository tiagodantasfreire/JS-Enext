class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class Bill {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addItem = item => {
    this.items.push(item);
    document.getElementById('name').value = "";
    document.getElementById('price').value = "";
  }

  removeItem = nome => {
    this.items.map(item => {
      if (item.name === nome) {
        this.items.splice(this.items.indexOf(item), 1);
      }
    });
    
    if (this.items.length === 0) {
      document.getElementById('total').innerHTML = 'R$ 0,00';
    };

    bill.render();
  }

  billTotal = (prices) => {
    let sumPrices = prices.reduce((acc, curr) => { return acc + curr }, 0);
    return sumPrices;
  }

  render = () => {
    let billContainer = document.getElementById('items');
    billContainer.innerHTML = '';
    this.items.map((item) => {
      let row = document.createElement('tr');
      let foodName = document.createElement('td');
      let foodPrice = document.createElement('td');
      foodName.innerHTML = item.name;
      foodPrice.innerHTML = 'R$ ' + item.price;

      let total = document.getElementById('total');
      total.innerHTML = 'R$ ' + this.billTotal(this.items.map(item => item.price));

      row.append(foodName);
      row.append(foodPrice);
      billContainer.append(row);
    });

    document.querySelectorAll('td:first-child').forEach(element => {
      element.setAttribute('onclick', 'bill.removeItem(this.innerHTML)');
    });

    if (this.items.length === 0) {
      document.getElementById('total').innerHTML = 'R$ 0,00';
    };
  }
}


var bill = new Bill();

function init() {
  bill.addItem(new Item('croissant', 5.99));
  bill.addItem(new Item('café', 2.99));
  bill.render();
  document.getElementsByTagName('body')[0].style.display = 'flex';
}

function addItem() {
  let name = document.getElementById('name').value;
  let price = Number(document.getElementById('price').value);
  name === '' || price === '' ? alert('Preencha todos os campos') : bill.addItem(new Item(name, price));
  bill.render();
}

function printBill() {
  window.print();
  bill.items = [];
  bill.render();
}