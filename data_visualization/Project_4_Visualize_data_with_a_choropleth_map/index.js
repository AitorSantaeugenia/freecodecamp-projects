let countriesURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
let educationURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

let countyData;
let educationData;

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

let drawMap = () => {
  canvas
    .selectAll("path")
    .data(countyData)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (countyData) => {
      let id = countyData["id"];
      let county = educationData.find((item) => {
        return item["fips"] === id;
      });
      let percentage = county["bachelorsOrHigher"];
      //we only need 4 to pass the test, but whatever
      if (percentage <= 12) {
        return "#e5f5e0";
      } else if (percentage <= 21) {
        return "#c7e9c0";
      } else if (percentage <= 30) {
        return "#a1d99b";
      } else if (percentage <= 39) {
        return "#74c476";
      } else if (percentage <= 48) {
        return "#41ab5d";
      } else if (percentage <= 57) {
        return "#238b45";
      } else if (percentage <= 66) {
        return "#006d2c";
      }
    })
    .attr("data-fips", (countyData) => {
      return countyData["id"];
    })
    .attr("data-education", (countyData) => {
      let id = countyData["id"];
      let county = educationData.find((item) => {
        return item["fips"] === id;
      });
      let percentage = county["bachelorsOrHigher"];
      return percentage;
    })
    .on("mouseover", (countyData) => {
      tooltip
        .transition()
        .style("visibility", "visible")
        .style("left", event.pageX - 50 + "px")
        .style("top", event.pageY - 40 + "px")
        .style("background", "rgba(0,0,0,0.8)")
        .style("color", "white");

      let id = countyData["id"];
      let county = educationData.find((item) => {
        return item["fips"] === id;
      });

      tooltip.text(
        county["area_name"] +
          " | " +
          county["state"] +
          " : " +
          county["bachelorsOrHigher"] +
          "%"
      );

      tooltip.attr("data-education", county["bachelorsOrHigher"]);
    })
    .on("mouseout", (countyData) => {
      tooltip.transition().style("visibility", "hidden");
    });
};

//promise with d3 json and then
d3.json(countriesURL).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    countyData = topojson.feature(data, data.objects.counties).features;

    d3.json(educationURL).then((data, error) => {
      if (error) {
        console.log(error);
      } else {
        educationData = data;
        drawMap();
      }
    });
  }
});
