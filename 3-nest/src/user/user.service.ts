import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
    private users: Map<number,User> = new Map<number,User>();

    constructor(){
        this.populate();
    }

    getAll(){
        var populatedData = [];
        for(const user of this.users.values()){
            populatedData.push(user.toJson());
        }
        this.logAllUsers();
        return populatedData;
    }

    populate(){
        for(var i = 1; i < 4; i++){
            var ID:string = this.ids();
            var name:string = this.name();
            var pwd: string = this.pwd();
            var age: number = this.age();
            var email: string = this.email(name);
            console.log(pwd);
            this.users.set(i,new User(ID,name,age,email,pwd));
        }
    }

    ids() {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '@' + Math.random().toString(36).substr(2, 9);
    };

    name(){
        const fName = ['John', 'Doe', 'Mary', 'Charles', 'Jaime'];
        const lName = ['Fernandez', 'Valdez', 'Montecarlos','Villanueva', 'Villegas'];
        var randF:number=Math.floor(Math.random() * fName.length);
        var randL:number=Math.floor(Math.random() * lName.length);
        var newName = fName[randF] + ' ' + lName[randL];
        return newName;
    }

    
    email(name:string){
        var ext1 = ['gmail', 'yahoo', 'usjr', 'email'];
        var ext2 = ['com', 'ph'];
        var newName = name.replace(/ /, '_');
        var rand1:number = Math.floor(Math.random() * ext1.length);
        var rand2:number = Math.floor(Math.random() * ext2.length);
        var ext:string = ext1[rand1] + '.' + ext2[rand2];
        var email = newName + '@' + ext;
        return email;
    }

    pwd(){
        var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;

    }

    age(){
        return Math.floor(Math.random() * 40) + 15;
    }
    
    register(body: any) {
        var newUser:User;
        newUser = new User(body?.id,body?.name,body?.age,body?.email,body?.password);
        if(body.register() === true){     
            this.users.set(body.id,newUser);
            this.logAllUsers();
        }
        else
            console.log("User already registered!");
    }
    

    logAllUsers(){
        console.log('----------------------------------------------------------------')
        console.log('User Credentials')
        for(const [key,user] of this.users.entries()){
            console.log(`Key: ${key}`);
            console.log(user.toJson());
        }
        console.log('----------------------------------------------------------------')
    }

    getID(id:string){
        console.log('----------------------------------------------------------------\n')
        // if(this.users.get(id) === undefined){
        //     console.log(`\t${id} does not exist in the database!`);
        //     console.log(`\n----------------------------------------------------------------`);
        // }
        // else{
        //     console.log(`\t${id} is now Collected!`);
        //     console.log(`\n----------------------------------------------------------------`);
        //     return this.users.get(id).toJson;
        // }
    }

    
    // populate(){
    //     var ID:string = this.ids();
    //     var name:string = this.name();
    //     var pwd: string = this.pwd();
    //     var age: number = this.age();
    //     var email: string = this.email(name);
    //     console.log(pwd);
    //     this.users.set(1,new User(ID,name,age,email,pwd));
    //     var ID:string = this.ids();
    //     var name:string = this.name();
    //     var pwd: string = this.pwd();
    //     var age: number = this.age();
    //     var email: string = this.email(name);
    //     console.log(pwd);
    //     this.users.set(2,new User(ID,name,age,email,pwd));
    //     var ID:string = this.ids();
    //     var name:string = this.name();
    //     var pwd: string = this.pwd();
    //     var email: string = this.email(name);
    //     var age: number = this.age();
    //     console.log(pwd);
    //     this.users.set(3,new User(ID,name,age,email,pwd));
    //     var ID:string = this.ids();
    //     var name:string = this.name();
    //     var pwd: string = this.pwd();
    //     var email: string = this.email(name);
    //     var age: number = this.age();
    //     console.log(pwd);
    //     this.users.set(4,new User(ID,name,age,email,pwd));
    // }

    // populate(){
    //     var ID:string = this.ids();
    //     var name:string = this.name();
    //     var pwd: string = this.pwd();
    //     var age: number = this.age();
    //     //var email: string = this.email(name);
    //     console.log(pwd);
    //     this.users.set(1,new User(ID,name,age,'email@email.com',pwd));
    //     var ID:string = this.ids();
    //     var name:string = this.name();
    //     var pwd: string = this.pwd();
    //     var age: number = this.age();
    //     //var email: string = this.email(name);
    //     console.log(pwd);
    //     this.users.set(2,new User(ID,name,age,'email@email.com',pwd));
    //     var ID:string = this.ids();
    //     var name:string = this.name();
    //     var pwd: string = this.pwd();
    //     //var email: string = this.email(name);
    //     var age: number = this.age();
    //     console.log(pwd);
    //     this.users.set(3,new User(ID,name,age,'email@email.com',pwd));
    //     var ID:string = this.ids();
    //     var name:string = this.name();
    //     var pwd: string = this.pwd();
    //     //var email: string = this.email(name);
    //     var age: number = this.age();
    //     console.log(pwd);
    //     this.users.set(4,new User(ID,name,age,'email@email.com',pwd));
    // }

}
