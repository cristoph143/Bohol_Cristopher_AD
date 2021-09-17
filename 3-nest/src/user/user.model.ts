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
            return true;
        }
        else{
            return false;
        }
    }

    // retTermResult(term:string){
        
    // }



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

