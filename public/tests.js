"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = __importDefault(require("./entities/Person"));
const Book_1 = __importDefault(require("./entities/Book"));
const Gender_1 = __importDefault(require("./entities/Gender"));
const pessoa1 = new Person_1.default('Mykaelly', new Date(2002, 09, 17), Gender_1.default.Female);
const livro1 = new Book_1.default(123324, 112, 2, 'Chapeuzinho', 'Vermelho', new Date(2002, 09, 12), pessoa1);
console.log(pessoa1);
console.log(livro1);
