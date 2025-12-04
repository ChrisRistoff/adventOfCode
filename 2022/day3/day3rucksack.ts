import fs from "fs/promises";
import { parseData } from "../../utils/parseDataFile";

const DATA_FILE_PATH = `${__dirname}/../../2022/day3/day3data.txt`;

const getDupeLetters = async (items: string[]) => {
    const res = [];
    for (let item of items) {
        const len = item.length / 2;

        const set = new Set(item.substring(len));
        const firstHalf = item.substring(0, len);

        for (let i = 0; i < firstHalf.length; i++) {
            if (set.has(firstHalf[i])) {
                res.push(firstHalf[i]);
                break;
            }
        }
    }

    return res;
};

const getBadges = async (items: string[]) => {
    const res: string[] = [];

    for (let i = 0; i < items.length; i += 3) {
        const item2: Set<string> = new Set(items[i + 1]);
        const item3: Set<string> = new Set(items[i + 2]);
        for (const item of items[i]) {
            if (item2.has(item) && item3.has(item)) {
                res.push(item);
                break;
            }
        }
    }

    return res;
};

const calculateTotal = async (itemList: string[]) => {
    let sum: number = 0;
    for (let item of itemList) {
        let itemVal: number = item.charCodeAt(0);

        if (itemVal < 97) itemVal -= 38;
        if (itemVal > 96) itemVal -= 96;

        sum += itemVal;
    }

    return sum;
};

const main = async () => {
    const allItems: string[] = await parseData(DATA_FILE_PATH);

    const dupeItems: string[] = await getBadges(allItems);
    const total: number = await calculateTotal(dupeItems);

    return total;
};

main().then((total) => {
    console.log(total);
});
