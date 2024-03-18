import fs from 'fs/promises';

const getData = async (): Promise<string[]> => {
  const data: string = await fs.readFile(`${__dirname}/../../2022/day9/day9data.txt`, 'utf-8');

  const dataArray = data.split('\n');
  dataArray.pop();

  return dataArray;
}


const main = async () => {
  const data: string[] = await getData();
  console.log(data);
}

main();
