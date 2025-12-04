import { parseData } from "../../utils/parseDataFile";

const DATA_FILE_PATH = "./data/day7.txt";

class Directory {
    name: string;
    parent: string | null | Directory;
    size: number;
    children: Directory[];

    constructor(name: string, parent: string | null | Directory) {
        this.name = name;
        this.parent = parent;
        this.size = 0;
        this.children = [];
    }
}

const getSize = (data: string[]) => {
    const root = new Directory("/", null);
    const dirStack = [root];

    for (let i = 0; i < data.length; i++) {
        const line = data[i].split(" ");

        if (line[0] === "$") {
            if (line[2] === "..") {
                dirStack.pop();
            } else if (line[2]) {
                const currentDir = dirStack[dirStack.length - 1];
                const newDir = new Directory(line[2], currentDir);
                currentDir.children.push(newDir);
                dirStack.push(newDir);
            }
        } else {
            if (Number.isInteger(+line[0])) {
                const size = +line[0];
                for (const dir of dirStack) {
                    dir.size += size;
                }
            }
        }
    }

    return root;
};

const calculateDirs = (root: Directory, maxSize: number) => {
    let total = 0;
    const includedDirs = new Set();
    const stack = [root];

    while (stack.length > 0) {
        const dir = stack.pop()!;

        if (dir.size <= maxSize && !includedDirs.has(dir)) {
            total += dir.size;
            includedDirs.add(dir);
        }

        for (const child of dir.children) {
            stack.push(child);
        }
    }
    return total;
};

const main = async () => {
    const data: string[] = await parseData(DATA_FILE_PATH);
    const root: Directory = getSize(data);
    const total: number = calculateDirs(root, 100000);

    return total;
};
main().then((data) => {
    console.log(data);
});
