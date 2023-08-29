document.addEventListener('DOMContentLoaded', function() {

   
    d3.json('/kits/topselling').then(data => {
        const kitNames = data.map(kit => kit.description);
        const salesCounts = data.map(kit => kit.salesCount);
        
        const svgWidth = 1200, svgHeight = 400;  
        const margin = { top: 25, right:80 , bottom: 100, left: 100 };
        const chartWidth = svgWidth - margin.left - margin.right;
        const chartHeight = svgHeight - margin.top - margin.bottom;
        
        const xScale = d3.scaleBand().domain(kitNames).range([0, chartWidth]).padding(0.1);
        const yScale = d3.scaleLinear().domain([0, d3.max(salesCounts)]).range([chartHeight, 0]);
        
        const svg = d3.select('#kits-chart')
                      .attr('width', svgWidth)
                      .attr('height', svgHeight);
    
        const chartGroup = svg.append("g")
                              .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
       
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
    
       const xAxisGroup = chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`);
        const xAxis = d3.axisBottom(xScale);
        xAxisGroup.call(xAxis)
        .selectAll("text")
        .style("font-size", "11px");


        chartGroup.append("g")
                  .call(d3.axisLeft(yScale));

            const gridlines = d3.axisLeft(yScale)
                    .tickFormat("")  
                    .tickSize(-chartWidth)  
                    .ticks(10);  

            chartGroup.append("g")
                    .attr("class", "grid")
                    .call(gridlines)
                    .selectAll(".tick line")
                    .attr("stroke", "#d9d9d9")  
                    .attr("stroke-dasharray", "2,2");            
                  
    }).catch(error => {
        console.log('Error: Failed to fetch top selling kits', error);
    });
    
    d3.json('/sales-by-league').then(data => {
        let labels = data.map(item => item._id); 
        let salesData = data.map(item => item.totalSales);
    
        const ctx = document.getElementById('salesByLeagueChart').getContext('2d');
    
        const pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: salesData,
                    backgroundColor: [  
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                       
                    ]
                }]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right'
                }
            }
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
       const ordersContainer = d3.select('#orders-list');
    d3.json('/orders/username').then(data => {
    data.forEach(order => {
        const createdAtFormatted = new Date(order.createdAt).toLocaleString();
        let colDiv = ordersContainer.append('div').attr('class', 'col-md-4 mb-4');
        let cardDiv = colDiv.append('div').attr('class', 'card');
        let cardBodyDiv = cardDiv.append('div').attr('class', 'card-body');
        
        cardBodyDiv.append('p').attr('class', 'card-text').html(`<strong>Order ID:</strong> ${order._id}`);
        cardBodyDiv.append('p').attr('class', 'card-text').html(`<strong>Username:</strong> ${order.username}`);
        cardBodyDiv.append('p').attr('class', 'card-text').html(`<strong>Created At:</strong> ${createdAtFormatted}`);
        cardBodyDiv.append('p').attr('class', 'card-text').html(`<strong>Quantity:</strong>  ${order.totalQuantity}`);
        cardBodyDiv.append('p').attr('class', 'card-text').html(`<strong>Price:</strong> ${order.totalPrice} $`);
        
        const orderCartIds = order.carts.map(cartId => cartId._id);
        let cartsHtml = ''; 
        
        orderCartIds.forEach((cartId, index) => {
            d3.json(`/carts/${cartId}`)
                .then(cartData => {
                    cartsHtml += `<strong></strong> ${cartData.kitDescription}
                                  quantity - ${cartData.quantity},
                                  size - ${cartData.size}
                                  size - ${cartData.totalPrice}$<br>`;
                    
                    if (index === orderCartIds.length - 1) {
                       
                        cardBodyDiv.append('p').attr('class', 'card-text').html(cartsHtml);
                        cardBodyDiv.append('hr');
                    }
                })
                .catch(error => {
                    console.error('Error fetching cart:', error);
                });
        });
    });
})
.catch(error => {
    console.error('Error fetching orders:', error);
});

    

  });