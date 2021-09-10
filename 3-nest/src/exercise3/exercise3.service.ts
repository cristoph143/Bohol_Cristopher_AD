import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {
    //Loops Triangle
    triangle (height: number) {
        let newStr = "";
        for (let i = 0; i < height; i++) {
            for (let j = 0; j <= i; j++) {
                newStr += "*";
            }
            newStr += "\n";
        }
    console.log(newStr);
    return newStr;
    }
    //Hello Name
    helloName(name: string){
        let newStr = "Hello There ";
        return newStr += name + '!';
    }
    //Prime Number
    primeNumber(num:number){
        let cnt = 0;
        let val = Math.ceil(Math.sqrt(num));
        for(let i = 2; i <= val; i++){
            if(num % i == 0){
                console.log(`${i} ${val} ${num}`)
                cnt = 1;
                break;
            }
        }
        return ((cnt == 0 && num != 1) || (num == 2 || num == 3)) ? num +' is a prime number' : num +' is not a prime number';
    }
    //Multiplication Table
    loopsMul(base){
        let newStr = "";
        let prod = 0;
        for (let i = 1; i <= base; i++) {
            for (let j = 1; j <= base; j++) {
                prod = i*j;
                newStr += prod;
                if(prod > 99) 
                    newStr += '  ';
                if(prod < 100)
                    newStr += '   ';
                    if(prod < 10)
                        newStr += ' ';
                    newStr += ' ';
                newStr += '';
            }
            newStr += "\n";
        }
        console.log(newStr);
        return newStr;
    }
}
