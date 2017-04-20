// based on this http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922

let state_names = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

let margin = {top: 50, right: 0, bottom: 0, left: 0},
  width = 950 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

let x = d3.scaleLinear().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);

let svg = d3.select(".chartdiv").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

let info = d3.select(".zip_info")

let tool = d3.select("body").append("div")
    .attr("class", "tooltip_states")
    .style("opacity", 0);

let colors = ['#ffc58a','#ffa474','#fa8266','#ed645c','#db4551','#c52940','#aa0e27','#8b0000'];

let map = svg.append("g");

var projection = d3.geoAlbersUsa()
				   .translate([width/2, height/2])
				   .scale([1000]);       
        
var path = d3.geoPath()
		  	 .projection(projection);

d3.json("../csv/us-states.json", (USA) => {
  d3.json("../csv/back_wages_by_state.json", (data) => {

  for (let r of data) {
    for (let s of USA.features) {
      if (state_names[r.key] == s.properties.name) {
        s.properties.data = r.value
      }
    }
  }

  USA.features[8].properties.data = {
    total_bw: 0,
    population: 604000
  }

  // console.log(USA.features[0].properties.data.total_bw)
  // console.log(d3.extent(USA.features, (d) => d.properties.data.total_bw))
  // let bws = [];
  // for (let r of USA.features) {
  //   bws.push(r.properties.data.total_bw/r.properties.data.pop)
  // }
  // console.log(bws.sort((a,b) => b-a))

  // for (let r of USA.features) {
  //   console.log(r.properties.name)
  //   console.log(r.properties.data)
  // }
  // console.log(USA.features[0])
  let colorScale = d3.scaleQuantile()
    // .domain(d3.extent(USA.features, (d) => d.properties.data.total_bw))
    .domain([2,23])
    .range(colors);

  map.append("g")
      // .attr("class", "states")
    .selectAll("path")
    .data(USA.features)
    .enter().append("path")
      .attr("d", path)
      .style("stroke", "#fff")
	    .style("stroke-width", "1")
      .style("fill", (d) => {
        if (_.has(d.properties.data, 'total_bw')) {
          return colorScale(d.properties.data.total_bw/d.properties.data.pop)
        } else {
          return "black"
        }
        })
      .on("mouseover", function(d){
        tool.transition()
            .duration(100)
            .style("opacity", .9);
        tool.html(`<span class="statename">${d.properties.name}</span><br><u>Total Back Wages:</u>$${d3.format(",")(d.properties.data.total_bw.toFixed(0))}<br><u>Population (2010):</u>${d3.format(",")(d.properties.data.pop)}<br><u>Back Wages Per Person:</u>$${(d.properties.data.total_bw/d.properties.data.pop).toFixed(0)}<br><u>Top Offenders:</u><b>${d.properties.data.firms[0].key}</b>($${d3.format(",")(d.properties.data.firms[0].value.toFixed(0))})<b>${d.properties.data.firms[1].key}</b>($${d3.format(",")(d.properties.data.firms[1].value.toFixed(0))})<br><b>${d.properties.data.firms[2].key}</b>($${d3.format(",")(d.properties.data.firms[2].value.toFixed(0))})<br><b>${d.properties.data.firms[3].key}</b>($${d3.format(",")(d.properties.data.firms[3].value.toFixed(0))}`)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 175) + "px");
      })
    .on("mouseout", function(d){
        tool.transition().duration(200).style("opacity", 0);
    })
    .on("click", (d) => {
        body_text = "<u><b>" + d.properties.name + "'s Top 100 Offenders</b></u>"
        _.times(100, (n) => {
          f = d.properties.data.firms[n]
          body_text += "<b>" + f.key + "</b>$" + d3.format(",")(f.value.toFixed(0)) + "<br>"
        })
        info.transition()
            .duration(100)
            .style("opacity", .9);
        info.html(`${body_text}`)
    })

    svg.append("text")
      .text(`Wage Theft USA`)
      .attr("class", "wagetitle")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", 0);
    svg.append("text")
      .text(`Back wages recovered by the Department of Labor (2005-2017)`)
      .attr("class", "wagesubtitle")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", 20);
    svg.append("text")
      .text(`divided by 2010 state population`)
      .attr("class", "wagesubtitle")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", 40);
    svg.append("text")
      .text(`—Click states to expand—`)
      .attr("class", "wagesubtitle")
      .attr("text-anchor", "middle")
      .attr("x",width/2-8)
      .attr("y", 60);
  });
});