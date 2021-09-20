import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    /* 
    > Method: @Post
    > Endpoint: http://localhost:3000/user/register
    > Input Method: JSON body
    > Purpose:
        > Creates a user and saves it to the "database". 
        > Returns true or false if the creation is successful or not.
        > You may choose to write a function autogenerating the id. 
        > The ID may be string or number, it's up to you.
    */
    @Post('/register')
    register(@Body() body:any){
        return this.userService.register(body);
    }
    
    /* 
    > Method: @Get
    > Endpoint: http://localhost:3000/user/display
    > Input Method: none
    > Purpose:
        > Returns a list of this.users.
    */
    @Get('/display')
    logAllUsers(){
        return this.userService.logAllUsers();
    }

    /* 
    > Method: @Get
    > Endpoint: http://localhost:3000/user/all
    > Input Method: none
    > Purpose:
        > Returns data about all users, passwords must NOT be returned. 
        > This function must be placed above user/:id in the service definitions in order for it to work
    */
    @Get("/all")
    getAll(){
        return this.userService.getAll();
    }

    
    /* 
    > Method: @Get
    > Endpoint: http://localhost:3000/user/:id
    > Input Method: none
    > Purpose:
        > Returns data about a user, password must NOT be returned
    */
    @Get("/:id")
    getID(@Param('id') id:string){
        return this.userService.getID(id);
    }
    
    /* 
    > Method: @Put
    > Endpoint: http://localhost:3000/user/:id
    > Input Method: JSON body with no id, Param("id")
    > Purpose:
        > Using the id from the param, replaces all the values of the User object with the data from body. 
        > Returns true if all data was changed. 
        > If the body is missing data, return false or an error message. (Your discretion)
    */
    @Put("/:id")
    replaceInfoByID(@Param('id') id:string, @Body() body:any){
        return this.userService.replaceInfoByID(id,body);
    }


    /* 
    > Method: @Patch
    > Endpoint: http://localhost:3000/user/:id
    > Input Method: JSON body with no id, Param("id")
    > Purpose:
        > Using the id from the param, replaces values of the User object with the data that exists in the JSON body. 
        > Returns true if data was changed. 
        > If the body has an invalid value return false or an error message.
        
    */
    // @Patch("/:id")
    // updateProfile(@Param('id') id:string,@Body() body:any){
    //     return this.userService.updateProfile(id,body);
    // }
    
    @Patch("/:id")
    replaceInfoByID2(@Param('id') id:string,@Body() body:any){
        return this.userService.replaceInfoByID2(id,body);
    }

    /* 
    > Method: @Delete
    > Endpoint: http://localhost:3000/user/:id
    > Input Method: Param("id")
    > Purpose:
        > Deletes the user. 
        >If the user does not exist return an error message. 
        >If the user is successfully deleted, return a success message.
    */
    @Delete("/:id")
    deleteProfile(@Param('id') id:string){
        return this.userService.deleteProfile(id);
    }

    /* 
    > Method: @Post
    > Endpoint: http://localhost:3000/user/login
    > Input Method: JSON body containing email and password
    > Purpose:
        > Signs a user in. Return true or false if the password matches or not. 
        > You may opt to return a JSON object like:
            {
                "success": true, 
                "message": "return message"
            }, 
        so you can return success/error messages
    */
    @Post('/login')
    login(@Body() body:any){
        return this.userService.login(body);
    }

    /* 
    > Method: @Get
    > Endpoint: http://localhost:3000/user/search/:term
    > Input Method: Param("term")
    > Purpose:
        > searches for a user that matches any term not including the password. 
        > Do not consider partial matches. 
        > You may take advantage of the String.toUpper() function to make sure the term and data is the same case when comparing
    */
    @Get("/search/:term")
    searchTerm(@Param('term') term:string){
        return this.userService.searchTerm(term);
    }

}
