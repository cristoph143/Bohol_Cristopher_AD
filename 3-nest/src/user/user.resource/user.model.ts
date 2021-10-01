import { CRUDReturn } from './crud_return.interface';
import { Helper } from './helper';
export class User {
    public id: string;
    private name: string;
    private age: number;
    private email: string;
    private password: string;

    constructor(id:string,name: string, age: number, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
    }

    login(password: string): CRUDReturn {
        try {
            if (this.password === password) {
                return { success: true, data: this.toJson() };
            } else {
                throw new Error(`${this.email} login fail, password does not match`);
            }
            } catch (error) {
            return { success: false, data: error.message };
        }
    }

    matches(term: string):boolean {
    //hehe you didn't think I would actually give you the answers, yes?
    return true;
    }

    replaceValues(body: any):boolean {
    //hehe you didn't think I would actually give you the answers, yes?
    return true;
    }

    log() {
        console.log(this.toJson());
    }

    toJson() {    
    //hehe you didn't think I would actually give you the answers, yes?
    }
}