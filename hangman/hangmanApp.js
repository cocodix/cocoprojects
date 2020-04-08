const array = ['banana', 'kiwi'];

getPuzzle(function() {
  console.log('sex');
});

// puzzle => {
//   console.log(puzzle);
// });

const tomo = () => {
  console.log('tomo');
};

doHomework('math', tomo);
doHomework('math', () => {
  console.log('Done');
});

console.log(array);
