var numb = 1;
var str = 'Str';
var bol = true;
var und;
var nll = null;
var arr = [1,2,3];
var arr1 = [1,2,'3'];
var arr2 =  [1,[2],'3'];
var arr3 = [1,false,'3'];

var num = {
    num: numb,
    str: str,
    bol: bol,
    nll: nll,
    arr: arr,
    arr1: arr1,
    arr2: arr2,
    arr3: arr3
};


console.log(`The Variable ${numb} is of typeof ${typeof numb}`)
console.log(`The Variable ${str} is of typeof ${typeof str}`)
console.log(`The Variable ${bol} is of typeof ${typeof bol}`)
console.log(`The Variable ${nll} is of typeof ${typeof nll}`)
console.log(`The Variable ${arr} is of typeof ${typeof arr}`)
console.log(`The Variable ${arr1} is of typeof ${typeof arr1}`)
console.log(`The Variable ${arr2} is of typeof ${typeof arr2}`)
console.log(`The Variable ${arr3} is of typeof ${typeof arr3}`)
console.log('')
console.log(`The Variable ${num} is of typeof ${typeof num}`)
console.log(`The Variable ${num.num} is of typeof ${typeof num.num}`)
console.log(`The Variable ${num[num]} is of typeof ${typeof num[num]}`)
console.log(`The Variable ${num.str} is of typeof ${typeof num.str}`)
console.log(`The Variable ${num['str']} is of typeof ${typeof num['str']}`)
console.log(`The Variable ${num.bol} is of typeof ${typeof num.bol}`)
console.log(`The Variable ${num['bol']} is of typeof ${typeof num['bol']}`)
console.log(`The Variable ${num.nll} is of typeof ${typeof num.nll}`)
console.log(`The Variable ${num['nll']} is of typeof ${typeof num['nll']}`)
console.log(`The Variable ${num.arr} is of typeof ${typeof num.arr}`)
console.log(`The Variable ${num['arr']} is of typeof ${typeof num['arr']}`)
console.log(`The Variable ${num.arr1} is of typeof ${typeof num.arr1}`)
console.log(`The Variable ${num['arr1']} is of typeof ${typeof num['arr1']}`)
console.log(`The Variable ${num.arr2} is of typeof ${typeof num.arr2}`)
console.log(`The Variable ${num['arr2']} is of typeof ${typeof num['arr2']}`)
console.log(`The Variable ${num.arr3} is of typeof ${typeof num.arr3}`)
console.log(`The Variable ${num['arr3']} is of typeof ${typeof num['arr3']}`)



/*
var number = 1; //number
var a = [1, 2, 3, 4, 5];
var b = {
    one: 1,
    two: "two",
    three: a,
};
var c;
var d = null;
console.log(typeof number); //number
console.log(`The Variable ${number} is of typeof ${typeof number}`)//The Variable 1 is of typeof number
console.log(`The Variable ${b} is of typeof ${b}`)//The Variable [object Object] is of typeof [object Object]
console.log(`The Variable ${b['one']} is of typeof ${b['one']}`)//The Variable 1 is of typeof 1 
b.four = 'four';
console.log(`The Variable ${b['four']} is of typeof ${b['four']}`)//The Variable four is of typeof four
b['five'] = [1,2,'3'];
console.log(`The Variable ${b.five} is of typeof ${b.five}`)//The Variable 1,2,3 is of typeof 1,2,3
console.log(b.six);//undefined
console.log(typeof b.three)//object
console.log(`The Variable ${c} is of typeof ${c}`)//The Variable undefined is of type undefined
console.log(`The Variable ${c} is of typeof ${c}`)//The Variable undefined is of type undefined
*/