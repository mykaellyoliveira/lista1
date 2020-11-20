import Person from "./Person";

class Document
{
    title : String;
    subtitle : String;
    publishedAt : Date | number;
    author : Person;

    constructor(title : String, subtitle : String, publishedAt : Date | number, author : Person){
        this.title = title;
        this.subtitle = subtitle;
        this.publishedAt = publishedAt;
        this.author = author;
    }

}

export default Document