import * as admin from 'firebase-admin';

import { CRUDReturn } from "./user.resource/crud_return.interface";
import { Helper } from "./user.resource/helper";

export class User {
    public id: string;
    private name: string;
    private age: number;
    private email: string;
    private password: string;

    constructor(name: string, age: number, email: string, password: string, id?: string) {
        if (id !== undefined) {
            this.id = id;
        } else {
            this.id = Helper.generateUID();
        }
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
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
                return new User(data['name'], data['age'], data['email'], data['password'], result.id)
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

    toJson() {
        return {
            name: this.name,
            age: this.age,
            email: this.email
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
        if (body.id != null)
            this.id = body.id;
        if (body.email != null)
            this.email = body.email;
        if (body.age != null)
            this.age = body.age;
        if (body.name != null)
            this.name = body.name;
        if (body.password != null)
            this.password = body.password;
        return true;
    }

    //check if email not exist otherwise return false
    validationEmail(email: string){
        
        if (email !== this.email) {
            console.log(`${email} !== ${this.email} not exist`);
            return true;
        }
        else {

            console.log(`${email} === ${this.email} exist`);
            return false;
        }
    }


    //check if email not exist otherwise return false
    // async validationEmail(email: string): Promise<boolean> {
    //     var DB = admin.firestore();//connect to database
    //     var result = await DB.collection("users").where("email", "==", email).get();
    //     if (result.size > 0) {
    //         for (const doc of result.docs) {
    //             if (doc.data()["email"] !== email) {
    //                     console.log(`${email} !== ${this.email} exist`);
    //                 return true;
    //             }
    //         }
    //     } else {
    //             console.log(`${email} === ${this.email} exist`);
    //         return false;
    //     }
    // }

    validateID(id: string) {
        if (id === this.id) {
            console.log(`ID: ${id} === This.id: ${this.id} ??? Equal`);
            return true;
        }
        else {
            console.log(`ID: ${id} !== This.id: ${this.id} ??? Not Equal`);
            return false;
        }
    }

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
        console.log(`Zero: ${keys} keys ${keys}\n`);
        keys = Helper.removeItemOnce(keys, 'password');
        console.log(`One: ${keys} keys ${keys}\n`);
        for (const key of keys) {
            console.log(`Two: ${key} keys ${keys}\n`);
            if (`${this[key]}` === term) return true;
            console.log(`Three: ${key} keys ${keys}\n`);
        }
        return false;
    }

    login(email: string, password: string) {

        if (email === this.email && password === this.password) {
            return true;
        }
        else {
            return false;
        }
    }


    pri() {
        console.log(`DID: ${this.id}\nName: ${this.name}\nAge: ${this.age}\nEmail: ${this.email}\nPassword: ${this.password}\n---End---\n`);
    }
}

