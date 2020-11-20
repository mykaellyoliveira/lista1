"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Document_1 = __importDefault(require("./Document"));
class Book extends Document_1.default {
    constructor(isbn, edition, volume, title, subtitle, publishedAt, author) {
        super(title, subtitle, publishedAt, author);
        this.isbn = isbn;
        this.edition = edition;
        this.volume = volume;
    }
}
exports.default = Book;
