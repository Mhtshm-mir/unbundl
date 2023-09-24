const checkboxes = document.querySelectorAll('.chocolate');
const quantityInputs = document.querySelectorAll('.quantity');
const totalPriceElement = document.getElementById('totalPrice');
const selectedChocolates = {};

checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => handleCheckboxChange(checkbox, quantityInputs[index]));
});

quantityInputs.forEach((input, index) => {
    input.addEventListener('input', () => handleQuantityChange(checkboxes[index], input));
});

function handleCheckboxChange(checkbox, quantityInput) {
    const chocolateName = checkbox.value;
    const quantity = parseInt(checkbox.dataset.quantity);

    if (checkbox.checked) {
        const currentTotal = Object.values(selectedChocolates).reduce((acc, val) => acc + val, 0);
        if (currentTotal + quantity <= 8) {
            selectedChocolates[chocolateName] = quantity;
            quantityInput.style.display = 'inline'; 
        } else {
            checkbox.checked = false;
            alert("You cannot exceed 8 items in your custom pack.");
        }
    } else {
        delete selectedChocolates[chocolateName];
        quantityInput.style.display = 'none'; 
        quantityInput.value = '0'; 
    }

    updateTotalPrice();
}

function handleQuantityChange(checkbox, quantityInput) {
    const chocolateName = checkbox.value;
    let quantity = parseInt(quantityInput.value);
    
    if (quantity < 0) {
        quantity = 0;
        quantityInput.value = "0";
    } else if (quantity > 8) {
        quantity = 8;
        quantityInput.value = "8";
        alert("You cannot select more than 8 items in your custom pack.");
        return; 
    }

    selectedChocolates[chocolateName] = quantity;
    updateTotalPrice();   
}

function updateTotalPrice() {
    const totalQuantity = Object.values(selectedChocolates).reduce((acc, val) => acc + val, 0);
    if (totalQuantity > 8) {
        alert("You cannot exceed 8 items in your custom pack.");
        return;
    }
    const totalCost = Object.keys(selectedChocolates).reduce((acc, chocolate) => {
        const quantity = selectedChocolates[chocolate];
        const pricePerItem = getPrice(chocolate);
        return acc + (quantity * pricePerItem);
    }, 0);

    totalPriceElement.textContent = `$${totalCost.toFixed(2)}`;
}

function getPrice(chocolate) {
    switch (chocolate) {
        case 'Dark Chocolate':
            return 2.5;
        case 'Milk Chocolate':
            return 2.0;
        case 'White Chocolate':
            return 2.75;
        case 'Caramel Filled Chocolate':
            return 3.0;
        case 'Nuts and Caramel Chocolate':
            return 3.5;
        default:
            return 0;
    }
}

document.getElementById('chocolateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Custom pack ordered! Total Price: $' + parseFloat(totalPriceElement.textContent.slice(1)));
});