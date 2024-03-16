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
const getItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield promises_1.default.readFile(`${__dirname}/../../2022/day4/day4data.txt`, "utf-8");
    return items.split("\n");
});
const getCount = (items) => __awaiter(void 0, void 0, void 0, function* () {
    let count = 0;
    for (let i = 0; i < items.length; i++) {
        const item = items[i].split(",");
        const item1 = item[0].split("-");
        const item2 = item[1].split("-");
        if (+item1[0] <= +item2[0] && +item1[1] >= +item2[1])
            count++;
        if (+item1[0] >= +item2[0] && +item1[1] <= +item2[1])
            count++;
    }
    return count;
});
const getOverlapCount = (items) => __awaiter(void 0, void 0, void 0, function* () {
    let count = 0;
    for (let i = 0; i < items.length; i++) {
        const item = items[i].split(",");
        const item1 = item[0].split("-");
        const item2 = item[1].split("-");
        if (+item1[0] >= +item2[0] && +item1[0] <= +item2[1])
            count++;
        else if (+item2[0] >= +item1[0] && +item2[0] <= +item1[1])
            count++;
    }
    return count;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield getItems();
    items.pop();
    const res = yield getOverlapCount(items);
    return res;
});
main().then((res) => {
    console.log(res);
});
