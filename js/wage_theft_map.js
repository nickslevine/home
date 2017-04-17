let margin = {top: 50, right: 0, bottom: 0, left: 0},
  width = 950 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

let x = d3.scaleLinear().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);

let svg = d3.select(".container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
let projection = d3.geoEquirectangular()
// let path = d3.geoPath();

let map = svg.append("g");

let circs = svg.append("g");

let tool = d3.select("body").append("div")
    .attr("class", "tooltip_map")
    .style("opacity", 0);

// let projection = d3.geoEquirectangular()
//     .translate([500, 270]);
let path = d3.geoPath();

d3.json("../csv/US_States.json", (USA) => {
  map.append("g")
    //   .attr("class", "states")
    // .selectAll("path")
    // .data(topojson.feature(USA, USA.objects.states).features)
    // .enter().append("path")
    //   .attr("d", path);

  // svg.append("path")
  //     .attr("class", "state-borders")
  //     .attr("d", path(topojson.mesh(USA, USA.objects.states, function(a, b) { return a !== b; })));
// d3.json("../csv/world.json", function(error, data) {
//     map.append("path")
//         .datum(topojson.feature(data, data.objects.land))
//         .attr("class", "land")
//         .attr("d", path);
//     map.append("path")
//         .datum(topojson.feature(data, data.objects.countries))
//         .attr("class", "border")
//         .attr("d", path);

function chart(option) {
d3.json("../csv/zip_map_data.json", (data) => {

  let rScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d)=>d[option])])
    .range([1, 30]);

    
  circs.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("cx", (d) => {
      if (d.lat && d.lng) {
        return width - (d.lng * -15 - 1000);
      } else {
        return 100000;
      }
    })
    .attr("cy", (d) => {
      if (d.lat && d.lng) {
        return height - (d.lat*22-520);
      } else {
        return 100000;
      }
    }) 
    .attr("r", (d) => {
      return rScale(d[option])
    })  
    // .attr("r", (d) => {
    //   return 1
    // })  
    .style("fill", "#DE6449") 
    .on("mouseover", function(d){
        let top_firms = "<b>" + d.firms[0].key + "</b>($" + d3.format(",")(d.firms[0].value.toFixed(0)) + ")"
        if (d.firms.length > 1) {
          top_firms += "<br><b>" + d.firms[1].key + "</b>($" + d3.format(",")(d.firms[1].value.toFixed(0)) + ")"
        }
        if (d.firms.length > 2) {
          top_firms += "<br><b>" + d.firms[2].key + "</b>($" + d3.format(",")(d.firms[2].value.toFixed(0)) + ")" 
        }
        let bw = d3.format(",")(d.back_wages.toFixed(0))
        tool.transition()
            .duration(100)
            .style("opacity", .9);
        // tool.html(`<b>${d.city}, ${d.state}</b>${d.zip}<br>lng:${parseFloat(d.lng)}<br>lat:${d.lat}<br>back wages: $${(d.back_wages).toFixed(0)}<br>employed:${d.employed}<br>${top_firm}`)
        tool.html(`<b>${d.zip}</b>(${d.city}, ${d.state})<br><br>Total back wages: $${bw}<br><br>Top offenders: <br>${top_firms}`)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 200) + "px");
        })
    .on("mouseout", function(d){
        tool.transition().duration(200).style("opacity", 0);
    });
  // circs.selectAll("circle")
  //   .data(data)
  //   .enter().append("circle")
  //   .attr("cx", (d) => {
  //     if (d.lat && d.lng) {
  //       return projection([d.lat, d.lng])[0];
  //     } else {
  //       return 100000;
  //     }
  //   })
  //   .attr("cy", (d) => {
  //     if (d.lat && d.lng) {
  //       return projection([d.lat, d.lng])[1];
  //     } else {
  //       return 100000;
  //     }
  //   }) 
  //   .attr("r", 5)  
  //   .style("fill", "#DE6449") 
  //   .on("mouseover", function(d){
  //       tool.transition()
  //           .duration(100)
  //           .style("opacity", .9);
  //       tool.html(`${d.zip}`)
  //           .style("left", (d3.event.pageX) + "px")
  //           .style("top", (d3.event.pageY - 28) + "px");
  //       })
  //   .on("mouseout", function(d){
  //       tool.transition().duration(200).style("opacity", 0);
  //   });
    svg.append("text")
      .text(`Wage Theft USA`)
      .attr("class", "wagetitle")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", 0);
    svg.append("text")
      .text(`Back wages recovered by the Department of Labor by zip code, 2005-2017`)
      .attr("class", "wagesubtitle")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", 20);
    svg.append("text")
      .text(`—Top 3000 zip codes—`)
      .attr("class", "wagesubtitle")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", 40);
})
}
chart("back_wages");
// chart("ratio");
}) 


