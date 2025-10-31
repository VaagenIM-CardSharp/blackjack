// Deck management functions
// - Create and shuffle deck
// - Draw cards from deck

function createDeck() {
    const deck = []
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    const suits = ["♣️", "♥️", "♦️", "♠️"]

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ rank, suit })
        }
    }
    return deck
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck
}




export { createDeck, shuffleDeck }