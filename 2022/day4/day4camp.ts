import fs from "fs/promises";

const getItems = async () => {
  const items = await fs.readFile(`${__dirname}/../../2022/day4/day4data.txt`, "utf-8");

  return items.split("\n");
};

const getCount = async (items: string[]) => {
  let count: number = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i].split(",");
    const item1 = item[0].split("-");
    const item2 = item[1].split("-");

    if (+item1[0] <= +item2[0] && +item1[1] >= +item2[1]) count++;
    if (+item1[0] >= +item2[0] && +item1[1] <= +item2[1]) count++;
  }
  return count;
};

const getOverlapCount = async (items: string[]) => {
  let count: number = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i].split(",");
    const item1 = item[0].split("-");
    const item2 = item[1].split("-");

    if (+item1[0] >= +item2[0] && +item1[0] <= +item2[1]) count++;
    else if (+item2[0] >= +item1[0] && +item2[0] <= +item1[1]) count++;
  }

  return count;
};

const main = async () => {
  const items: string[] = await getItems();
  items.pop();

  const res: number = await getOverlapCount(items);

  return res;
};

main().then((res) => {
  console.log(res);
});
