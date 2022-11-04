var prompt = require('prompt-sync')();


let para = prompt("Enter the paragraph: ");
let find = prompt("Enter string you want to search: ");

//let para = "This okay ok. Is that okay?"
let pattern = new RegExp(find, 'g');
console.log(pattern);
//console.log(pattern.test(para));

if(pattern.test(para)){
    matches = para.matchAll(find);
    console.log({matches});
    for (const match of matches) {
        console.log(match);
    }
}
else{
    console.log('\x1b[31m%s\x1b[0m','No match found.');
}
