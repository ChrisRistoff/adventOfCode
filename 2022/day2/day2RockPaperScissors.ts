import fs from "fs/promises";
import { WinnersForOne, PlayValsForOne, PlayValsForTwo, WinnersAndLosers } from "./Interfaces";

const getPlays = async () => {
  const plays: string = await fs.readFile(`${__dirname}/../../2022/day2/day2data.txt`, "utf-8");
  const splitPlays: string[] = plays.split("\n");

  const finalList = [];
  for (let i = 0; i < splitPlays.length; i++) {
    finalList[i] = splitPlays[i].split(" ");
  }
  finalList.pop();

  return finalList;
};

const calculateScore = (arr: string[] )=> {
  const playVals: PlayValsForOne = { X: 1, Y: 2, Z: 3 };
  const winners: WinnersForOne = { X: "C", Y: "A", Z: "B", A: "Z", B: "X", C: "Y" };

  if (winners[arr[1]] === arr[0]) {
    return 6 + playVals[arr[1]];
  } else if (winners[arr[0]] === arr[1]) {
    return playVals[arr[1]];
  } else {
    return playVals[arr[1]] + 3;
  }
};

const calculateNewScore = (arr: string[]) => {
  const playVals: PlayValsForTwo = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 };
  const lose: WinnersAndLosers = { A: "Z", B: "X", C: "Y" };
  const win: WinnersAndLosers = { A: "Y", B: "Z", C: "X" };

  if (arr[1] === "X") {
    return playVals[lose[arr[0]]];
  } else if (arr[1] === "Y") {
    return playVals[arr[0]] + 3;
  } else {
    return playVals[win[arr[0]]] + 6;
  }
};

const calculateFinalScore = async () => {
  const arrOfPlays = await getPlays();

  let score: number = 0;
  for (let i = 0; i < arrOfPlays.length; i++) {
    const currPlayScore = calculateNewScore(arrOfPlays[i]);
    score += currPlayScore;
  }

  return score;
};

calculateFinalScore().then((score) => {
  console.log(score);
});
