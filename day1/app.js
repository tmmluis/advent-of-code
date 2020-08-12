const fs = require('fs');

fs.readFile('input.txt' , (err, data) => {
    if (err) {
        throw err
    }
    
    const modulesMass = data.toString().split('\n').map(value => Number(value))
    
    const part1Answer = modulesMass.reduce((accumulator, currentValue) => accumulator + computeFuel(currentValue), 0)
    console.log(part1Answer)

    const part2Answer = modulesMass.reduce((accumulator, currentValue) => accumulator + computeTotalFuel(currentValue), 0)
    console.log(part2Answer)
})

function computeFuel(mass) {
    return Math.floor(mass / 3) - 2
}

function computeTotalFuel(mass) {
    let fuel = Math.floor(mass / 3) - 2

    if (fuel <= 0) {
        return 0
    }

    return fuel + computeTotalFuel(fuel)
}