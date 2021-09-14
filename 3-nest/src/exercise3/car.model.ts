export class Car{

    private color: string;
    private models: string;
    private wheels: Wheels;


    constructor(color:string, models:string, wheels:Wheels){
        this.color = color;
        this.models = models;
        this.wheels = wheels;
    }
    log(){
        console.log(`I have ${this?.color} ${this?.models} with ${this?.wheels?.name} and ${this?.wheels?.radius}.`);
    }

    toJson(){
        return{
            models: this.models,
            color: this.color,
            wheels: this.wheels
        };
    }
    test() {
        var v1:{} = {};
        v1['name'] = 'name';
        var v2:Wheels;
        v2 = {
            name: 'Hello',
            radius: 10
        };
    }
}
export interface Wheels{
    name: string;
    radius: number;
}