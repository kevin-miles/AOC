import crypto from 'crypto';

let password = '';
let input = 'uqwqemis';
let hashInput;
let index = 0;
let hash = '';

while(password.length !== 8){
  hashInput = `${input}${index}`;
  hash = crypto
  .createHash("md5")
  .update(hashInput)
  .digest("hex");
  if(hash.slice(0,5) === '00000'){ password += hash.slice(5,6);}
  index++;
}

console.log(password);