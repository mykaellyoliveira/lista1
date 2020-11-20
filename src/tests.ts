// importação das classes
import Person from './entities/Person'
 import Book from './entities/Book'
 import Periodical from './entities/Periodical'
 import Gender from './entities/Gender'


// Instancias 
// pessoas
const pessoa1 = new Person('John Green' , new Date('1977-08-24T00:00:00') , Gender.Male)

const pessoa2 = new Person('Rick Riordan' , new Date('1964-06-05T00:00:00') , Gender.Male)

const pessoa3 = new Person('Paula Pimenta' , new Date('1975-06-02T00:00:00') , Gender.Female)

// livros
const livro1 = new Book(123324, 1, 1,'Quem é você, Alasca?', 'O primeiro amigo, a primeira garota, as últimas palavras',  new Date('2005-03-03T00:00:00') , pessoa1)

const livro2 = new Book(25367, 1, 2,'Percy Jackson e os Olimpianos', 'O mar de monstros',  new Date('2006-04-01T00:00:00') , pessoa2)

const livro3 = new Book(123324, 1, 3,'Minha vida fora de série', '3ª temporada',  new Date('2015-07-07T00:00:00') , pessoa1)

// periodicais

const periodical1 = new Periodical(2445, 1, 2112, 'Super Interessante', 'Origem da vida', new Date('2006-05-03T00:00:00') , pessoa1 )

const periodical2 = new Periodical(2443, 1, 333, 'Super Interessante', 'Universos paralelos', new Date('2015-07-16T00:00:00') , pessoa2 )

const periodical3 = new Periodical(2443, 1, 333, 'Super Interessante', 'A Era da burrice', new Date('2013-12-22T00:00:00') , pessoa2 )

// arrays com as instancias
const pessoas = [pessoa1, pessoa2, pessoa3]

const livros = [livro1, livro2, livro3]

const periodicais = [periodical1, periodical2, periodical3]

// consoles pros arrays
console.log(pessoas)

console.log(livros)

console.log(periodicais)