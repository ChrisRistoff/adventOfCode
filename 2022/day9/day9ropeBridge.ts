import { parseData } from "../../utils/parseDataFile";

const DATA_FILE_PATH = `${__dirname}/../../2022/day9/day9testData.txt`;

type Instructions = { direction: string, moves: number };

type Position = { x: number, y: number };

const getDirectionAndMoves = (data: string[]): Instructions[] => {
    const instructions: Instructions[] = [];

    for (let i = 0; i < data.length; i++) {
        let direction: string = data[i].split(" ")[0];
        let moves: number = parseInt(data[i].split(" ")[1]);

        instructions.push({ direction, moves });
    }

    return instructions;
}

const moveHead = (position: Position, direction: string, steps: number): Position => {
    switch (direction) {
        case "N":
            position.y += steps;
            break;
        case "S":
            position.y -= steps;
            break;
        case "E":
            position.x += steps;
            break;
        case "W":
            position.x -= steps;
            break;
        default:
            break;
    }

    return position;
}

const moveTail = (headPos: Position, tailPos: Position): Position => {
    const tailX: number = headPos.x - tailPos.x;
    const tailY: number = headPos.y - tailPos.y;

    if (tailX > 1) {
        tailPos.x += tailX;
    }

    if (tailY > 1) {
        tailPos.y += tailY;
    }

    return tailPos;
}

const move = (instructions: Instructions[]): number => {
    let head: Position = { x: 0, y: 0 };
    let tail: Position = { x: 0, y: 0 };

    const visited: Set<string> = new Set();
    visited.add("0,0");

    for (let i = 0; i < instructions.length; i++) {
        for (let j = 0; j < instructions[i].moves; j++) {
            head = moveHead(head, instructions[i].direction, 1);
            tail = moveTail(head, tail);

            visited.add(`${tail.x},${tail.y}`);
        }
    }

    return visited.size;
}

const main = async () => {
    const data: string[] = await parseData(DATA_FILE_PATH);
    const instructions: Instructions[] = getDirectionAndMoves(data);

    const totalUniqueMoves: number = move(instructions);

    console.log(totalUniqueMoves, " is the total unique moves made by the head of the rope bridge");
}

main();
