let handleKeys = () => {
  if (event.keyCode == 13) {chart()}
  else {document.getElementById('zip_input').focus();}
}

let margin = {top: 50, right: 0, bottom: 0, left: 0},
  width = 950 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

let svg = d3.select(".container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

let tool = d3.select("body").append("div")
    .attr("class", "tooltip_states")
    .style("opacity", 0);

let info = d3.select("body").append("div")
    .attr("class", "state_info")
    .style("opacity", 0);

let map = svg.append("g");

let projection = d3.geoAlbersUsa()
				   .translate([width/2, height/2])
				   .scale([1000]);       

let path = d3.geoPath()
		  	 .projection(projection);

d3.json("../csv/us-states.json", (USA) => {
  map.append("g")
  .selectAll("path")
  .data(USA.features)
  .enter().append("path")
    .attr("d", path)
    .style("stroke", "#fff")
    .style("stroke-width", "2")

  svg.append("text")
    .text(`Wage Theft Local`)
    .attr("class", "wagetitle")
    .attr("text-anchor", "middle")
    .attr("x",width/2)
    .attr("y", 0);
  svg.append("text")
    .text(`Enter your zip code:`)
    .attr("class", "wagesubtitle")
    .attr("text-anchor", "middle")
    .attr("x",width/2)
    .attr("y", 30);

 })

let chart = () => {
  let zip = document.getElementById("zip_input").value;
  if (zip.length==5) {
  document.getElementById("zip_input").value = "";
  d3.json("../csv/wage_theft_local.json", (data) => {
  let lng = projection([data[zip].lng, data[zip].lat])[0];
  let lat = projection([data[zip].lng, data[zip].lat])[1];

  map.append("circle")
    .attr("cx", lng)
    .attr("cy", lat)
    .attr("r", 8)
    .style("fill", "#DE6449")

  body_text =  "<br><span style='font: 16px Arial !important; font-weight:900'>" + zip + " (" + data[zip].city + ", " + data[zip].state + ")</span>"
  body_text += "Back wages recovered by the Department of Labor, 2005-2017<br>"
  for (let f of data[zip].firms) {
    body_text += "<br><b>" + f.key + "</b>$" + d3.format(",")(f.value.toFixed(0));
  }
  info.transition()
      .duration(100)
      .style("opacity", .9);
  info.html(body_text)
    })
  }
}