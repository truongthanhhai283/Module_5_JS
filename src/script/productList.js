const url = "http://localhost:5000";

const productList = document.querySelector(".main__product-list");

window.addEventListener("DOMContentLoaded", () => {
  getProductList({ page: 1, limit: 10 });
});

// render start
const renderStar = (rate) => {
  let star = ``;
  rate = parseInt(rate);
  if (Math.floor(rate) < 5) {
    for (var i = 0; i < Math.floor(rate); i++)
      star += ` <i class="fas fa-star"></i>`;

    for (var i = 0; i < 5 - Math.floor(rate); i++)
      if (i == 0) star += `<i class="fas fa-star-half-alt"></i>`;
      else star += `<i class="far fa-star"></i>`;
  }
  return star;
};

// get data  product list to API
const getProductList = async (payload) => {
  try {
    const { page, limit, softPrice, categories } = payload;
    const response = await axios({
      method: "GET",
      url: `${url}/products`,
      params: {
        ...(page && { _page: page }),
        ...(limit && { _limit: limit }),
        ...(softPrice && { _sort: "price", _order: softPrice }),
        ...(categories && { category: categories }),
      },
    });
    const data = response.data;
    console.log(data);
    renderPagination(page);
    renderProductList(data);
    $("html, body").animate({ scrollTop: 225 }, "slow");
  } catch (error) {
    return error;
  }
};

// render product list to data in API

const renderProductList = (data) => {
  productList.innerHTML = data
    .map((item, index) => {
      return `<div  class="main__productOther">
      <div  class="main__productOther-inner" data-id=${item.id}>
          <div class="main__productOther-img">
              <img src="${item.img}" alt="product">
          </div>
      <div class="main__productOther-content">
          <p class="main__productOther-content-title">${item.title}</p>
          <div class="d-flex">
              <ul class="d-flex align-items-center">
                  ${renderStar(item.star)}
              </ul>
              <span class="text-span font-italic pl-1">( ${
                item.reviews
              } đánh giá )</span>
          </div>
          <p class="text-span productOther-content-text text-clamp text-clamp--2">${
            item.description
          }</p>
          <p class="price "><span class="price-product">${item.price.toLocaleString()}</span>
          <span class="pl-1">Đ</span>
          </p>
          <div class="main__product-btn d-flex justify-content-start">
              <button class="btn btn-warning add-to-cart"
                data-name="${item.title}" 
                data-price="${item.price}" 
                data-img="${item.img}"
                data-id=${item.id}>THÊM VÀO GIỎ HÀNG</button>
              <button type="button" class="btn btn-secondary"><a href="productDetails.html">XEM CHI TIẾT</a></button>
          </div>
      </div>
      </div>
  </div>`;
    })
    .join("");
  const btnAddToCart = document.querySelectorAll(".add-to-cart");
  btnAddToCart.forEach((elment) => {
    elment.addEventListener("click", function (event) {
      event.preventDefault();
      let id = $(this).data("id");
      let name = $(this).data("name");
      let img = $(this).data("img");
      let price = Number($(this).data("price"));
      shoppingCart.addItemToCart(id, name, img, price, 1);
      toastSuccess("Thêm vào giỏ hàng thành công !");
      // $(".cart-basket").html(shoppingCart.totalItemCart());
      // let storage = localStorage.getItem("shoppingCart");
      // if (storage.includes()) {
      //   $('[data-name='" + name + "']).attr("disabled", true);
      // } else {
      //   $('.add-to-cart[data-name=" + name + "]).attr("disabled", true');
      // }
      $(".cart-basket").html(shoppingCart.totalItemCart());
    });
  });
};

// handle change value of product in cart

// handle change when click show
function handleOnchangeLimit(e) {
  let changePrice = sessionStorage.getItem("change");
  changePrice ? changePrice : "";
  let changeCategories = sessionStorage.getItem("changeCategories");

  if (e.target.value == 5) {
    getProductList({
      limit: 5,
      page: 1,
      softPrice: changePrice,
      categories: changeCategories,
    });
    let change = 5;
    sessionStorage.setItem("changeLimit", change);
  }
  if (e.target.value == 10) {
    getProductList({
      limit: 10,
      page: 1,
      softPrice: changePrice,
      categories: changeCategories,
    });
    let change = 10;
    sessionStorage.setItem("changeLimit", change);
  }
}

// handle change when click soft
function handleOnchangeSoft(e) {
  let changeLimit = parseInt(sessionStorage.getItem("changeLimit"));
  changeLimit && changeLimit;
  let changeCategories = sessionStorage.getItem("changeCategories");

  if (e.target.value == "desc") {
    getProductList({
      softPrice: "desc",
      page: 1,
      limit: changeLimit,
      categories: changeCategories,
    });
    let change = "desc";
    sessionStorage.setItem("change", change);
  }
  if (e.target.value == "asc") {
    getProductList({
      softPrice: "asc",
      page: 1,
      limit: changeLimit,
      categories: changeCategories,
    });
    let change = "asc";
    sessionStorage.setItem("change", change);
  }
  if (e.target.value == "default") {
    getProductList({
      page: 1,
      limit: changeLimit,
      categories: changeCategories,
    });
    let change = "";
    sessionStorage.setItem("change", change);
  }
}

// handle change when click categories
function handleChangeCategories(e) {
  console.log("handleChangeCategories -> e", e);
  let categories = e.target.parentElement.dataset.id;
  sessionStorage.setItem("changeCategories", categories);
  let changePrice = sessionStorage.getItem("change");
  changePrice ? changePrice : "";
  let changeLimit = parseInt(sessionStorage.getItem("changeLimit"));
  changeLimit && changeLimit;

  getProductList({
    categories: categories,
    page: 1,
    limit: changeLimit,
    softPrice: changePrice,
  });
}

// handle pagination multi level
function renderPagination(currentPage) {
  let changeCategories = sessionStorage.getItem("changeCategories");
  let changePrice = sessionStorage.getItem("change");
  changePrice ? changePrice : "";
  let changeLimit = parseInt(sessionStorage.getItem("changeLimit"));
  if (!changeLimit) {
    changeLimit = 10;
  } else {
    changeLimit = changeLimit;
  }
  let str = "";
  let data = 50;
  let pages = parseInt(data / changeLimit);

  for (let i = 1; i <= pages; i++) {
    str += `<li class="page-item${
      i === currentPage ? " active" : ""
    }"><button class="page-link" onclick="getProductList({page: ${i},limit:${changeLimit},categories:${changeCategories},softPrice:'${changePrice}'})">${i}</button></li>`;
  }

  let pagination = document.getElementById("pagination");
  pagination.innerHTML = `<ul class="pagination justify-content-end pagination-custom">
          <li onclick ="onscrollTop(event)" class="page-item${
            currentPage === 1 ? " disabled" : ""
          }"><button class="page-link" onclick="getProductList({page: ${
    currentPage - 1
  },limit:${changeLimit},categories:${changeCategories},softPrice:'${changePrice}'})">Trang trước</button></li>
          ${str}
          <li class="page-item${
            currentPage === pages ? " disabled" : ""
          }"><button class="page-link" onclick="getProductList({page:${pages},limit:${changeLimit},categories:${changeCategories},softPrice:'${changePrice}'})">Trang cuối</button></li>
      </ul>`;
}
function onscrollTop(e) {}
