function primeNumber(num){
    let cnt = 0;
    let val = Math.ceil(Math.sqrt(num));
    /*
        > i = 2 since prime number is greater that 1
        sqrt(5) = 2.23606797749979
        ceil(2.23606797749979) = 3
        i | i <= val| num % i == 0 | count | i++
        2 | 2 <= 3  | 5   % 2 == 0 |  0   | 2++
                    |     1   == 0 |  0   | 3
        3 | 3 <= 3  | 5   % 3 == 0 |  0   | 3++
                    |     2   == 0 |  0  |  4
        sqrt(6) = 2.449489742783178
        ceil(2.449489742783178) = 3
        i | i <= val| num % i == 0 | count | i++
        2 | 2 <= 3  | 6   % 2 == 0 |  0   | 2++
                    |     0   == 0 |  1   | 3
        3 | 3 <= 3  | 6   % 3 == 0 |  1   | 3++
                    |     0   == 0 |  1  |  4
    */
    for(let i = 2; i <= val; i++){
        if(num % i == 0){
            cnt = 1;
            console.log(`${i} ${val} ${num} ${cnt}`)
            break;
        }
        console.log(`${i} ${val} ${num} ${cnt}`)
    }
    return ((cnt == 0 && num != 1) || (num == 2 || num == 3)) 
            ? true : false;
}
//prime
console.log('5 is a prime number? ' + primeNumber(5));
console.log('211 is a prime number? ' + primeNumber(211));

//not prime
console.log('6 is a prime number? ' + primeNumber(6));
console.log('221 is a prime number? ' + primeNumber(221));