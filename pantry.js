// script.js
document.addEventListener('DOMContentLoaded', () => {
    const pantryList = document.getElementById('pantry-list');
    const addItemButton = document.getElementById('add-item-btn');
    const searchBar = document.getElementById('search-bar');

    let pantryItems = [];

    // Function to render pantry items
    function renderPantryItems(items) {
        pantryList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - Quantity: ${item.quantity}
                <button onclick="deleteItem(${index})">Delete</button>
            `;
            pantryList.appendChild(li);
        });
    }

    // Function to add or update an item
    addItemButton.addEventListener('click', () => {
        const itemName = document.getElementById('item-name').value.trim();
        const itemQuantity = parseInt(document.getElementById('item-quantity').value);

        if (itemName && itemQuantity > 0) {
            const existingItemIndex = pantryItems.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
            if (existingItemIndex !== -1) {
                // Update existing item
                pantryItems[existingItemIndex].quantity = itemQuantity;
            } else {
                // Add new item
                pantryItems.push({ name: itemName, quantity: itemQuantity });
            }
            renderPantryItems(pantryItems);
            document.getElementById('item-name').value = '';
            document.getElementById('item-quantity').value = '';
        } else {
            alert('Please enter a valid item name and quantity.');
        }
    });

    // Function to delete an item
    window.deleteItem = function(index) {
        pantryItems.splice(index, 1);
        renderPantryItems(pantryItems);
    };

    // Function to filter items
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredItems = pantryItems.filter(item => item.name.toLowerCase().includes(searchTerm));
        renderPantryItems(filteredItems);
    });
});
