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

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
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
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
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

//   console.log(`${inputValue} added to database`)

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
//     booksEl.innerHTML += `<li>${bookValue}</li>`
// }