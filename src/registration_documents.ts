import Book from './entities/Book.js'
import Periodical from './entities/Periodical.js'
import Person from './entities/Person.js'
import {showPersons} from './registration_person.js'

const selectType = document.querySelector<HTMLSelectElement>("#type")!
const filtro = document.querySelector<HTMLSelectElement>('#search')!
const title = document.querySelector<HTMLInputElement>('#title')!
const subtitle = document.querySelector<HTMLInputElement>('#subtitle')!
const publishedAt = document.querySelector<HTMLInputElement>('#publishedAt')!
const author = document.querySelector<HTMLSelectElement>('#author')!
const isbn = document.querySelector<HTMLInputElement>('#isbn')!
const edition = document.querySelector<HTMLInputElement>('#edition')!
const volume = document.querySelector<HTMLInputElement>('#volume')!
const issn = document.querySelector<HTMLInputElement>('#issn')!
const issue = document.querySelector<HTMLInputElement>('#issue')!
const message = document.querySelector<HTMLParagraphElement>("#result")!
const button = document.querySelector<HTMLButtonElement>("#button_doc")!
const buttonb = document.querySelector<HTMLButtonElement>("#limparb")!
const filtrarb = document.querySelector<HTMLInputElement>("#filterb")!
const buttonp = document.querySelector<HTMLButtonElement>("#limparp")!
const filtrarp = document.querySelector<HTMLInputElement>("#filterp")!
const table = document.querySelector('table')!
const books: Book[] = []
const periodicos: Periodical[] =[]

selectType.addEventListener('change', (event) => {
    message.innerText = "";
    if(selectType.value){
        if(selectType.value == "b"){
            title.style.display = "block";
            subtitle.style.display = "block";
            publishedAt.style.display = "block";
            author.style.display = "block";
            isbn.style.display = "block";
            edition.style.display = "block";
            volume.style.display = "block";
            issue.style.display = "none";
            issn.style.display = "none";
            button.style.display = "block";
            showSelect();
        }
        else if(selectType.value == "p"){
            title.style.display = "block";
            subtitle.style.display = "block";
            publishedAt.style.display = "block";
            author.style.display = "block";
            issue.style.display = "block";
            issn.style.display = "block";
            volume.style.display = "block";
            isbn.style.display = "none";
            edition.style.display = "none";
            button.style.display = "block";
            showSelect();
        }
    }
    else{
        title.style.display = "none";
        subtitle.style.display = "none";
        publishedAt.style.display = "none";
        author.style.display = "none";
        issue.style.display = "none";
        issn.style.display = "none";
        volume.style.display = "none";
        isbn.style.display = "none";
        edition.style.display = "none";        
        button.style.display = "none";
        table.style.display = "none";
        showSelect();
    }
});

let personsLocalStorage: Array<Person> = JSON.parse(localStorage.getItem("persons")|| '{}')
let nomes = personsLocalStorage.map(p=> p.name)

