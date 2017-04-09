var d3 = require('d3');
var fs = require('fs');
var _ = require('lodash');

const print = (t) => console.log(t);

let save = (saveFile, pokemon) => {
  pokemon = JSON.stringify(pokemon);

  fs.writeFile(saveFile, pokemon, function(err) {
      if (err) {
          return console.log(err);
      }
  });
}

let download = () => {
  let pokemon = {};
  let completed = 0.0;

  _.times(150, (n) => {
    let url = "http://pokeapi.co/api/v2/pokemon/" + (n+1);
    entry = d3.json(url, (err, data) => {
      if (err) {throw err}
      else {
        completed ++;
        let perc = completed / 150.0;
        console.log(`${perc}% of pokemon downloaded`)
        
        pokemon[n+1] = data;
        if ((n+1)==150) {
          save(pokemon);
        }}
    });
  });
}

let process = (fileName, number) => {
  file = fs.readFileSync(fileName);
  data = JSON.parse(file);

  let pokemonNames = [];
  let missingNo = [];
  let pokemon = {index:[]};

  _.times(number, (n) => {
    if (_.has(data, String(n+1))) {
      let entry = data[String(n+1)];
      let name = entry.name;
      let types = [];
      _.each(entry.types, (t) => types.push(t.type.name));
      pokemon.index.push({
        "number": n+1,
        "height": entry.height,
        "weight": entry.weight,
        "base_experience": entry.base_experience,
        "base_speed": entry.stats[0]["base_stat"],
        "base_special_defense": entry.stats[1]["base_stat"],
        "base_special_attack": entry.stats[2]["base_stat"],
        "base_defense": entry.stats[3]["base_stat"],
        "base_attack": entry.stats[4]["base_stat"],
        "base_hp": entry.stats[5]["base_stat"],
        "types": types,
        "name": entry.name
      })
    }
    else {
      missingNo.push(n+1);
    }
  });
  return pokemon;
}

let pokedex = process('saveFile.txt', 150);
save('../csv/pokedex_py.json', pokedex);
