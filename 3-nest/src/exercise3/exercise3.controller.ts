import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Exercise3Service } from './exercise3.service';


@Controller('exercise3')
export class Exercise3Controller {
    constructor(private readonly e3: Exercise3Service){}

    //Loops Triangle
    @Get('/triangle/:height')
    triangle(@Param('height') height: string){
        var parsedHeight:number = parseInt(height);
        return this.e3.triangle(parsedHeight);
    }

    //Hello Name
    @Get('/helloName/:name')
    helloName(@Param('name') name:string){
    return this.e3.helloName(name);
    }

    //Prime Number
    @Get('/primeNumber/:number')
    primeNumber(@Param('number') number:number){
        return this.e3.primeNumber(number);
    }

    //Multiplication Table
    @Get('/loopsMul/:number')
    loopsMul(@Param('number') number:number){
        return this.e3.loopsMul(number);
    }
    @Get('/simpleAddCar')
    simpleAddCar(){
        return this.e3.simpleAddCar();
    }
    @Get('/simpleAddCar1')
    simpleAddCar1(){
        return this.e3.simpleAddCar1();
    }
    @Get('/simpleAddCar2')
    simpleAddCar2(){
        return this.e3.simpleAddCar2();
    }
    @Get('/simpleAddCar3')
    simpleAddCar3(){
        return this.e3.simpleAddCar3();
    }
    @Get('/logAllCars')
    logAllCars(){
        return this.e3.logAllCars();
    }
    @Post('/simplePostAddCar')
    simplePostAddCar(@Body() body:any){
        console.log(body);
        return body;
        //return this.e3.simplePostAddCar();
    }//return all of the content of JSON
    @Post('/simplePostAddCar1')
    simplePostAddCar1(@Body('color') body:any){
        console.log(body);
        return body;
        //return this.e3.simplePostAddCar();
    }//Only return Color
    @Post('/simplePostAddCar2')
    simplePostAddCar2(@Body('color') body:any, @Body('models') model:string){
        console.log(body + ' '+ model);
        return [body,model];
        //return this.e3.simplePostAddCar();
    }//Return ["Red","Mitsubishi"]
    @Post('/simplePostAddCar4')
    simplePostAddCar4(@Body() body:any){
        return this.e3.simplePostAddCar4(body);
    }//return all of the content of JSON
}

