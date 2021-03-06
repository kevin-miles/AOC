import fs from 'fs';
import path from 'path';

const sumRealRoomSectorIds = (inputPath) => {
  const data = fs.readFileSync(inputPath, 'utf8');
  const dataArr = data.split('\n');

  const isRealRoom = ( checksum, characterCount ) => {
    let isReal = null;
    let indicies = {};

    for(let char of checksum){
      indicies[char] = characterCount.findIndex(x => x.chars.indexOf(char) !== -1)
    }

    for(let i=0; i<checksum.length; i++){
      let currentLetter = checksum[i];
      let nextLetter = checksum[i+1];
      let currentIndex = indicies[currentLetter];
      let nextIndex = indicies[nextLetter];
      let currentLetterCode = currentLetter.charCodeAt(0);
      let nextLetterCode = nextLetter ? nextLetter.charCodeAt(0) : null;

      if(currentIndex > nextIndex || currentIndex === -1){
        isReal = false;
        break;
      } else if(currentIndex === nextIndex){
        if(currentLetterCode < nextLetterCode){
          isReal = true;
        } else {
          isReal = false;
          break;
        }
      } else if (!nextIndex || currentIndex < nextIndex){
        isReal = true;
      } else {
        isReal = false;
        break;
      }
    }
    return isReal;
  };

  const sum = dataArr.map((r)=>{
    const checksum = r.slice(r.length-6, r.length).slice(0, 5).split('');
    const sectorId = parseInt(r.slice(r.length-10, r.length-7));
    const encryptedName = r.slice(0, r.length-11).split('-').join('').split('').sort().join('');
    let characterCount = [];

    for(let i=0; i<encryptedName.length; ){
      const char = encryptedName[i];
      const count = encryptedName.split(char).length - 1;
      const existingIndex = characterCount.findIndex((el)=>{ return el.count === count; });
      if(existingIndex !== -1) {
        characterCount[existingIndex].chars.push(char);
      } else {
        characterCount.push({'chars': [char], 'count': count});
      }
      i+=count;
    }
    characterCount.sort(function(a,b) {
      return b.count - a.count;
    });

    if(isRealRoom(checksum, characterCount)){
      return sectorId;
    }
  }).filter(Boolean).reduce((a, b)=>a+b);

  return sum;
};

const findRoomName = (inputPath) => {
  const data = fs.readFileSync(inputPath, 'utf8');
  const dataArr = data.split('\n');

  return dataArr.map((item)=>{
    let code = item.slice(0, item.length-11).split('-').join(' ');
    const sectorId = parseInt(item.slice(item.length-10, item.length-7));
    let newCode = [];
    for(let char in code){
      const charCode = code[char].charCodeAt(0);
      let newCharCode = charCode;
      if( charCode === 32) {
        newCharCode = 32;
      } else {
        for(let i=0; i < sectorId; i++){
          if(newCharCode < 122){
            newCharCode++;
          } else if (newCharCode === 122) {
            newCharCode = 97;
          }
        }
      }

      newCode.push(String.fromCharCode(newCharCode));
    }
    return {
      sectorId: sectorId,
      code: newCode.join('')
    };
  }).filter((item)=>{
    return item.code.indexOf('north') !== -1;
  });
}

//const part1 = sumRealRoomSectorIds(path.resolve(__dirname, 'input.txt'));
const part2 = findRoomName(path.resolve(__dirname, 'input.txt'));
//console.log(part1);
console.log(part2);

