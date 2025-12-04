import fs from 'fs/promises';
import { checkLeft, checkRight, checkDown, checkUp } from './part1helpers';
import { getLeft, getRight, getUp, getDown } from './part2helpers';
import { parseData } from '../../utils/parseDataFile';

const DATA_FILE_PATH = `${__dirname}/../../2022/day8/day8data.txt`;

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


const getBestTree = (data: string[]): number=> {

  let bestScenicScore: number = 0;
  let currentBestTree: string = "";

  for (let i = 0; i < data.length- 1; i++) {
    for (let j = 0; j < data[i].length - 1; j++) {
      let currentTree: string = data[i][j];
      let totalView: number = 0;

      totalView = getLeft(j, data[i]) * getRight(j, data[i]) * getUp(i, j, data) * getDown(i, j, data);

      if (totalView > bestScenicScore) {
        bestScenicScore = totalView;
        currentBestTree = currentTree;
      }
    }
  }

  return bestScenicScore;
}


const main = async () => {
  const data: string[] = await parseData(DATA_FILE_PATH);
  const count: number = getCount(data);
  console.log(count, " is the count of trees with a view of the ocean");

  const bestTreeScore: number= getBestTree(data);
  console.log(bestTreeScore, " is the best tree scenic score");
}

main();
