function triangle (height) {
    let newStr = "";
    for (let i = 0; i < height; i++) {
        for (let j = 0; j <= i; j++) {
            newStr += "*";
        }
        newStr += "\n";
    }
    return newStr;
}

console.log(triangle(5));
console.log('')
console.log(triangle(6));
