// card draw 
let cards = []   
let sum = 0

// dealer hand
let dealerCards = []
let dealerSum = 0
let dealerTurn = false

// player state variables
let hasBlackJack = false
let isPlaying = false


// updates the html elements. 
function displayElements(changedElement) {
    // HTML elements we need to use
    // Player elements
    let cardsEl = document.getElementById("cards-el")
    let sumEl = document.getElementById("sum-el")
    let messageEl = document.getElementById("message-el")
    // Dealer elements
    let dealerCardsEl = document.getElementById("dealer-cards-el")
    let dealerSumEl = document.getElementById("dealer-sum-el")


    if (changedElement === "cards-el") {
        cardsEl.textContent = "Cards:"
        // iterate through cards array and display the values predictably. 
        for (let i = 0; i < cards.length; i++) {
            cardsEl.textContent += " " + cards[i]            
        }
    }
    else if (changedElement === "sum-el") {
        // calculate the sum of the player score.
        sum = 0
        for (let i = 0; i < cards.length; i++) {            
            sum += cards[i]
        }        
        sumEl.textContent = "sum: " + sum
    }
    else if (changedElement === "message-el") {
        // conditionals for the game.
        // game over messages 
        console.log("Player score is: " + sum)
        console.log("Dealer score is: " + dealerSum)
        if (sum === 21 && dealerSum === 21) {
            message = "Game ends in a draw."
            isPlaying = false
        }
        else if (sum === 21) {
            message = "Player has Blackjack!"
            stay()
            isPlaying = false
        }
        else if (dealerSum === 21) {
            message = "Dealer has Blackjack!"
            isPlaying = false
        }
        else if (sum > 21) {
            message = "You have busted!"
            isPlaying = false
        }
        else if (dealerSum > 21) {
            message = "Dealer has busted. You win!"
            isPlaying = false
        }
        else if (isPlaying === false && dealerSum > sum) {
            message = "Dealer wins!"
            isPlaying = false
        }        
        else if (isPlaying === false && sum > dealerSum) {
            message = "Player wins!"
            isPlaying = false
        }
        else if (isPlaying === false && sum === dealerSum) {
            message = "Game is tied."
            isPlaying = false
        }
        else if (isPlaying === true && sum < 21) {
            message = "Would you like to hit?"
        }
        else {
            message = "other condition..."
        }
        messageEl.textContent = message
    }             
    else if (changedElement == "dealer-cards-el") {
        dealerCardsEl.textContent = "cards: "
        // iterate through dealerCards array and display the values predictably. 
        console.log("updating the dealer hand " + dealerCards)
        for (let i = 0; i < dealerCards.length; i++) {
            dealerCardsEl.textContent += " " + dealerCards[i]            
        }
    }
    else if (changedElement == "dealer-sum-el") {
        // calculate the sum of the dealer score.
        dealerSum = 0        
        for (let i = 0; i < dealerCards.length; i++) {            
            dealerSum += dealerCards[i]
        }        
        dealerSumEl.textContent = "sum: " + dealerSum
    }
}

// converts score if score goes over 21 for the player or dealer
function wildAce () {
    // checking the player's hand for aces at value 11.
    console.log("checking to see if an ace can be converted from 11 to 1.")
    if (sum > 21) {
        console.log("Checking player hand (sum of player hand > 21).")
        for (let i = 0; i < cards.length; i++) {
            if (cards[i] === 11) {
                console.log("Found card at position " + i + " converting card value.")
                console.log(cards[i])
                cards[i] = 1
                console.log(cards[i])
                // only want to change one ace at a time. 
                break;
            }
        }
    }
    // checking the dealer's hand for aces at value 11. 
    if (dealerSum >21) {
        console.log("Checking dealer's hand (sum of dealer hand > 21.")
        for (let i = 0; i < dealerCards.length; i++) {
            if (dealerCards[i] === 11) {
                console.log("Found card at position " + i + " converting card value.")
                console.log(dealerCards[i])
                dealerCards[i] = 1
                console.log(dealerCards[i])
                // only wnat to change one ace at a time. 
                break;
            }
        }
    }
}


// gets a random card value. 
function getRandomCard() {
  console.log("getRandomCard() has been called!")
  // this is the possibilities of the card values not including wild aces. 
  const cardPossibilities = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  // return a random element. 
  let newCard = cardPossibilities[Math.floor(Math.random()*cardPossibilities.length)];
  console.log("getRandomCard() draws a " + newCard)  
  return newCard
}


// draw a new card. 
function newCard() {
    console.log("newCard() has been called. isPlaying = " + isPlaying)
    // prevents card draw when game not running.
    if (isPlaying === true) {
        // controls which hand gets dealt a card. 
        if (dealerTurn === false) {
            console.log("newCard() has been called for player.")
            cards.push(getRandomCard())    
            displayElements("cards-el")
            displayElements("sum-el")
            wildAce()
            displayElements("cards-el")
            displayElements("sum-el")
            displayElements("message-el")
        }
        // draw a card for the dealer
        else if (dealerTurn === true) {
            console.log("newCard() has been called for dealer.")
            dealerCards.push(getRandomCard())              
        }
        else {
            console.log("THIS SHOULD NOT HAPPEN!")
        }
    }    
}


// Controls what happens after a player stays. Dealer actions etc.
function stay() {
    console.log("stay() has been called.")
    if (isPlaying === true) {     // && hasBlackJack === false
        console.log("isPlaying = true. Starting dealer turn.")        
        // start dealer turn.
        dealerTurn = true               
        displayElements("dealer-cards-el")
        displayElements("dealer-sum-el")
        // logic for dealer hits.
        while (dealerSum < 17) {
            newCard()
            displayElements("dealer-cards-el")
            displayElements("dealer-sum-el")
            wildAce()
            displayElements("dealer-cards-el")
            displayElements("dealer-sum-el")
        }
        isPlaying = false
        displayElements("message-el")
        console.log("ending game.")

    }    
}


// This is used for checking if the dealer has blackjack at the beginning of the game. 
function dealerBlackjack() {
    dealerSum = 0        
    for (let i = 0; i < dealerCards.length; i++) {            
        dealerSum += dealerCards[i]
    }
    if (dealerSum === 21) {
        isPlaying = false
        displayElements("dealer-cards-el")
        displayElements("dealer-sum-el")
        displayElements("message-el")
        console.log("Dealer has blackjack.")
    }
    else{
        console.log("Dealer does not have blackjack.")
    }
}


// Starts the game.
function startGame() {    
    console.log("startGame() called!")
    isPlaying = true
    // display cards in html. 
    dealerCards = []
    dealerSum = 0
    // set dealer turn to true to draw one card for showing player what dealer cards should be. 
    dealerTurn = true
    newCard()
    displayElements("dealer-cards-el")
    displayElements("dealer-sum-el")
    newCard()
    console.log("dealer cards are: " + dealerCards)    
    dealerTurn = false    
    cards = []
    sum = 0     
    newCard()
    console.log("After Drawing 1 newCard() the card array = " + cards)
    newCard()
    console.log("After Drawing 2 newCard() the card array = " + cards)    
    displayElements("cards-el")    
    displayElements("sum-el")
    displayElements("message-el")       
    dealerBlackjack()
    console.log("Is player still in the game: " + isPlaying)
}