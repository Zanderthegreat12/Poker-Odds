// return k-combination of the array
function combinations(arr, k) {
    const result = [];

    function generateCombination(startIndex, combination) {
        if (combination.length === k) {
            result.push([...combination])
            return
        }

        for (let i = startIndex; i < arr.length; i++) {
            combination.push(arr[i])
            generateCombination(i + 1, combination)
            combination.pop()
        }
    }

    generateCombination(0, [])
    return result
}

// shuffle array and return copy
function shuffle(arr) {
    const arr2 = [...arr]
    for (let i = arr2.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arr2[i]
        arr2[i] = arr2[j]
        arr2[j] = temp
    }
    return arr2
}

// sample without replacement
function sample(arr, n) {
    return shuffle(arr).slice(0, n)
}

// sample single value
function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

// sample with replacement
function choices(arr, n) {
    return Array(n).fill(null).map(_ => choose(arr))
}