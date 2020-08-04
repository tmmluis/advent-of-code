const fs = require('fs');

fs.readFile('day2.txt' , (err, data) => {
    if (err) {
        throw err
    }

    const inputData = data.toString().split(',').map(value => Number(value))

    // Part 1
    const intcodePart1 = [...inputData]
    intcodePart1[1] = 12
    intcodePart1[2] = 2
    console.log('Part 1 answer: ' + runIntcode(intcodePart1, 0))

    // Part 2
    const inputs = gravityAssist(inputData)
    const answerPart2 = 100 * inputs.noun + inputs.verb
    console.log('Part 2 answer: ' + answerPart2)
    
})

function gravityAssist(intcode) {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            let tempIntcode = [...intcode]
            tempIntcode[1] = noun
            tempIntcode[2] = verb

            let output = runIntcode(tempIntcode, 0)

            if (output === 19690720) {
                return {
                    noun,
                    verb
                }
            }
        }
    }
}

function runIntcode (intcode, startIndex) {
    //console.log(`reading operation at index: ${startIndex} with value: ${intcode[startIndex]}`)
    if (intcode[startIndex] === 99 || startIndex > intcode.length - 4) {
        return
    }

    const first = intcode[startIndex + 1]
    const second = intcode[startIndex + 2]
    const destination = intcode[startIndex + 3]

    if (intcode[startIndex] == 1) {
        intcode[destination] = intcode[first] + intcode[second]
        runIntcode(intcode, startIndex + 4)
    } else {
        intcode[destination] = intcode[first] * intcode[second]
        runIntcode(intcode, startIndex + 4)
    }

    return intcode[0]
}