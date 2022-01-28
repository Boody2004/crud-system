// get input inputs
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let clear = document.getElementById("clear");
let btnDeleteAll = document.getElementById("delete-all");

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "var(--third-color)";
  } else {
    total.innerHTML = "";
    total.style.background = "var(--main-color)";
  }
}

// create product
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function () {
  if (title && price && category.value == "") {
    title.style.border = "1px solid var(--third-color)";
    price.style.border = "1px solid var(--third-color)";
    category.style.border = "1px solid var(--third-color)";
  } else {
    title.style.border = "none";
    price.style.border = "none";
    category.style.border = "none";

    let newProduct = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };

    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct.push(newProduct);
    }

    localStorage.setItem("product", JSON.stringify(dataProduct));
    clearInput();
    showData();
  }
};

// clear input
clear.onclick = function () {
  clearInput();
};

function clearInput() {
  title.style.border = "none";
  price.style.border = "none";
  category.style.border = "none";

  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// get read data
function showData() {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button class="update" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" class="delete" id="delete">Delete</button></td>
      </tr>
      `;
  }
  document.getElementById("tbody").innerHTML = table;

  if (dataProduct.length > 0) {
    btnDeleteAll.innerHTML = `
    <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>
  `;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();

// delete data
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

function deleteData(i) {
  if (confirm("Are you sure you want to delete this?")) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
  }
}
