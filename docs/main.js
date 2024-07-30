const rerollList = [
    "reroll-high-card",
    "reroll-pair",
    "reroll-two-pair",
    "reroll-three-kind",
    "reroll-straight",
    "reroll-flush",
    "reroll-full-house",
    "reroll-four-kind",
    "reroll-straight-flush",
]

const exampleList = [
    "example-high-card",
    "example-pair",
    "example-two-pair",
    "example-three-kind",
    "example-straight",
    "example-flush",
    "example-full-house",
    "example-four-kind",
    "example-straight-flush"
]

const fnList = [
    generateNothing,
    generatePair,
    generateTwoPair,
    generateThreeKind,
    generateStraight,
    generateFlush,
    generateFullHouse,
    generateFourKind,
    generateStraightFlush,
]

let holeCards
let communityCards
let otherCards
let vis2Results
let vis2OddsTimeSeries
let odds1

let holeCards2
let communityCards2
let otherCards2
let odds3

init()


// called once on page load
function init() {
    // init hand types
    CreateButtonListeners(rerollList, exampleList, fnList)

    StartVisOneTwo(fnList, 0)
    CreateStaticBarVis("static-vis1", [0.221, 0.524, 0.485, 0.67, 0.713, 0.74, 0.752, 0.912])
    CreateStaticDualBarVis("static-vis2", [[0.582, 0.566], [0.684, 0.779], [0.686, 0.889], [0.76, 0.875], [0.821, 0.926], [0.847, 0.954], [0.999, 0.999], [0.989, 0.999]])
    StartVisThree()
    
    const yesButton1 = document.getElementById("input-yes-1")
    const noButton1 = document.getElementById("input-no-1")
    const newGameButton1 = document.getElementById("input-new-1")
    const results1 = document.getElementById("results-1")
    function GuessHandler1(guess) {
        UpdateShowBarVis("vis1", "results-container-1", odds1)
        const didWin1 = odds1[0] > (odds1[1] + odds1[2])
        if (didWin1 === guess) {
            results1.textContent = `Congrats! Think about why you got it right. Did you guess correctly,
                or did you figure it out some other way? Either way, feel free to explore the visualizations
                below to get a better understanding.`
        } else {
            results1.textContent = `Nice try, but sometimes the cards can be deceiving. Check out the
                visualizations below to get a better understanding.`
        }
    }
    yesButton1.addEventListener("click", _ => GuessHandler1(true))
    noButton1.addEventListener("click", _ => GuessHandler1(false))

    const specialGamesContainer1 = document.getElementById("special-games-1")
    specialGamesContainer1.classList.add("hidden")
    newGameButton1.addEventListener("click", _ => {
        specialGamesContainer1.classList.toggle("hidden")
    })

    //Adding the extra buttons for Viz 1
    const HighButton1 = document.getElementById("high-card-game-1")
    const PairButton1 = document.getElementById("pair-game-1")
    const TwoPairButton1 = document.getElementById("two-pair-game-1")
    const ThreeKindButton1 = document.getElementById("three-of-a-kind-game-1")
    const StraightButton1 = document.getElementById("straight-game-1")
    const FlushButton1 = document.getElementById("flush-game-1")
    const FullHouseButton1 = document.getElementById("full-house-game-1")
    const FourKindButton1 = document.getElementById("four-of-a-kind-game-1")
    const StraightFlushButton1 = document.getElementById("straight-flush-game-1")

    HighButton1.addEventListener("click", _ => StartVisOneTwo(fnList, 1))
    PairButton1.addEventListener("click", _ => StartVisOneTwo(fnList, 2))
    TwoPairButton1.addEventListener("click", _ => StartVisOneTwo(fnList, 3))
    ThreeKindButton1.addEventListener("click", _ => StartVisOneTwo(fnList, 4))
    StraightButton1.addEventListener("click", _ => StartVisOneTwo(fnList, 5))
    FlushButton1.addEventListener("click", _ => StartVisOneTwo(fnList, 6))
    FullHouseButton1.addEventListener("click", _ => StartVisOneTwo(fnList, 7))
    FourKindButton1.addEventListener("click", _ => StartVisOneTwo(fnList, 8))
    StraightFlushButton1.addEventListener("click", _ => StartVisOneTwo(fnList, 9))


    const nextHandButton = document.getElementById("input-next-2")
    const nextTenButton = document.getElementById("input-next-ten-2")
    const newGameButton2 = document.getElementById("input-new-2")
    nextHandButton.addEventListener("click", NextHand)
    nextTenButton.addEventListener("click", _ => {
        for (let i = 0; i < 10; i++) {
            NextHand()
        }
    })

    const specialGamesContainer2 = document.getElementById("special-games-2")
    specialGamesContainer2.classList.add("hidden")
    newGameButton2.addEventListener("click", _ => {
        specialGamesContainer2.classList.toggle("hidden")
    })

    //Adding the extra buttons for Viz 2
    const HighButton2 = document.getElementById("high-card-game-2")
    const PairButton2 = document.getElementById("pair-game-2")
    const TwoPairButton2 = document.getElementById("two-pair-game-2")
    const ThreeKindButton2 = document.getElementById("three-of-a-kind-game-2")
    const StraightButton2 = document.getElementById("straight-game-2")
    const FlushButton2 = document.getElementById("flush-game-2")
    const FullHouseButton2 = document.getElementById("full-house-game-2")
    const FourKindButton2 = document.getElementById("four-of-a-kind-game-2")
    const StraightFlushButton2 = document.getElementById("straight-flush-game-2")
   
    HighButton2.addEventListener("click", _ => StartVisOneTwo(fnList, 1))
    PairButton2.addEventListener("click", _ => StartVisOneTwo(fnList, 2))
    TwoPairButton2.addEventListener("click", _ => StartVisOneTwo(fnList, 3))
    ThreeKindButton2.addEventListener("click", _ => StartVisOneTwo(fnList, 4))
    StraightButton2.addEventListener("click", _ => StartVisOneTwo(fnList, 5))
    FlushButton2.addEventListener("click", _ => StartVisOneTwo(fnList, 6))
    FullHouseButton2.addEventListener("click", _ => StartVisOneTwo(fnList, 7))
    FourKindButton2.addEventListener("click", _ => StartVisOneTwo(fnList, 8))
    StraightFlushButton2.addEventListener("click", _ => StartVisOneTwo(fnList, 9))

    const yesButton3 = document.getElementById("input-yes-3")
    const noButton3 = document.getElementById("input-no-3")
    const newGameButton3 = document.getElementById("input-new-3")
    const results3 = document.getElementById("results-3")
    function GuessHandler3(guess) {
        UpdateShowBarVis("vis3", "results-container-3", odds3)
        const didWin3 = odds3[0] > (odds3[1] + odds3[2])
        if (didWin3 === guess) {
            results3.textContent = `Congrats! After exploring some games with the practice cards, do you
                feel more confident about your assessment?`
        } else {
            results3.textContent = `Nice try, even after getting a feel for things, there are still 990
                possibilites to consider.`
        }
    }
    yesButton3.addEventListener("click", _ => GuessHandler3(true))
    noButton3.addEventListener("click", _ => GuessHandler3(false))
    newGameButton3.addEventListener("click", _=> StartVisThree())
}

