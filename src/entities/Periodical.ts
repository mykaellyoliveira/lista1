// importação da classe pai (Document) 
import Document from './Document.js'
import Person from './Person.js'

// classe Periodical herdando Document
class Periodical extends Document
{
    issn : Number;
    volume : Number;
    issue : Number;

    constructor(issn : Number, volume: Number, issue : Number, title: string , subtitle: string, publishedAt: Date | number, author: Person)
    {
        super(title, subtitle, publishedAt, author)

        this.issn = issn;
        this.volume = volume;
        this.issue = issue;
    }
    
}

// exportação
export default Periodical