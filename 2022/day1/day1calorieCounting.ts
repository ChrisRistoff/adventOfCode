import fs from "fs/promises";

const getListOfElves = async () => {
  const list = await fs.readFile(`${__dirname}/../../2022/day1/day1data.txt`, "utf-8");
  const splitList = list.split("\n");

  const finalList = [];
  let temp = [];
  for (let i = 0; i < splitList.length; i++) {
    if (splitList[i] !== "") temp.push(+splitList[i]);
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
