/* Eloquent Javascript Chapter 6 */
//http://eloquentjavascript.net/07_elife.html

/**** 7.1 Artificial Stupidity ****/

/*
There are several obvious problems with our herbivores.
First, they are terribly greedy, stuffing themselves with
every plant they see until they have wiped out the local plant 
life. Second, their randomized movement (recall that the view.find 
method returns a random direction when multiple directions match) 
causes them to stumble around ineffectively and starve if there don’t 
happen to be any plants nearby. And finally, they breed very fast,
 which makes the cycles between abundance and famine quite intense.

Write a new critter type that tries to address one or more of these 
points and substitute it for the old PlantEater type in the valley world. 
*/

function SmartPlantEater() {
  this.energy = 20;
    this.capacity = 50;
    this.direction = "n";
}

SmartPlantEater.prototype.act = function(view) {
 
  var space = view.find(" ");
    //make the critter breed more slowly
    if (this.energy > 80 && space) {
      return {type: "reproduce", direction: space};
    }
    var plant = view.find("*");
    //make the critter less greedy
    if(this.energy < this.capacity) {
      if(plant)
        return {type: "eat", direction: plant};
    }
    //make the critter move more efficiently
    if (view.look(this.direction) != " " && space)
      this.direction = space;
    return {type: "move", direction: this.direction};

};

/**** 7.2 Predators ****/
/*
Any serious ecosystem has a food chain longer than 
a single link. Write another critter that survives 
by eating the herbivore critter. You’ll notice that 
stability is even harder to achieve now that there 
are cycles at multiple levels. Try to find a strategy 
to make the ecosystem run smoothly for at least a 
little while.
*/

function Tiger() {
  this.energy = 100;
  this.direction = "s";
  this.tigerCapacity = 300;
  this.preyCapacity = 10;
  this.seenCapacity = 0.50;
  this.preySeen = [];
}

Tiger.prototype.act = function(view) {
  var prey = view.findAll("O");
  this.preySeen.push(prey.length);
  var averageSeen = this.preySeen.reduce(function(a, b) {
    return a+b;
  }, 0) / this.preySeen.length;
  
  //if too many prey to remember
  if(this.preySeen.length > this.preyCapacity) {
    this.preySeen.shift;
  }
  
  //if seen enough to eat
  if(averageSeen > this.seenCapacity) {
    return {type: "eat", direction: randomElement(prey)};
  }
  
  var space = view.find(" ");
  //slow reproduction
  if (this.energy > this.tigerCapacity && space)
    return {type: "reproduce", direction: space};
  //moving fix
  if (view.look(this.direction) != " " && space)
    this.direction = space;
  return {type: "move", direction: this.direction};
};