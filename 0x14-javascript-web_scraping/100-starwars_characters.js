#!/usr/bin/node

const request = require('request');
const id = process.argv[2];

const url = `https://swapi-api.alx-tools.com/api/films/${id}/`;

// Function to fetch characters for a given movie ID
function fetchCharacters(movieId) {
  request.get(url, (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }
    
    const filmData = JSON.parse(body);
    const characters = filmData.characters;

    // Fetch each character's name
    characters.forEach(characterUrl => {
      request.get(characterUrl, (error, response, body) => {
        if (error) {
          console.error(error);
        } else {
          const characterData = JSON.parse(body);
          console.log(characterData.name);
        }
      });
    });
  });
}

// Call the function with the provided movieId
fetchCharacters(id);
