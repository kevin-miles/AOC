import fs from 'fs';
import path from 'path';

fs.readFile(path.resolve(__dirname, 'input.txt'), 'utf8', (err, data) => {
  if (err) throw err;

  const splitByLine = data.split('\n');
  let triangles = [];

  for (let line in splitByLine) {
    triangles[line] = splitByLine[line].split(' ');
  }

  let counter = 0;

  const checkTriangle = (a,b,c) => {
    if((a + b) > c){
      if((a + c) > b){
        if((b + c) > a){
          return true;
        }
      }
    }
  }

  for(let i in triangles){
  let triangle = triangles[i];
  let a = parseInt(triangle[0]);
  let b = parseInt(triangle[1]);
  let c = parseInt(triangle[2]);

    if((a + b) > c){

      if((a + c) > b){

        if((b+c) > a){

          counter++;
        }
      }
    }
  }
  console.log(counter);
  counter=0;
  for(let i=2; i<triangles.length; i+=3){
    let triangle1 = triangles[i];
    let triangle2 = triangles[i-1];
    let triangle3 = triangles[i-2];

    let t1a = parseInt(triangle1[0]);
    let t1b = parseInt(triangle2[0]);
    let t1c = parseInt(triangle3[0]);
    let t2a = parseInt(triangle1[1]);
    let t2b = parseInt(triangle2[1]);
    let t2c = parseInt(triangle3[1]);
    let t3a = parseInt(triangle1[2]);
    let t3b = parseInt(triangle2[2]);
    let t3c = parseInt(triangle3[2]);

    checkTriangle(t1a,t1b,t1c) ? counter++ : null;
    checkTriangle(t2a,t2b,t2c) ? counter++ : null;
    checkTriangle(t3a,t3b,t3c) ? counter++ : null;

  }
  console.log(counter);
});

