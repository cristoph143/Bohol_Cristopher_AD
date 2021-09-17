import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
    private users: Map<string,User> = new Map<string,User>();

    constructor(){
        this.populate();
    }

    register(body: any) {
    var newUser:User;
        var ID:string = this.ids();
        var chck:boolean;
        var message:string;
        var val:{};

        for(const [key,user] of this.users.entries()){
            chck = user.validationEmail(body.email);
        }
        
        if(chck === true){
            newUser = new User(ID,body?.name,body?.age,body?.email,body?.password);
            this.users.set(ID, newUser);
            message = `Id ${ID} of Email ${body.email} is registered successfully!`;
            val = this.ret(message,chck);
        }
        else{
            message = `\tId ${ID} of Email ${body.email} is already registered!`;
            val = this.ret(message,chck);
        }
        return val;
    }

    getAll(){
        var newUser:User;
        var populatedData = [];
        for(const user of this.users.values())
            populatedData.push(user.toJson());
        this.logAllUsers();
        return populatedData;
    }

    populate(){
        var newUser:User;
        for(var i = 1; i < 4; i++){
            var ID:string = this.ids();
            var name:string = this.name();
            var pwd: string = this.pwd();
            var age: number = this.age();
            var email: string = this.email(name);
            console.log(pwd);
            this.users.set(ID,new User(ID,name,age,email,pwd));
            // newUser = new User(ID,name,age,email,pwd);
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
    
    logAllUsers(){
        console.log('----------------------------------------------------------------')
        console.log('User Credentials')
        for(const [key,user] of this.users.entries()){
            // console.log(`Key: ${key}`);
            // console.log(user.toJson());
            user.pri();
        }
        console.log('----------------------------------------------------------------')
    }

    getID(id:string){
        var chck:boolean;
        var newUser:User;
        var message:string;
        var val:{};

        // for(const [key,user] of this.users.entries()){
        //     chck = user.validateID(id);
        // }

        chck = this.searchID(id);

        if(chck === true){
            message = `Id ${id} is collected Successfully!`;
            val = this.ret(message,chck);
        }
        else{
            message = `Id ${id} is collected Unsuccessfully!`;
            val = this.ret(message,chck);
        }
        return val;
    }

    replaceInfoByID(id:string,body:any){
        var chck:boolean;
        let newUser:User;
        var message:string;
        var val:{};

        chck = this.searchID(id);
        
        if(chck === true){
            newUser = new User(id,body?.name,body?.age,body?.email,body?.password);
            this.users.set(id,newUser)
            message = `Id ${id} is replaced successfully!`;
            val = this.ret(message,chck);
        }
        else{
            message = `Id ${id} has not been found in the database!`;
            val = this.ret(message,chck);
        }
        return val;
    }

    replaceInfoByID2(id:string,body:any){
    var chck:boolean;
        let newUser:User;
        var message:string;
        var val:{};

        chck = this.searchID(id);
        
        if(chck === true){
            newUser = this.users.get(id);
            newUser.modify(body);
            
            console.log("PAAAAAAAAAAAAAATCH ");
            console.log(newUser.toJson());
            // newUser = new User(id,body?.name,body?.age,body?.email,body?.password);
            // this.users.set(id,newUser)
            message = `Id ${id} is replaced successfully!`;
            val = this.ret(message,chck);
        }
        else{
            message = `Id ${id} has not been found in the database!`;
            val = this.ret(message,chck);
        }
        return val;
    }

    searchID(id:string){
        var chck:boolean;
        for(const [key,user] of this.users.entries()){
            chck = user.validateID(id);
        }
        return chck;
    }

    ret(message:string,chck:boolean){
        this.lines();
        console.log(`\t${message}\n`);
        this.lines();
        return {
            "success": chck,
            "message": message
        };
    }

    // updateProfile(id:string,body:any){
    //     var chck:boolean;
    //     var message = "";
    //     let val:{};
    //     console.log(Object.keys(body));
    //     for(const [key,user] of this.users.entries())
    //         chck = this.searchID(id);
            
    //     if(chck === true){
    //         const attributeNames = ["name", "age","email","password"];
            
    //         for(const key of Object.keys(body)){
    //             console.log(`key${key}\nObject.key ${Object.keys(body)} ${body}`);
    //             if(key in attributeNames){
                    
    //             }
    //         }
    //             this.users.set(id, body['key']);
    //         //     if(key in attributeNames) {
    //         //         this.users.set(id,newUser['key']);
    //         //         console.log(this.users.set(id));
    //         //         message = `Id ${id} is replaced successfully!`;
    //         //         val = this.ret(message,chck);
    //         //     }
    //         //     else{
    //         //         message = `Id ${id} has found ivalid data in the database!`;
    //         //         val = this.ret(message,chck);
    //         //     }
    //         // }
    //     }
    //     else{
    //         message = `Id ${id} has not been found in the database!`;
    //         val = this.ret(message,chck);
    //     }
    //     return val;
    // }

    deleteProfile(id:string){
        let message = "";
        let chck = this.searchID(id);
        var val:{};
        if(chck === true){
            this.users.delete(id);
            message = `Id ${id} is deleted successfully!`;
            val = this.ret(message,chck);
        }
        else{
            message = `Id ${id} has not been found in the database!`;
            val = this.ret(message,chck);
        }
        return val;
    }

    lines(){
        console.log('----------------------------------------------------------------\n')
    }

    login(body:any){
        var chck:boolean;
        var message: string;
        var val:{};
        for(const [key,user] of this.users.entries())
            chck = user.login(body.email,body.password);
        
        if(chck === true){
            message = "Login Successfully!";
            val = this.ret(message,chck);        
        }
        else{
            message = "Login Unsuccessfully!";
            val = this.ret(message,chck);
        }
        return val;
    }

    searchTerm(term:any){
        var newUser:User;
        var chck:boolean;
        var resultData = [];
        var message:string;
        var val:{};

        for(const [key,user] of this.users.entries()){
            if (user.retTermResult(term)){
                resultData.push(user.toJson()); 
                message = `${resultData.length} Data has been found!`;
                val = this.ret(message,chck);
            }
        }

        if (!resultData.length){
            message = `${resultData.length} Data has not been found!`;
            chck = false;
            val = this.ret(message,chck);
        }
        resultData.unshift({keyword:term,result:resultData.length});//
        return resultData;


        // for(const [key,user] of this.users.entries()){
        //     const filteredTermss = this.users.
        //     })
        // }
        // for(const [key,user] of this.users.entries()){
        //     if(this.users.has(term)){
        //         console.log(`\t${term} is now Collected!`);
        //         console.log(`\tKey: ${key}`);
        //         console.log(`\t${user}`);
        //             console.log(`\n----------------------------------------------------------------`);
        //             break;
        //     }
        //     else{ 
        //         console.log(`\t${term} does not exist in the database!`);
        //             console.log(`\n----------------------------------------------------------------`);
        //     }
        // }
    }
}
