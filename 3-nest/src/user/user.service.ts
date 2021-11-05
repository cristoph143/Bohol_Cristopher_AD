import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CRUDReturn } from './user.resource/crud_return.interface';
import { Helper } from './user.resource/helper';

@Injectable()
export class UserService {
    private users: Map<string, User> = new Map<string, User>();
    private DB = admin.firestore();

    // constructor() {
    // //     // this. = Helper.populate();
    // //     this.populate();

    // }

    /* 
        TODO:
            > Creates a user and saves it to the database
        FIXME:
            > has attibutes of wrong type
            > missing an attribute
            > invalid attribute Key
            > Email ALready exists in database
    */
    async register(body: any): Promise<CRUDReturn> {
        var chck: boolean;
        try {
            var validBody: {
                valid: boolean;
                data: string
            } = Helper.validBodyPut(body);

            if (validBody.valid) {
                console.log(chck);
                chck = await User.validationEmail(body.email);
                if (chck === true) {
                    var id: string = Helper.generateUID();
                    var newUser: User = new User(
                        body?.name,
                        body?.age,
                        body?.email,
                        body?.password);
                    console.log("id: " + id);
                    chck = await this.saveToDataBase(newUser);
                    if (chck === true) {
                        console.log('nisud?')
                        if (chck === true) {
                            return {
                                success: true,
                                data: newUser.toJson()
                            };
                        } else {
                            throw new Error("Generic Database Error!")
                        }
                    }
                    else {
                        console.log('1 ' + id);
                        throw new Error(`Failed to update user in database`);
                    }
                }
                else {
                    throw new Error(`${body.email} is already in use by another user!`);
                }
            }
            else {
                console.log('Hello')
                throw new Error(validBody.data);
            }
        } catch (error) {
            console.log(error.message + ' h');
            return {
                success: false, data: `Error adding account, ${error.message}`
            };
        }
    }


    async saveToDataBase(body: User): Promise<boolean> {
        try {
            // this.users.set(body.id, body);
            var result = await body.commitDB();
            console.log(result + ' save?');
            return result.success;
        }
        catch (error) {
            console.log(error)
            return false;
        }
    }

    // //check if email not exist otherwise return false
    // async validationEmail(email: string): Promise<boolean> {
    //     // var DB = admin.firestore();//connect to database
    //     var result = await this.DB.collection("users").where("email", "==", email).get();
    //     if (result.size > 0) {
    //         for (const doc of result.docs) {
    //             var data = doc.data();
    //             if (data["email"] === email) {
    //                     console.log(`${email} === ${data["email"]} exist`);
    //                 return false;
    //             } else {
    //                     console.log(`${email} === ${data["email"]} not exist`);
    //                 return true;
    //             }
    //         }
    //     } else {
    //             console.log(`${email} not exist`);
    //         return false;
    //     }
    // }

