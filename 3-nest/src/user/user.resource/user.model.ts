import { CRUDReturn } from './crud_return.interface';
import { Helper } from './helper';
export class User {
  public id: string;
  private name: string;
  private age: number;
  private email: string;
  private password: string;

  constructor(name: string, age: number, email: string, password: string) {
    this.id = Helper.generateUID();
    this.name = name;
    this.age = age;
    this.email = email;
    this.password = password;
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
  validationEmail(email: string) {
    if (email !== this.email) {
      console.log(`${email} === ${this.email} not exist`);
      return true;
    }
    else {

      console.log(`${email} === ${this.email} exist`);
      return false;
    }
  }

  validateID(id: string) {
    if (id === this.id) {
      console.log(`ID: ${id} === This.id: ${this.id} ??? Equal`);
      return true;
    }
    else {
      console.log(`ID: ${id} === This.id: ${this.id} ??? Not Equal`);
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
  toJson() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      email: this.email
    }
  }
}
