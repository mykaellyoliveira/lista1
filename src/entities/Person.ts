export enum Gender{
    Female = 'f',
    Male = 'm'
}

class Person
{
    name : String;
    birth : Date;
    gender : Gender;

    constructor (name: String, birth : Date , gender: Gender)
    {
        this.name = name;
        this.birth = birth;
        this.gender = gender;
    }
}

export default Person;