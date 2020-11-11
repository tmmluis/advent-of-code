// Checks if a password contains two adjacent digits that are the same. (part 1)
const containsDoubles = (number) => {
    const password = number.toString()
    
    for (let i = 0, j = 1; j < password.length; i++, j++) {
        if (password.charAt(i) === password.charAt(j)) {
            return true
        }
    }

    return false
}

// Checks if a password contains any two adjacent digits that are the same 
// (that are not part of a larger group of matching digits). (part 2)
const containsExclusiveDoubles = (number) => {
    const password = number.toString()

    let i = 0
    while (i < password.length - 1) {
        let start = (i === 0)
        let end = (i === password.length - 2)
        let first = password.charAt(i)
        let second = password.charAt(i + 1)

        if (first !== second) {
            i += 1
        // below this line means the two digits are equal, just need to look ahead and behind to make sure they are exactly 2.
        } else if (!start && first === password.charAt(i - 1)) {
            i += 2
        } else if (!end && second === password.charAt(i + 2)) {
            i += 2
        } else {
            return true
        }
    }
    return false
}

// Increments a number to the next valid value, so that digits never decrease.
const increment = (number) => {
    const password = number.toString().split('')
    let index = password.length - 1

    while (index > -1) {

        if (password[index] !== '9') {
            password[index] = (++password[index]).toString()
            password.fill(password[index], index)
            return password.reduce((accumulator, currentValue) => accumulator + currentValue)
        }

        index = index - 1
    }

}

// Returns the first valid password starting at number
const initialize = (number) => {
    const password = number.toString().split('')

    for (let i = 0; i < password.length - 1; i++) {
        if (password[i + 1] < password[i]) {
            password.fill(password[i], i + 1)
            break
        }
    }

    return password.reduce((accumulator, currentValue) => accumulator + currentValue)
}

function countPasswords(min, max) {
    let password = min
    let count = 0

    console.log(`Pass before init: ${password}`)

    password = initialize(password)

    console.log(`Pass after init: ${password}`)

    while (password <= max) {
        // if (containsDoubles(password)) {
        if (containsExclusiveDoubles(password)) {
            count++
        }
        password = increment(password)
    }

    return count
}


console.log(countPasswords(156218, 652527))