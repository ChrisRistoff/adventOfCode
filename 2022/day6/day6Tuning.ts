import fs from "fs/promises"

const getData = async () => {
  const data: string = await fs.readFile(`${__dirname}/../../2022/day6/day6data.txt`, "utf-8")

  return data
}

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
  const data = await getData()
  const result = await getFirstFour(data, 14)

  return result
}

main().then((data) => {
  console.log(data)
})
