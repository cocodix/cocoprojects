function getPuzzle(callback) {
  console.log('pero');
  console.log(callback);
}

// const getPuzzleWords = new XMLHttpRequest();

// getPuzzleWords.addEventListener('readystatechange', e => {
//   if (e.target.readyState === 4 && e.target.status === 200) {
//     const data = JSON.parse(e.target.responseText);
//   } else if (e.target.readyState === 4) {
//     console.log('Errooooor');
//   }
// });

// getPuzzleWords.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=2');
// getPuzzleWords.send();

const cCode = 'BA';

const capitalCities = new XMLHttpRequest();

capitalCities.addEventListener('readystatechange', e => {
  if (e.target.readyState === 4 && e.target.status === 200) {
    const data = JSON.parse(e.target.responseText);
    // console.log(data[234].capital);
    data.forEach(element => {
      if (element.alpha2Code === cCode) {
        // console.log(element.name);
      }
    });
  }
});

capitalCities.open('GET', 'http://restcountries.eu/rest/v2/all');
capitalCities.send();

function doHomework(subject, callback) {
  console.log(`Starting my ${subject} homework`);
  callback();
}
