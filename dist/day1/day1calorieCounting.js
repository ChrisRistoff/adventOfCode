"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const getListOfElves = () => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield promises_1.default.readFile("../../2022/day1/day1data.txt", "utf-8");
    const splitList = list.split("\n");
    const finalList = [];
    let temp = [];
    for (let i = 0; i < splitList.length; i++) {
        if (splitList[i] !== "")
            temp.push(+splitList[i]);
        else {
            finalList.push(temp);
            temp = [];
        }
    }
    return finalList;
});
const getSum = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
};
const getMaxCal = () => __awaiter(void 0, void 0, void 0, function* () {
    const arrayOfCalories = yield getListOfElves();
    const sums = [];
    for (let i = 0; i < arrayOfCalories.length; i++) {
        const sum = getSum(arrayOfCalories[i]);
        sums.push(sum);
    }
    return sums;
});
getMaxCal().then((data) => {
    data = data.sort((a, b) => a - b);
    const max = data[data.length - 1];
    const topThree = getSum([
        data[data.length - 1],
        data[data.length - 2],
        data[data.length - 3],
    ]);
    console.log("Max cal elf ->", max);
    console.log("Sum of top three cal elves ->", topThree);
});
