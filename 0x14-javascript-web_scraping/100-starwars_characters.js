#!/usr/bin/node

const request = require('request');
const movieId = process.argv[2];
const url = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

// Function to fetch movie details by ID
function fetchMovieDetails(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}

// Function to fetch character details by URL
function fetchCharacter(characterUrl) {
  return new Promise((resolve, reject) => {
    request.get(characterUrl, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body).name);
      }
    });
  });
}

// Main function to fetch and print characters
async function fetchAndPrintCharacters(movieId) {
  try {
    const movieDetails = await fetchMovieDetails(url);
    const charactersUrls = movieDetails.characters;

    // Array to hold promises for character names
    const characterPromises = charactersUrls.map(characterUrl => fetchCharacter(characterUrl));

    // Resolve all promises concurrently
    const characterNames = await Promise.all(characterPromises);

    // Print character names in order
    characterNames.forEach(name => console.log(name));
  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute main function with provided movieId
fetchAndPrintCharacters(movieId);
