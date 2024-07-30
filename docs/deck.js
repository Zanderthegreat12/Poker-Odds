const randfn = Math.random
// const randfn = new Math.seedrandom(48)

class Deck {
    constructor() {
        this.cards = Array(52);
        RANKS.forEach((rank, j) => {
            SUITS.forEach((suit, i) => {
                this.cards[i*13 + j] = { rank, suit }
            })
        })
        this.shuffle()
    }

    shuffle() {
        this.cards = this.cards
            .map(card => ({ card, sort: randfn() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ card }) => card)
    }

    deal(n) {
        const cards = this.cards.slice(0, n)
        this.cards = this.cards.slice(n)
        return cards
    }

    getCards() {
        return this.cards
    }

    removeCards(cardsToRemove){

        let numRemoved = 0
        let prevRemoved = 0

        for(let i = 0; i < this.cards.length; i++){
            for (let j = 0; j < cardsToRemove.length; j++){
                if (this.cards[i].rank === cardsToRemove[j].rank && this.cards[i].suit === cardsToRemove[j].suit){
                    this.cards.splice(i,1)
                    numRemoved++
                    if (numRemoved === cardsToRemove.length){
                        return
                    }
                }
            }
            if (numRemoved != prevRemoved){
                i--
                prevRemoved++
            }
        }
    }
}