import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
    databaseURL: "https://playground-9fef9-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
})

onValue(shoppingListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}


// cart 

const product = [
    {
        Id: 0,
        Image: '',
        title: 'garri',
        price: 120,
    },
    {
        id: 1,
        image: '',
        title: 'Banana',
        price: 60,
    },
    {
        id: 2,
        image: '',
        title: 'cassava',
        price: 200,
    },
    {
        id: 2,
        image: '',
        title: 'cassava',
        price: 200,
    }
];

const categories = [..new setInterval(product.map((item) +>
    { return item }))]
let i = o;
document.getElementById('root').innerHTML = Categories.map((item) => {
    var { image, title, price } = item;
    return (
        `<div class='box'>
                <div class='img-box'>
                    <img class='images' src=${image}></image>
                </div>
                <dic class = 'bottom'
                <p>${title}</p>
                <h2>$ ${price}.00</h2>` +
        "<button onclick='addtocart(" + (i++) + ")'>Add to cart</button>" +
        `</div>
                </div>`

    )
}).join('')

var cart = [];


function addtocart(a) {
    cart.push({ ...categories[a] })
    displayCart();
}

function delElemnt(a) {
    cart.splice(a, 1);
    displayCart(;)
}


function displayCart(a) {
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length == 0) {
        document.getElementById('cartItem').innerHTML = " Your cart is empty";
        document.getElementById("total").innerHTML = "$ " + 0 + ".00";
    }
    else {
        document.getElementById("cartITem").innerHTML = cart.map((items) +>
        {
            var { image, title, price } = items;
            total = total + price;
            document.getElementById("total").innerHTML = "$ " + total + ".00" 
            return(
                    `<div class='cart-item'>
                     <div class = 'row-img'>
                        <img class ='rowing' src = ${image} >
                        </div >
                        <p style = 'font-size:12px; '> ${title}</p>
                        <h2 style='font-size: 15px;'>$ ${price}.00</h2>` +
                        "<i class= 'fa-solid fa-trash' onclick = 'document("+(j++) + ")'> </i></div>"
                );
            }).join('');
        }
    }



































// const app = initializeApp(appSettings)
// const database = getDatabase(app)
// const moviesInDB = ref(database, "movies")


// /*
// Challenge:
// Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
// */

// const inputFieldEl = document.getElementById("input-field")
// const addButtonEl = document.getElementById("add-button")

// addButtonEl.addEventListener("click", function () {
//   let inputValue = inputFieldEl.value

//   push(moviesInDB, inputValue)

//   console.log(`${ inputValue } added to database`)

//   console.log(inputValue)
// })



// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// const appSettings = {
//     databaseURL: "put your reaL TIME URL here"
// }

// const app = initializeApp(appSettings)
// const database = getDatabase(app)
// const booksInDB = ref(database, "books")

// const booksEl = document.getElementById("books")

// onValue(booksInDB, function(snapshot) {
//     let booksArray = Object.values(snapshot.val())
    
//     clearBooksListEl()
    
//     // Challenge: Write a for loop where you console log each book.
//     for (let i = 0; i < booksArray.length; i++) {
//         let currentBook = booksArray[i]
        
//         // Challenge: Use the appendBookToBooksListEl() function to append book instead of console logging
//         appendBookToBooksListEl(currentBook)
//     }
// })

// function clearBooksListEl() {
//     booksEl.innerHTML = ""
// }

// function appendBookToBooksListEl(bookValue) {
//     booksEl.innerHTML += `< li > ${ bookValue }</li > `
// }