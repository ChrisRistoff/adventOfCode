import fs from "fs/promises";
import { parseData } from "../../utils/parseDataFile";

const DATA_FILE_PATH = `${__dirname}/../../2022/day1/day1data.txt`;

const getListOfElves = async () => {
    const data = await parseData(DATA_FILE_PATH);

    const finalList = [];
    let temp = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i] !== "") temp.push(+data[i]);
        else {
            finalList.push(temp);
            temp = [];
        }
    }

    return finalList;
};

const getSum = (arr: number[]) => {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
};

const getMaxCal = async () => {
    const arrayOfCalories = await getListOfElves();

    const sums = [];

    for (let i = 0; i < arrayOfCalories.length; i++) {
        const sum = getSum(arrayOfCalories[i]);
        sums.push(sum);
    }

    return sums;
};

getMaxCal().then((data) => {
    data = data.sort((a, b) => a - b);
    const max = data[data.length - 1];
    const topThree = getSum([
        data[data.length - 1],
        data[data.length - 2],
        data[data.length - 3],
    ]);

    console.log("Max cal elf ->", max);
    console.log("Sum of top three cal elves ->", topThree);
});