button.addEventListener('click', (e: Event)=>{
    e.preventDefault()

    var indice = author.value;

    var person = personsLocalStorage[parseInt(indice)]

    const valorAuthor = author.value.trim()

    const capitalize = (text: string) => {
        const words = text.split(' ')
      
        for (let i = 0; i < words.length; i++) {
          words[i] =
            words[i].substr(0, 1).toUpperCase() +
            words[i].substr(1).toLowerCase()
        }
        return words.join(' ')
            .replace(/ a /gi, ' a ')
            .replace(/ a /gi, ' as ')
            .replace(/ o /gi, ' o ')
            .replace(/ a /gi, ' os ')
            .replace(/ e /gi, ' e ')
            .replace(/ da /gi, ' da ')
            .replace(/ a /gi, ' das ')
            .replace(/ de /gi, ' de ')
            .replace(/ do /gi, ' do ')
            .replace(/ dos /gi, ' dos ')
            .replace(/ a /gi, ' na ')
            .replace(/ a /gi, ' nas ')
            .replace(/ a /gi, ' no ')
    }
      
    const trimAll = (text: string) => text.trim().replace(/\s+/g, ' ')
    
    if(selectType.value == "b"){

        if(!title.value.trim()){
            message.innerText = 'O campo título é obrigatório!'
            title.focus()
            return
        }
    
        if(!subtitle.value.trim()){
            message.innerText = 'O campo subtítulo é obrigatório!'
            subtitle.focus()
            return
        }
    
        if(!publishedAt.value){
            message.innerText = 'O campo de data é obrigatório!'
            publishedAt.focus()
            return
        }
    
        const publishedAt2 = new Date(`${publishedAt.value}T00:00:00`)
    
        if (Date.now() - Number(publishedAt2) < 0) {
            publishedAt.innerText = 'A publicação deve ter ocorrido no passado!'
            publishedAt.focus()
            return
        }
    
        if(!valorAuthor){
            message.innerText = 'O campo autor é obrigatório!'
            author.focus()
            return
        }
        if(!isbn.value.trim()){
            message.innerText = 'O campo isbn é obrigatório!'
            isbn.focus()
            return
        }

        if (isNaN(parseInt(isbn.value))) {
            message.innerText = "Digite somente números no campo isbn"
            return false
        }
    
        if(!edition.value.trim()){
            message.innerText = 'O campo edição é obrigatório!'
            edition.focus()
            return
        }

        if (isNaN(parseInt(edition.value))){
            message.innerText = "Digite somente números no campo edição"
            return false
        }

        if(!volume.value.trim()){
            message.innerText = 'O campo volume é obrigatório!'
            volume.focus()
            return
        }

        if (isNaN(parseInt(volume.value))){
            message.innerText = "Digite somente números no campo volume"
            return false
        }

        try{
            var publishedAtb = new Date(publishedAt.value)
            var isbnb = parseInt(isbn.value)
            var editionb = parseInt(edition.value)
            var volumeb = parseInt(volume.value)

            const book = new Book(isbnb, editionb, volumeb, capitalize(trimAll(title.value)), subtitle.value, publishedAtb, person)
            
            books.push(book)   
            localStorage.setItem('books', JSON.stringify(books))
            showBooks() 
            message.innerText = "O livro" + capitalize(trimAll(title.value)) + " foi cadastrado com sucesso!"
        }
        catch{
            message.innerText = 'Errroor, tente novamente!'
        }
        isbn.value = ''
        edition.value = ''
        volume.value = ''
        title.value = ''
        subtitle.value =''
        publishedAt.value = ''
        author.value = ''
    }
    else if (selectType.value == 'p'){
                
            if(!title.value.trim()){
                message.innerText = 'O campo título é obrigatório!'
                title.focus()
                return
            }

            if(!subtitle.value.trim()){
                message.innerText = 'O campo subtítulo é obrigatório!'
                subtitle.focus()
                return
            }

            if(!publishedAt.value){
                message.innerText = 'O campo de data é obrigatório!'
                publishedAt.focus()
                return
            }

            const publishedAt2 = new Date(`${publishedAt.value}T00:00:00`)

            if (Date.now() - Number(publishedAt2) < 0) {
                publishedAt.innerText = 'A publicação deve ter ocorrido no passado!'
                publishedAt.focus()
                return
            }

            if(!valorAuthor){
                message.innerText = 'O campo autor é obrigatório!'
                author.focus()
                return
            }

            if(!issn.value.trim()){
                message.innerText = 'O campo issn é obrigatório!'
                issn.focus()
                return
            }
            
            if (isNaN(parseInt(issn.value)))
            {
                message.innerText = "Digite somente números no campo issn"
                return false
            }
        
            if(!issue.value.trim()){
                message.innerText = 'O campo  issue é obrigatório!'
                issue.focus()
                return
            }
                
            if (isNaN(parseInt(issue.value))){
                message.innerText = "Digite somente números no campo issue"
                return false
            }

        try{    
            var issnp = parseInt(issn.value)
            var issuep = parseInt(issue.value)
            var volumep = parseInt(volume.value)
            var publishedAtp = new Date(publishedAt.value)
        
            const periodico = new Periodical(issnp,volumep, issuep,capitalize(trimAll(title.value)), subtitle.value, publishedAtp, person)

            periodicos.push(periodico)
            localStorage.setItem('periodicos', JSON.stringify(periodicos))
            showPeriodicais()

            message.innerText = "O periódico" + capitalize(trimAll(title.value)) + "foi cadastrado com sucesso!"
        }
        catch{
            message.innerText = "Errrrrror, tente novamente!"
        }
        issn.value = ""
        volume.value = ""
        issue.value = "" 
        title.value = ""
        subtitle.value = ""
        publishedAt.value = ""
        author.value = ""

    } 
})

