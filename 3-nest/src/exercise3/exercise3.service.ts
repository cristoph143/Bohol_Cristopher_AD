import { HTML } from './html.helper';
import { Injectable } from '@nestjs/common';
import { Car } from './car.model';

@Injectable()
export class Exercise3Service {    
    //Loops Triangle
    triangle (height: number) {
        var html: HTML = new HTML();
        let newStr = "";
        for (let i = 1; i <= height; i++) {
            for(let j = 0; j < i; j++)
                newStr += '*';
            html.add(html.div([newStr]));
            newStr  = '';
        }
        
        console.log(newStr);
        return html.renderScreenHTML();
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
        var html: HTML = new HTML();
        let newStr = "";
        let prod = 0;
        for (let i = 1; i <= base; i++) {
            for (let j = 1; j <= base; j++) {
                prod = i*j;

                if(base > 9){
                    if(prod > 99){
                        newStr += `${prod} `;
                    }
                    if(prod > 9 && prod < 100){
                        newStr += `0${prod} `;
                    }
                    if(prod < 10)
                        newStr += `00${prod} `;
                }
                else if(base > 3){
                    if(prod > 9){
                        newStr += `${prod} `;
                    }
                    if(prod < 10)
                        newStr += `0${prod} `;
                }
                else     
                    if(prod < 10)
                        newStr += `${prod} `;
                // if(prod > 99) 
                //     newStr += '   ';
                // if(prod < 100)
                //     newStr += '    ';
                //     if(prod < 10)
                //         newStr += ' ';
                //     newStr += ' ';
                // newStr += '';
                
                //newStr += prod;
            }
            html.add(html.div([newStr]));
            newStr  = '';
        }
        console.log(newStr);
        return html.renderScreenHTML();
    }

    private cars:Map<string,Car> = new Map<string, Car>();

    simpleAddCar(){
        var me:Car;
        me = new Car('Red', 'Mitsubishi',{name:'Hello',radius: 20});
        console.log(me);
        this.cars.set('Zero', me);
        this.logAllCars();
    }

    simpleAddCar1(){
        var me:Car;
        me = new Car('Blue', 'Mercedes',{name:'World',radius: 40});
        this.cars.set('First', me);
        this.logAllCars();
    }

    simpleAddCar2(){
        var me:Car;
        me = new Car('Green', 'Toyota',{name:'My Friend',radius: 80});
        this.cars.set('Second',me);
        this.logAllCars();
    }

    simpleAddCar3(){
        var me:Car;
        me = new Car('Yellow', 'Toyota',{name:'My Friend',radius: 80});
        this.cars.set('Second',me);
        this.logAllCars();
    }//Overrides the first value since it has the same key

    simplePostAddCar4(car:any){
        var newCar:Car;
        newCar = new Car(car?.color, car?.models,{name: car?.wheel?.name,radius: car?.wheel?.radius});
        this.cars.set(car.id,newCar);
        this.logAllCars();
    }//Overrides the first value since it has the same key

    logAllCars(){
        console.log('--------------------------------')
        console.log('Log of All Cars')
        for(const [key,car] of this.cars.entries()){
            console.log(`Key: ${key}`);
            console.log(car.toJson());
            car.log();
        }
        console.log('--------------------------------')
    }
}
