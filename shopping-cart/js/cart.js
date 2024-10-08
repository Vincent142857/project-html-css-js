// ************************************************
// Shopping Cart API
// ************************************************

let shoppingCart = (function () {
  // =============================
  // Private methods and properties
  // =============================
  let cart = [];

  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart') || "");
  }


  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }


  // =============================
  // Public methods and properties
  // =============================
  let obj = {};

  // Add to cart
  obj.addItemToCart = function (name, price, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count++;
        saveCart();
        return;
      }
    }
    let item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function (name, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function (name) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count--;
        if (cart[i].count === 0) {
          cart.splice(Number(i), 1);
        }
        break;
      }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function (name) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart.splice(Number(i), 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  }

  // Count cart
  obj.totalCount = function () {
    let totalCount = 0;
    for (let i in cart) {
      totalCount += cart[i].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function () {
    let totalCart = 0;
    for (let i in cart) {
      totalCart += cart[i].price * cart[i].count;
    }
    return Number(totalCart);
  }

  // List cart
  obj.listCart = function () {
    let cartCopy = [];
    for (let i in cart) {
      let item = cart[i];
      let itemCopy = {};
      for (let p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// *****************************************
// Add item
// @ts-ignore
$('.add-to-cart').click(function (event) {
  event.preventDefault();
  // @ts-ignore
  let name = $(this).data('name');
  // @ts-ignore
  let price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
// @ts-ignore
$('.clear-cart').click(function () {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  let cartArray = shoppingCart.listCart();
  let output = `<tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th> </th>
                  <th>Total</th>
                </tr>`;

  // @ts-ignore
  $.each(cartArray, function (k, v) {

    output += `<tr>
                <td>${v.name.toUpperCase()}</td>
                <td>${v.price}</td>
                <td><div class='input-group'>
                  <span class='minus-item input-group-addon btn btn-primary' data-name="${v.name}">-</span>
                  <input type='number' class='item-count form-control' data-name="${v.name}" value="${v.count}">
                  <span class='plus-item input-group-addon btn btn-primary' data-name="${v.name}">+</span>
                </div></td>
                <td><button class='delete-item btn btn-danger' data-name="${v.name}">X</button></td>
                <td>${v.total}</td>
              </tr>`

  });
  /*for(let i in cartArray) {
    output += `<tr>
              <td>${cartArray[i].name.toUpperCase()}</td>
              <td>${cartArray[i].price}</td>
              <td><div class='input-group'><span class='minus-item input-group-addon btn btn-primary' data-name="${cartArray[i].name}">-</span>
                  <input type='number' class='item-count form-control' data-name="${cartArray[i].name}" value="${cartArray[i].count}">
                  <span class='plus-item input-group-addon btn btn-primary' data-name="${cartArray[i].name}">+</span></div></td>
              <td><button class='delete-item btn btn-danger' data-name="${cartArray[i].name}">X</button></td>
              <td>${cartArray[i].total}</td>
              </tr>`
  }*/

  // @ts-ignore
  $('.show-cart').html(output);
  // @ts-ignore
  $('.total-cart').html(shoppingCart.totalCart());
  // @ts-ignore
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button
// @ts-ignore
$('.show-cart').on("click", ".delete-item", function (event) {
  // @ts-ignore
  let name = $(this).data('name');
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});


// -1
// @ts-ignore
$('.show-cart').on("click", ".minus-item", function (event) {
  // @ts-ignore
  let name = $(this).data('name');
  shoppingCart.removeItemFromCart(name);
  displayCart();
});

// +1
// @ts-ignore
$('.show-cart').on("click", ".plus-item", function (event) {
  // @ts-ignore
  let name = $(this).data('name');
  shoppingCart.addItemToCart(name);
  displayCart();
});

// Item count input
// @ts-ignore
$('.show-cart').on("change", ".item-count", function (event) {
  // @ts-ignore
  let name = $(this).data('name');
  // @ts-ignore
  let count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();
