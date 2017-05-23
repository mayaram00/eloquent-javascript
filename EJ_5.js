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

var hasMother = ancestry.filter(function(person) {
  return byName[person.mother] != null;
});

function ageDifference(person, mother) {
  return person.born - mother.born;
};

//returns the average difference for each person that has a mother
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

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

function groupBy(array, grouping) {
  var groups = {};
  array.forEach(function(element) {
    var groupName = grouping(element);
    if (groupName in groups)
      groups[groupName].push(element);
    else
      groups[groupName] = [element];
  });
  return groups;
}

function determineCentury(person) {
	return Math.ceil(person.died / 100);
};

var groupByCentury = groupBy(ancestry, determineCentury);
  
for (var century in groupByCentury) {
	var lifeExpectancies = groupByCentury[century].map(function(person) {
		return person.died - person.born;
	});
	console.log(century + ": " + average(lifeExpectancies));
};

/**** 5.4 Every And Then Some ****/

/*
every returns true only when the predicate returns true for all 
elements of the array. some returns true as soon as the predicate
returns true for any of the elements.
*/

function every(array, predicate) {
  for(var i = 0; i < array.length; i++) {
    if (!predicate(array[i])) return false;
  }
  return true;
}

function some(array, predicate) {
  for(var i = 0; i < array.length; i++) {
    if (predicate(array[i])) return true;
  }
  return false;
}

