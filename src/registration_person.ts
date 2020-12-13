import Person from './entities/Person.js'
import {Gender} from './entities/Person.js'

const name = document.querySelector<HTMLInputElement>('#name')!
const birth = document.querySelector<HTMLInputElement>('#birth')!
const gender = document.querySelector<HTMLSelectElement>('#gender')!
const message = document.querySelector<HTMLParagraphElement>('#message')!
const buttonl = document.querySelector<HTMLButtonElement>("#limpar")!
const filtrar = document.querySelector<HTMLInputElement>("#filter")!
const buttonc = document.querySelector<HTMLInputElement>("#button_person")!
const form = document.querySelector('form')!
const table = document.querySelector('table')!


const persons: Person[] = [] 
showPersons()


buttonc.addEventListener('click', (e: Event) =>
{
    e.preventDefault()
   
    message.innerText = ""
    const valorNome = name.value.trim()

    if (!valorNome)
    {
        message.innerText = 'O campo nome é obrigatório!'
        name.focus()
        return
    }

    const regexNome = /\w+\s\w+/g

    if(!regexNome.test(valorNome)){
        message.innerText = 'Digite seu nome completo!'
        name.focus()
        return
    }

    if(!birth.value){
        message.innerText = 'O campo data é obrigatório!'
        birth.focus()
        return
    }

    const dataNascimento = new Date(`${birth.value}T00:00:00`)
    console.log(birth.value)

    if (Date.now() - Number(dataNascimento) < 0) {
        message.innerText = 'O nascimento deve ter ocorrido no passado!'
        birth.focus()
        return
    }

    if(!gender.value){
        message.innerText= 'O campo sexo é obrigatório!'
        gender.focus()
        return
    }

    const capitalize = (text: string) => {
        const words = text.split(' ')
    
        for (let i = 0; i < words.length; i++) {
        words[i] =
            words[i].substr(0, 1).toUpperCase() +
            words[i].substr(1).toLowerCase()
        }
    
        return words.join(' ')
            .replace(/ e /gi, ' e ')
            .replace(/ da /gi, ' da ')
            .replace(/ de /gi, ' de ')
            .replace(/ do /gi, ' do ')
            .replace(/ dos /gi, ' dos ')

    }
    
    const trimAll = (text: string) => text.trim().replace(/\s+/g, ' ')
    
    
    try{
        var birthNew = new Date(birth.value)

        const person = new Person(capitalize(trimAll(name.value)), birthNew, gender.value === 'f' ? Gender.Female : Gender.Male)  

        persons.push(person)

        localStorage.setItem('persons', JSON.stringify(persons))
        showPersons()
        message.innerText = capitalize(trimAll(name.value)) + "  cadastrado(a) com sucesso!"
    }

    catch(error: any){
        message.innerText = 'Opa, ocorreu um erro aqui.'
    }
   
    name.value = ''
    birth.value = ''
    gender.value = ''
})

export function showPersons() {
    if (localStorage.getItem('persons')) {
      const data = JSON.parse(localStorage.getItem('persons')!)
  
       persons.splice(0)
  
      for (const item of data) {
        persons.push(new Person(
          item.name,
          item.birth,
          item.gender
        ))
      }
    }

    let personsLocalStorage: Array<Person> = JSON.parse(localStorage.getItem("persons")|| '{}')

    // ordenar em ordem
    const sortNomes = (a: typeof personsLocalStorage[0], b: typeof personsLocalStorage[0]) => a.name.localeCompare(b.name.toString())
    let ord =  [...personsLocalStorage].sort(sortNomes)

    let lines = ''

    for (const person of ord) {

    lines +=  `
        <tr>
        <td>${ (person as Person).name }</td>
        <td>${ (person as Person).birth }</td>
        <td>${ (person as Person).gender   }</td>

        </tr>
    `
    }

    table.style.display = 'table'
    table.innerHTML = `
    <thead>
        <tr> 
           <th> Autor </th>
           <th> Data </th>
           <th> Sexo </th>
        </tr>       
    </thead>
    <tbody>
        ${lines}
    </tbody>
    `
}

filtrar.addEventListener("keyup", filtro);

function filtro(){
    if (!filtrar.value){
        showPersons()
    }
    else{
        let personsLocalStorage: Array<Person> = JSON.parse(localStorage.getItem("persons")|| '{}')

        // filtrar 
        const onlyPersons = (obj: typeof personsLocalStorage[0]) => obj.name.includes(filtrar.value)

        let filter = personsLocalStorage.filter(onlyPersons)
        let lines = ''
    

        for (const person of filter) {

            lines +=  `
                <tr>
                <td>${ (person as Person).name }</td>
                <td>${ (person as Person).birth }</td>
                <td>${ (person as Person).gender   }</td>

                </tr>
            `
        }

        table.style.display = 'table'
        table.innerHTML = `
        <thead>
            <tr> 
            <th> Autor </th>
            <th> Data </th>
            <th> Sexo </th>
            </tr>       
        </thead>
        <tbody>
            ${lines}
        </tbody>
        `   
        }
}


buttonl.addEventListener('click', event =>{
    showPersons()
})