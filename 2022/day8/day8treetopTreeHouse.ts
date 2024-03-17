import fs from 'fs/promises';
import { checkLeft, checkRight, checkDown, checkUp } from './part1helpers';

const getData = async (): Promise<string[]> => {
  const data: string = await fs.readFile(`${__dirname}/../../2022/day8/day8data.txt`, 'utf-8');

  const dataArray = data.split('\n');
  dataArray.pop();

  return dataArray;
}


const getCount = (data: string[]): number => {
  let count: number = 0;

  count += data.length * 2;
  count += (data[1].length - 2) * 2;

  for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data[i].length - 1; j++) {
      if (checkLeft(j, data[i]) || checkRight(j, data[i]) || checkUp(i, j, data) || checkDown(i, j, data)) {
        count++;
      }
    }
  }

  return count;
}


const getLeft = (index: number, line: string): number => {
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
}


const getRight = (index: number, line: string): number => {
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


const getUp = (currentLineIndex: number, currentTreeIndex: number, data: string[]): number => {
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


const getDown = (currentLineIndex: number, currentTreeIndex: number, data: string[]): number => {
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



const getBestTree = (data: string[]): string => {

  let maxView: number = 0;
  let currentBestTree: string = "";

  for (let i = 0; i < data.length- 1; i++) {
    for (let j = 0; j < data[i].length - 1; j++) {
      let currentTree: string = data[i][j];
      let totalView: number = 0;

      totalView = getLeft(j, data[i]) * getRight(j, data[i]) * getUp(i, j, data) * getDown(i, j, data);

      if (totalView > maxView) {
        maxView = totalView;
        currentBestTree = currentTree;

        console.log("currentBestTree: ", currentBestTree, " maxView: ", maxView, "at line: ", data[i])
      }
    }
  }

  return currentBestTree;
}


const main = async () => {
  const data: string[] = await getData();
  const count: number = getCount(data);
  console.log(count, " is the count of trees with a view of the ocean");

  const bestTree: string = getBestTree(data);
  console.log(bestTree, " is the best tree");
}

main();
