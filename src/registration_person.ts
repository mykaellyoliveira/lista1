import Person from './entities/Person.js'
import {Gender} from './entities/Person.js'

const name = document.querySelector<HTMLInputElement>('#name')!
const birth = document.querySelector<HTMLInputElement>('#birth')!
const gender = document.querySelector<HTMLSelectElement>('#gender')!
const message = document.querySelector<HTMLParagraphElement>('#message')!
const form = document.querySelector('form')!

const persons: Person[] = [] 
showPersons()

form.addEventListener('submit', (e: Event) =>
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
    try{
        var birthNew = new Date(birth.value)

        const person = new Person(name.value, birthNew, gender.value === 'f' ? Gender.Female : Gender.Male)  

        persons.push(person)

        localStorage.setItem('persons', JSON.stringify(persons))
        showPersons()
        message.innerText = name.value + "  cadastrado(a) com sucesso!"
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
}