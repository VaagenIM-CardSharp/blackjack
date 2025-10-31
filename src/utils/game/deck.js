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