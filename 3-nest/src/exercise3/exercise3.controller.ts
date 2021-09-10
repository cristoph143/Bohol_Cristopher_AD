import { Controller, Get, Param } from '@nestjs/common';
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

}

