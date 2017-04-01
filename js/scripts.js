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
  if (this.size === "small") {
    this.price += 7;
  } else if (this.size === "medium") {
    this.price += 9;
  } else {
    this.price += 11;
  }

  if (this.crust === "regular crust") {
    this.price += 0;
  } else if (this.crust === "thin crust") {
    this.price += 1;
  } else {
    this.price += 2;
  }

  if (this.toppings.length <= 2) {
    this.price += 0;
  } else {
    for (var index = 0; index < this.toppings.length - 2; index++) {
      this.price += .25;
    }
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

    newCustomer = new Customer(name, street, city, state, zipcode);
    $("#page2-Size-Crust-Toppings").show();
    $("#page1-Info").hide();
  });

  $("div#sizeCrust").submit(function(event) {
    event.preventDefault();
    var size = $("input:radio[name=pizzaSize]:checked").val();
    var crust = $("input:radio[name=pizzaCrust]:checked").val();
    var toppings = [];
    $("input:checkbox[name=toppings]:checked").each(function() {
      toppings.push($(this).val());
    });

    var newPizza = new Pizza(size, crust, toppings);

    $("#name").text(newCustomer.name);
    $("#address").text(newCustomer.fullAddress());
    $("#size").text(newPizza.size);
    $("#crust").text(newPizza.crust);
    if (toppings.length === 0) {
      $("#toppings").html("<label>It looks like you don't want any toppings this time.</label>");
    } else if (toppings.length === 1) {
      toppings.forEach(function(topping) {
        $("#toppings").html("<label>On top of your pizza you want " + topping + "  and that's it.</label>");
      });
    } else {
       $("#toppings").html("<label>On top of your pizza you want <span id='toppings2'></span> and that's it.</label>");
       toppings.forEach(function(topping) {
         $("#toppings2").append(topping + ", ");
       });
    }
    $("#total").text(newPizza.totalPrice());
    $("#page3-Confirm").show();
    $("#page2-Size-Crust-Toppings").hide();
  });

  $("div#page3-Confirm").submit(function(event) {
    event.preventDefault();
    delivery = $("input:radio[name=delivery]:checked").val();
    var deliveryNames = ["Ian", "Shawn", "Jessie", "Jose", "Carlos", "Alexis", "Diana", "Trevor", "Monique"]
    var randomIndex = Math.floor(Math.random()*deliveryNames.length);
    var randomName = deliveryNames[randomIndex];
    $("#deliveryName").text(randomName);
    $("#page4-ThankYou").show();
    if (delivery === "delivery") {
      $("#thanksDelivery").show();
    } else {
      $("#thanksPickup").show();
    }
    $("#page3-Confirm").hide();
  });

});
