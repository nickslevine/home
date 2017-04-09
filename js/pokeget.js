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

let download = (saveFile,startAt) => {
  let pokemon = {};
  let completed = 0.0;

  _.times(50, (n) => {
    let url = "http://pokeapi.co/api/v2/pokemon/" + (n+1+startAt);
    console.log(url);
    entry = d3.json(url, (err, data) => {
      if (err) {throw err}
      else {
        completed ++;
        let perc = completed / 50.0;
        console.log(`${(perc*100).toFixed(1)}% of pokemon downloaded`)

        // console.log(data[String(n+1)].name)
        pokemon[n+1+startAt] = data;

        if ((n+1+startAt)==50+startAt) {
          save(saveFile,pokemon);
        }}
    });
  });
}

let process = (fileName, number, startAt) => {
  file1 = fs.readFileSync('firstFifty.txt');
  file2 = fs.readFileSync('secondFifty.txt');
  file3 = fs.readFileSync('thirdFifty.txt');
  data1 = JSON.parse(file1);
  data2 = JSON.parse(file2);
  data3 = JSON.parse(file3);

  let pokemonNames = [];
  let missingNo = [];
  let pokemon = {};

  _.times(number, (n) => {
    if (_.has(data1, String(n+1))) {
      let entry = data1[String(n+1)];
      let name = entry.name;
      let types = [];
      _.each(entry.types, (t) => types.push(t.type.name));
      pokemon[entry.name] = {
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
      }
    }
    else {
      missingNo.push(n+1);
    }
  });
  _.times(number, (n) => {
    if (_.has(data2, String(n+1+50))) {
      let entry = data2[String(n+1+50)];
      let name = entry.name;
      let types = [];
      _.each(entry.types, (t) => types.push(t.type.name));
      pokemon[entry.name] = {
        "number": n+1+50,
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
      }
    }
    else {
      missingNo.push(n+51);
    }
  });
  _.times(number, (n) => {
    if (_.has(data3, String(n+1+100))) {
      let entry = data3[String(n+1+100)];
      let name = entry.name;
      let types = [];
      _.each(entry.types, (t) => types.push(t.type.name));
      pokemon[entry.name] = {
        "number": n+1+100,
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
      }
    }
    else {
      missingNo.push(n+101);
    }
  });
  console.log(missingNo);
  return pokemon;
}

let processPy = () => {
  file = fs.readFileSync('../csv/pokedexFinal.json');
  data = JSON.parse(file);
  let pokearray = [];
  _.each(data, (d) => pokearray.push(d));
  console.log(pokearray)
  let pokedex = {};
  pokedex["poke"] = pokearray;
  return pokedex;
}

// download('secondFifty.txt',50)
// let pokedex = process('secondFifty.txt', 50,50);
// print(_.keys(pokedex).length);
let pokedex = processPy();
save('../csv/pokedexFull_py.json', pokedex);
