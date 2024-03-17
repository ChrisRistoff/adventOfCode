import fs from 'fs/promises';

const getData = async (): Promise<string[]> => {
  const data: string = await fs.readFile(`${__dirname}/../../2022/day8/day8data.txt`, 'utf-8');

  const dataArray = data.split('\n');
  dataArray.pop();

  return dataArray;
}


const checkLeft = (index: number, line: string): boolean => {
  const currentNumber: string = line[index];
  let visible: boolean = true;

  for (let i = index - 1; i >= 0; i--) {
    if (currentNumber <= line[i]) {
      visible = false;
      break;
    }
  }

  return visible;
}


const checkRight = (index: number, line: string): boolean => {
  const currentNumber: string = line[index];
  let visible: boolean = true;

  for (let i = index + 1; i < line.length; i++) {
    if (currentNumber <= line[i]) {
      visible = false;
      break;
    }
  }

  return visible;
}


const checkUp = (currentLineIndex: number, currentNumberIndex: number, data: string[]): boolean => {
  let visible: boolean = true;
  const currentNumber: string = data[currentLineIndex][currentNumberIndex]

  for (let i = currentLineIndex - 1; i >= 0 ; i--) {
    if (currentNumber <= data[i][currentNumberIndex]) {
      visible = false;
      break;
    }
  }

  return visible;
}


const checkDown = (currentLineIndex: number, currentNumberIndex: number, data: string[]): boolean => {
  let visible: boolean = true;
  const currentNumber: string = data[currentLineIndex][currentNumberIndex]

  for (let i = currentLineIndex + 1; i < data.length; i++) {
    if (currentNumber <= data[i][currentNumberIndex]) {
      visible = false;
      break;
    }
  }

  return visible;
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



const main = async () => {
  const data: string[] = await getData();
  const count: number = getCount(data);
  console.log(count);
}

main();
