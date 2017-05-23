/* Eloquent Javascript Chapter 5 */
//http://eloquentjavascript.net/05_higher_order.html

/**** 5.1 Flattening ****/
/*
Use the reduce method in combination with the concat method
to “flatten” an array of arrays into a single array that
has all the elements of the input arrays.
*/

var arrays = [[1, 2, 3], [4, 5], [6]];

console.log(arrays.reduce(function(flattened, current) {
	return flattened.concat(current);
}));

/**** 5.2 Mother-Child Age Difference ****/

/*
Using the example data set from this chapter, 
compute the average age difference between mothers
and children (the age of the mother when the child
is born). You can use the average function defined
earlier in this chapter.
*/

//These functions provided by EJ
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

//My code

//filters ancestry based on whether the person has a mother
var hasMother = ancestry.filter(function(person) {
  return byName[person.mother] != null;
});

//given two person objects, returns the difference in age
function ageDifference(person, mother) {
  return person.born - mother.born;
};

//returns the average difference for each person that has a mother
//Maps the person to the difference
var avgDifferences = average(hasMother.map(function(person) {
  var mother = byName[person.mother];
  return ageDifference(person, mother);
}));

console.log(avgDifferences);

/**** 5.3 Historical Life Expectancy ****/
/*
Compute and output the average age of the people in the 
ancestry data set per century. A person is assigned to a 
century by taking their year of death, dividing it by 100, 
and rounding it up, as in Math.ceil(person.died / 100).
*/



