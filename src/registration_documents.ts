import Book from './entities/Book.js'
import Periodical from './entities/Periodical.js'
import Person from './entities/Person.js'
import {showPersons} from './registration_person.js'

const selectType = document.querySelector<HTMLSelectElement>("#type")!
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
const form = document.querySelector<HTMLFormElement>('form')!

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
        showSelect();
    }
});

const books: Book[] = []
const periodicos: Periodical[] =[]
let personsLocalStorage: Array<Person> = JSON.parse(localStorage.getItem("persons")|| '{}')
let nomes = personsLocalStorage.map(p=> p.name)

form.addEventListener('submit', (e: Event)=>{
    e.preventDefault()

    var indice = author.value;

    var person = personsLocalStorage[parseInt(indice)]

    const valorAuthor = author.value.trim()

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

            const book = new Book(isbnb, editionb, volumeb, title.value, subtitle.value, publishedAtb, person)
            
            books.push(book)   
            localStorage.setItem('books', JSON.stringify(books))
            showBooks() 
            message.innerText = title.value + " livro cadastrado com sucesso!"
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
        
            const periodico = new Periodical(issnp,volumep, issuep,title.value, subtitle.value, publishedAtp, person)

            periodicos.push(periodico)
            localStorage.setItem('periodicos', JSON.stringify(periodicos))
            showPeriodicais()

            message.innerText = title.value + " periódico cadastrado com sucesso!"
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
}

function showSelect(){
    author.options.length = 0
    author.add(new Option("Selecione uma opção:",  ""))
    for (var i = 0; i <= nomes.length; i++) {
        author.add(new Option(nomes[i].toString(), i.toString()));
    }           
}





