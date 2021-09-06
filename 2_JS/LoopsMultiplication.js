function loopsMul(base){
    let newStr = "";
    for (let i = 1; i <= base; i++) {
        for (let j = 1; j <= base; j++) {
            newStr += `${i*j}   `;
        }
        newStr += "\n";
    }
    return newStr;
}
console.log(loopsMul(10));
console.log(loopsMul(20));