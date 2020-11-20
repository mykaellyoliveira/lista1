// importação da classe pai (Document) e Person
import Document from './Document.js'
import Person from './Person.js'

// classe Book herdando de Document
class Book extends Document
{
    isbn : Number;
    edition : Number;
    volume : Number;

    constructor (isbn : Number, edition : Number, volume : Number, title: string, subtitle: string, publishedAt : Date | number, author : Person)
    {
        super(title, subtitle, publishedAt, author)
        this.isbn = isbn;
        this.edition = edition;
        this.volume = volume;

    }
}

// exportação de Book
export default Book