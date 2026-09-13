const apiUrl = "http://localhost:3000";

// Add item
function handleFormSubmit(event){
    event.preventDefault();
    const itemDetails = {
        itemName: event.target.itemName.value,
        description: event.target.description.value,
        price: event.target.price.value,
        quantity: Number(event.target.quantity.value)
    };
    axios.post(`${apiUrl}/item/add-item`, itemDetails)
    .then((response) => {
        displayItemsOnScreen(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
    document.getElementById("itemName").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
}

// Display item on screen
function displayItemsOnScreen(itemDetails){
    const itemInfo = document.createElement("li");
    const itemText = document.createElement("div");
    itemText.classList.add("product-info");

    itemText.innerHTML = `
        <h3>${itemDetails.itemName}</h3>
        <p>
            <strong>${itemDetails.description}</strong>
            &nbsp;|&nbsp;
            ₹${itemDetails.price}
            &nbsp;|&nbsp;
            Qty:
            <span class="quantity">${itemDetails.quantity}</span>
        </p>
    `;

    itemInfo.appendChild(itemText);

    const buy1btn = document.createElement("button");
    buy1btn.appendChild(document.createTextNode("Buy 1"));

    const buy2btn = document.createElement("button");
    buy2btn.appendChild(document.createTextNode("Buy 2"));

    const buy3btn = document.createElement("button");
    buy3btn.appendChild(document.createTextNode("Buy 3"));

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "buttons";

    buttonGroup.appendChild(buy1btn);
    buttonGroup.appendChild(buy2btn);
    buttonGroup.appendChild(buy3btn);

    itemInfo.appendChild(buttonGroup);

    document.querySelector("ul").appendChild(itemInfo);

    buy1btn.addEventListener("click", () => {
        updateQuantity(itemDetails, 1, itemText);
    });
    buy2btn.addEventListener("click", () => {
        updateQuantity(itemDetails, 2, itemText);
    });
    buy3btn.addEventListener("click", () => {
        updateQuantity(itemDetails, 3, itemText);
    });
}

// Update quantity
function updateQuantity(itemDetails, amount, itemText){
    if(itemDetails.quantity < amount){
        alert("Not enough quantity available. Contact the shopkeeper!");
        return;
    }
    const newQuantity = itemDetails.quantity - amount;

    const updatedItem = {
        quantity: newQuantity
    };

    axios.put(
        `${apiUrl}/item/update-quantity/${itemDetails.id}`,
        updatedItem
    )
    .then((response) => {
        itemDetails.quantity = response.data.quantity;
        itemText.querySelector(".quantity").textContent =
            itemDetails.quantity;
    })
    .catch((error) => {
        console.log(error);
    });
}

// When page loads, display all items
window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(`${apiUrl}/item/get-items`)
        .then((res) => {
            res.data.forEach((item) => {
                displayItemsOnScreen(item);
            });
        })
        .catch((error) => {
            console.log(error);
        });
});