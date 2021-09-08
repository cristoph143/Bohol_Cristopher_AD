function loopsMul(base){
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
    return newStr;
}
console.log(loopsMul(10));
console.log(loopsMul(20));