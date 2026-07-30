function handleFormSubmit(event){
    event.preventDefault();
    const itemDetails = {
        itemName: event.target.itemName.value,
        description: event.target.description.value,
        price: event.target.price.value,
        quantity: Number(event.target.quantity.value)
    };

    axios.post("https://crudcrud.com/api/039aaaea6b4d4d4bb84b088898f4c3a0/itemData", 
        itemDetails
    )
    .then((response)=> displayItemsOnScreen(response.data))
    .catch((error)=> console.log(error));

    document.getElementById("itemName").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
}

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
    itemInfo.appendChild(itemText);

    const buy1btn = document.createElement("button");
    buy1btn.appendChild(document.createTextNode("Buy 1"));
    itemInfo.appendChild(buy1btn);

    const buy2btn = document.createElement("button");
    buy2btn.appendChild(document.createTextNode("Buy 2"));
    itemInfo.appendChild(buy2btn);

    const buy3btn = document.createElement("button");
    buy3btn.appendChild(document.createTextNode("Buy 3"));
    itemInfo.appendChild(buy3btn);

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "buttons";

    buttonGroup.appendChild(buy1btn);
    buttonGroup.appendChild(buy2btn);
    buttonGroup.appendChild(buy3btn);

    itemInfo.appendChild(buttonGroup);

    document.querySelector("ul").appendChild(itemInfo);

    buy1btn.addEventListener("click", ()=>{
        updateQuantity(itemDetails, 1, itemText);
    })

    buy2btn.addEventListener("click", ()=>{
        updateQuantity(itemDetails, 2, itemText);
    })

    buy3btn.addEventListener("click", ()=>{
        updateQuantity(itemDetails, 3, itemText);
    })
}

function updateQuantity(itemDetails, amount, itemText){
    if(itemDetails.quantity < amount){
        alert("Not enough quantity available. Contact the shopkeeper!");
        return;
    }

    const updatedItem = {
        itemName: itemDetails.itemName,
        description: itemDetails.description,
        price: itemDetails.price,
        quantity: itemDetails.quantity - amount
    };

    axios
    .put(`https://crudcrud.com/api/039aaaea6b4d4d4bb84b088898f4c3a0/itemData/${itemDetails._id}`, 
        updatedItem
    )
    .then(() => {
    itemDetails.quantity -= amount;

    itemText.querySelector(".quantity").textContent = itemDetails.quantity;
    })
    .catch((error)=>{
        console.log(error);
    });
}

window.addEventListener("DOMContentLoaded", ()=>{
    axios
    .get("https://crudcrud.com/api/039aaaea6b4d4d4bb84b088898f4c3a0/itemData")
    .then((res)=>{
        res.data.forEach((user)=>{
            displayItemsOnScreen(user);
        })
    })
    .catch((error)=> console.log(error));
})