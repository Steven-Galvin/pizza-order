// Back End

function Customer(name, street, city, state, zipcode) {
  this.name = name;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zipcode = zipcode;
}

Customer.prototype.fullAddress = function() {
  return this.street + ", " + this.city + " " + this.state + " " + this.zipcode;
}

function Pizza(size, crust, toppings) {
  this.size = size;
  this.crust = crust;
  this.toppings = toppings;
  this.price = 0;
}

Pizza.prototype.totalPrice = function() {
  if (this.size === 1) {
    this.price += 7;
  } else if (this.size === 2) {
    this.price += 9;
  } else {
    this.price += 11;
  }

  if (this.crust === 1) {
    this.price += 0;
  } else if (this.crust === 2) {
    this.price += 1;
  } else {
    this.price += 3;
  }

  return this.price;

}


// Front End

$(document).ready(function() {
  $("form#personalInfo").submit(function(event) {
    event.preventDefault();
    var name = $("#userName").val();
    var street = $("#userStreet").val();
    var city = $("#userCity").val();
    var state = $("#userState").val();
    var zipcode = $("#userZipcode").val();

    var newCustomer = new Customer(name, street, city, state, zipcode);
  });
  $("div#sizeCrust").submit(function(event) {
    event.preventDefault();
    var size = parseInt($("input:radio[name=pizzaSize]:checked").val());
    var crust = parseInt($("input:radio[name=pizzaCrust]:checked").val());
  });

});