// add event listeners for intro reroll buttons
function CreateButtonListeners(rerollList, exampleList, fnList){
    for (let i = 0; i < rerollList.length; i++) {
        document.getElementById(rerollList[i]).addEventListener("click", e => {
            const hand = fnList[i]()
            const cardImgs = document.getElementById(exampleList[i]).querySelectorAll("img.card")
            cardImgs.forEach((img, i) => {
                img.src = "cards/" + stringifyCard(hand.getCards()[i]) + ".svg"
            })
        })
    }
}

function StartVisOneTwo(fnList, val) {
    
    if (val === 0){
        const deck = new Deck()
        holeCards = deck.deal(2)
        communityCards = deck.deal(5)
        otherCards = deck.getCards()
    } else {
        let game = GenerateSpecialGame(fnList,val)
        holeCards = game[0]
        communityCards = game[1]
        otherCards = game[2]
    }


    odds1 = odds(holeCards, communityCards, otherCards)

    DisplayCards("comm-container-1", communityCards)
    DisplayCards("hole-container-1", holeCards)
    document.getElementById("results-container-1").classList.add("hidden")
    CreateBarVis("vis1")
    
    const opponentHoleCards = sample(otherCards, 2)
    DisplayCards("comm-container-2", communityCards)
    DisplayCards("hole-container-2", holeCards)
    DisplayCards("opp-hole-container-2", opponentHoleCards)
    document.getElementById("results-container-2").classList.add("hidden")
    vis2Results = [0, 0, 0]
    vis2OddsTimeSeries = []
    CreateLineVis("vis2")
}

