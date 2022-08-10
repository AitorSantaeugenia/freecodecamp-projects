let url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
let req = new XMLHttpRequest();

let baseTemp;
let values = [];

let xScale;
let yScale;

let width = 1200;
let height = 600;
let padding = 60;

let canvas = d3.select("#canvas");
canvas.attr("width", width);
canvas.attr("height", height);

let generateScales = () => {
  xScale = d3.scaleLinear().range([padding, width - padding]);
  yScale = d3.scaleTime().range([padding, height - padding]);
};

let drawCells = () => {
  canvas
    .selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("fill", (item) => {
      variance = item["variance"];
      if (variance <= -1) {
        return "SteelBlue";
      } else if (variance <= 0) {
        return "LightSteelBlue";
      } else if (variance <= 1) {
        return "Orange";
      } else {
        return "Crimson";
      }
    })
    .attr("data-year", (item) => {
      return item;
    })
    .attr("data-month", (item) => {
      return item;
    })
    .attr("data-temp", (item) => {
      return item;
    });
};

let drawAxes = () => {
  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale);

  canvas
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", "translate(0," + (height - padding) + ")");

  canvas
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + "," + "0)");
};

req.open("GET", url, true);
req.onload = () => {
  let object = JSON.parse(req.responseText);
  console.log(req.responseText);
  baseTemp = object["baseTemperature"];
  values = object["monthlyVariance"];

  // console.log(baseTemp);
  // console.log(values);
  generateScales();
  drawCells();
  drawAxes();
};
req.send();
