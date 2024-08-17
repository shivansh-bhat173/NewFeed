let naaam = sessionStorage.getItem("name");
let points  = sessionStorage.getItem("score");
console.log(naaam);
console.log(score);

let endscore = 0;
for(let i=0;i<10;i++){
    if(sessionStorage.getItem(`answer${i}`) == questions[i].answer){
        endscore+=10;
    }
    console.log(sessionStorage.getItem(`answer${i}`));
}

if(endscore>=30){
    result = 'PASS';    
}
else{
    result= "FAIL";
}
document.getElementById('score').innerHTML = endscore;
document.getElementById('name').innerHTML = naaam;
document.getElementById('result').innerHTML = result;