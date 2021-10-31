import { uid } from 'uid'
import { User } from './user.model'
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
    //removes an item matching the value from the array
    static removeItemOnce(arr: Array<any>, value: any): Array<any> {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }
    static populate(): Map<string, User> {
        var result: Map<string, User> = new Map<string, User>();
        try {
            var users = [
                new User('Leanne Graham', 18, 'sincere@april.biz', 'LG_123456'),
                new User('Ervin Howell', 21, 'shanna@melissa.tv', 'EH_123123'),
                new User('Nathan Plains', 25, 'nathan@yesenia.net', 'NP_812415'),
                new User('Patricia Lebsack', 18, 'patty@kory.org', 'PL_12345'),
            ];
            users.forEach((user) => {
                result.set(user.id, user);
            });
            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static validBody(body: any): { valid: boolean; data?: string | null } {
        try {
            //   var keys: Array<string> = Helper.describeClass(User);
            var keys: Array<string> = ['name', 'age', 'email', 'password'];
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
                        ]} is not a valid entry, expecting ${key}:${types.get(key)}`
                    );
                }
            }
            return { valid: true, data: null };
        } catch (error) {
            if (error instanceof Error) return { valid: false, data: error.message };
            else return { valid: false, data: 'unknown error' };
        }
    }

    static validBodyPut(body: any): { valid: boolean; data?: string | null } {
        try {
            var bodyValidation: { valid: boolean; data?: string | null } =
                this.validBody(body);
            if (bodyValidation.valid) {
                var keys: Array<string> = Helper.describeClass(User);
                keys = Helper.removeItemOnce(keys, 'id');
                for (const key of Object.keys(body)) {
                    if (keys.includes(`${key}`)) {
                        keys = Helper.removeItemOnce(keys, key);
                    }
                }
                if (keys.length > 0) {
                    throw Error(`Payload is missing ${keys}`);
                }
                return { valid: true, data: null };
            } else throw Error(`{bodyValidation.data}`);
        } catch (error) {
            if (error instanceof Error) return { valid: false, data: error.message };
            else return { valid: false, data: 'unknown error' };
        }
    }
}