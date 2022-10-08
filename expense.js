const form = document.getElementById("form");
const categoryInput = document.getElementById("options");
const amountInput = document.getElementById("amt");
const descriptionInput = document.getElementById("des");
const editCategoryInput = document.getElementById("edit_options");
const edit_amount = document.getElementById("edit_amount");
const edit_description = document.getElementById("edit_description");

const listItem = document.getElementById("expense");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const editBtn = document.querySelector(".edit");



let data = [];
getData();
showOnScreen();
let id = ""
function getData() {
    data = JSON.parse(localStorage.getItem("data"))
}

form.addEventListener('submit', onsubmit);
function onsubmit(e) {
    e.preventDefault();
    const category = categoryInput.value;
    const amount = amountInput.value;
    const description = descriptionInput.value;

    // creat an object
    let expense = {
        id: new Date().toISOString(),
        category: category,
        amount: amount,
        description: description
    };

    // store in local storage 
    let getDataFromLocalStrorage = JSON.parse(localStorage.getItem("data"))
    if (getDataFromLocalStrorage) {
        localStorage.setItem("data", JSON.stringify([...getDataFromLocalStrorage, expense]))
        getData()
    } else {
        localStorage.setItem("data", JSON.stringify([expense]))
        getData()
    }
    showOnScreen();
}

function showOnScreen() {
    let htm = "";
    data?.map(elem => {
        htm += `<li> ${elem.category} :${elem.amount} : ${elem.description} 
        <button id="delete_listItem" data_id= ${elem?.id}  class = "listli"> delete </button>
        <button id="edit_listItem" data_id= ${elem?.id} class = "listli">Edit </button>
        </li>`
    })
    listItem.innerHTML = htm;
};

// handle edit delete

listItem.addEventListener("click", function (e) {
    e.preventDefault();

    const button_role = e.target.id;
    const getId = e.target.getAttribute("data_id");
    id = getId
    if (button_role === "delete_listItem") {
        const newData = data?.filter(elem => elem.id !== getId);
        data = newData;
        localStorage.setItem("data", JSON.stringify(newData))
        getData();
        showOnScreen();
    }

    if (button_role === "edit_listItem") {
        openModal();
        const item = data?.find(elem => elem.id === getId);
        const { category, amount, description } = item || {}
        editCategoryInput.value = category;
        edit_amount.value = amount;
        edit_description.value = description;
        // const removeItem = data?.filter(elem => elem.id !== getId)
        // const updatedData = {
        //     ...item,

        // }
        // editCategoryInput.value = ""
    }

});

overlay.addEventListener("click", function () {
    closeModal()
});

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

editBtn.addEventListener("click", function () {
    const inputVal = editCategoryInput.value;
    const amountVal = edit_amount.value;
    const descriptionVal = edit_description.value;
    const item = data?.find(elem => elem.id === id);
    const updatedItem = {
        ...item,
        category: inputVal,
        amount: amountVal,
        description: descriptionVal
    }
    const filteredItem = data?.filter(elem => elem.id !== id)
    data = [...filteredItem, updatedItem];
    localStorage.setItem("data", JSON.stringify(data))
    getData()
    editCategoryInput.value = ""
    edit_amount.value = ""
    edit_description.value = ""
    closeModal()
    showOnScreen()
});