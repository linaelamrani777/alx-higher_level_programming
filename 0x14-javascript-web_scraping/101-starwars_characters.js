#!/usr/bin/node

const request = require('request');
const id = process.argv[2];

const url = `https://swapi-api.alx-tools.com/api/films/${id}/`;

// Function to fetch film details by ID
function fetchFilmDetails(url) {
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
    const filmDetails = await fetchFilmDetails(url);
    const characters = filmDetails.characters;

    // Fetch and print characters in order
    for (let characterUrl of characters) {
      const characterName = await fetchCharacter(characterUrl);
      console.log(characterName);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute main function with provided movieId
fetchAndPrintCharacters(id);
