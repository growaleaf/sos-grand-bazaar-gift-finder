const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataSrc = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(dataSrc + '\nthis.CANDIDATES = CANDIDATES; this.SOURCE_URL = SOURCE_URL; this.SOURCE_NAME = SOURCE_NAME;', sandbox);
const CANDIDATES = sandbox.CANDIDATES;

let passed = 0;
let failed = 0;

function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    passed++;
    console.log('PASS: ' + label);
  } else {
    failed++;
    console.log('FAIL: ' + label + ' -- expected ' + e + ' got ' + a);
  }
}

function findCandidate(name) {
  return CANDIDATES.find(function (c) { return c.name === name; });
}

// 1. Candidate count must be exactly 12 (12 marriage candidates).
assertEqual(CANDIDATES.length, 12, 'candidate count is 12');

// 2. Derek's favourite gift (known-answer from source).
assertEqual(findCandidate('Derek').favourite, ['Cream croquettes'], 'Derek favourite is Cream croquettes');

// 3. Derek loves Donburi rice bowl and Any beetle.
assertEqual(findCandidate('Derek').loves, ['Donburi rice bowl', 'Any beetle'], 'Derek loves list');

// 4. Derek's dislikes category is Salads.
assertEqual(findCandidate('Derek').dislikesCategory, 'Salads', 'Derek dislikes category is Salads');

// 5. Jules' favourite gift is Herbal perfume.
assertEqual(findCandidate('Jules').favourite, ['Herbal perfume'], 'Jules favourite is Herbal perfume');

// 6. Diana's favourite gift is Apple pie.
assertEqual(findCandidate('Diana').favourite, ['Apple pie'], 'Diana favourite is Apple pie');

// 7. Kagetsu's favourite gift is Soy milk pudding.
assertEqual(findCandidate('Kagetsu').favourite, ['Soy milk pudding'], 'Kagetsu favourite is Soy milk pudding');

// 8. Every candidate has a non-empty favourite, loves, and likes array.
const allNonEmpty = CANDIDATES.every(function (c) {
  return c.favourite.length > 0 && c.loves.length > 0 && c.likes.length > 0;
});
assertEqual(allNonEmpty, true, 'every candidate has non-empty favourite/loves/likes');

// 9. Every candidate has a likesCategory and dislikesCategory string.
const allCategoriesSet = CANDIDATES.every(function (c) {
  return typeof c.likesCategory === 'string' && c.likesCategory.length > 0 &&
         typeof c.dislikesCategory === 'string' && c.dislikesCategory.length > 0;
});
assertEqual(allCategoriesSet, true, 'every candidate has likesCategory and dislikesCategory');

// 10. Searching "Chocolate" should surface June, Freya, Maple, Diana (known from source data).
function matchesItem(c, q) {
  const norm = function (s) { return s.toLowerCase(); };
  return c.favourite.concat(c.loves, c.likes).some(function (i) { return norm(i).includes(norm(q)); });
}
const chocolateMatches = CANDIDATES.filter(function (c) { return matchesItem(c, 'Chocolate'); }).map(function (c) { return c.name; }).sort();
assertEqual(chocolateMatches, ['Diana', 'Freya', 'June', 'Maple', 'Samir'].sort(), 'Chocolate matches June, Freya, Maple, Diana, Samir');

// 11. No candidate name repeats (12 unique names).
const uniqueNames = new Set(CANDIDATES.map(function (c) { return c.name; }));
assertEqual(uniqueNames.size, 12, '12 unique candidate names');

console.log('\n' + passed + ' passed, ' + failed + ' failed');
if (failed > 0) {
  process.exit(1);
}
