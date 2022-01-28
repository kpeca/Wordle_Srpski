const submitBtn = document.querySelector('.btn');

let wordsList = ["grana", "vrana", "petak", "sekta", "metak", "rafal", "puška", "mozak", "jedan", "brada", "kadar", "patka", "mačka", "čičak", "lepak", "sluga", "irvas", "pelet", "rizla", "guska", "flaša", "gulaš", "lampa", "stara", "divna", "miloš", "pavle", "sloba", "srđan", "bosna", "malta", "azija", "dinar", "dolar", "trema", "kreda", "marka", "maska", "rampa", "radar"];

let niz = [0,1,2,3];

let num = Math.floor(Math.random() * wordsList.length);
// let correctWord = 'garda';
let correctWord = wordsList[num];
let onSpot = 0;
let existsButNotOnSpot = 0;
let numAttempts = 6;
let iterrator = 0;
let msgEl = document.querySelector('.message');
let msgString1;
let msgString2;
document.getElementById('word').focus();

let isOccurence = (x, arr) => {
  return arr.split(x).length - 1;
}

let guessWord = () => {


  let word = document.getElementById("word").value
  document.getElementById("word").value = '';
  if (word.length !== 5) {
    alert("You entered wrong word length");
    return;
  }

  for (let i = 0, j = iterrator; i < 5; i++ , j++) {
    document.querySelector(`#box${j+1}`).innerHTML = word[`${i}`].toUpperCase();
  }

  for (let i = 0, j = iterrator; i < 5; i++ , j++) {
    if (correctWord[i] === word[i]) {
      onSpot++;
      document.querySelector(`#box${j+1}`).style.background = 'green';
    } else if (correctWord[i] !== word[i] && (correctWord.includes(word[i]) && isOccurence(word[i], correctWord) - isOccurence(word[i], word) >= 0 )) {
      existsButNotOnSpot++;
      document.querySelector(`#box${j+1}`).style.background = 'yellow';
    }

    if (i === 4) iterrator = j + 1;
  }
  if(correctWord.trim() === word.trim())
  { 
      // for (let i = 0; i < correctWord.length; i++) {
      //   document.querySelector(`#box${i+1}`).style.background = 'green';
        
      // }
      // alert("CONGRATS, YOU WON!!!")
      msgEl.innerHTML = 'Congrats, YOU WON!!!'
      return;
  }

  msgString1 = onSpot + existsButNotOnSpot === 1 ? 'slovo' : 'slova';
  msgString2 = existsButNotOnSpot === 1 ? 'nije' : 'nisu';

  
  //  alert(`Pogodili ste ${onSpot} slova, a ${existsButNotOnSpot} nisu na mestu.
  //  Imate jos ${numAttempts} pokusaja`);
  
  numAttempts--;
  
  msgEl.innerHTML = `Pogodili ste ${onSpot + existsButNotOnSpot} ${msgString1}, ${onSpot} je na mestu, a ${existsButNotOnSpot} nije na mestu.
  Imate jos ${numAttempts} pokusaja`
  
  onSpot = 0;
  existsButNotOnSpot = 0;

  if (numAttempts === 0) {
    msgEl.innerHTML = `Zao mi je, izgubili ste, reč je bila ${correctWord}`
    return;
  }
}

submitBtn.addEventListener('click', guessWord)
window.addEventListener('keypress', (e) => {
  console.log(e);
  if (e.key === 'Enter') {
    guessWord();
  }
})

console.log(isOccurence('r',correctWord));