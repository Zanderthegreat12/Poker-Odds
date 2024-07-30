const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
const SUITS = ["S", "H", "C", "D"]

function toValue(card) {
    switch (card.rank) {
        case "T":
            return 10
        case "J":
            return 11
        case "Q":
            return 12
        case "K":
            return 13
        case "A":
            return 14
        default:
            return +card.rank
    }
}

// parses a card string of the form "7D" and returns a new card
function parseCard(cardString) {
    const rank = cardString.charAt(0)
    const suit = cardString.charAt(1)
    return { rank, suit }
}

function stringifyCard(card) {
    return card.rank + card.suit
}