const svg = d3.select("#chart").append("svg").attr("viewBox", `0 0 800 800`);

// Amir #e85c94
// Jake #688cc4

var margin = 0,
  svg_width = 600,
  svg_height = 400;

var mindate = new Date(2007, 1, 1),
  maxdate = new Date(2016, 1, 1);

// var xScale = d3.scaleBand().range([0, svg_width]).padding(0.5),
var xScale = d3.scaleTime().domain([mindate, maxdate]).range([0, svg_width]),
  yScale = d3.scaleLinear().range([svg_height, 0]);

var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv(
  "https://docs.google.com/spreadsheets/d/e/" +
    "2PACX-1vQmFwLzdFfTVjEiQrgktqCfBl8wcPRIFVI" +
    "ll9RbsQ6vpxUj6_fC1MPvdus8tfyNsBi2fMqt5ocf" +
    "Ijvf/pub?gid=0&single=true&output=csv"
).then(function (raw_data) {
  function score_mapper(score) {
    if (score == "" || score == null) {
      return null;
    }
    s = 0;
    if (score.includes("F")) {
      s = 0;
    } else if (score.includes("D")) {
      s = 1;
    } else if (score.includes("C")) {
      s = 2;
    } else if (score.includes("B")) {
      s = 3;
    } else if (score.includes("A")) {
      s = 4;
    }
    if (score.includes("+")) {
      s += 0.3;
    } else if (score.includes("-")) {
      s -= 0.3;
    }
    return s;
  }

  data = raw_data.map(function (d) {
    jake_score = score_mapper(d["Jake Grade"]);
    amir_score = score_mapper(d["Amir Grade"]);
    both_score = null;

    if (jake_score == amir_score) {
      both_score = jake_score;
      jake_score = null;
      amir_score = null;
    }

    return {
      date: Date.parse(d["Date"]),
      no: d["No."],
      jake_score: jake_score,
      amir_score: amir_score,
      both_score: both_score,
      title: d["Title"].replace(/\"/g, ""),
    };
  });

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

  console.log(data);

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function (d) {
    data = d.srcElement.__data__;
    console.log("mouseover");
    d3.select("#tooltip")
      .transition()
      .duration(100)
      .style("opacity", 1)
      .text(data.title + " " + data.no);

    d3.selectAll("#episode_" + data.no).style("stroke", "white");

    // d3.select(this).style("stroke", "white").style("opacity", 1);
  };

  var mousemove = function (d) {
    console.log(d);
    console.log(d.srcElement.__data__.title);
    d3.select("#tooltip")
      .style("left", d.x + 10 + "px")
      .style("top", d.y + 10 + "px");
  };

  var mouseleave = function (d) {
    d3.select("#tooltip").style("opacity", 0);
    d3.selectAll("#episode_" + data.no).style("stroke", "none");
  };

  yScale.domain([
    0,
    d3.max(data, function (d) {
      return d.amir_score;
    }),
  ]);

  g.append("g")
    .attr("transform", "translate(0," + svg_height + ")")
    .attr("color", "white")
    .call(
      d3
        .axisBottom(xScale)
        .tickFormat(d3.timeFormat("%b %y"))
        .tickValues(data.date)
        .ticks(10)
    );
  // .append("text")
  // .attr("y", svg_height - 450)
  // .attr("x", svg_width - 100)
  // .attr("text-anchor", "end")
  // .attr("stroke", "white")
  // .text("Year");

  g.append("g").call(d3.axisLeft(yScale)).attr("color", "white");
  // .append("text")
  // .attr("transform", "rotate(-90)")
  // .attr("y", 0)
  // .attr("dy", "-5.1em")
  // .attr("text-anchor", "end")
  // .attr("stroke", "black")
  // .text("Score");

  g.selectAll("dot")
    .data(
      data.filter(function (d) {
        return d.jake_score != d.amir_score;
      })
    )
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.date);
    })
    .attr("cy", function (d) {
      return yScale(d.amir_score);
    })
    .attr("id", function (d) {
      return "episode_" + d.no;
    })
    .attr("r", 5)
    .attr("fill", "#e85c94")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);

  g.selectAll("dot")
    .data(
      data.filter(function (d) {
        return d.jake_score != d.amir_score;
      })
    )
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.date);
    })
    .attr("cy", function (d) {
      return yScale(d.jake_score);
    })
    .attr("id", function (d) {
      return "episode_" + d.no;
    })
    .attr("r", 5)
    .attr("fill", "#688cc4")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);

  g.selectAll("dot")
    .data(
      data.filter(function (d) {
        return d.both_score;
      })
    )
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.date);
    })
    .attr("cy", function (d) {
      return yScale(d.both_score);
    })
    .attr("r", 5)
    .attr("fill", "#ffffff")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
});
