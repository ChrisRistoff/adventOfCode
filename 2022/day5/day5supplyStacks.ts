import fs from "fs/promises";
import { Stack } from "./Interfaces";

const parse = async () => {
  let items: string = await fs.readFile(`${__dirname}/../../2022/day5/day5data.txt`, "utf-8");
  return items.split("\n");
};

const getCrates = async (items: string[]) => {
  let line: string = "";
  let ind: number = 0;

  for (let i = 0; i < items.length; i++) {
    if (items[i][1] === "1") {
      line = items[i];
      ind = i - 1;
      break;
    }
  }

  const stack: Stack = {};
  for (let i = ind; i >= 0; i--) {

    for (let j = 0; j < items[i].length; j++) {
      if (items[i][j] === "[") {

        if (!stack[line[j + 1]]) {
          stack[line[j + 1]] = [items[i][j + 1]];

        } else {
          stack[line[j + 1]].push(items[i][j + 1]);
        }
      }
    }
  }

  return stack;
};

const getMoves = async (items: string[]) => {
  let start: number = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i] === "") {
      start = i + 1;
      break;
    }
  }

  const res: number[][] = [];
  for (let i = start; i < items.length; i++) {
    let item = items[i].split(" ");
    res.push([+item[1], +item[3], +item[5]]);
  }

  return res;
};

const moveCrates = async (crates: Stack, moves: number[][]) => {
  for (let move of moves) {
    const temp = [];
    for (let i = 0; i < move[0]; i++) {
      temp.push(crates[move[1]].pop()!);
    }

    crates[move[2]] = [...crates[move[2]], ...temp];
  }

  return crates;
};

const moveCrates2 = async (crates: Stack, moves: number[][]) => {
  for (let move of moves) {
    const temp = [];
    for (let i = 0; i < move[0]; i++) {
      temp.push(crates[move[1]].pop()!);
    }

    temp.reverse();
    crates[move[2]] = [...crates[move[2]], ...temp];
  }

  return crates;
};

const getLastCrates = async (crates: Stack) => {
  let res = "";
  for (const key in crates) {
    res += crates[key][crates[key].length - 1];
  }
  return res;
};

const main = async () => {
  const items = await parse();
  items.pop();
  const crates = await getCrates(items);
  const moves = await getMoves(items);
  const moved = await moveCrates2(crates, moves);
  const lastCrates = await getLastCrates(moved);

  return lastCrates;
};

main().then((items) => {
  console.log(items);
});
