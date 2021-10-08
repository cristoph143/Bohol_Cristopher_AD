import { v4 as uid } from 'uuid';
import { User } from '../user.model';
export class Helper {
  //returns an array of attributes as defined in the class
    static describeClass(typeOfClass: any): Array<any> {
        let a = new typeOfClass();
        let array = Object.getOwnPropertyNames(a);
        return array;
    }

    static generateUID(): string {
        return uid().toString().replace(/-/g, '').substring(0, 27);
    }

    static full_name():string {
        const fName = ['John', 'Doe', 'Mary', 'Charles', 'Jaime'];
        const lName = ['Fernandez', 'Valdez', 'Montecarlos','Villanueva', 'Villegas'];
        var randF:number=Math.floor(Math.random() * fName.length);
        var randL:number=Math.floor(Math.random() * lName.length);
        var newName = fName[randF] + ' ' + lName[randL];
        return newName;
    }

    static email(name:string) {
        var ext1 = ['gmail', 'yahoo', 'usjr', 'email'];
        var ext2 = ['com', 'ph'];
        var newName = name.replace(/ /, '_');
        var rand1:number = Math.floor(Math.random() * ext1.length);
        var rand2:number = Math.floor(Math.random() * ext2.length);
        var ext:string = ext1[rand1] + '.' + ext2[rand2];
        var email = newName + '@' + ext;
        return email;
    }

    static pwd():string {
        var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    static age():number {
        return Math.floor(Math.random() * 40) + 15;
    }

    //removes an item matching the value from the array
    static removeItemOnce(arr: Array<any>, value: any): Array<any> {
        var index = arr.indexOf(value);
        if (index > -1) {
        arr.splice(index, 1);
        }
        return arr;
    }

    // static populate(): Map<string, User> {
    //     var result: Map<string, User> = new Map<string, User>();
    //     try {
    //     var users = [
    //         new User('Leanne Graham', 18, 'sincere@april.biz', 'LG_123456'),
    //         new User('Ervin Howell', 21, 'shanna@melissa.tv', 'EH_123123'),
    //         new User('Nathan Plains', 25, 'nathan@yesenia.net', 'NP_812415'),
    //         new User('Patricia Lebsack', 18, 'patty@kory.org', 'PL_12345'),
    //     ];
    //     users.forEach((user) => {
    //         result.set(user.id, user);
    //     });
    //     return result;
    //     } catch (error) {
    //     console.log(error);
    //     return null;
    //     }
    // }

    static populate(): Map<string, User> {
        var result: Map<string, User> = new Map<string, User>();
        var users:Array<any> = [];
        try {
            for(var i = 0; i < 4; i++){
                var result: Map<string, User> = new Map<string, User>();
                var id:string = Helper.generateUID();
                var name:string = Helper.full_name();
                var pwd: string = Helper.pwd();
                var age: number = Helper.age();
                var email: string = Helper.email(name);
                result.set(id,new User(name,age,email,pwd,id));
            }
        return result;
        } catch (error) {
        console.log(error);
        return null;
        }
    }

    static validBody(body: any): { valid: boolean; data: string } {
        try {
        var keys: Array<string> = Helper.describeClass(User);
        var types: Map<string, string> = new Map<string, string>();
        types.set('name', typeof '');
        types.set('age', typeof 0);
        types.set('email', typeof '');
        types.set('password', typeof '');
        for (const key of Object.keys(body)) {
            if (!keys.includes(`${key}`) && typeof body[key] != types.get(key)) {
            return { valid: false, data: `${key} is not a valid attribute` };
            }
            if (typeof body[key] != types.get(key)) {
            throw new Error(
                `${key} with value ${body[key]} with type ${typeof body[
                key
                ]} is not a valid entry, expecting ${key}:${types.get(key)}`,
            );
            }
        }
        return { valid: true, data: null };
        } catch (error) {
        return { valid: false, data: error.message };
        }
    }

    static validBodyPut(body: any): { valid: boolean; data: string } {
        try {
        var bodyValidation: { valid: boolean; data: string } =
            this.validBody(body);
        if (bodyValidation.valid) {
            var keys: Array<string> = Helper.describeClass(User);
            keys = Helper.removeItemOnce(keys, "id");
            for (const key of Object.keys(body)) {
            if (keys.includes(`${key}`)) {
                keys = Helper.removeItemOnce(keys, key);
            }
            }
            if (keys.length > 0) {
            throw Error(`Payload is missing ${keys}`);
            }
            return { valid: true, data: null };
        } else throw Error(bodyValidation.data);
        } catch (error) {
        return { valid: false, data: error.message };
        }
    }
    
}