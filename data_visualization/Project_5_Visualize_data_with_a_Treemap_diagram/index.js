let kickStarterURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
let movieSalesURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
let videoGamesSalesURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let movieData;

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");
let iconBar = d3.select("#iconBar");
let iconClose = d3.select("#iconClose");
let legend = d3.select("#legend");
let legendText = d3.select("#legendText");

let showMenu = () => {
  iconBar.on("click", () => {
    iconBar.attr("class", "hidden");
    legend.attr("class", "");
    iconClose.attr("class", "fa fa-times icon-Close");
    legendText.attr("class", "hidden");
  });

  iconBar.on("mouseover", () => {
    legendText.attr("class", "hidden");
  });

  iconBar.on("mouseout", () => {
    legendText.attr("class", "");
  });

  iconClose.on("click", () => {
    iconBar.attr("class", "fa fa-bars icon-Bars");
    legend.attr("class", "hidden");
    iconClose.attr("class", "hidden");
    legendText.attr("class", "");
  });
};

let drawTreeMap = () => {
  let hierarchy = d3
    .hierarchy(movieData, (node) => {
      return node["children"];
    })
    .sum((node) => {
      return node["value"];
    })
    .sort((node1, node2) => {
      return node2["value"] - node1["value"];
    });

  let createTreeMap = d3.treemap().size([1000, 600]);
  createTreeMap(hierarchy);

  let movieTiles = hierarchy.leaves();

  let block = canvas
    .selectAll("g")
    .data(movieTiles)
    .enter()
    .append("g")
    .attr("transform", (movie) => {
      return "translate(" + movie["x0"] + ", " + movie["y0"] + ")";
    })
    .attr("class", "movieBlock");

  block
    .append("rect")
    .attr("class", "tile")
    .attr("fill", (movie) => {
      let category = movie["data"]["category"];
      if (category === "Action") {
        return "rgb(76, 146, 195)";
      } else if (category === "Drama") {
        return "rgb(190, 210, 237)";
      } else if (category === "Adventure") {
        return "rgb(255, 153, 62)";
      } else if (category === "Family") {
        return "rgb(255, 201, 147)";
      } else if (category === "Animation") {
        return "rgb(86, 179, 86)";
      } else if (category === "Comedy") {
        return "rgb(173, 229, 161)";
      } else if (category === "Biography") {
        return "rgb(222, 82, 83)";
      }
    })
    .attr("data-name", (movie) => {
      return movie["data"]["name"];
    })
    .attr("data-category", (movie) => {
      return movie["data"]["category"];
    })
    .attr("data-value", (movie) => {
      return movie["data"]["value"];
    })
    .attr("width", (movie) => {
      return movie["x1"] - movie["x0"];
    })
    .attr("height", (movie) => {
      return movie["y1"] - movie["y0"];
    })
    .attr("stroke", "white")
    .on("mouseover", (movie) => {
      tooltip
        .transition()
        .style("visibility", "visible")
        .style("left", event.pageX - 50 + "px")
        .style("top", event.pageY - 70 + "px")
        .style("background", "rgba(0,0,0,0.8)")
        .style("color", "white");

      let revenue = movie["data"]["value"]
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      tooltip.html("$ " + revenue + "<hr />" + movie["data"]["name"]);

      tooltip.attr("data-value", movie["data"]["value"]);
    })
    .on("mouseout", (movie) => {
      tooltip.transition().style("visibility", "hidden");
    });

  block
    .append("text")
    .text((movie) => {
      return movie["data"]["name"];
    })
    .attr("x", 5)
    .attr("y", 20)
    .on("mouseover", (movie) => {
      tooltip
        .transition()
        .style("visibility", "visible")
        .style("left", event.pageX - 50 + "px")
        .style("top", event.pageY - 70 + "px")
        .style("background", "rgba(0,0,0,0.8)")
        .style("color", "white");
    });
};

//promise with d3 json and then
d3.json(movieSalesURL).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    movieData = data;
    console.log(movieData);
    drawTreeMap();
    showMenu();
  }
});