function StartVisThree() {
    const deck = new Deck()
    holeCards2 = deck.deal(2)
    communityCards2 = deck.deal(5)
    otherCards2 = deck.getCards()
    odds3 = odds(holeCards2, communityCards2, otherCards2)

    DisplayCards("comm-container-3", communityCards2)
    DisplayCards("hole-container-3", holeCards2)
    document.getElementById("results-container-3").classList.add("hidden")

    CreateBarVis("vis3")
}

function GenerateSpecialGame(fnList, scoreVal){
    let KeyHand = fnList[scoreVal-1]()
    let KeyCards = KeyHand.cards
    let deck = new Deck()

    deck.removeCards(KeyCards);
    let extraCards = deck.deal(2)

    KeyCards.splice(Math.floor(Math.random() * 5), 0 , extraCards[0])
    KeyCards.splice(Math.floor(Math.random() * 6), 0 , extraCards[1])

    let holeCards3 = KeyCards.splice(0,2)
    let communityCards3 = KeyCards

    if (bestHand([...holeCards3, ...communityCards3]).score() !== scoreVal){
        return GenerateSpecialGame(fnList, scoreVal)
    }

    return [holeCards3, communityCards3, deck.getCards()]
}


function NextHand() {
    // generate new hole cards
    const newHoleCards = sample(otherCards, 2)

    // display hole cards
    const oppHoleContainer = document.getElementById("opp-hole-container-2")
    const oldHoleCards = oppHoleContainer.querySelectorAll(".card")

    for (let i = 0; i < newHoleCards.length; i ++) {
        if (oldHoleCards) {
            oldHoleCards[i].src = "cards/" + newHoleCards[i].rank + newHoleCards[i].suit + ".svg"
        } else {
            const img = document.createElement("img")
            img.classList.add("card")
            img.src = "cards/" + opponentCards[i].rank + opponentCards[i].suit + ".svg"
            hcont3.append(img)
            if (i !== holeCards.length - 1) {
                hcont3.append("\u00A0")
            }
        }
    }

    // calculate results
    const playerBestHand = bestHand([...holeCards, ...communityCards])
    const oppBestHand = bestHand([...newHoleCards, ...communityCards])
    const outcome = playerBestHand.compareTo(oppBestHand)

    if (outcome > 0) {
        vis2Results[0]++
    } else if (outcome === 0) {
        vis2Results[1]++
    } else {
        vis2Results[2]++
    }

    if(vis2OddsTimeSeries.length === 0){
        vis2OddsTimeSeries.push(vis2Results[0] / (vis2Results.reduce((acc, a) => acc + a, 0)))
    }

    vis2OddsTimeSeries.push(vis2Results[0] / (vis2Results.reduce((acc, a) => acc + a, 0)))

    // update vis accordingly
    UpdateShowLineVis("vis2", "results-container-2", vis2OddsTimeSeries)
    // UpdateShowLineVis("vis2", "results-container-2", [0.1, 0.4, 0.3, 0.8, 0.9])

    // update title
    const title = document.getElementById("results-title-2")
    title.textContent = `Results (${vis2Results.reduce((acc, a) => acc + a, 0)} Game(s) Played)`
}

function DisplayCards(displayId, cards) {
    const display = document.getElementById(displayId)
    const oldCards = display.querySelectorAll(".card")
    
    for (let i = 0; i < cards.length; i ++) {
        if (oldCards.length > 0) {
            oldCards[i].src = "cards/" + cards[i].rank + cards[i].suit + ".svg"
        } else {
            const img = document.createElement("img")
            img.classList.add("card")
            img.src = "cards/" + cards[i].rank + cards[i].suit + ".svg"
            display.append(img)
            if (i !== cards.length - 1) {
                display.append("\u00A0")
            }
        }
    }
}

/**
 * @param visId string of corresponding svg
 */
