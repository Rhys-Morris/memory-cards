export async function fetchPokemon(numCards) {
  // Populate an array with random numbers between 1-150
  const pokedexIndexes = [];

  for (let i = 0; i < numCards; i++) {
    let randomPokedexNum = randomNumber(150) + 1;
    while (pokedexIndexes.includes(randomPokedexNum)) {
      randomPokedexNum = randomNumber(150) + 1;
    }
    pokedexIndexes.push(randomPokedexNum);
  }

  const pokemon = await Promise.all(
    pokedexIndexes.map((num) => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then((res) => res.json())
        .then(
          (pokemon) =>
            pokemon.sprites.other["official-artwork"]["front_default"]
        );
    })
  );

  return pokemon;
}

export function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
