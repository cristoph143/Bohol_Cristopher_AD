export class User{
    private id: string;
    private name: string;
    private age:number;
    private email:string;
    private password: string;

    constructor(id:string,name:string,age:number,email:string,password:string){
        this.id=id;
        this.name=name;
        this.age=age;
        this.email = email;
        this.password = password;
    }

    get emails(){
        return this.email;
    }

    set emails(email:string){
        this.emails = email;
    }

    toJson(){
        return {
            id: this.id,
            name:this.name,
            age: this.age,
            email: this.email
        }
    }

    modify(body:any){
        if(body.id != null)
            this.id = body.id;
        if(body.email != null)
            this.email = body.email;
        if(body.age != null)
            this.age = body.age;
        if(body.name != null)
            this.name = body.name;
        if(body.password != null)
            this.password = body.password;
    }

    validationEmail(email:string){
        if(email !== this.email){
            return true;
        }
        else{
            return false;
        }
    }

    validateID(id:string){
        console.log(id);
        if(id === this.id){
            console.log(id);
            console.log(this.id);
            return true;
        }
        else{
            console.log(id);
            console.log(this.id);
            return false;
        }
    }

    retTermResult(term:any){
        var name: any[];
        name = this.name.split(' ');
        if(this.id === term || name[0].toString() === term || name[1] === term || this.name.toLowerCase() === term.toLowerCase()
        ||  this.age === term || this.email.toLowerCase() === term.toLowerCase()){
            console.log(`${this.name.split(' ')} split`);
            return true;
        } 
        else{
            return false;
        }
    }



    login(email:string, password:string){
        if(email === this.email && password === this.password){
            return true;
        }
        else{
            return false;
        }
    }


    pri(){
        console.log(`DID: ${this.id}\nName: ${this.name}\nAge: ${this.age}\nEmail: ${this.email}\nPassword: ${this.password}\n---End---\n`);
    }
}

