const express = require('express');
const { animals } = require('././data/animals.json');
const app = express();


// This function will take in req.query as an argument and filter through the animals accordingly, 
// returning the new filtered array. Go ahead and call the filterByQuery() in the app.get() callback 
// as shown in the following code:
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
      // Save personalityTraits as a dedicated array.
      // If personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
  }

// the get() method requires two arguments. The first is a string that describes 
// the route the client will have to fetch from. The second is a callback function 
// that will execute every time that route is accessed with a GET request.

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

// Wait a minute—what's a port? To understand ports, 
// let's make an analogy. Imagine that a website is like a college campus. A website has an address, 
// referred to as the host. A college campus also has an address. The host tells the client where to go, 
// but it doesn't specify exactly where to go. Likewise, if you have the address for a college campus, you don't 
// know exactly which building or classroom to go to. The port is like a building/classroom; it gives the exact desination on the host.

// The host for a website is the domain name, like google.com. The port is the number that comes after the domain name, like google.com:80.
// The port number is the way that a computer knows which program on the host to send the request to.
app.listen(3001, () => {
    
    console.log(`API server now on port 3001!`);
});