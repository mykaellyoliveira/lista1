"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Document_1 = __importDefault(require("./Document"));
class Periodical extends Document_1.default {
    constructor(issn, volume, issue, title, subtitle, publishedAt, author) {
        super(title, subtitle, publishedAt, author);
        this.issn = issn;
        this.volume = volume;
        this.issue = issue;
    }
}
exports.default = Periodical;
