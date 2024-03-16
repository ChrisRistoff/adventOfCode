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
const getPlays = () => __awaiter(void 0, void 0, void 0, function* () {
    const plays = yield promises_1.default.readFile(`${__dirname}/../../2022/day2/day2data.txt`, "utf-8");
    const splitPlays = plays.split("\n");
    const finalList = [];
    for (let i = 0; i < splitPlays.length; i++) {
        finalList[i] = splitPlays[i].split(" ");
    }
    finalList.pop();
    return finalList;
});
const calculateScore = (arr) => {
    const playVals = { X: 1, Y: 2, Z: 3 };
    const winners = { X: "C", Y: "A", Z: "B", A: "Z", B: "X", C: "Y" };
    if (winners[arr[1]] === arr[0]) {
        return 6 + playVals[arr[1]];
    }
    else if (winners[arr[0]] === arr[1]) {
        return playVals[arr[1]];
    }
    else {
        return playVals[arr[1]] + 3;
    }
};
const calculateNewScore = (arr) => {
    const playVals = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 };
    const lose = { A: "Z", B: "X", C: "Y" };
    const win = { A: "Y", B: "Z", C: "X" };
    if (arr[1] === "X") {
        return playVals[lose[arr[0]]];
    }
    else if (arr[1] === "Y") {
        return playVals[arr[0]] + 3;
    }
    else {
        return playVals[win[arr[0]]] + 6;
    }
};
const calculateFinalScore = () => __awaiter(void 0, void 0, void 0, function* () {
    const arrOfPlays = yield getPlays();
    let score = 0;
    for (let i = 0; i < arrOfPlays.length; i++) {
        const currPlayScore = calculateNewScore(arrOfPlays[i]);
        score += currPlayScore;
    }
    return score;
});
calculateFinalScore().then((score) => {
    console.log(score);
});
