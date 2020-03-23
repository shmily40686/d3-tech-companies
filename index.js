const axios = require('axios');

const svg = d3.select("#bar")
const svg2 = d3.select("#plot")
const svg3 = d3.select("#line")
const svg4 = d3.select("#area")
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








const renderLine = data => {
    const margin = { top: 60, right: 40, bottom: 90, left: 105 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const title = 'Check the Price';

    const xValue = d => d.timestamp;
    const xAxisLabel = 'the Volume';

    const yValue = d => d.volume;
    const circleRadius = 10;
    const yAxisLabel = 'Time';


    const xScale = d3.scaleTime()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    const g = svg3.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

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
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    const lineGenerator = d3.line()
                    .x(d => xScale(xValue(d)))
                    .y(d => yScale(yValue(d)))
                    .curve(d3.curveBasis)


    g.append('path')
        .attr('class',"line-path")
        .attr('d', lineGenerator(data))


    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(title);
};


const renderArea = data => {
    const margin = { top: 60, right: 40, bottom: 90, left: 105 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const title = 'Check the Price';

    const xValue = d => d.timestamp;
    const xAxisLabel = 'the Volume';

    const yValue = d => d.volume;
    const circleRadius = 10;
    const yAxisLabel = 'Time';


    const xScale = d3.scaleTime()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    const g = svg4.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = d3.axisBottom(xScale)
        .ticks(6)
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
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    const areaGenerator = d3.area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue(d)))
        .curve(d3.curveBasis)


    g.append('path')
        .attr('class', "area-path")
        .attr('d', areaGenerator(data))


    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(title);
};


axios.get('https://api.worldtradingdata.com/api/v1/history?symbol=FB.MX&date_from=2020-01-01&api_token=uMB99O8bJwwfS3tZJAZcQ3eYJBb4g0vHQY8eDk3s9Hfzskq0YEe77TzDMlLm')
    .then(function (response) {
        console.log("response", response)
        const dataPrice = []
        for (let key in response.data.history) {
            let data = {
                timestamp: new Date(key),
                volume: parseInt(response.data.history[key].volume)
            }
            dataPrice.push(data)
        }
        console.log("dataPrice", dataPrice)
        renderLine(dataPrice)
        renderArea(dataPrice)
    })
    .catch(function (error) {

        console.log(error);
    })

    