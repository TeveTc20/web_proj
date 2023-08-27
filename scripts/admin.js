document.addEventListener('DOMContentLoaded', function() {

    // Fetch Top Selling Kits
    d3.json('/kits/topselling').then(data => {
        const kitNames = data.map(kit => kit.description);
        const salesCounts = data.map(kit => kit.salesCount);
        
        const svgWidth = 800, svgHeight = 300;  // Adjusted for better visualization
        const margin = { top: 25, right:60 , bottom: 90, left: 100 };
        const chartWidth = svgWidth - margin.left - margin.right;
        const chartHeight = svgHeight - margin.top - margin.bottom;
        
        const xScale = d3.scaleBand().domain(kitNames).range([0, chartWidth]).padding(0.1);
        const yScale = d3.scaleLinear().domain([0, d3.max(salesCounts)]).range([chartHeight, 0]);
        
        const svg = d3.select('#kits-chart')
                      .attr('width', svgWidth)
                      .attr('height', svgHeight);
    
        const chartGroup = svg.append("g")
                              .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
        // Bars
        chartGroup.selectAll(".bar")
                  .data(salesCounts)
                  .enter()
                  .append('rect')
                  .attr('x', (d, i) => xScale(kitNames[i]))
                  .attr('y', d => yScale(d))
                  .attr('height', d => chartHeight - yScale(d))
                  .attr('width', xScale.bandwidth())
                  .attr('fill', 'rgba(75, 192, 192, 0.2)')
                  .attr('stroke', 'rgba(75, 192, 192, 1)')
                  .attr('stroke-width', 1);
    
        // X Axis with tilted labels
       // X Axis with tilted labels
                const xAxisGroup = chartGroup.append("g")
                .attr("transform", `translate(0, ${chartHeight})`);
                const xAxis = d3.axisBottom(xScale);
                xAxisGroup.call(xAxis);

                xAxisGroup.selectAll("text")
                .attr("y", 0)
                .attr("x", -10)
                .attr("dy", ".35em")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "end")
                .style("font-size", "14px"); 

    
        // Y Axis
        chartGroup.append("g")
                  .call(d3.axisLeft(yScale));
                  
    }).catch(error => {
        console.log('Error: Failed to fetch top selling kits', error);
    });
    
    d3.json('/sales-by-league').then(data => {
        let maxSales = d3.max(data, d => d.totalSales);
        let container = d3.select("#sales-by-league-data");
    
        data.forEach(item => {
            let widthPercentage = (item.totalSales / maxSales) * 100;
            
            let div = container.append('div').attr('class', 'mb-3');
            div.append('span').text(`${item._id} - ${item.totalSales} Sales`);
            
            let progressBar = div.append('div').attr('class', 'progress');
            progressBar.append('div')
                       .attr('class', 'progress-bar')
                       .style('width', `${widthPercentage}%`);
        });
    }).catch(error => {
        console.log('Error: Failed to fetch sales by league', error);
    });
    

    
    d3.json('/users').then(data => {
        const container = d3.select('#users-list');
    
        data.forEach(user => {
            let colDiv = container.append('div').attr('class', 'col-md-4 mb-4');
            let cardDiv = colDiv.append('div').attr('class', 'card');
            let cardBodyDiv = cardDiv.append('div').attr('class', 'card-body');
            
            cardBodyDiv.append('p').attr('class', 'card-text').html(`<strong>Username:</strong> ${user.username}`);
            cardBodyDiv.append('p').attr('class', 'card-text').html(`<strong>Email:</strong> ${user.email}`);
            cardBodyDiv.append('p').attr('class', 'card-text').html(`<strong>Type:</strong> ${user.userType}`);
        });
    }).catch(error => {
        console.log('Error: Failed to fetch users', error);
    });
    

  });