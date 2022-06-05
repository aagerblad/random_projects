// FUNCTIONS

var mouseover = function (d) {
  console.log("mouseover");
  data = d.srcElement.__data__;
  date = new Date(data.date);
  d3.select("#tooltip")
    // .transition()
    // .duration(100)
    .style("opacity", 1)
    .style("color", "black")
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
  console.log("mouseover2");

  // d3.select(this).style("stroke", "white").style("opacity", 1);
};

var mousemove = function (d) {
  console.log("mousemove");
  d3.selectAll("#tooltip")
    .style("left", d.x + 10 + "px")
    .style("top", d.y + 10 + "px");
};

var mouseleave = function (d) {
  console.log("mouseleave");
  data = d.srcElement.__data__;
  d3.selectAll("#tooltip").text("").style("opacity", 0);

  d3.selectAll("#episode_" + data.no)
    .style("stroke", "black")
    .style("opacity", 0.8);
};

// Start of SVG
const svg = d3.select("#chart").append("svg").attr("viewBox", `0 0 800 600`);

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

var g = svg
  .append("g")
  .attr("transform", "translate(" + margin + "," + margin + ")");

// Tooltip
d3.select("body")
  .append("div")
  .classed("tooltip", true)
  .attr("id", "tooltip")
  .attr("style", "position: absolute; opacity: 0;")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px");

d3.csv(
  "https://docs.google.com/spreadsheets/d/e/" +
    "2PACX-1vQmFwLzdFfTVjEiQrgktqCfBl8wcPRIFVI" +
    "ll9RbsQ6vpxUj6_fC1MPvdus8tfyNsBi2fMqt5ocf" +
    "Ijvf/pub?gid=0&single=true&output=csv"
).then(function (raw_data) {
  data = raw_data.map(data_mapper);

  // List of groups (here I have one group per column)
  var allGroup = ["amir_score", "jake_score", "both_score", "guest_score"];

  // Reformat the data: we need an array of arrays of {x, y} tuples
  var dataReady = allGroup.map(function (grpName) {
    // .map allows to do something for each element of the list
    return {
      name: grpName,
      values: data
        .map(function (d) {
          return {
            name: grpName,
            date: d.date,
            score: d[grpName],
            title: d.title,
            no: d.no,
            guest_name: d.guest_name,
            jake_grade: d.jake_grade,
            amir_grade: d.amir_grade,
            guest_grade: d.guest_grade,
          };
        })
        .filter(function (d) {
          return d.score != null;
        }),
    };
  });

  var dataReady = dataReady[0].values
    .concat(dataReady[1].values)
    .concat(dataReady[2].values)
    .concat(dataReady[3].values);

  var mindate = new Date(2006, 0,0);
  var maxdate = new Date(2018, 0,0);

  var xScale = d3.scaleTime().domain([mindate, maxdate]).range([0, svg_width]),
    yScale = d3.scaleLinear().domain([0, 4.5]).range([svg_height, 0]);

  // X-axis
  g.append("g")
    .attr("transform", "translate(0," + svg_height + ")") // move to bottom
    .attr("color", "white")
    .attr("id", "x-axis")
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

  /*
  Color function
  */
  var color_fun = function (name) {
    if (name == "amir_score") {
      return "#e85c94";
    } else if (name == "jake_score") {
      return "#688cc4";
    } else if (name == "both_score") {
      return "url(#svgGradient)";
    } else if (name == "guest_score") {
      return "#ffb42c";
    }
  };

  /*
  Add legend
  */
  const legend_distance = 120,
    legend_margin = 50;

  g.selectAll("legend")
    .data(allGroup, (d) => {
      return d + "-legend";
    })
    .enter()
    .append("circle")
    .attr("id", "legend")
    .attr("cx", (d, i) => {
      return i * legend_distance + legend_margin;
    })
    .attr("cy", svg_height + 50)
    .attr("r", 5)
    .style("fill", color_fun);

  g.selectAll("legend_label")
    .data(allGroup)
    .enter()
    .append("text")
    .attr("y", svg_height + 50)
    .attr("x", (d, i) => {
      return i * legend_distance + legend_margin + 10;
    })
    .text((d) => {
      return d;
    })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .style("fill", "white");

  /*
  Add dots
  */
  var finaldata = dataReady;

  var dots = g
    .selectAll(".dot")
    .data(finaldata, (d) => {
      return d.date + d.name;
    })
    .enter()
    .append("circle").classed("dot", true);

  function render() {
    dots
      .attr("fill", (d) => {
        return color_fun(d.name);
      })
      .attr("cx", (d) => {
        return xScale(d.date);
      })
      .attr("cy", (d) => {
        return yScale(d.score);
      })
      .attr("id", (d) => {
        return "episode_" + d.no;
      })
      .attr("r", 5)
      .style("opacity", 0.8)
      .style("stroke", "black")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  }

  render();

  var slider = d3
    .sliderBottom()
    .min(mindate)
    .max(maxdate)
    .width(400)
    .default([mindate, maxdate])
    .displayValue(false)
    .on("onchange", (val) => {
      d3.select("#x-axis").call(
        d3
          .axisBottom(xScale.domain(val))
          .tickFormat(d3.timeFormat("%b %y"))
      );

      finaldata = dataReady.filter((d) => val[0] <= d.date && d.date <= val[1]);

      dots = g.selectAll(".dot").data(finaldata, function (d) {
        return d.date + d.name;
      });

      dots.enter().append("circle").classed("dot", true);

      render();

      dots
        .attr("cx", (d) => {
          return xScale(d.date);
        })
        .attr("cy", (d) => {
          return yScale(d.score);
        });

      dots.exit().remove();
    });

  d3.select("#slider")
    .append("svg")
    .attr("width", 500)
    .attr("height", 100)
    .append("g")
    .attr("transform", "translate(30,30)")
    .call(slider);
});
