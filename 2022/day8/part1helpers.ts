export const checkLeft = (index: number, line: string): boolean => {
    const currentNumber: string = line[index];
    let visible: boolean = true;

    for (let i = index - 1; i >= 0; i--) {
        if (currentNumber <= line[i]) {
            visible = false;
            break;
        }
    }

    return visible;
};

export const checkRight = (index: number, line: string): boolean => {
    const currentNumber: string = line[index];
    let visible: boolean = true;

    for (let i = index + 1; i < line.length; i++) {
        if (currentNumber <= line[i]) {
            visible = false;
            break;
        }
    }

    return visible;
}


export const checkUp = (currentLineIndex: number, currentNumberIndex: number, data: string[]): boolean => {
    let visible: boolean = true;
    const currentNumber: string = data[currentLineIndex][currentNumberIndex]

    for (let i = currentLineIndex - 1; i >= 0; i--) {
        if (currentNumber <= data[i][currentNumberIndex]) {
            visible = false;
            break;
        }
    }

    return visible;
}


export const checkDown = (currentLineIndex: number, currentNumberIndex: number, data: string[]): boolean => {
    let visible: boolean = true;
    const currentNumber: string = data[currentLineIndex][currentNumberIndex]

    for (let i = currentLineIndex + 1; i < data.length; i++) {
        if (currentNumber <= data[i][currentNumberIndex]) {
            visible = false;
            break;
        }
    }

    return visible;
}
