const print = (s) => console.log(s);



d3.json("csv/back_wages_by_employer.json", (data)=> {
  print(data);

  var margin = {top: 200, right: 100, bottom: 0, left: 100},
    width = 960 - margin.left - margin.right,
    height = 25300 - margin.top - margin.bottom;

  var x = d3.scaleLinear().range([0, width]);
  x.domain([0, 36000000]);


  var svg = d3.select(".wagecontainer").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  var tool = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);  

  svg.selectAll(".wagetheft")
    .data(data)
  .enter().append("rect")
    .attr("height", (d)=>{
      if (d.key=="Total, from over 200,000 employers") {
        return 125
      } else {
        return 2.5;
      }
    })
    .attr("width", (d)=>{
      if (d.key=="Total, from over 200,000 employers") {
        return x(36000000)
      }
      else {
        return x(d.value);
      }
    })
    .attr("x", 20)
    .attr("y", (d,i)=>{
      if (d.key=="Total, from over 200,000 employers") {
        return i*25;
      } else {
        return i*25 + 200
      }})
    .style("fill", (d)=>{
      if (d.key=="Total, from over 200,000 employers") {
        return "white";
      } else {
        return "black";
      }
    })

for (let i=0; i<50; i++) {
      svg.append("rect")
        .attr("height",2.5)
        .attr("width", (d)=>x(36000000))
        .attr("x", 20)
        .attr("y", (n)=>i*4)
        .style("fill", "black")  
}
    // .on("mouseover", function(d) {
    //   tool.transition()
    //       .duration(0)
    //       .style("opacity", .9);
    //   tool.html(`${d.key}: $${d.value}`)
    //       .style("left", (d3.event.pageX) + "px")
    //       .style("top", (d3.event.pageY - 28) + "px");
    //   })
    // .on("mouseout", function(d){
    //   tool.transition()
    //       .duration(0)
    //       .style("opacity", 0)})

  svg.selectAll(".labels")
    .data(data)
  .enter().append("text")
    .attr("x", 0)
    .attr("y", (d,i)=>{
      if (d.key=="Total, from over 200,000 employers") {
        return i*25-6;
      } else {
        return i*25 - 6 + 200
      }})
    .style("fill","black")
    .attr("text-anchor", "start")
    .attr("class","wagelabels")
    .text((d)=>d.key);

  svg.selectAll(".backwages")
    .data(data)
  .enter().append("text")
    .attr("x", (d)=> {
      if (d.key=="Total, from over 200,000 employers") {
       return x(36000000)+25;
      } else {
       return x(d.value)+25;
      }
    })
    .attr("y", (d,i)=>{
      if (d.key=="Total, from over 200,000 employers") {
        return i*25 + 6;
      } else {
        return i*25 + 6 + 200
      }})
    .attr("text-anchor", "start")
    .attr("class","wagelabels2")
    .text((d)=> {
      if (d.key=="Total, from over 200,000 employers") {
        return "$2.6 billion"
      } else if (d.value > 1000000){
      let dollars = (d.value / 1000000).toFixed(0);
      return `$${dollars} million`
    }
    else {
      return `$${d.value.toFixed(0)}`
    }
  });

    svg.append("text")
      .text(`Wage Theft USA`)
      .attr("class", "wagetitle")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", -60-70);

    svg.append("text")
      .text(`Back wages recovered by the Department of Labor, 2005-2017`)
      .attr("class", "wagesubtitle")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", -40-60);

    svg.append("text")
      .text(`(Total + top 1000 offenders)`)
      .attr("class", "wagesubtitle")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", -40-40);
})







