const fs = require('fs');

fs.readFile('day2.txt' , (err, data) => {
    if (err) {
        throw err
    }

    const dataArray = data.toString().split(',').map(value => Number(value))

    // restore the gravity assist program to the "1202 program alarm"
    dataArray[1] = 12
    dataArray[2] = 2

    intcode(dataArray, 0)
    console.log(dataArray[0])
})

function intcode (array, startIndex) {
    //console.log(`reading operation at index: ${startIndex} with value: ${array[startIndex]}`)
    if (array[startIndex] === 99 || startIndex > array.length - 4) {
        return
    }

    const first = array[startIndex + 1]
    const second = array[startIndex + 2]
    const destination = array[startIndex + 3]

    if (array[startIndex] == 1) {
        array[destination] = array[first] + array[second]
        intcode(array, startIndex + 4)
    } else {
        array[destination] = array[first] * array[second]
        intcode(array, startIndex + 4)
    }
}