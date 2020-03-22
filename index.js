const axios = require('axios');

const svg = d3.select("#bar")
const svg2 = d3.select("#plot")
const width = +svg.attr('width')
const height =  +svg.attr('height')

const renderBar = data => {
    const margin = { top: 90, right: 90, bottom: 90, left: 90 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.number)])
          .range([0,innerWidth])


    const yScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, innerHeight])
        .padding(0.2)

    const g = svg.append("g")
            .attr('transform',`translate(${margin.left},${margin.right})`)
    

            
    g.append("g").call(d3.axisLeft(yScale))
                .select(".domain")
                .attr("stroke-width","3px")

    g.append("g").call(d3.axisBottom(xScale))
        .attr('transform',`translate(0,${innerHeight})`)
        .select(".domain")
        .attr("stroke-width", "3px")

    g.selectAll('rect')
        .data(data)
        .enter()
        .append("rect")
        .attr("y",d => yScale(d.name))
        .attr("width", d => xScale(d.number))
        .attr("height",yScale.bandwidth())
}

renderBar(data)
// Instead, load set the data using data.js.





const renderPlot = data => {
    const margin = { top: 90, right: 90, bottom: 90, left: 90 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.number)])
        .range([0, innerWidth])


    const yScale = d3.scalePoint()
        .domain(data.map(d => d.name))
        .range([0, innerHeight])
        .padding(0.9)

    const g = svg2.append("g")
        .attr('transform', `translate(${margin.left},${margin.right})`)

    const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -93)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').attr("stroke-width", "3px")

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')

    g.selectAll('circle')
        .data(data)
        .enter()
        .append("circle")
        .attr("cy", d => yScale(d.name))
        .attr("cx", d => xScale(d.number))
        .attr("r", 10)
}

renderPlot(data)




axios.get('https://api.worldtradingdata.com/api/v1/history?symbol=FB.MX&date_from=2020-02-01&api_token=uMB99O8bJwwfS3tZJAZcQ3eYJBb4g0vHQY8eDk3s9Hfzskq0YEe77TzDMlLm')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })

