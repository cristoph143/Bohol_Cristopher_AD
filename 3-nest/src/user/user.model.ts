import * as admin from 'firebase-admin';

import { CRUDReturn } from "./user.resource/crud_return.interface";
import { Helper } from "./user.resource/helper";

export class User {
    public id: string;
    private name: string;
    private age: number;
    private email: string;
    // private password: string;

    constructor(name: string, age: number, email: string, id?: string) {
        if (id !== undefined) {
            this.id = id;
        } else {
            this.id = Helper.generateUID();
        }
        this.name = name;
        this.age = age;
        this.email = email;
        // this.password = password;
    }

    /*
        Returns: If User exist in Firestore,
                    returns User Database
                else
                    null
    */
    static async retrieveDB(id: string): Promise<User> {
        try {
            var DB = admin.firestore();//connect to database
            var result = await DB.collection("users").doc(id).get();//Get the Data from the Database
            if (result.exists) {//if users exist then register it to the local database(user.model.ts)
                var data = result.data();//callback fnc
                // return new User(data['name'], data['age'], data['email'], data['password'], result.id)
                
                return new User(data['name'], data['age'], data['email'], result.id)
            }
        } catch (error) {
            console.log(error);
            return null;//User ID doesn't exist so return null
        }
    }



    /*
        Returns: If User exist in Firestore,
                    returns User Database
                else
                    null
    */
    async commitDB(): Promise<CRUDReturn> {
        try {
            var DB = admin.firestore();//connect to database
            var result = await DB.collection("users").doc(this.id).set(this.toJson());
            console.log(this.id + ' ho')
            return {
                success: true,
                data: this.toJson()
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                data: error
            }
        }
    }

    static toJsonStatic(body: User) {

        return {
            id: body.id,
            name: body.name,
            age: body.age,
            email: body.email,
            // password: body.password
        }
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            email: this.email,
            // password: this.password
        }
    }
    toJson2() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            email: this.email
        }
    }

    modify(body: any): boolean {
        // // body.commitDB()
        // if (body.id != null)
        //     this.id = body.id;
        // if (body.email != null)
        //     this.email = body.email;
        // if (body.age != null)
        //     this.age = body.age;
        // if (body.name != null)
        //     this.name = body.name;
        // if (body.password != null)
        //     this.password = body.password;
        //     // console.log(user)
        // // user.commitDB()
        // return true;


        try {
            keys = Helper.removeItemOnce(keys, 'id');
            for (const key of Object.keys(body)) {
                this[key] = body[key];
            }
            var keys: Array<string> = Helper.describeClass(User);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //check if email not exist otherwise return false
    static async validationEmail(email: string, options?: { exceptionId: string }): Promise<boolean> {
        try {
            console.log('valid?')
            var DB = admin.firestore();//connect to database
            var result = await DB.collection("users").where("email", "==", email).get();
            // console.log(result)
            if (result.empty) {
                console.log(`Empty Database!`);
                return true;
            }
            for (const doc of result.docs) {
                var data = doc.data();
                if (options != undefined) {
                    if (doc.id === options?.exceptionId) {
                        continue;
                    }
                }
                if (doc.data()["email"] === email) {
                    console.log(`${email} === ${data.email} exist`);
                    return false;
                }
                else {
                    console.log(`${email} !== ${data.email} exist`);
                    return true;
                }
            }
            return true;
        }
        catch (error) {
            console.log('email exist')
            console.log(error.message);
            return false;
        }
    }


    static async validateID(id: string): Promise<boolean> {
        try {
            console.log('valid?')
            var DB = admin.firestore();//connect to database
            var result = await DB.collection("users").where("id", "==", id).get();
            if (result.empty) {
                console.log(`Empty Database!`);
                return false;
            }
            for (const doc of result.docs) {
                var data = doc.data();
                if (doc.data()["id"] === id) {
                    console.log(`${id} === ${data.id} exist`);
                    return true;
                }
                else {
                    console.log(`${id} !== ${data.id} not exist`);
                    return false;
                }
            }
            return false;
        }
        catch (error) {
            console.log('id exist')
            console.log(error.message);
            return true;
        }
    }



    // async validateID(id: string): Promise<boolean> {
    //     var DB = admin.firestore();//connect to database
    //     var result = await DB.collection("users").where("id", "==", id).get();
    //     if (result.size > 0) {
    //         for (const doc of result.docs) {
    //             if (doc.data()["id"] === id) {
    //                 console.log(`${id} === ${this.id} exist`);
    //                 return false;
    //             }
    //             else {
    //                 console.log(`${id} !== ${this.id} exist`);
    //                 return true;
    //             }
    //         }
    //     } else {
    //         console.log(`Empty Database!`);
    //         return true;
    //     }
    // }

    lines() {
        console.log('----------------------------------------------------------------\n')
    }

    ret(message: string, chck: boolean) {
        this.lines();
        console.log(`\t${message}\n`);
        this.pri();
        this.lines();
        return {
            "success": chck,
            "message": message
        };
    }

    //FIXME: return
    retTermResult(term: any): boolean {
        var keys: Array<string> = Helper.describeClass(User);
        // console.log(`Zero: ${keys} keys ${keys}\n`);
        keys = Helper.removeItemOnce(keys, 'password');
        // console.log(`One: ${keys} keys ${keys}\n`);
        console.log('term' + term)
        
        let chck:boolean = false;
        for (const key of keys) {
            console.log(`Two: ${key} keys ${keys}\n`);
            if(key === 'email' ){
                // console.log('--' + this[key].toLowerCase())
                console.log(term)
                // if (`${this[key]}` === term) {
                if (`${this[key].toUpperCase()}` === term.toUpperCase()) {
                    // console.log('--' + this[key] + '---' +term + '---');
                    console.log('--' + this[key].toUpperCase() + '---' +term.toUpperCase() + '---');
                    chck = true;
                    break;
                }
            }
            if(key === 'name' ){
                // console.log('--' + this[key].toLowerCase())
                if (`${this[key].toLowerCase()}` === term.toLowerCase()) {
                    console.log('--' + this[key].toLowerCase() + '---' +term.toLowerCase() + '---');
                    chck = true;
                    break;
                }
            } 
            if (`${this[key]}` === term) {
                        console.log('--' + this[key] + '---' +term + '---');
                chck = true;
                break;
            }
            // console.log(`Three: ${key} keys ${keys}\n`);
        }
        
        return chck;
    }

    static async login(email: string, password: string): Promise<boolean> {
        // try {
        //     console.log('valid?')

        var DB = admin.firestore();//connect to database
        var result = await DB.collection("users").where("email", "==", email).get();

        if (result.empty) {
            console.log(`Empty Database!`);
            return false;
        }

        for (const doc of result.docs) {
            var data = doc.data();
            if (data["email"] === email && data["password"] === password) {
                console.log(`${email} === ${password} Equal`);
                console.log(`${data[email]} === ${data[password]} Equal`);
                return true;
            }
            else {
                console.log(`${email} !== ${password} Not Match`);
                console.log(`${data[email]} !== ${data[password]} Not Match`);
                return false;
            }
        }
        console.log('unsa')
        return false;
    }

    static async loginCred(email: string, password: string) {

        try {
            var DB = admin.firestore();//connect to database
            var result = await DB.collection("users").where('email', '==', email).where('password', '==', password).get();
            var user;
            result.forEach((doc) => {
                user = new user.User(doc.data());
            });
            return user;
        }
        catch (error) {
            console.log(error);
        }
    }

    pri() {
        console.log(`DID: ${this.id}\nName: ${this.name}\nAge: ${this.age}\nEmail: ${this.email}\nPassword: this.password\n---End---\n`);
    }
}

