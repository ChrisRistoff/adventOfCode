import fs from "fs/promises";

export async function parseData(filePath: string): Promise<string[]> {
    const data = await fs.readFile(filePath, 'utf8');

    const res = data.split('\n');
    res.pop();

    return res;
}
