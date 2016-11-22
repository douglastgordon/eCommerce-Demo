import $ from 'jquery';

const content = $(".content");
const title = $(".title");
$("#products").on("click", (e) => makePage(e));
$("#cart").on("click", (e) => makePage(e));

let cart = {};
let total = 0;

const makePage = (e) => {
  content.empty();

  $.getJSON("./product.json", function(data) {
    if (e.currentTarget == null || e.currentTarget.id === "products"){
      data.forEach((product) => {
        if (product.isVisible){
          makeProduct(product);
        }
      });
      makeProductPage();
    } else {
      const keys = Object.keys(cart);
      let i = 0;
      keys.forEach((key) => {
        let border = (i % 2 === 0);
        makeItem(data[key], cart[key], border);
        i++;
      });
      makeCartPage();
    }

  });
};

const makeProductPage = () => {
  title.html("Products");
  content.css("flex-direction", "row");
};

const makeCartPage = () => {
  title.html("Cart");
  let totalPrice = $("<p></p>");
  totalPrice.append(`total price:    $${total.toFixed(2)}`);
  content.append(totalPrice);
  content.css("flex-direction", "column");
};

const makeProduct = (product) => {
  let newProduct = $("<div></div>");
  newProduct.attr("id", product.index);
  newProduct.addClass("product");

  let image = $("<img/>");
  image.attr("src", product.productPicture);
  image.attr("alt", "product-image");

  let name = $("<p></p>");
  name.addClass("name");
  name.append(product.productName);

  let price = $("<p></p>");
  price.attr("id", "price");
  price.append(product.productPrice);

  let button = makeButton(product.index);

  newProduct.append(image);
  newProduct.append(name);
  newProduct.append(price);
  newProduct.append(button);
  content.append(newProduct);
};

const makeButton = (id) => {
  let button = $("<div></div>");
  button.addClass("button");
  button.attr("id", id);
  let buttonText = $("<p></p>");
  buttonText.append("add to cart");
  button.append(buttonText);
  button.on("click", (e) => addToCart(e));
  return button;
};

const addToCart = (e) => {
  const productId = parseInt(e.currentTarget.id);
  addToTotal(productId);
  if (cart[productId] == null){
    cart[productId] = 1;
  } else {
    cart[productId] += 1;
  }
};

const addToTotal = (productId) => {
  let price = $(`#${productId}`).find("#price").html();
  total += parseFloat(price.slice(1));
};

const makeItem = (product, number, border) => {
  let cartItem = $("<div></div>");
  cartItem.addClass("cartItem");
  if (border){
    cartItem.css("border", "1px solid black");
  }

  let imageCount = $("<div></div>");
  imageCount.addClass("imageCount");

  let image = $("<img/>");
  image.attr("src", product.productPicture);
  image.attr("alt", "product-image");
  image.addClass("alt", "cart-image");
  imageCount.append(image);

  let count = $("<p></p>");
  count.addClass("count");
  count.append(`count: ${number}`);
  imageCount.append(count);

  let name = $("<p></p>");
  name.addClass("cartName");
  name.append(product.productName);

  let price = $("<p></p>");
  price.attr("id", "cartPrice");
  price.append(product.productPrice);

  cartItem.append(imageCount);
  cartItem.append(name);
  cartItem.append(price);
  content.append(cartItem);
};

$(document).ready(makePage);
