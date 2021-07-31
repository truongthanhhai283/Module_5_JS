$(document).ready(function () {
  let discount_code = { discount_20: 20 };
  let money_discount = 0;

  // ************************************************
  // Shopping Cart API
  // ************************************************
  shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(id, name, img, price, count) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.count = count;
      this.img = img;
    }

    // Save cart
    function saveCart() {
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
      cart = JSON.parse(localStorage.getItem("shoppingCart"));
    }
    if (localStorage.getItem("shoppingCart") != null) {
      loadCart();
    }

    // =============================
    // Public methods and propeties
    // =============================
    let obj = {};

    // Add to cart
    obj.addItemToCart = function (id, name, img, price, count) {
      for (let item in cart) {
        if (cart[item].id == id) {
          cart[item].count++;
          saveCart();
          return;
        }
      }
      let item = new Item(id, name, img, price, count);
      cart.push(item);
      saveCart();
    };
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
    obj.removeItemFromCart = function (id) {
      for (let item in cart) {
        if (cart[item].id == parseFloat(id)) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    };

    // Remove all items from cart
    obj.removeItemFromCartAll = function (id) {
      for (let item in cart) {
        if (cart[item].id === id) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    };

    // Clear cart
    obj.clearCart = function () {
      cart = [];
      saveCart();
    };

    // Count cart
    obj.totalCount = function () {
      let totalCount = 0;
      for (let item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    };

    // Total cart
    obj.totalCart = function () {
      let totalCart = 0;
      for (let item in cart) {
        totalCart +=
          parseFloat(cart[item].price) * parseFloat(cart[item].count);
      }
      return Number(totalCart);
    };

    // List cart
    obj.listCart = function () {
      let cartCopy = [];
      for (i in cart) {
        item = cart[i];
        itemCopy = {};
        for (p in item) {
          itemCopy[p] = item[p];
        }
        itemCopy.total = Number(item.price * item.count).toLocaleString();
        cartCopy.push(itemCopy);
      }
      return cartCopy;
    };

    // count item cart
    // Count cart
    obj.totalItemCart = function () {
      let totalCount = 0;
      const arrayFromStroage = JSON.parse(localStorage.getItem("shoppingCart"));
      totalCount = arrayFromStroage.length;
      if (totalCount <= 0) {
        return 0;
      }
      return totalCount;
    };

    obj.numberCart = 0;

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
    // totalItemCart : Function
    // loadCart : Function
    return obj;
  })();

  // *****************************************
  // Triggers / Events
  // *****************************************
  // number cart
  $(".cart-basket").html(shoppingCart.numberCart);

  // Clear items
  $(".clear-cart").click(function () {
    shoppingCart.clearCart();
    displayCart();
  });

  function displayCart() {
    let cartArray = shoppingCart.listCart();
    let output = "";
    if (cartArray.length <= 0) {
      $(".alert").css("display", "block");
      $(".total_price").css("display", "none");
      $("#btn-payment").css("display", "none");
      $(".clear-cart").css("display", "none");
    } else {
      $(".clear-cart").css("display", "block");
      $(".btn-payment").css("display", "block");
      for (let i in cartArray) {
        output +=
          "<tr>" +
          "<td>" +
          (parseInt(i) + 1) +
          "</td>" +
          "<td>" +
          cartArray[i].id +
          "</td>" +
          "<td><img src='" +
          cartArray[i].img +
          "'/></td>" +
          "<td>" +
          cartArray[i].name +
          "</td>" +
          "<td>" +
          cartArray[i].price.toLocaleString() +
          "</td>" +
          "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-id='" +
          cartArray[i].id +
          "'>-</button>" +
          "<input type='number' class='item-count form-control' readonly data-id='" +
          cartArray[i].id +
          "' value='" +
          cartArray[i].count +
          "'>" +
          "<button class='plus-item btn btn-primary input-group-addon' data-id='" +
          cartArray[i].id +
          "'>+</button></div></td>" +
          " = " +
          "<td><button class='delete-item btn btn-danger' data-id='" +
          cartArray[i].id +
          "'>X</button></td>" +
          "</tr>";
      }
    }
    $(".show-cart").html(output);
    $(".total-cart").html(shoppingCart.totalCart().toLocaleString());
    $(".cart-basket").html(shoppingCart.totalItemCart());
    $(".money_discount").html(money_discount.toLocaleString());
  }

  // Delete item button

  $(".show-cart").on("click", ".delete-item", function (event) {
    let id = $(this).data("id");
    console.log(id);
    shoppingCart.removeItemFromCartAll(id);
    displayCart();
  });

  // -1
  $(".show-cart").on("click", ".minus-item", function (event) {
    let id = $(this).data("id");
    shoppingCart.removeItemFromCart(id);
    displayCart();
  });
  // +1
  $(".show-cart").on("click", ".plus-item", function (event) {
    let id = $(this).data("id");
    shoppingCart.addItemToCart(id);
    displayCart();
  });

  // Item count input
  $(".show-cart").on("change", ".item-count", function (event) {
    let name = $(this).data("name");
    let count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });

  displayCart();

  $("#cbPromotion").click(function () {
    $(".promise_content").toggle(this.checked);
  });
});
