var num = {
    num: 1,
    str: 'Str',
    bol: true,
    nll: null,
    arr: [1,2,3],
    arr1: [1,2,'3'],
    arr2: [1,[2],'3'],
    arr3: [1,false,'3']
};

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