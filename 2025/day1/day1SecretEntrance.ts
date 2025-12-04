import { parseData } from "../../utils/parseDataFile";

enum Direction {
    Left = "L",
    Right = "R"
}

const DATA_FILE_PATH = `${__dirname}/../../../2025/day1/day1data.txt`;

function extractNumberFromEntry(entry: string): number {
    let result = '';

    for (let i = 1; i < entry.length; i++) {
        result += entry[i];
    }

    return Number(result);
}

function calculateNewPositon(direction: Direction, position: number, valueToMoveBy: number): number {
    const updatedValueToMoveBy = valueToMoveBy > 100 ? valueToMoveBy % 100 : valueToMoveBy;

    if (direction === Direction.Left) {
        return position - updatedValueToMoveBy < 0 ? 100 + position - updatedValueToMoveBy : position - updatedValueToMoveBy;
    }

    return position + updatedValueToMoveBy > 99 ? position + updatedValueToMoveBy - 100 : position + updatedValueToMoveBy;
}

async function main () {
    const data = await parseData(DATA_FILE_PATH);

    let position = 50;
    let count = 0;

    for (const entry of data) {
        const num = extractNumberFromEntry(entry);

        const direction = entry.startsWith("L") ? Direction.Left : Direction.Right;

        position = calculateNewPositon(direction, position, num);

        if (position === 0) {
            count++;
        }
    }

    return count;
}

main().then(res => console.log(res));
