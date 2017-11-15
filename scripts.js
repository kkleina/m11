$(function() {

  function Phone(brand, price, color, resolution) {
    this.brand = brand;
    this.price = price;
    this.color = color;
    this.resolution = resolution;
  }

  var main = $("main");
  main.append("<div id='brand' class='row'><div class='col'>Brand</div></div>");
  main.append("<div id='color' class='row'><div class='col'>Color</div></div>");
  main.append("<div id='resolution' class='row'><div class='col'>Resolution</div></div>");
  main.append("<div id='price' class='row'><div class='col'>Price</div></div>");

  Phone.prototype.printInfo = function() {
    $("#brand").append("<div class='col'>" + this.brand + "</div>");
    $("#color").append("<div class='col'>" + this.color + "</div>");
    $("#price").append("<div class='col'>" + this.price + "</div>");
    $("#resolution").append("<div class='col'>" + this.resolution + "</div>");

    console.log("The phone brand is " + this.brand + ", color is " + this.color + " and the price is " + this.price + ".");
  }

  var GalaxyS6 = new Phone("Samsung", 2500, "black", "1440 x 2560");
  var iPhone6S = new Phone("Apple", 2250, "silver", "750 x 1334");
  var iPhone6Splus = new Phone("Apple", 2750, "gold", "1080 x 1920");
  var OnePlusOne = new Phone("Oneplus", 1800, "black", "1080 x 1920");

  GalaxyS6.printInfo();
  iPhone6S.printInfo();
  iPhone6Splus.printInfo();
  OnePlusOne.printInfo();

});