function showBooks() {
    if (localStorage.getItem('books')) {
      const data = JSON.parse(localStorage.getItem('books')!)
  
         books.splice(0)
  
      for (const item of data) {
          books.push(new Book(
          item.isbn,
          item.edition, 
          item.volume,
          item.title,
          item.subtitle,
          item.publishedAt,
          item.author
        ))
      }
    }
    
    let booksLocalStorage: Array<Book> = JSON.parse(localStorage.getItem("books")|| '{}')
   
    const sortTitle = (a: typeof booksLocalStorage[0], b: typeof booksLocalStorage[0]) => a.title.localeCompare(b.title.toString())

    let ord =  [...booksLocalStorage].sort(sortTitle)

    let lines = ''
 
    for (const book of ord) {

    lines +=  `
        <tr>
            <td>${ (book as Book).isbn }</td>
            <td>${ (book as Book).edition }</td>
            <td>${ (book as Book).volume }</td>
            <td>${ (book as Book).title }</td>
            <td>${ (book as Book).subtitle }</td>
            <td>${ (book as Book).publishedAt }</td>
            <td>${ (book as Book).author.name }</td>
        </tr>
    `
    }

    table.style.display = 'table'
    table.innerHTML = `
    <thead>
        <tr> 
            <th> Isbn </th>
            <th> Edition </th>
            <th> Volume </th>
            <th> Title </th>
            <th> Subtitle </th>
            <th> Data </th>
            <th> Autor </th
        </tr>       
    </thead>
    <tbody>
        ${lines}
    </tbody>
    `
}


function showPeriodicais() {
    if (localStorage.getItem('periodicos')) {
      const data = JSON.parse(localStorage.getItem('periodicos')!)
  
       periodicos.splice(0)
  
      for (const item of data) {
        periodicos.push(new Periodical(
          item.issn,
          item.volume,
          item.issue,
          item.title,
          item.subtitle,
          item.publishedAt,
          item.author
        ))
      }
    }
    let periodicosLocalStorage: Array<Periodical> = JSON.parse(localStorage.getItem("periodicos")|| '{}')
   
    const sortTitle = (a: typeof periodicosLocalStorage[0], b: typeof periodicosLocalStorage[0]) => a.title.localeCompare(b.title.toString())

    let ord =  [...periodicosLocalStorage].sort(sortTitle)

    let lines = ''
 
    for (const periodico of ord) {

    lines +=  `
        <tr>
        <td>${ (periodico as Periodical).issn }</td>
        <td>${ (periodico as Periodical).volume }</td>
        <td>${ (periodico as Periodical).issue }</td>
        <td>${ (periodico as Periodical).title }</td>
        <td>${ (periodico as Periodical).subtitle }</td>
        <td>${ (periodico as Periodical).publishedAt}</td>
        <td>${ (periodico as Periodical).author.name }</td>
        </tr>
    `
    }

    table.style.display = 'table'
    table.innerHTML = `
    <thead>
        <tr> 
            <th>Issn</th>
            <th>Volume</th>
            <th>Issue</th>
            <th>Título</th>
            <th>Subtítulo</th>
            <th>Data</th>
            <th>Autor</th>
        </tr>       
    </thead>
    <tbody>
        ${lines}
    </tbody>
    `
}