function CreateBarVis(visId) {
    // destroy any previous vis
    document.getElementById(visId).innerHTML = ""

    const vis = d3.select(`#${visId}`)
    const odds = [0, 0, 0] // init odds to 0, update with UpdateVis method

    const width = +vis.attr("width") - 50;
    const height = +vis.attr("height") - 30;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
        .domain(odds.map((_, i) => i))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(odds)])
        .range([innerHeight, 0]);

    const bars = vis.append("g")
        .attr("class", "bars")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    bars.selectAll(".bar")
        .data(odds)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (_, i) => xScale(i))
            .attr("y", d => yScale(d))
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d))
            .attr("fill", "#d40000")

    // Add text labels
    const labels = ["Wins", "Ties", "Losses"]
    bars.selectAll(".bar-label")
        .data(odds)
        .enter().append("text")
            .attr("class", "bar-label")
            .attr("x", (_, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr("y", innerHeight + 20)
            .attr("text-anchor", "middle")
            .text((_, i) => labels[i])

    // y-axis
    vis.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(yScale))
}

function UpdateBarVis(visId, results) {
    const vis = d3.select(`#${visId}`)

    const height = +vis.attr("height") - 30;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerHeight = height - margin.top - margin.bottom;

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(results)])
        .range([innerHeight, 0])

    const bars = vis.select(".bars")

    bars.selectAll(".bar")
        .data(results)
        .attr("y", d => yScale(d))
        .attr("height", d => innerHeight - yScale(d))

    const yAxis = vis.select(".y-axis")
    
    yAxis.call(d3.axisLeft(yScale))
}

function UpdateShowBarVis(visId, resultsId, results) {
    UpdateBarVis(visId, results)
    document.getElementById(resultsId).classList.remove("hidden")
}

function CreateStaticBarVis(visId, data) {
    // destroy any previous vis
    document.getElementById(visId).innerHTML = ""

    const vis = d3.select(`#${visId}`)

    const width = +vis.attr("width");
    const height = +vis.attr("height");
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
        .domain(data.map((_, i) => i))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([innerHeight, 0]);

    const bars = vis.append("g")
        .attr("class", "bars")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    bars.selectAll(".bar")
        .data(data)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (_, i) => xScale(i))
            .attr("y", d => yScale(d))
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d))
            .attr("fill", "#d40000")

    // Add text labels
    const labels = ["Pair", "Two Pair", "Three of a Kind", "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush"]
    bars.selectAll(".bar-label")
        .data(data)
        .enter().append("text")
            .attr("class", "bar-label")
            .attr("x", (_, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr("y", innerHeight + 20)
            .attr("text-anchor", "middle")
            .text((_, i) => labels[i])
            .style("font-size", "0.8em")

    // y-axis
    vis.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(yScale))
}

function CreateStaticDualBarVis(visId, data) {
    // destroy any previous vis
    document.getElementById(visId).innerHTML = ""

    const vis = d3.select(`#${visId}`)

    const width = +vis.attr("width");
    const height = +vis.attr("height");
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
        .domain(data.map((_, i) => i))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([innerHeight, 0]);

    const bars1 = vis.append("g")
        .attr("class", "bars1")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const bars2 = vis.append("g")
        .attr("class", "bars2")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const barLabels = vis.append("g")
        .attr("class", "bar-labels")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    bars1.selectAll(".bar")
        .data(data)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (_, i) => xScale(i))
            .attr("y", d => yScale(d[0]))
            .attr("width", xScale.bandwidth() / 2)
            .attr("height", d => innerHeight - yScale(d[0]))
            .attr("fill", "#d40000")

    bars2.selectAll(".bar")
        .data(data)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (_, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d[1]))
            .attr("width", xScale.bandwidth() / 2)
            .attr("height", d => innerHeight - yScale(d[1]))
            .attr("fill", "#000000")

    // Add text labels
    const labels = ["Pair", "Two Pair", "Three of a Kind", "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush"]
    barLabels.selectAll(".bar-label")
        .data(data)
        .enter().append("text")
            .attr("class", "bar-label")
            .attr("x", (_, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr("y", innerHeight + 20)
            .attr("text-anchor", "middle")
            .text((_, i) => labels[i])
            .style("font-size", "0.8em")

    // y-axis
    vis.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(yScale))

    // legend
    const legend = vis.append("g")
        .attr("class", "legend")
    
    legend.selectAll("circle")
        .data(["#d40000", "#000000"])
        .enter().append("circle")
            .attr("cx", margin.left + 15)
            .attr("cy", (_, i) => margin.top + 10 + 20*i)
            .attr("r", 8)
            .attr("fill", d => d)
    
    legend.selectAll("text")
        .data(["1 Hole Card", "2 Hole Cards"])
        .enter().append("text")
            .attr("x", margin.left + 28)
            .attr("y", (_, i) => margin.top + 14.5 + 20*i)
            .style("font-size", "0.8em")
            .text(d => d)
}

