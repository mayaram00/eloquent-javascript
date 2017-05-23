/* Eloquent Javascript Chapter 4 */
//http://eloquentjavascript.net/04_data.html

/**** 4.1 The Sum of a Range ****/
/*
Write a range function that takes two arguments, 
start and end, and returns an array containing all 
the numbers from start up to (and including) end.

Next, write a sum function that takes an array of numbers 
and returns the sum of these numbers.
*/

function range(start, end, step) {
  var array = [];

  if (step == null) step = 1;
  
  if (step > 0) {
    for (var i = start; i <= end; i += step)
      array.push(i);
  } else {
    for (var i = start; i >= end; i += step)
      array.push(i);
  }
  return array;
}

function sum(array) {
  var total = 0;
  for (var i = 0; i < array.length; i++)
    total += array[i];
  return total;
}

/**** 4.2 Reversing an Array ****/

/*
reverseArray takes an array as argument and produces a new array 
that has the same elements in the inverse order. 
reverseArrayInPlace does what the reverse method does: 
it modifies the array given as argument in order to reverse its elements.
Neither may use the standard reverse method.
*/

function reverseArray(array) {
  reversedArray = [];
  for(var i = array.length-1; i >= 0; i--) {
    reversedArray.push(array[i]);
  }
  return reversedArray;
}

function reverseArrayInPlace(array) {
  var midpoint = Math.floor(array.length / 2);
  for(var i = 0; i < midpoint; i++) {
    var front = array[i];
    array[i] = array[array.length-1 - i];
    array[array.length-1 - i] = front;
  }
  return array;
}

/**** 4.3 A list ****/
/*
Write a function arrayToList that builds up a data structure like
the previous one when given [1, 2, 3] as argument
and write a listToArray function that produces an array from a list. 
Also write the helper functions prepend, which takes an element and a 
list and creates a new list that adds the element to the front of the 
input list, and nth, which takes a list and a number and returns the 
element at the given position in the list, or undefined when there is n
o such element.
*/

function arrayToList(array) {
  var list = null;
  for(var i = array.length-1; i >= 0; i--) {
    list = {value: array[i], rest: list};
  }
  return list;
}

function listToArray(list) {
  var array = [];
  for(var node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

function prepend(element, list) {
  return {value: element, rest: list};
}

function nth(list, num) {
  if(!list) {
    return undefined;
  } else if(num == 0) {
    return list.value;
  } else {
    return nth(list.rest, num-1);
  }
}

/**** 4.4 Deep Comparison ****/

/*
Write a function, deepEqual, that takes two values and 
returns true only if they are the same value or are objects 
with the same properties whose values are also equal when 
compared with a recursive call to deepEqual.
*/

function deepEqual(val1, val2) {
  if(val1 === val2) return true;
  
  if(val1 == null ||
     val2 == null ||
     typeof val1 != "object"
     || typeof val2 != "object") {
    return false;
  }
  
  var numVal1Props = 0;
  var numVal2Props = 0;
  
  for(prop in val1) {
    numVal1Props++;
  }
  
  for(prop in val2) {
    numVal2Props++;
  }
  
  if(numVal1Props != numVal2Props) {
    return false;
  }
  
  for(prop in val1) {
     if (!(prop in val2) || !deepEqual(val1[prop], val2[prop]))
      return false;
  }
  
  //all tests passed
  return true;
}