const color = [
    "ed1917",
    "f4a924",
    "f5d422",
    "f1f223",
    "a6dc0e",
    "35B400",
    "99D0E9",
    "3132FD",
    "1C2C85",
    "FFFFFF",
    "C6C6C6",
    "000000"
]

const sort = color.map(hex=> parseInt(hex, 16)).sort((a,b) => a-b)
console.log(sort)


let start = sort[0];
let end = parseInt((sort[0] + sort[1]) / 2)
console.log(start, end);
for(let i=1; i<sort.length-1; i++){
    start = end;
    end = parseInt((sort[i] + sort[i+1]) / 2);
    console.log(start, end);
}

start = end;
end = sort[sort.length-1];
console.log(start, end);
