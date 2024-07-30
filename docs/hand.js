// invariant: hand is an array of 5 non-repeating cards from a valid 52 card deck
class Hand {
    constructor(cards) {
        if (cards.length !== 5) {
            throw new Error("Hand must be of length 5.")
        }

        this.cards = JSON.parse(JSON.stringify(cards))
        this.cards.sort((card1, card2) => toValue(card1) - toValue(card2))

        // invariant: 0 and 1 index will never have value
        this.ranks = Array(15).fill(0)
        cards.forEach(card => this.ranks[toValue(card)]++)
    }

    getCards() {
        return this.cards;
    }

    getHighCard() {
        return this.cards[this.cards.length - 1]
    }

    isStraightFlush() {
        return this.isStraight() && this.isFlush()
    }

    isFourKind() {
        return this.ranks.some(count => count === 4)
    }

    isFullHouse() {
        return this.hasThreeKind() && this.hasPair()
    }

    isFlush() {
        const suit = this.cards[0].suit;
        return this.cards.every(card => card.suit === suit)
    }

    isStraight() {
        let prev = toValue(this.cards[0])

        for (let i = 1; i < this.cards.length; i++) {
            let curr = toValue(this.cards[i])
            // ace low special case
            if (prev == 5 && curr == 14) {
                return true
            }
            if (prev != curr - 1) {
                return false
            }
            prev = curr
        }

        return true
    }

    hasThreeKind() {
        return this.ranks.some(count => count === 3)
    }

    hasTwoPair() {
        return this.ranks.filter(num => num === 2).length === 2
    }

    hasPair() {
        return this.ranks.some(count => count === 2)
    }

    score() {
        if (this.isStraightFlush()) {
            return 9
        } else if (this.isFourKind()) {
            return 8
        } else if (this.isFullHouse()) {
            return 7
        } else if (this.isFlush()) {
            return 6
        } else if (this.isStraight()) {
            return 5
        } else if (this.hasThreeKind()) {
            return 4
        } else if (this.hasTwoPair()) {
            return 3
        } else if (this.hasPair()) {
            return 2
        } else {
            return 1
        }
    }

    compareStraightFlush(that) {
        let score1 = toValue(this.getHighCard())
        let score2 = toValue(that.getHighCard())

        // A2345 case
        if (score1 === 14 && this.ranks[1] !== 0) {
            score1 = 5
        }

        // A2345 case
        if (score2 === 14 && that.ranks[1] != 0) {
            score2 = 5
        }

        return score1 - score2
    }

    compareFourKind(that) {
        const rank1 = this.ranks.indexOf(4)
        const rank2 = that.ranks.indexOf(4)
        if (rank1 === rank2) {
            return this.ranks.indexOf(1) - that.ranks.indexOf(1)
        }
        return rank1 - rank2
    }

    compareFullHouse(that) {
        const threeKindRank1 = this.ranks.indexOf(3)
        const threeKindRank2 = that.ranks.indexOf(3)
        if (threeKindRank1 === threeKindRank2) {
            const pairRank1 = this.ranks.indexOf(2)
            const pairRank2 = that.ranks.indexOf(2)
            return pairRank1 - pairRank2
        }
        return threeKindRank1 - threeKindRank2
    }
    
    compareFlush(that) {
        for (let i = this.cards.length - 1; i >= 0; i--) {
            const thisValue = toValue(this.cards[i]);
            const thatValue = toValue(that.cards[i]);
            if (thisValue !== thatValue) {
                return thisValue - thatValue;
            }
        }
        return 0
    }

    compareStraight(that) {
        let score1 = toValue(this.getHighCard())
        let score2 = toValue(that.getHighCard())

        // A2345 case
        if (score1 === 14 && this.ranks[1] !== 0) {
            score1 = 5
        }

        // A2345 case
        if (score2 === 14 && that.ranks[1] != 0) {
            score2 = 5
        }

        return score1 - score2
    }

    compareThreeKind(that) {
        const rank1 = this.ranks.indexOf(3)
        const rank2 = that.ranks.indexOf(3)
        if (rank1 === rank2) {
            const other1 = this.cards.reduce((acc, card) => {
                if (toValue(card) !== rank1) {
                    return [...acc, card]
                }
                return acc
            }, [])
            const other2 = that.cards.reduce((acc, card) => {
                if (toValue(card) !== rank1) {
                    return [...acc, card]
                }
                return acc
            }, [])
            for (let i = other1.length - 1; i >= 0; i--) {
                const thisValue = toValue(other1[i]);
                const thatValue = toValue(other2[i]);
                if (thisValue !== thatValue) {
                    return thisValue - thatValue;
                }
            }
            return 0
        }
        return rank1 - rank2
    }

    compareTwoPair(that) {
        const rank1Low = this.ranks.indexOf(2)
        const rank1High = this.ranks.slice(rank1Low + 1).indexOf(2)
        const rank1Other = this.ranks.indexOf(1)

        const rank2Low = that.ranks.indexOf(2)
        const rank2High = that.ranks.slice(rank1Low + 1).indexOf(2)
        const rank2Other = that.ranks.indexOf(1)

        if (rank1High !== rank2High) {
            return rank1High - rank2High
        }

        if (rank1Low !== rank2Low) {
            return rank1Low - rank2Low
        }

        return rank1Other - rank2Other
    }

    comparePair(that) {
        const rank1 = this.ranks.indexOf(2)
        const rank2 = that.ranks.indexOf(2)
        if (rank1 === rank2) {
            const other1 = this.cards.reduce((acc, card) => {
                if (toValue(card) !== rank1) {
                    return [...acc, card]
                }
                return acc
            }, [])
            const other2 = that.cards.reduce((acc, card) => {
                if (toValue(card) !== rank1) {
                    return [...acc, card]
                }
                return acc
            }, [])
            for (let i = other1.length - 1; i >= 0; i--) {
                const thisValue = toValue(other1[i]);
                const thatValue = toValue(other2[i]);
                if (thisValue !== thatValue) {
                    return thisValue - thatValue;
                }
            }
            return 0
        }
        return rank1 - rank2
    }

    compareHighCard(that) {
        for (let i = this.cards.length - 1; i >= 0; i--) {
            const thisValue = toValue(this.cards[i]);
            const thatValue = toValue(that.cards[i]);
            if (thisValue !== thatValue) {
                return thisValue - thatValue;
            }
        }
        return 0
    }

    compareTo(that) {
        if (this.score() === that.score()) {
            switch (this.score()) {
                case 9:
                    return this.compareStraightFlush(that)
                case 8:
                    return this.compareFourKind(that)
                case 7:
                    return this.compareFullHouse(that)
                case 6:
                    return this.compareFlush(that)
                case 5:
                    return this.compareStraight(that)
                case 4:
                    return this.compareThreeKind(that)
                case 3:
                    return this.compareTwoPair(that)
                case 2:
                    return this.comparePair(that)
                case 1:
                    return this.compareHighCard(that)
            }
        }
        return this.score() - that.score()
    }

    static compare(a, b) {
        return a.compareTo(b)
    }

    // parses a hand string of the form "7D, TH, JC, 3H, 6S" and returns a new hand
    static parse(handString, delimeter=", ") {
        const cards = handString.split(delimeter).map(cardString => parseCard(cardString))
        return new Hand(cards)
    }
}