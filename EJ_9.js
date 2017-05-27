/* Eloquent Javascript Chapter 9: Regular Expressions */
//http://eloquentjavascript.net/09_regexp.html

/**** 9.1 Regexp Golf ****/
/*
For each of the following items, write a regular expression 
to test whether any of the given substrings occur in a string. 
The regular expression should match only strings containing one 
of the substrings described. Do not worry about word boundaries 
unless explicitly mentioned. When your expression works, see 
whether you can make it any smaller.
*/

//car and cat
verify(/ca[rt]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

//pop and prop
verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop"]);

//ferrey, ferry, ferrari
verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

//ends in ious
verify(/ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

//whitespace followed by a dot, comma, colon, or semicolon
verify(/\s[.,:;]/,
       ["bad punctuation ."],
       ["escape the dot"]);

//word longer than 6 letters
verify(/\w{7,}/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

//word w/o the letter e
verify(/\b[a-df-z]+\b/i,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  yes.forEach(function(s) {
    if (!regexp.test(s))
      console.log("Failure to match '" + s + "'");
  });
  no.forEach(function(s) {
    if (regexp.test(s))
      console.log("Unexpected match for '" + s + "'");
  });
}

/**** 9.2 Quoting Style ****/
/*
Imagine you have written a story and used single quotation marks 
throughout to mark pieces of dialogue. Now you want to replace 
all the dialogue quotes with double quotes, while keeping the 
single quotes used in contractions like aren’t.
*/

console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));

/**** 9.3 Numbers Again ****/

/*
Write an expression that matches only JavaScript-style numbers. 
It must support an optional minus or plus sign in front of the 
number, the decimal dot, and exponent notation—5e-3 or 1E10— 
again with an optional sign in front of the exponent. Also note 
that it is not necessary for there to be digits in front of or 
after the dot, but the number cannot be a dot alone. 
*/

// Fill in this regular expression.
var number = /^(\+|-|)(\d+(\.\d*)?|\.\d+)([eE](\+|-|)\d+)?$/;

// Tests:
["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4",
 "1e+12"].forEach(function(s) {
  if (!number.test(s))
    console.log("Failed to match '" + s + "'");
});
["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5",
 "."].forEach(function(s) {
  if (number.test(s))
    console.log("Incorrectly accepted '" + s + "'");
});