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
let search = document.getElementById("search");
let btnDeleteAll = document.getElementById("delete-all");

let mood = "create";
let tmp;

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
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    count.value != "" &&
    category.value != ""
  ) {
    if (mood === "create") {
      dataProduct.push(newProduct);
    } else {
      dataProduct[tmp] = newProduct;

      mood = "create";
      submit.innerHTML = "Create";
    }

    localStorage.setItem("product", JSON.stringify(dataProduct));
    clearInput();
    showData();
  } else {
    title.style.border = "1px solid var(--third-color)";
    price.style.border = "1px solid var(--third-color)";
    count.style.border = "1px solid var(--third-color)";
    category.style.border = "1px solid var(--third-color)";
  }
};

// clear input
clear.onclick = function () {
  clearInput();
};

function clearInput() {
  title.style.border = "none";
  price.style.border = "none";
  count.style.border = "none";
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

// search data
let searchMood = "Title";

function getSearchMood(id) {
  if (id == "search-title") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }

  search.placeholder = `Search By ${searchMood}...`;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == "Title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
           <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].count}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" class="update" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" class="delete" id="delete">Delete</button></td>
          </tr>
          `;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
          <tr>
           <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].count}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" class="update" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" class="delete" id="delete">Delete</button></td>
          </tr>
          `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

// get read data
function showData() {
  getTotal();

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
        <td>${dataProduct[i].count}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" class="update" id="update">Update</button></td>
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

// update data
function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.value = dataProduct[i].count;
  category.value = dataProduct[i].category;
  submit.innerHTML = "Update";

  mood = "update";
  tmp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// delete data
function deleteAll() {
  if (confirm("Are you sure you want to delete all data?")) {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
  }
}

function deleteData(i) {
  if (confirm("Are you sure you want to delete this?")) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
  }
}
