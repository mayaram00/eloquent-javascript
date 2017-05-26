/* Eloquent Javascript Chapter 8 */
//http://eloquentjavascript.net/08_error.html

/**** 8.1 Retry ****/
/*
Say you have a function primitiveMultiply that, 
in 50 percent of cases, multiplies two numbers, 
and in the other 50 percent, raises an exception of 
type MultiplicatorUnitFailure. Write a function that 
wraps this clunky function and just keeps trying until 
a call succeeds, after which it returns the result.
*/

function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a,b);
    } catch (e) {
      if(!(e instanceof MultiplicatorUnitFailure())) {
        throw e;
      }
    }
  }
}

/**** 8.2 The Locked Box ****/
/*
Write a function called withBoxUnlocked that 
takes a function value as argument, unlocks 
the box, runs the function, and then ensures that 
the box is locked again before returning, regardless 
of whether the argument function returned normally or 
threw an exception.
*/
function withBoxUnlocked(body) {
  locked = box.locked;
  try {
    box.unlock();
    return body();
  } catch(e) {
    throw e;
  } finally {
    if(locked) {
      box.lock();
    }
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}