function CreateLineVis(visId) {
    // destroy any previous vis
    document.getElementById(visId).innerHTML = ""

    const vis = d3.select(`#${visId}`)

    const width = +vis.attr("width") - 50;
    const height = +vis.attr("height") - 30;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, innerWidth])

    const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([innerHeight, 0])

    vis.append("path")
        .attr("class", "actual")
        .attr("fill", "none")
        .attr("stroke", "#d40000")
        .attr("stroke-width", 2)

    vis.append("path")
        .attr("class", "expected")
        .attr("fill", "none")
        .attr("stroke", "#000000")
        .attr("stroke-width", 1.5)
        .style("stroke-dasharray", ("3, 3"))

    const ypos = odds1[0] / (odds1.reduce((acc, a) => acc + a, 0))
    vis.append("text")
        .text(Math.round(ypos * 1000) / 10 + "%")
        .attr("x", margin.left + width - 50)
        .attr("y", margin.top + yScale(ypos) + 5)
        .style("font-size", "16px")

    // x-axis
    vis.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(${margin.left}, ${innerHeight + margin.top})`)
        .call(d3.axisBottom(xScale))

    // y-axis
    vis.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(yScale))

        // Add text labels
    vis.append("text")
        .attr("class", "line-label")
        .attr("x", margin.left + innerWidth / 2)
        .attr("y", innerHeight + 60)
        .attr("text-anchor", "middle")
        .text("Win Percent / Number of Games")
}

/**
 * Updates a line vis with the given data.
 * @param {*} visId 
 * @param {*} oddsTimeSeries Cumulative odds over a number of games 
 */
function UpdateLineVis(visId, oddsTimeSeries) {
    const vis = d3.select(`#${visId}`)

    const width = +vis.attr("width") - 50;
    const height = +vis.attr("height") - 30;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0, oddsTimeSeries.length - 1])
        .range([0, innerWidth])

    const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([innerHeight, 0])

    vis.select("path.actual")
        .datum(oddsTimeSeries)
        .attr("d", d3.line()
            .x((_, i) => margin.left + xScale(i))
            .y((d, _) => margin.top + yScale(d))
        )

    const ypos = odds1[0] / (odds1.reduce((acc, a) => acc + a, 0))
    vis.select("path.expected")
        .datum([[0, ypos], [oddsTimeSeries.length-1, ypos]])
        .attr("d", d3.line()
            .x(d => margin.left + xScale(d[0]))
            .y(d => margin.top + yScale(d[1]))
        )
        
    vis.select("g.x-axis").call(d3.axisBottom(xScale))
}

function UpdateShowLineVis(visId, resultsId, results) {
    UpdateLineVis(visId, results)
    document.getElementById(resultsId).classList.remove("hidden")
}

/**
 * Pure Functions
 */

function bestHand(cards) {
    const cardLists = combinations(cards, 5)
    const hands = cardLists.map(list => new Hand(list))
    hands.sort(Hand.compare)
    const bestHand = hands[hands.length - 1]
    return bestHand
}

function odds(holeCards, communityCards, otherCards) {
    const playerBestHand = bestHand([...holeCards, ...communityCards])

    let numWins = 0 
    let numTies = 0
    let numLosses = 0

    // get all 2-combinations of other cards
    const otherHoleCards = combinations(otherCards, 2)

    // loop over all 2-combinations, and get best hand for each
    // for each best hand, compare to player's best hand
    otherHoleCards.forEach(cards => {
        const hand = bestHand([...cards, ...communityCards])
        const outcome = playerBestHand.compareTo(hand)
        if (outcome > 0) {
            numWins++
        } else if (outcome === 0) {
            numTies++
        } else {
            numLosses++
        }
    })

    return [ numWins, numTies, numLosses ]
}