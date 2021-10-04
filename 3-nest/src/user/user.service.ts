import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CRUDReturn } from './user.resource/crud_return.interface';
import { Helper } from './user.resource/helper';

@Injectable()
export class UserService {
    private users: Map<string, User> = new Map<string, User>();

    constructor() {
        // this. = Helper.populate();
        this.populate();
    }

    /* 
        TODO:
            > Creates a user and saves it to the database
        FIXME:
            > has attibutes of wrong type
            > missing an attribute
            > invalid attribute Key
            > Email ALready exists in database
    */
    register(body: any): CRUDReturn {
        var chck: boolean;
        try {
            var validBody: {
                valid: boolean;
                data: string
            } = Helper.validBodyPut(body);

            if (validBody.valid) {
                for (const user of this.users.values()) {
                    chck = user.validationEmail(body.email);
                    if (chck === false) break;
                }
                console.log(chck);
                if (chck === true) {
                    var ID: string = Helper.generateUID();
                    var newUser: User = new User(
                        ID,
                        body?.name,
                        body?.age,
                        body?.email,
                        body?.password);
                    console.log("ID: " + ID);
                    if (this.saveToDataBase(newUser, ID)) {
                        console.log('nisud?')
                        var resultData: {};
                        for (const user of this.users.values()) {
                            if (user.validateID(ID)) {
                                const name: string = user['name'];
                                const age: number = user['age'];
                                const email: string = user['email'];
                                resultData = {
                                    ID, name, age, email
                                };
                                console.log('sss');
                            }
                        }
                        return {
                            success: true,
                            data: resultData
                        };
                    }
                    else {
                        console.log('1 ' + body.id);
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


    saveToDataBase(body: any, ID: string): boolean {
        try {
            this.users.set(body.user, body);
            console.log(body.id + ' 4');
            var chck = this.searchID(body.id);
            console.log('Save to db: chck' + chck)
            return chck;
        }
        catch (error) {
            console.log(error)
            return false;
        }
    }

    /*
        TODO:
            > retrieves all uses data of all users || empty array
    */
    getAll(): CRUDReturn {
        var populatedData: Array<any> = [];
        for (const user of this.users.values())
            populatedData.push(user.toJson());
        this.logAllUsers();
        return { success: populatedData.length > 0, data: populatedData };
    }



    populate() {
        var id: string = Helper.generateUID();
        this.users.set(id, new User(id, 'Leanne Graham', 18, 'sincere@april.biz', 'LG_123456'));
        id = Helper.generateUID();
        this.users.set(id, new User(id, 'Nathan Plains', 25, 'nathan@yesenia.net', 'NP_812415'));
        id = Helper.generateUID();
        this.users.set(id, new User(id, 'Ervin Howell', 21, 'shanna@melissa.tv', 'EH_123123'));
        id = Helper.generateUID();
        this.users.set(id, new User(id, 'Patricia Lebsack', 18, 'patty@kory.org', 'PL_12345'));
    }



    // populate(){
    //     var newUser:User;
    //     for(var i = 1; i < 5; i++){
    //         var ID:string = Helper.generateUID();
    //         var name:string = Helper.full_name();
    //         var pwd: string = Helper.pwd();
    //         var age: number = Helper.age();
    //         var email: string = Helper.email(name);
    //         console.log(pwd);
    //         this.users.set(ID,new User(ID,name,age,email,pwd));
    //     }
    // }

    logAllUsers() {
        this.lines();
        console.log('User Credentials')
        for (const [key, user] of this.users.entries()) {
            user.pri();
        }
        this.lines();
    }

    /*
        TODO: 
            > retrieves user's data
        FIXME:
            > fails if parameter id does not match any users in database
    */
    getID(id: string): CRUDReturn {
        var chck: boolean;

        chck = this.searchID(id);
        console.log('ID: id ' + id + ' Check ' + chck)
        if (chck === true) {
            console.log('t')
            return {
                success: chck,
                data: this.users.get(id).toJson()
            };
        }
        else{
            return {
                success: false,
                data: `User ${id} is not in database`,
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
    replaceInfoByID(id: string, body: any): CRUDReturn {
        var chck: boolean;
        let newUser: User;
        try {
            chck = this.searchID(id);

            if (chck === true) {
                var validBodyPut: {
                    valid: boolean;
                    data: string
                } = Helper.validBodyPut(body);
                if (validBodyPut.valid) {
                    for (const user of this.users.values()) {
                        chck = user.validationEmail(body.email);
                    }
                    if (chck) {
                        var user: User = this.users.get(id);
                        var success = user.modify(body);
                        if (success) {
                            return {
                                success: success,
                                data: user.toJson()
                            };
                        }
                        else {
                            throw new Error(`Failed to update user in database`);
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
    replaceInfoByID2(id: string, body: any): CRUDReturn {
        var chck: boolean;
        let newUser: User;
        try {
            chck = this.searchID(id);

            if (chck === true) {
                var validBody: {
                    valid: boolean;
                    data: string
                } = Helper.validBody(body);
                if (validBody.valid) {
                    for (const user of this.users.values()) {
                        chck = user.validationEmail(body.email);
                    }
                    if (chck) {
                        var user: User = this.users.get(id);
                        var success = user.modify(body);
                        if (success) {
                            return {
                                success: success,
                                data: user.toJson()
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

    searchID(id: string) {
        var chck: boolean;
        for (const [key, user] of this.users.entries()) {
            chck = user.validateID(id);
            if (chck === true) {
                console.log(`Break : ${chck}`)
                break;
            }
        }
        return chck;
    }


    /*
        TODO: does not replace the generate id
        FIXME: fails is the payload
            > has attributes of the wrong types
            > has an invalid attribute key
            > an email already exists in the databsae that is not the current user
    */
    deleteProfile(id: string): CRUDReturn {
        try {
            let chck = this.searchID(id);
            if (chck === true) {
                this.users.delete(id);
                return {
                    success: this.users.delete(id),
                    data: `User ${id} has been deleted successfully`
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

    login(body: any): CRUDReturn {
        var chck: boolean;
        var resultData: {};
        try {
            var validBody: {
                valid: boolean;
                data: string
            } = Helper.validBody(body);
            if (validBody.valid) {
                for (const [key, user] of this.users.entries()) {
                    chck = user.validationEmail(body.email);
                    if (chck === false) break;
                }
                if (chck === false) {
                    for (const [key, user] of this.users.entries()) {
                        if (user.login(body.email, body.password)) {
                            const ID: string = user['id']
                            const name: string = user['name'];
                            const age: number = user['age'];
                            const email: string = user['email'];
                            resultData = {
                                ID, name, age, email
                            };
                            chck = true;
                        }
                    }
                    if (chck === true) {
                        return {
                            success: chck,
                            data: resultData
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

    /*
        TODO: retrieves a user's data
        FIXME: Fails if the parameter id does not match any users in the database
    */
    searchTerm(term: any): CRUDReturn {
        var resultData: Array<any> = [];

        for (const user of this.users.values()) {
            if (user.retTermResult(term)) {
                resultData.push(user.toJson());
            }
        }
        return {
            success: resultData.length > 0,
            data: resultData
        };
    }
}
