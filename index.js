const axios = require('axios');

window.svg = d3.select("#size")
window.svg2 = d3.select("#price")
window.svg3 = d3.select("#map")
window.svg4 = d3.select("#tree")

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

    const g = svg.append("g")
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









const renderLine = data => {
    const margin = { top: 60, right: 40, bottom: 90, left: 105 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const title = '';

    const xValue = d => d.timestamp;
    const xAxisLabel = '';

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

    const g = svg2.append('g')
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

    const title = '';

    const xValue = d => d.timestamp;
    const xAxisLabel = '';

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

    const g = svg2.append('g')
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






let barOrPlot = "Bar"
let lineOrArea = "Line"
const renderBarAndPlot = () =>  {
    if(barOrPlot === "Bar") {
        renderBar(data)
    } else {
        renderPlot(data)
    }
}
renderBarAndPlot()

const renderLineAndArea = (dataPrice) => {
    if (lineOrArea === "Line") {
        renderLine(dataPrice)
    } else {
        renderArea(dataPrice)
    }
}

let priceData = []

fetchDatePrice("FB.MX")


const changeButton = document.querySelectorAll(".change-button")

changeButton.forEach(eachB => {
    eachB.addEventListener("click",(e) => {
        console.log(e.target.innerText)
        if (e.target.innerText === "Bar" || e.target.innerText === "Circle") {
            barOrPlot = e.target.innerText
            svg.selectAll("g").remove()
            renderBarAndPlot()
        } else if (e.target.innerText === "Line" || e.target.innerText === "Area") {
            lineOrArea = e.target.innerText
            svg2.selectAll("g").remove()
            renderLineAndArea(priceData)
        } else if (e.target.innerText === "Globe" || e.target.innerText === "Map" || e.target.innerText === "Flat-Globe" || e.target.innerText === "Globe-Map") {
            if (e.target.innerText === "Globe") {
                svg3.selectAll("path").remove()
                makeMap("Globe")
            } else if (e.target.innerText === "Map") {
                svg3.selectAll("path").remove()
                makeMap("Map")
            } else if (e.target.innerText === "Flat-Globe") {
                svg3.selectAll("path").remove()
                makeMap("Flat-Globe")
            } else {
                svg3.selectAll("path").remove()
                makeMap("Globe-Map")
            }
        }
    } )
})

const selectPrice = document.querySelector("#price-select")

selectPrice.addEventListener("change", (e) => {
    console.log(e.target.value)
    fetchDatePrice(e.target.value)
})


function fetchDatePrice(string) {
    axios.get(`https://api.worldtradingdata.com/api/v1/history?symbol=${string}&date_from=2020-01-01&api_token=uMB99O8bJwwfS3tZJAZcQ3eYJBb4g0vHQY8eDk3s9Hfzskq0YEe77TzDMlLm`)
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
            priceData = dataPrice;
            svg2.selectAll("g").remove()
            renderLineAndArea(dataPrice)
        })
        .catch(function (error) {
            console.log(error);
        })
}



// const projection = d3.geoNaturalEarth1();
// const projection = d3.geoOrthographic();
var countries = [];
var countryName = {};

var mapPromises = Promise.all([d3.tsv("https://unpkg.com/world-atlas@1.1.4/world/110m.tsv"), d3.json("https://unpkg.com/world-atlas@1.1.4/world/50m.json")]);
mapPromises
    .then(([tsvData, JsonData]) => {
        countries = topojson.feature(JsonData, JsonData.objects.countries)
        countryName = tsvData.reduce((a, d) => {
            a[d.iso_n3] = d.name
            return a
        }, {})
    });

function makeMap(shape) {
    let projection;
    if(shape === "Map") {
        projection = d3.geoMercator();
    } else if (shape === "Globe") {
        projection = d3.geoOrthographic();
    } else if (shape === "Flat-Globe") {
        projection = d3.geoConicEquidistant()
    } else {
        projection = d3.geoEqualEarth()
    }

    svg.append("path")
    const g = svg3.append("g") 

    svg3.call(d3.zoom()
        .on('zoom', () => {
            if (d3.event.transform.k > 1) {
                d3.event.transform.k = Math.min(d3.event.transform.k, 6);
            } else {
                d3.event.transform.k = Math.max(d3.event.transform.k, .35);
            }
            g.attr('transform',d3.event.transform)
        }
    ))

    let pathGenerator = d3.geoPath().projection(projection)
    mapPromises.then(() => {
        g.selectAll('path')
            .data(countries.features)
            .enter().append('path')
            .attr('d', d => pathGenerator(d))
            .attr("class",'country')
            .append("title")
            .text(d => countryName[d.id])
    });
}

makeMap("Map")



const renderTree= data => {
    const root = d3.hierarchy(data)
    const treeLayout = d3.tree()
            .size([500,530])
    const links = treeLayout(root).links()
    const linkPathGenerator = d3.linkHorizontal()
    // const linkPathGenerator = d3.linkVertical()
          .x(d => d.y)
          .y(d => d.x)

    const g = svg4.append("g")
                  .attr('transform',"translate(65,25)")
    
    svg4.call(d3.zoom().on('zoom', () => {
        if (d3.event.transform.k > 1) {
            d3.event.transform.k = Math.min(d3.event.transform.k, 6);
        } else {
            d3.event.transform.k = Math.max(d3.event.transform.k, .35);
        }
         g.attr('transform',d3.event.transform)
    }))

    g.selectAll('path').data(links)
        .enter()
        .append('path')
        .attr("d",linkPathGenerator)
    g.selectAll("text")
        .data(root.descendants())
        .enter()
        .append("text")
        .attr('x',d => d.y)
        .attr('y',d => d.x)
        .attr("dy",'0.32em')
        .attr("text-anchor","middle")
        .attr("font-size",d => 1.9 - d.depth + "em")
        .text(d => d.data.name)
}

renderTree(data2)
