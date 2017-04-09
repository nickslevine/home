// based on this: http://bl.ocks.org/josiahdavis/7e488547a6381a365ac9
let format_string = (s) => _.map(s.split("_"),_.upperFirst).join(" ");
let margin = { top: 200, right: 50, bottom: 100, left: 200 };
let width = 650 - margin.left - margin.right;
let height = 700 - margin.top - margin.bottom;
let categories = 10;
let gridSize = width/categories;

//let colors = ['rgb(84,48,5)','rgb(140,81,10)','rgb(191,129,45)','rgb(223,194,125)','rgb(246,232,195)','rgb(245,245,245)','rgb(199,234,229)','rgb(128,205,193)','rgb(53,151,143)','rgb(1,102,94)','rgb(0,60,48)'];
let colors = ['#ffffe0','#ffe3af','#ffc58a','#ffa474','#fa8266','#ed645c','#db4551','#c52940','#aa0e27','#8b0000'];
// lightyellow,orange,deeppink,darkred

let svg = d3.select(".container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

let tool = d3.select("body").append("div")
    .attr("class", "matrix_tooltip")
    .style("opacity", 0);

d3.csv("csv/pokemon_correlation_matrix_final.csv", function(error, data){

  let color = d3.scaleQuantile()
    .domain([-.07,1])
    .range(colors);

  let chart = svg.selectAll(".correlation")
    .data(data)
    .enter().append("rect")
      .attr("class", "correlation")
      .attr("x", (d, i) => gridSize * Math.floor(i / categories))
      .attr("y", (d, i) => gridSize * (i % categories))
      .attr("width", gridSize)
      .attr("height", gridSize)
      .style("fill", (d) => color(d.value))
      .on("mouseover", function(d) {
        tool.transition()
            .duration(0)
            .style("opacity", .9);
        tool.html(`r = ${parseFloat(d.value).toFixed(2)}`)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
      .on("mouseout", function(d){
        tool.transition()
            .duration(0)
            .style("opacity", 0)});

  let attributes = [];
  _.times(categories, (n) => {
    attributes.push(format_string(data[n].cat2));
  });
  _.pull(attributes,"Base Hp");
  attributes.splice(3, 0, "Base HP");
  

  let ylabels = svg.selectAll(".ylabels")
    .data(attributes)
    .enter().append("text")
    .attr("class", "ylabels")
    .attr("text-anchor", "end")
    .attr("x", -10)
    .attr("y", (d, i) => gridSize * (i % categories)+22)
    .text((d)=>d)

  let xlabels = svg.selectAll(".xlabels")
    .data(attributes)
    .enter().append("text")
    .attr("class", "xlabels")
    .attr("text-anchor", "start")
    .attr("x", 10)
    .attr("y", (d, i) => gridSize * (i % categories)+22)
    .attr("transform", "rotate(-90)")
    .text((d)=>d)

  let title = svg.append("text")
      .text(`Pokemon Correlation Matrix`)
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", height+60);
});