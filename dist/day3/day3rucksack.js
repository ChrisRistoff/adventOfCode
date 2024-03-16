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
const getAllItems = () => __awaiter(void 0, void 0, void 0, function* () {
    let items = yield promises_1.default.readFile(`${__dirname}/../../2022/day3/day3data.txt`, "utf-8");
    return items.split("\n");
});
const getDupeLetters = (items) => __awaiter(void 0, void 0, void 0, function* () {
    const res = [];
    for (let item of items) {
        const len = item.length / 2;
        const set = new Set(item.substring(len));
        const firstHalf = item.substring(0, len);
        for (let i = 0; i < firstHalf.length; i++) {
            if (set.has(firstHalf[i])) {
                res.push(firstHalf[i]);
                break;
            }
        }
    }
    return res;
});
const getBadges = (items) => __awaiter(void 0, void 0, void 0, function* () {
    const res = [];
    for (let i = 0; i < items.length; i += 3) {
        const item2 = new Set(items[i + 1]);
        const item3 = new Set(items[i + 2]);
        for (const item of items[i]) {
            if (item2.has(item) && item3.has(item)) {
                res.push(item);
                break;
            }
        }
    }
    return res;
});
const calculateTotal = (itemList) => __awaiter(void 0, void 0, void 0, function* () {
    let sum = 0;
    for (let item of itemList) {
        let itemVal = item.charCodeAt(0);
        if (itemVal < 97)
            itemVal -= 38;
        if (itemVal > 96)
            itemVal -= 96;
        sum += itemVal;
    }
    return sum;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const allItems = yield getAllItems();
    const dupeItems = yield getBadges(allItems);
    const total = yield calculateTotal(dupeItems);
    return total;
});
main().then((total) => {
    console.log(total);
});
