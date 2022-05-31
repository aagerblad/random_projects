// FUNCTIONS

var mouseover = function (d) {
  data = d.srcElement.__data__;
  date = new Date(data.date);
  console.log("mouseover");
  d3.select("#tooltip")
    .transition()
    .duration(100)
    .style("opacity", 1)
    .text(
      data.title +
        "\n Episode no. " +
        data.no +
        "\n" +
        date.toDateString() +
        "\n" +
        "Jake: " +
        data.jake_grade +
        "\n" +
        "Amir: " +
        data.amir_grade +
        "\n" +
        data.guest_name +
        ": " +
        data.guest_grade
    );

  d3.selectAll("#episode_" + data.no)
    .style("stroke", "white")
    .style("opacity", 1);

  // d3.select(this).style("stroke", "white").style("opacity", 1);
};

var mousemove = function (d) {
  d3.select("#tooltip")
    .style("left", d.x + 10 + "px")
    .style("top", d.y + 10 + "px");
};

var mouseleave = function (d) {
  d3.select("#tooltip").style("opacity", 0).text("");
  d3.selectAll("#episode_" + data.no)
    .style("stroke", "black")
    .style("opacity", 0.8);
};

function add_dots(data, color, yScaleFun) {
  g.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.date);
    })
    .attr("cy", yScaleFun)
    .attr("id", function (d) {
      return "episode_" + d.no;
    })
    .attr("r", 5)
    .attr("fill", color)
    .style("opacity", 0.8)
    .style("stroke", "black")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
}

// Start of SVG

const svg = d3.select("#chart").append("svg").attr("viewBox", `0 0 800 800`);

var defs = svg.append("defs");

var gradient = defs
  .append("linearGradient")
  .attr("id", "svgGradient")
  .attr("x1", "0%")
  .attr("x2", "100%")
  .attr("y1", "0%")
  .attr("y2", "100%");

gradient
  .append("stop")
  .attr("class", "start")
  .attr("offset", "45%")
  .attr("stop-color", "#e85c94")
  .attr("stop-opacity", 1);

gradient
  .append("stop")
  .attr("class", "end")
  .attr("offset", "50%")
  .attr("stop-color", "#ffffff")
  .attr("stop-opacity", 1);

gradient
  .append("stop")
  .attr("class", "end")
  .attr("offset", "55%")
  .attr("stop-color", "#688cc4")
  .attr("stop-opacity", 1);

var margin = 100,
  svg_width = 600,
  svg_height = 400;

var mindate = new Date(2007, 1, 1),
  maxdate = new Date(2016, 1, 1);

var xScale = d3.scaleTime().domain([mindate, maxdate]).range([0, svg_width]),
  yScale = d3.scaleLinear().domain([0, 4.5]).range([svg_height, 0]);

var g = svg
  .append("g")
  .attr("transform", "translate(" + margin + "," + margin + ")");

d3.csv(
  "https://docs.google.com/spreadsheets/d/e/" +
    "2PACX-1vQmFwLzdFfTVjEiQrgktqCfBl8wcPRIFVI" +
    "ll9RbsQ6vpxUj6_fC1MPvdus8tfyNsBi2fMqt5ocf" +
    "Ijvf/pub?gid=0&single=true&output=csv"
).then(function (raw_data) {
  data = raw_data.map(data_mapper);

  data = data.filter(function (d) {
    return d.jake_score != null || d.amir_score != null || d.both_score != null;
  });

  // Tooltip
  d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .attr("style", "position: absolute; opacity: 0;")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  // X-axis
  g.append("g")
    .attr("transform", "translate(0," + svg_height + ")") // move to bottom
    .attr("color", "white")
    .call(
      d3
        .axisBottom(xScale)
        .tickFormat(d3.timeFormat("%b %y"))
        .tickValues(data.date)
        .ticks(10)
    );

  // Y-axis
  g.append("g")
    .call(d3.axisLeft(yScale))
    .attr("id", "y-axis")
    .attr("color", "white");

  function enter_chart() {
    add_dots(
      data.filter(function (d) { return d.amir_score != null; }),
      "#e85c94",
      function (d) { return yScale(d.amir_score); }
    );

    add_dots(
      data.filter(function (d) { return d.jake_score != null; }),
      "#688cc4",
      function (d) { return yScale(d.jake_score); }
    );

    add_dots(
      data.filter(function (d) { return d.guest_score != null; }),
      "#ffb42c",
      function (d) { return yScale(d.guest_score); }
    );

    add_dots(
      data.filter(function (d) { return d.both_score != null; }),
      "url(#svgGradient)",
      function (d) { return yScale(d.both_score); }
    );
  }

  var slider = d3
    .sliderHorizontal()
    .min(0)
    .max(10)
    .step(1)
    .width(300)
    .displayValue(false)
    .on("onchange", (val) => {
      console.log(val);
      d3.select("#y-axis").call(d3.axisLeft(yScale.domain([0, val])));
      enter_chart();
    });

  d3.select("#slider")
    .append("svg")
    .attr("width", 500)
    .attr("height", 100)
    .append("g")
    .attr("transform", "translate(30,30)")
    .call(slider);

  enter_chart();
});
