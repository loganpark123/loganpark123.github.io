let cities = [];
let totalCities = 13;

let population = [];
let fitness = [];

let popSize = 5000;

let recordDistance = Infinity;
let bestEver;

let statusP;

function setup() {
  createCanvas(600, 600);
  var order = [];
  for (let i = 0; i < totalCities; i++) {
    let v = createVector(random(width), random(height/2));
    cities[i] = v;
    order[i] = i;
  }

  for (let i = 0; i < popSize; i++){
    population[i] = shuffle(order);
  //  shuffle(population[i], 100);
  }
  calcFitness();
}



function draw() {
  background(0);

  // GA
  calcFitness();
  normalizeFitness();
  nextGen();

  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < bestEver.length; i++) {
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();



  translate(0, height / 2);
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < currentBest.length; i++) {
    var n = currentBest[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();



}

// function shuffle(a, num) {
//   for (var i = 0; i < num; i++) {
//     var indexA = floor(random(a.length));
//     var indexB = floor(random(b.length));
//     swap(a, indexA, indexB);
//
//   }
// }

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}


function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

function calcFitness() {
    var currentRecord = Infinity;
  for (let i = 0; i < population.length; i++){
    let d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i];
    }
    //fitness[i] = 1 / (d + 1);
    fitness[i] = 1 / (pow(d, 8) + 1);
  }
}

function normalizeFitness() {
  let sum = 0;
  for (let i = 0; i < fitness.length; i++){
    sum += fitness[i];
  }
  for (let i = 0; i < fitness.length; i++){
    fitness[i] = fitness[i] / sum;
  }
}

function nextGen() {
  let newPopulation = [];
  for (let i = 0; i < population.length; i++){
    var order = pickOne(population, fitness);
    mutate(order);
    newPopulation[i] = order;
  }
  population = newPopulation;

}

function pickOne(list, prob) {
  let index = 0;
  let r = random(1);
  while (r > 0){
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

function mutate(order, mutationRate) {
      var indexA = floor(random(order.length));
      //var indexB = (indexA + 1) % totalCities;
      var indexB = floor(random(order.length));

      swap(order, indexA, indexB);

}
