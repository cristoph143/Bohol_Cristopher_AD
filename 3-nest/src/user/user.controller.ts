import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Get("/all")
    getAll(){
        return this.userService.getAll();
    }

    @Get("/id:id")
    getID(@Param('id') id:string){
        return this.userService.getID(id);
    }
    
    @Post('register/')
    register(@Body() body:any){
        console.log(body.data.toString());
        return this.userService.register(body);
    }//return all of the content of JSON




}
