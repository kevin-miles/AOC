import crypto from 'crypto';

const password1 = (input) => {
  let password = '';
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

  return password;
}

const password2 = (input) => {
  let password = [];
  let hashInput;
  let index = 0;
  let hash = '';
  let pos;

  while(password.length !== 8){
    hashInput = `${input}${index}`;
    hash = crypto
    .createHash("md5")
    .update(hashInput)
    .digest("hex");

    pos = hash.slice(5,6);

    if(hash.slice(0,5) === '00000' && pos >= 0 && pos <= 7){
      if(!password[pos]) {
        password[pos] = hash.slice(6,7);
      }

    }
    index++;
  }

  return password.join('');
}

const input = 'uqwqemis';

console.log('part A:', password1(input));
console.log('part B:', password2(input));