    async validationEmail(email: string, options?: { exceptionId: string }): Promise<boolean> {
        try {
            console.log('valid?')
            var DB = admin.firestore();//connect to database
            var result = await DB.collection("users").where("email", "==", email).get();
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

    /*
        TODO:
            > retrieves all uses data of all users || empty array
    */
    // getAll(): CRUDReturn {
    //     var populatedData: Array<any> = [];
    //     for (const user of this.users.values())
    //         populatedData.push(user.toJson());
    //     this.logAllUsers();
    //     return { success: populatedData.length > 0, data: populatedData };
    // }

    async getAll(): Promise<CRUDReturn> {
        var results: Array<any> = [];
        try {
            var allUsers = await this.getAllUserObject();
            allUsers.forEach(user => {
                results.push(user.toJson2());
            })
            console.log('hello all')
            return {
                success: true,
                data: results
            }
        } catch (error) {
            return { success: false, data: error }
        }
    }

    async getAllUserObject(): Promise<Array<User>> {
        var result: Array<User> = [];
        try {
            var dbData: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await this.DB.collection("users").get();
            dbData.forEach((doc) => {
                if (doc.exists) {
                    var data = doc.data();
                    result.push(new User(
                        data["name"], data["age"], data["email"], data["password"], data["id"]
                    ))
                }
            });
            console.log('result1 ' + result);
            return result;
            // for (const user of this.users.values())
            //     populatedData.push(user.toJson());
            // this.logAllUsers();
        } catch (error) {
            return null
        }
    }

    populate() {
        var id: string = Helper.generateUID();
        this.users.set(id, new User('Leanne Graham', 18, 'sincere@april.biz', 'LG_123456', id));
        id = Helper.generateUID();
        this.users.set(id, new User('Nathan Plains', 25, 'nathan@yesenia.net', 'NP_812415', id));
        id = Helper.generateUID();
        this.users.set(id, new User('Ervin Howell', 21, 'shanna@melissa.tv', 'EH_123123', id));
        id = Helper.generateUID();
        this.users.set(id, new User('Patricia Lebsack', 18, 'patty@kory.org', 'PL_12345', id));
    }

    async logAllUsers(): Promise<CRUDReturn> {
        this.lines();
        console.log('User Credentials')
        this.lines();
        var val: {};
        val = await this.getAllUserObject();
        console.log('val');
        console.log(val);
        this.lines();
        return {
            success: true, data: val
        }
    }

    /*
        TODO: 
            > retrieves user's data
        FIXME:
            > fails if parameter id does not match any users in database
    */
    async getID(id: string): Promise<CRUDReturn> {
        var chck: boolean;

        try {

            chck = await this.searchID(id);
            console.log('ID: id ' + id + ' Check ' + chck)
            if (chck === true) {
                console.log('t')
                var dbData: {};
                // for (const [key, user] of this.users.entries()) {
                // chck = await User.validateID(id);
                // if (chck === false) {
                console.log(`Break : ${chck}`)
                dbData = await User.retrieveDB(id);
                console.log(dbData)
                // break;
                // }
                // }
                return {
                    success: chck,
                    data: dbData
                };
            }
            else {
                return {
                    success: false,
                    data: `User ${id} is not in database`,
                };
            }
        } catch (e) {

            return {
                success: false,
                data: e.message,
            };
        }

    }

    /*
        TODO: does not replace the generated 
        FIXME: 
            > has attribute of the wrong type,
            > has invalid attribute key,
            > missing an attributes
            > an email already exist in database that is not the current user
    */
    async replaceInfoByID(id: string, body: any): Promise<CRUDReturn> {
        var chck: boolean;
        // let newUser: User;
        var dbData: {};
        try {
            chck = await this.searchID(id);
            console.log(chck)
            if (chck === true) {
                console.log(chck)
                var validBodyPut: {
                    valid: boolean;
                    data: string
                } = Helper.validBodyPut(body);
                if (validBodyPut.valid) {
                    console.log('h')
                    chck = await User.validationEmail(body.email);
                    console.log('d' + body.email)
                    console.log(chck)
                    if (chck === true) {
                        // var user: User = this.users.get(id);
                        // console.log(user + ' user')
                        var success = this.modify(body);
                        if (success) {
                            var newUser: User = new User(
                                body?.name,
                                body?.age,
                                body?.email,
                                body?.password,
                                id);
                            chck = await this.saveToDataBase(newUser);
                            if (chck === true) {
                                console.log('nisud?')
                                if (chck === true) {
                                    return {
                                        success: true,
                                        data: newUser.toJson()
                                    };
                                } else {
                                    throw new Error("Generic Database Error!")
                                }
                            }
                            else {
                                console.log('1 ' + id);
                                throw new Error(`Failed to update user in database`);
                            }
                        }
                        else {
                            throw new Error('Failed to update user in db');
                        }
                    }
                    else {
                        throw new Error(`${body.email} is already in use by another user!)`);
                    }
                }
                else {
                    throw new Error(validBodyPut.data);
                }
            }
            else {
                throw new Error(`User ${id} is not in the database`);
            }
        } catch (error) {
            return {
                success: false,
                data: error.message
            }
        }
    }


    /*
        TODO: does not replace the generate id
        FIXME: fails if the payload
            > has attributes of the wrong types
            > has an invalid attribute key
            > an email already exists in the databsae that is not the current user
    */
    async replaceInfoByID2(id: string, body: any): Promise<CRUDReturn> {
        var chck: boolean;
        // let newUser: User;
        try {
            chck = await this.searchID(id);

            if (chck === true) {
                var validBody: {
                    valid: boolean;
                    data: string
                } = Helper.validBody(body);
                if (validBody.valid) {
                    // for (const user of this.users.values()) {
                    chck = await User.validationEmail(body.email);
                    // if (chck === false) break; //Exist
                    // }
                    if (chck === true) { // Not Exist
                        // var user: User = this.users.get(id);
                        var success = this.modify(body);
                        if (success) {
                            var result = await this.DB.collection("users").doc(id).update(body);
                            return {
                                success: success,
                                data: `User ${body.id} has been deleted successfully!`
                            };
                        }
                        else {
                            throw new Error(`Failed to update user in database`);
                        }
                    }
                    else {
                        throw new Error(`${body.email} is already in use by another user!`);
                    }
                }
                else {
                    throw new Error(validBody.data);
                }
            }
            else {
                throw new Error(`User ${id} is not in the database`);
            }
        } catch (error) {
            return {
                success: false,
                data: error.message
            }
        }
    }

    // async replaceInfoByID2(id: string, body: any): Promise<CRUDReturn> {
    //     var chck: boolean;
    //     let newUser: User;
    //     try {
    //         chck = await this.searchID(id);

    //         if (chck === true) {
    //             var validBody: {
    //                 valid: boolean;
    //                 data: string
    //             } = Helper.validBody(body);
    //             if (validBody.valid) {
    //                 for (const user of this.users.values()) {
    //                     chck = await User.validationEmail(body.email);
    //                     if (chck === false) break; //Exist
    //                 }
    //                 if (chck === true) { // Not Exist
    //                     var user: User = this.users.get(id);
    //                     var success = await user.modify(body);
    //                     if (success) {
    //                         return {
    //                             success: success,
    //                             data: user.toJson()
    //                         };
    //                     }
    //                     else {
    //                         throw new Error(`Failed to update user in database`);
    //                     }
    //                 }
    //                 else {
    //                     throw new Error(`${body.email} is already in use by another user!`);
    //                 }
    //             }
    //             else {
    //                 throw new Error(validBody.data);
    //             }
    //         }
    //         else {
    //             throw new Error(`User ${id} is not in the database`);
    //         }
    //     } catch (error) {
    //         return {
    //             success: false,
    //             data: error.message
    //         }
    //     }
    // }

    modify(body: any): boolean {
        try {
            var keys: Array<string> = Helper.describeClass(User);
            keys = Helper.removeItemOnce(keys, 'id');
            for (const key of Object.keys(body)) {
                this[key] = body[key];
                console.log('key: ' + this[key] + ' Body.key: ' + body[key])
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async searchID(id: string): Promise<boolean> {
        var chck: boolean;
        // for (const [key, user] of this.users.entries()) {
        chck = await User.validateID(id);
        if (chck === false) {
            console.log(`Break : ${chck}`)
            chck = true;
            // break;
        }
        // }
        return chck;
    }


    /*
        TODO: does not replace the generate id
        FIXME: fails is the payload
            > has attributes of the wrong types
            > has an invalid attribute key
            > an email already exists in the databsae that is not the current user
    */
    async deleteProfile(id: string): Promise<CRUDReturn> {
        var resultData: {};
        try {
            let chck = await this.searchID(id);
            if (chck === true) {

                var result = await this.DB.collection("users").doc(id).delete();
                this.users.delete(id);
                return {
                    success: true,
                    data: `${id} has been successfully removed`
                };
            }
            else {
                return {
                    success: false,
                    data: `Id ${id} has not been found in the database!`
                };
            }
        } catch (error) {
            return {
                success: false,
                data: error.message
            };
        }
    }

    lines() {
        console.log('----------------------------------------------------------------\n')

    }

    async login(body: any): Promise<CRUDReturn> {
        var chck: boolean;
        var resultData: {};
        try {
            var validBody: {
                valid: boolean;
                data: string
            } = Helper.validBody(body);
            if (validBody.valid) {
                // for (const [key, user] of this.users.entries()) {
                chck = await User.validationEmail(body.email);
                console.log(chck)
                // if (chck === false) break;
                // }
                if (chck === false) {
                    var result = this.DB.collection("users").where("email", "==", body.email).where("password", "==", body.password);
                    // console.log(result);
                    // resultData = await User.retrieveDB
                    // for (const [key, user] of this.users.entries()) {
                    chck = await User.login(body.email, body.password);
                    // if (chck === true) {
                    var user = await this.loginCred(body.email, body.password);

                    console.log(user)
                    var keys: Array<string> = Helper.describeClass(User);
                    // keys = Helper.removeItemOnce(keys, 'password');
                    // console.log(keys)
                    for (const key of Object.keys(result)) {
                        this[key] = result[key];
                    }
                    console.log('result1 ' + result);

                    // delete result.password;
                    if (chck === true) {
                        return {
                            success: chck,
                            data: user.pop()
                        };
                    }
                    else {
                        throw new Error(`${body.email} login fail, Email does not match with the password`);
                    }
                }
                else {
                    throw new Error(`${body.email} login fail, Email does not exist in the database!`);
                }
            }
            else {
                console.log('Hello There')
                throw new Error(validBody.data);
            }
        } catch (error) {
            console.log('hi there')
            return {
                success: false,
                data: error.message
            };
        }
    }


    async loginCred(email: string, password: string) {

        var result: Array<User> = [];
        try {
            var DB = admin.firestore();//connect to database
            var dbData: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await this.DB.collection("users").where('email', '==', email).where('password', '==', password).get();
            dbData.forEach((doc) => {
                if (doc.exists) {
                    var data = doc.data();
                    result.push(new User(
                        data["name"], data["age"], data["email"], data["password"], data["id"]
                    ))
                }
            });

            return result;
            // var user;
            // result.forEach((doc) => {
            //     user = new user.User(doc.data());
            // });
            // return user;
        }
        catch (error) {
            console.log(error);
        }
    }

    /*
        TODO: retrieves a user's data
        FIXME: Fails if the parameter id does not match any users in the database
    */
    async searchTerm(term: any): Promise<CRUDReturn> {
        //     try {

        //         var dbData = await this.DB.collection("users").get();
        var result: Array<User> = [];
        //         dbData.forEach((doc) => {
        //             var user = dbData;
        //             console.log(user)
        //             for (var keys in doc.data())
        //                 if (user[keys] == term) {
        //                     var id = user[id];
        //                     // result.push(user);
        //                     console.log(id)
        //                 }
        //         });
        //         console.log(result)
        //         return {
        //             success: true,
        //             data: result
        //         };
        //     }
        //     catch (error) {
        //         console.log(error);
        //         return {
        //             success: false,
        //             data: error 
        //         }
        //     }
        // }

        try {
            try {
                var results: Array<any> = [];
                var users: Array<User> = await this.getAllUserObject();
                for (const user of users.values()) {
                    if (user.retTermResult(term.toLowerCase())) results.push(user.toJson());
                }
                return { success: results.length > 0, data: results };
            } catch (error) {
                console.log(error.message);
                return { success: false, data: error.message, };
            }
            // var DB = admin.firestore();//connect to database
            // var dbData: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await this.DB.collection("users").where('users', 'array-contains', term).get();

            // var keys: Array<string> = Helper.describeClass(User);
            // for (const key of Object.keys(result)) {
            //     this[key] = result[key];
            // }
            // console.log()
            // dbData.forEach((doc) => {
            //     if (doc.exists) {
            //         var data = doc.data();
            //         // if(User[key] === term)
            //         result.push(new User(
            //             data["name"], data["age"], data["email"], data["password"], data["id"]
            //         ))
            //     }
            //     else{
            //         result = [];
            //     }
            // });
            // console.log('result1 ' + result);
            // return {
            //     success: true,
            //     data: result
            // }
            // // var user;
            // // result.forEach((doc) => {
            // //     user = new user.User(doc.data());
            // // });
            // // return user;
        }
        catch (error) {
            console.log(error);
            return {
                success: false,
                data: error
            }
        }
    }
    // var resultData: Array<any> = [];

    // console.log('d')
    // var result = this.DB.collection("users").doc(term).get();

    // console.log(result)
    // for (const user of this.users.values()) {
    //     console.log('hello')
    //     if (user.retTermResult(term)) {
    //         console.log(user)
    //         resultData.push(user.toJson());
    //     }
    // }
    // return {
    //     success: resultData.length > 0,
    //     data: resultData
    // };
}
