//Defining the D3 margin
var margin={ top:60, right:30, bottom: 100, left:100},
   width=900 - margin.right-margin.left,
   height=500- margin.top-margin.bottom;
//define svg
var svg_population=d3.select('#chart')
       .append('svg')
       .attr({
       "width": width + margin.right + margin.left,
       "height": height + margin.top + margin.bottom
       })
       .append('g')
           .attr("transform", "translate(" + margin.left + ',' + margin.right + ')');
//Scale and Axis
var xScale=d3.scale.ordinal()
.rangeRoundBands([0,width], 0.1);
var yScale=d3.scale.linear()
.range([height, 0]);
//define axis
var xAxis=d3.svg.axis()
   .scale(xScale)
   .orient("bottom");
var yAxis=d3.svg.axis()
   .scale(yScale)
   .orient("left");
//Getting JSON data
d3.json("India2011.json", function(error, data){
   if(error){
   console.log("Error");
   }
  
// specify the domains of x and y scales
xScale.domain(data.map(function(d){
   return d.age_group;
}));
yScale.domain([0, d3.max(data, function(d){
   return d.totalLiterate;
})]);
//draw the bars
svg_population.selectAll('rect')
   .data(data)
   .enter()
   .append('rect')
   .attr("height", 0)
   .attr("y", height)
   .transition().duration(3000)
   .delay(function(d,i){
       return i*200;
   })
   .attr({
       'x': function(d){
       return xScale(d.age_group);
       },
       'y': function(d){
       return yScale(d.totalLiterate);
       },
       "width": xScale.rangeBand(),
       "height": function(d){
       return height-yScale(d.totalLiterate);
       }
   });
// append x axis and y axis
svg_population.append("g")
   .attr("class", "x axis")
   .attr("transform", "translate(0, " + height + ")")
   .call(xAxis)
   .selectAll('text')
   .attr("transform", "rotate(-60)")
   .attr("dx","-0.8em")
   .attr("dy", "-0.25em")
   .style("text-anchor","end")
   .style("font-size", "12px");
svg_population.append("g")
   .attr("class", "y axis")
   .call(yAxis)
   .selectAll('text')
   .attr("dx","-0.8em")
   .attr("dy", "-0.25em")
   .style("text-anchor","end")
   .style("font-size", "12px");
});
