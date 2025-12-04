import fs from "fs/promises"
import { parseData } from "../../utils/parseDataFile";

const DATA_FILE_PATH = `${__dirname}/../../2022/day6/day6data.txt`;

const getFirstFour = async (data: string, distinctLetters: number) => {
  let set: Set<string> = new Set()
  for (let i = 0; i < data.length; i++) {
    set = new Set()
    const len = i + distinctLetters

    for (let j = i; j < len; j++) {
      set.add(data[j])
    }

    if(set.size === 14) {
      return len
    }
  }
}

const main = async () => {
  const data = await parseData(DATA_FILE_PATH);
  const result = await getFirstFour(data.join('\n'), 14);

  return result
}

main().then((data) => {
  console.log(data)
})
