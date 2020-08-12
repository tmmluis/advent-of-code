const fs = require('fs');

const inputFile = process.argv[2]

fs.readFile(inputFile , (err, data) => {
    if (err) {
        throw err
    }

    const parsedData = data.toString().split('\r\n')

    const wire1Path = computeCoordinates(parsedData[0].split(','))
    const wire2Path = computeCoordinates(parsedData[1].split(','))
    
    const intersections = intersection(wire1Path, wire2Path)

    console.log(closestIntersection(intersections), shortestIntersection(intersections))
})

// Computes the intersection that requires the least combined steps
function shortestIntersection(intersections) {
    let shortestIntersection = Infinity

    intersections.forEach((coordinate) => {
        let steps = coordinate.steps1 + coordinate.steps2

        if(steps < shortestIntersection && steps > 0) {
            shortestIntersection = steps
        }
    })
    return shortestIntersection
}

// Computes distance to the intersection that is closer to origin
function closestIntersection(intersections) {
    let closestIntersection = Infinity

    intersections.forEach((coordinate) => {
        let distance = Math.abs(coordinate.x) + Math.abs(coordinate.y)

        if (distance < closestIntersection && distance > 0) {
            closestIntersection = distance
        }
    })
    return closestIntersection
}

// Checks for common values in 2 arrays and returns a new array with them
function intersection(array1, array2) {
    const obj = {}
    const intersections = []
    
    array1.forEach((coordinate) => {
        let key = 'x:' + coordinate.x + 'y:' + coordinate.y
 
        if (!obj[key]) {
            obj[key] = coordinate;
        }
    })
    
    array2.forEach((coordinate) => {
        let key = 'x:' + coordinate.x + 'y:' + coordinate.y

        if (obj[key]) {
            let intersection = {
                x: coordinate.x,
                y: coordinate.y,
                steps1: obj[key].steps,
                steps2: coordinate.steps
            }
            intersections.push(intersection)
        }
    })

    return intersections
}

// Returns an array with the path coordinates
function computeCoordinates(path) {
    const coordinates = []
    let steps = 0
    let previousCoordinate = {
        x: 0,
        y: 0,
        steps: 0
    }

    coordinates.push(previousCoordinate)

    // An instruction is something like 'U71' i.e. 71 units into positive (up) y axis
    path.forEach((instruction) => {
        const direction = instruction.substring(0, 1)
        const distance = Number(instruction.substring(1))

        switch (direction) {
            case 'R':
                for (let i = 0; i < distance; i++) {
                    previousCoordinate.steps++
                    previousCoordinate.x++
                    coordinates.push({ ...previousCoordinate })
                }
                break
            case 'D':
                for (let i = 0; i < distance; i++) {
                    previousCoordinate.steps++
                    previousCoordinate.y--
                    coordinates.push({ ...previousCoordinate })
                }
                break
            case 'L':
                for (let i = 0; i < distance; i++) {
                    previousCoordinate.steps++
                    previousCoordinate.x--
                    coordinates.push({ ...previousCoordinate })
                }
                break
            case 'U':
                for (let i = 0; i < distance; i++) {
                    previousCoordinate.steps++
                    previousCoordinate.y++
                    coordinates.push({ ...previousCoordinate })
                }
                break
        }
    })

    return coordinates
}