/*
 The expedition can depart as soon as the final supplies have been unloaded from the ships. Supplies are stored in stacks of marked crates, but because the needed supplies are buried under many other crates, the crates need to be rearranged.

The ship has a giant cargo crane capable of moving crates between stacks. To ensure none of the crates get crushed or fall over, the crane operator will rearrange them in a series of carefully-planned steps. After the crates are rearranged, the desired crates will be at the top of each stack.

The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.

They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input). For example:

    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
In this example, there are three stacks of crates. Stack 1 contains two crates: crate Z is on the bottom, and crate N is on top. Stack 2 contains three crates; from bottom to top, they are crates M, C, and D. Finally, stack 3 contains a single crate, P.

Then, the rearrangement procedure is given. In each step of the procedure, a quantity of crates is moved from one stack to a different stack. In the first step of the above rearrangement procedure, one crate is moved from stack 2 to stack 1, resulting in this configuration:

[D]
[N] [C]
[Z] [M] [P]
 1   2   3
In the second step, three crates are moved from stack 1 to stack 3. Crates are moved one at a time, so the first crate to be moved (D) ends up below the second and third crates:

        [Z]
        [N]
    [C] [D]
    [M] [P]
 1   2   3
Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved one at a time, crate C ends up below crate M:

        [Z]
        [N]
[M]     [D]
[C]     [P]
 1   2   3
Finally, one crate is moved from stack 1 to stack 2:

        [Z]
        [N]
        [D]
[C] [M] [P]
 1   2   3
The Elves just need to know which crate will end up on top of each stack; in this example, the top crates are C in stack 1, M in stack 2, and Z in stack 3, so you should combine these together and give the Elves the message CMZ.
 */

const { resolve4 } = require("dns");
const fs = require("fs/promises");

const parse = async () => {
  let items = await fs.readFile("./data/day5stack.txt", "utf-8");
  return items.split("\n");
};

const getCrates = async (items) => {
  let line;
  let ind = 0;

  for (let i = 0; i < items.length; i++) {
    if (items[i][1] === "1") {
      line = items[i];
      ind = i - 1;
      break;
    }
  }

  const stack = {};
  console.log(ind);
  for (let i = ind; i >= 0; i--) {
    for (let j = 0; j < items[i].length; j++) {
      console.log(items[i][j]);
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

const getMoves = async (items) => {
  let start;
  for (let i = 0; i < items.length; i++) {
    if (items[i] === "") {
      start = i + 1;
      break;
    }
  }

  const res = [];
  for (let i = start; i < items.length; i++) {
    let item = items[i].split(" ");
    res.push([+item[1], +item[3], +item[5]]);
  }

  return res;
};

const moveCrates = async (crates, moves) => {
  for (let move of moves) {
    const temp = [];
    for (let i = 0; i < move[0]; i++) {
      temp.push(crates[move[1]].pop());
    }

    crates[move[2]] = [...crates[move[2]], ...temp];
  }

  return crates;
};

const getLastCrates = async (crates) => {
  let res = ""
  for (const key in crates) {
    res += crates[key][crates[key].length - 1]
  }

  return res
}

const main = async () => {
  const items = await parse();
  items.pop();
  const crates = await getCrates(items);
  const moves = await getMoves(items);
  const moved = await moveCrates(crates, moves);
  const lastCrates = await getLastCrates(moved)

  return lastCrates;
};

main().then((items) => {
  console.log(items);
});
