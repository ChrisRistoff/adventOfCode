export const getLeft = (index: number, line: string): number => {
    let currentTree: string = line[index];
    let totalView: number = 0;

    for (let i = index - 1; i >= 0; i--) {
        if (currentTree <= line[i]) {
            totalView++;
            break;
        }

        totalView++;
    }

    return totalView;
};


export const getRight = (index: number, line: string): number => {
    let currentTree: string = line[index];
    let totalView: number = 0;

    for (let i = index + 1; i < line.length; i++) {
        if (currentTree <= line[i]) {
            totalView++;
            break;
        }

        totalView++;
    }

    return totalView;
}


export const getUp = (currentLineIndex: number, currentTreeIndex: number, data: string[]): number => {
    let currentTree: string = data[currentLineIndex][currentTreeIndex];
    let totalView: number = 0;

    for (let i = currentLineIndex - 1; i >= 0; i--) {
        if (currentTree <= data[i][currentTreeIndex]) {
            totalView++;
            break;
        }

        totalView++;
    }

    return totalView;
}


export const getDown = (currentLineIndex: number, currentTreeIndex: number, data: string[]): number => {
    let currentTree: string = data[currentLineIndex][currentTreeIndex];
    let totalView: number = 0;

    for (let i = currentLineIndex + 1; i < data.length; i++) {
        if (currentTree <= data[i][currentTreeIndex]) {
            totalView++;
            break;
        }

        totalView++;
    }

    return totalView;
}
