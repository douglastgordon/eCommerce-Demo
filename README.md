#eCommerce Demo

##[Live](http://www.douglasgordon.me/eCommerce-Demo/)

###Technical Details
This eCommerce demo was built using JavaScript and jQuery. jQuery allowed for easier manipulation of the DOM as well as a convenient way to read the JSON data. I chose not to use a more significant framework as the project is not large enough to merit it. Although this site uses only used one module, I used webpack to manage dependencies, again for convenience. Much of the layout was done using CSS3 flex boxes due to their ease-of-use and readability.

One particular challenge was adding to the cart. I chose to instantiate the cart as a global variable object. Upon the click of an "add to cart" button, the addToCart function is called, seen below. This function calls the addToTotal function, increasing the total, as well as updating the cart. The cart is an object with product ids as keys and a count of each product as a value.

```javascript
const addToCart = (e) => {
  const productId = parseInt(e.currentTarget.id);
  addToTotal(productId);
  if (cart[productId] == null){
    cart[productId] = 1;
  } else {
    cart[productId] += 1;
  }
};
```

###To be implemented

As an extra feature not outlined in the specs, the cart page provides a count of how many objects of each type there are. An additional feature on top of this would be to display prices both for an individual item, as well as for the value of that item multiplied by its count.

Given more time, I would implement more features in the following order:

* Remove items from cart
* Clear cart
* Provide feedback when item is added to cart
* Show message when cart is empty
* Sort products by price (ascending & descending)
