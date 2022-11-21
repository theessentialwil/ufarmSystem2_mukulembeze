// program to generate random strings! Soruce: https://www.programiz.com/javascript/examples/generate-random-strings

// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    document.getElementById("orderno").value = result;

    // return result;
}

generateString(8)