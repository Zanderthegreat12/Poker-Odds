function generateStraightFlush() {
    const suit = choose(SUITS)
    const firstCard = Math.floor(Math.random() * 10)
    if (firstCard === 9) {
        const cards = [parseCard("A" + suit), parseCard("2" + suit), parseCard("3" + suit), parseCard("4" + suit), parseCard("5" + suit)]
        return new Hand(cards)
    }
    const cards = []
    for (let i = 0; i < 5; i++) {
        cards.push(parseCard(RANKS[i + firstCard] + suit))
    }
    return new Hand(cards)
}

function generateFourKind() {
    const [fourRank, oneRank] = sample(RANKS, 2)
    const oneSuit = choose(SUITS)
    cards = [
        parseCard(oneRank + oneSuit),
        parseCard(fourRank + "S"),
        parseCard(fourRank + "H"),
        parseCard(fourRank + "C"),
        parseCard(fourRank + "D")
    ]
    return new Hand(cards)
}

function generateFullHouse() {
    const [pairRank, tripRank] = sample(RANKS, 2)
    const suitsPair = sample(SUITS, 2)
    const suitsTrip = sample(SUITS, 3)
    const cards = []

    for (let i = 0; i < suitsPair.length; i++) {
        cards.push(parseCard(pairRank + suitsPair[i]))
    }

    for (let i = 0; i < suitsTrip.length; i++) {
        cards.push(parseCard(tripRank + suitsTrip[i]))
    }

    return new Hand(cards)
}

function generateFlush() {
    const ranks = sample(RANKS, 5)

    const suit = choose(SUITS)
    const cards = []
    for (let i = 0; i < ranks.length; i++) {
        cards.push(parseCard(ranks[i] + suit))
    }    
    const hand = new Hand(cards)
    if (hand.isStraightFlush()) {
        return generateFlush()
    }
    return hand
}

function generateStraight() {
    const firstCard = Math.floor(Math.random() * 10)
    if (firstCard === 9) {
        const suits = choices(SUITS, 5)
        const cards = [parseCard("A" + suits[0]), parseCard("2" + suits[1]), parseCard("3" + suits[2]), parseCard("4" + suits[3]), parseCard("5" + suits[4])]
        return new Hand(cards)
    }
    const cards = []
    for (let i = 0; i < 5; i++) {
        const suit = choose(SUITS)
        cards.push(parseCard(RANKS[i + firstCard] + suit))
    }
    const hand = new Hand(cards)
    if (hand.isStraightFlush()) {
        return generateStraight()
    }
    return hand
}

function generateThreeKind() {
    const ranks = sample(RANKS, 3)
    const tripSuits = sample(SUITS, 3)
    const singleSuit1 = choose(SUITS)
    const singleSuit2 = choose(SUITS)
    const cards = [
        parseCard(ranks[0] + tripSuits[0]),
        parseCard(ranks[0] + tripSuits[1]),
        parseCard(ranks[0] + tripSuits[2]),
        parseCard(ranks[1] + singleSuit1),
        parseCard(ranks[2] + singleSuit2)
    ]

    return new Hand(cards)
}

function generateTwoPair() {
    const [pair1Rank, pair2Rank, singleRank] = sample(RANKS, 3)
    const pair1Suits = sample(SUITS, 2)
    const pair2Suits = sample(SUITS, 2)
    const singleSuit = choose(SUITS)
    const cards = [
        parseCard(pair1Rank + pair1Suits[0]),
        parseCard(pair1Rank + pair1Suits[1]),
        parseCard(pair2Rank + pair2Suits[0]),
        parseCard(pair2Rank + pair2Suits[1]),
        parseCard(singleRank + singleSuit),
    ]

    return new Hand(cards)
}

function generatePair() {
    const [pairRank, ...rest] = sample(RANKS, 4)
    const pairSuits = sample(SUITS, 2)
    const otherSuits = choices(SUITS, 3)
    const cards = [
        parseCard(pairRank + pairSuits[0]),
        parseCard(pairRank + pairSuits[1]),
        parseCard(rest[0] + otherSuits[0]),
        parseCard(rest[1] + otherSuits[1]),
        parseCard(rest[2] + otherSuits[2]),
    ]
    return new Hand(cards)
}

function generateNothing() {
    const ranks = sample(RANKS, 5)
    const suits = choices(SUITS, 5)
    const cards = []
    for (let i = 0; i < 5; i++) {
        cards.push(parseCard(ranks[i] + suits[i]))
    }
    const hand = new Hand(cards)
    if (hand.isFlush() || hand.isStraight()) {
        return generateNothing()
    }
    return hand
}