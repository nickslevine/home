const print = (t) => console.log(t);

const format_string = (s) => _.map(s.split("_"),_.upperFirst).join(" ");

const corr = {
  base_attack: {
    base_attack: 1,
    base_defense: 0.487813738,
    base_experience: 0.508588787,
    base_hp: 0.300754579,
    base_special_attack: 0.139454434,
    base_special_defense: 0.363043677,
    base_speed: 0.188180322,
    height: 0.315784888,
    number: 0.252494245,
    weight: 0.472878368
  },
  base_defense: {
    base_attack: 0.487813738,
    base_defense: 1,
    base_experience: 0.320357099,
    base_hp: 0.110967661,
    base_special_attack: 0.180089004,
    base_special_defense: 0.13025846,
    base_speed: -0.063034135,
    height: 0.366808019,
    number: 0.316908959,
    weight: 0.421558436
  },
  base_experience: {
    base_attack: 0.508588787,
    base_defense: 0.320357099,
    base_experience: 1,
    base_hp: 0.68919908,
    base_special_attack: 0.588988681,
    base_special_defense: 0.715805602,
    base_speed: 0.435183955,
    height: 0.345121933,
    number: 0.181994288,
    weight: 0.424848189
  },
  base_hp: {
    base_attack: 0.300754579,
    base_defense: 0.110967661,
    base_experience: 0.68919908,
    base_hp: 1,
    base_special_attack: 0.229199224,
    base_special_defense: 0.484940165,
    base_speed: -0.051197276,
    height: 0.252181435,
    number: 0.192902375,
    weight: 0.458902129
  },
  base_special_attack: {
    base_attack: 0.139454434,
    base_defense: 0.180089004,
    base_experience: 0.588988681,
    base_hp: 0.229199224,
    base_special_attack: 1,
    base_special_defense: 0.517785243,
    base_speed: 0.406185459,
    height: 0.164305657,
    number: 0.245739511,
    weight: 0.155709243
  },
  base_special_defense: {
    base_attack: 0.363043677,
    base_defense: 0.13025846,
    base_experience: 0.715805602,
    base_hp: 0.484940165,
    base_special_attack: 0.517785243,
    base_special_defense: 1,
    base_speed: 0.386012825,
    height: 0.320167981,
    number: 0.242350248,
    weight: 0.381855891
  },
  base_speed: {
    base_attack: 0.188180322,
    base_defense: -0.063034135,
    base_experience: 0.435183955,
    base_hp: -0.051197276,
    base_special_attack: 0.406185459,
    base_special_defense: 0.386012825,
    base_speed: 1,
    height: 0.210911093,
    number: 0.1206038,
    weight: 0.063928244
  },
  height: {
  base_attack: 0.315784888,
  base_defense: 0.366808019,
  base_experience: 0.345121933,
  base_hp: 0.252181435,
  base_special_attack: 0.164305657,
  base_special_defense: 0.320167981,
  base_speed: 0.210911093,
  height: 1,
  number: 0.23299321,
  weight: 0.565656788
  },
  weight: {
base_attack: 0.472878368,
base_defense: 0.421558436,
base_experience: 0.424848189,
base_hp: 0.458902129,
base_special_attack: 0.155709243,
base_special_defense: 0.381855891,
base_speed: 0.063928244,
height: 0.565656788,
number: 0.2796832,
weight: 1
  }
}

function chart(x_var, y_var) {

  d3.json("/csv/pokedexFinal.json", (err, data) => {
    if (err) {throw err}

    // console.log(_.keys(data).length)

    // define chart region 
    var margin = {top: 60, right: 20, bottom: 60, left: 60},
      width = 960 - margin.left - margin.right,
      height = 550 - margin.top - margin.bottom;

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var svg = d3.select("#chartDiv").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    var tool = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // process data
    let pokearray = [];
    _.each(data, (d) => pokearray.push(d));
    // print(pokearray);

    // set domains
    x.domain([0, d3.max(pokearray, (d) => d[x_var])]);
    y.domain([0, d3.max(pokearray, (d) => d[y_var])]);

    // add scatter plot
    svg.selectAll("scatter")
      .data(pokearray)
    .enter().append("circle")
      .attr("r", 4)
      .attr("cx", (d) => x(d[x_var]))
      .attr("cy", (d) => y(d[y_var]))
      .attr("fill", (d) => {
        if (d.types[0] == "fighting") {
          return "red";
        } else if (d.types[0] == "normal") {
          return "Gainsboro";
        }
        else if (d.types[0] == "fire") {
          return "orange";
        }
        else if (d.types[0] == "grass") {
          return "green";
        }
        else if (d.types[0] == "water") {
          return "blue";
        }
        else if (d.types[0] == "ghost") {
          return "purple";
        }
        else if (d.types[0] == "poison") {
          return "indigo";
        }
        else if (d.types[0] == "electric") {
          return "yellow";
        }
        else if (d.types[0] == "ice") {
          return "aqua";
        } 
        else if (d.types[0] == "ground") {
          return "Moccasin";
        } 
        else if (d.types[0] == "bug") {
          return "fuschia";
        }       
        else if (d.types[0] == "flying") {
          return "teal";
        }    
        else if (d.types[0] == "psychic") {
          return "pink";
        }   
        else if (d.types[0] == "rock") {
          return "Bisque";
        }  
        else if (d.types[0] == "fairy") {
          return "DeepPink";
        } 
        else if (d.types[0] == "dragon") {
          return "MediumViolet";
        }                              
        else {
          return "white";
        }
      })
      .attr("stroke", "black")
      .on("mouseover", function(d) {
        tool.transition()
            .duration(0)
            .style("opacity", .9);
        tool.html(`<span style="text-align:center;font-weight:bold">${format_string(d.name)}</span><img width=90 src=${"img/"+d.number+".png"}>Weight: ${d.weight}<br>Height: ${d.height}<br>Exp: ${d.base_experience}<br>HP: ${d.base_hp}<br>Speed: ${d.base_speed}<br>Attack: ${d.base_attack}<br>Defense: ${d.base_defense}<br>Sp Attack: ${d.base_special_attack}<br>Sp Defense: ${d.base_special_defense}<br>Type(s): ${d.types}`)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
      .on("mouseout", function(d){
        tool.transition()
            .duration(0)
            .style("opacity", 0)});

    // add axes
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    svg.append("g")
        .call(d3.axisLeft(y)); 
    // add labels

    let x_string = format_string(x_var);
    let y_string = format_string(y_var);

    let r = corr[x_var][y_var];

    svg.append("text")
      .text(`Pokemon: ${x_string} vs. ${y_string}`)
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", -40);

    svg.append("text")
      .text(`${x_string}`)
      .attr("class", "axisLabel")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", height+40);

    svg.append("text")
      .text(`${y_string}`)
      .attr("class", "axisLabel")
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("x", 0 - (height / 2))
      .attr("y", 0 - margin.left + 10)

    svg.append("text")
      .text(`Correlation (r): ${r.toFixed(2)}`)
      .attr("class", "axisLabel")
      .attr("text-anchor", "middle")
      .attr("x",width-75)
      .attr("y", 10);
  })}

  function user_chart() {
    x_var = document.getElementById("x-axis").value;
    y_var = document.getElementById("y-axis").value;
    if (x_var != 'title' && y_var != 'title') {
      document.getElementById("chartDiv").innerHTML="";
      chart(x_var,y_var);
    }
}



chart("height","weight");







// missing: [ 49, 95, 97, 98, 99, 141 ]