function showSelect(){
    author.options.length = 0
    author.add(new Option("Selecione uma opção:",  ""))
    for (var i = 0; i <= nomes.length; i++) {
        author.add(new Option(nomes[i].toString(), i.toString()));
    }           
}

filtro.addEventListener('change', event => {
    if (filtro.value){
        if(filtro.value == "b"){
            filtrarb.style.display = "block"
            buttonb.style.display = "block"
            filtrarp.style.display = "none"
            buttonp.style.display = "none"
            filtrarb.addEventListener("keyup", event => {
                filtrob()
            });
            showBooks();
        }
        else if(filtro.value == "p"){
            filtrarp.style.display = "block"
            buttonp.style.display = "block"
            filtrarb.style.display = "none"
            buttonb.style.display = "none"
            filtrarp.addEventListener("keyup", filtrop);
            showPeriodicais();
        }
    }
    else{
        filtrarb.style.display = "none"
        buttonb.style.display = "none"
        filtrarp.style.display = "none"
        buttonp.style.display = "none"
        table.innerHTML = ''
    }
})

function filtrob(){
    if (!filtrarb.value){
        showBooks()
    }
    else{
        let booksLocalStorage: Array<Book> = JSON.parse(localStorage.getItem("books")|| '{}')

        // filtrar 
        const onlyBooks = (obj: typeof booksLocalStorage[0]) => obj.title.includes(filtrarb.value)

        let filter = booksLocalStorage.filter(onlyBooks)
        let lines = ''
    
        for (const book of filter) {

        lines +=  `
            <tr>
                <td>${ (book as Book).isbn }</td>
                <td>${ (book as Book).edition }</td>
                <td>${ (book as Book).volume }</td>
                <td>${ (book as Book).title }</td>
                <td>${ (book as Book).subtitle }</td>
                <td>${ (book as Book).publishedAt }</td>
                <td>${ (book as Book).author.name }</td>
            </tr>
        `
        }

        table.style.display = 'table'
        table.innerHTML = `
        <thead>
            <tr> 
                <th> Isbn </th>
                <th> Edition </th>
                <th> Volume </th>
                <th> Title </th>
                <th> Subtitle </th>
                <th> Data </th>
                <th> Autor </th
            </tr>       
        </thead>
        <tbody>
            ${lines}
        </tbody>
        `
        }
}

function filtrop(){
    if(!filtrarp.value){
        showPeriodicais()
    }
    else{
        let periodicalLocalStorage: Array<Periodical> = JSON.parse(localStorage.getItem("periodicos")|| '{}')

        // filtrar 
        const onlyPeriodicos= (obj: typeof periodicalLocalStorage[0]) => obj.title.includes(filtrarp.value)

        let filter = periodicalLocalStorage.filter(onlyPeriodicos)
        let lines = ''
    
        for (const periodico of filter) {

        lines +=  `
            <tr>
            <td>${ (periodico as Periodical).issn }</td>
            <td>${ (periodico as Periodical).volume }</td>
            <td>${ (periodico as Periodical).issue }</td>
            <td>${ (periodico as Periodical).title }</td>
            <td>${ (periodico as Periodical).subtitle }</td>
            <td>${ (periodico as Periodical).publishedAt}</td>
            <td>${ (periodico as Periodical).author.name }</td>
            </tr>
        `
        }

        table.style.display = 'table'
        table.innerHTML = `
        <thead>
            <tr> 
                <th>Issn</th>
                <th>Volume</th>
                <th>Issue</th>
                <th>Título</th>
                <th>Subtítulo</th>
                <th>Data</th>
                <th>Autor</th>
            </tr>       
        </thead>
        <tbody>
            ${lines}
        </tbody>
        `
        }
}