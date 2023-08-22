$(document).ready(function() {

    // Fetch Top Selling Kits
    $.ajax({
        url: '/kits/topselling',
        method: 'GET',
        success: function(data) {
            // Prepare data for the chart
            const kitNames = data.map(kit => kit.description);
            const salesCounts = data.map(kit => kit.salesCount);
    
            // Create a bar chart
            var ctx = document.getElementById('kits-chart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: kitNames,
                    datasets: [{
                        label: 'Number of Sales',
                        data: salesCounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Color of bars
                        borderColor: 'rgba(75, 192, 192, 1)',  // Border color of bars
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true  // Start the y-axis at 0
                        }
                    }
                }
            });
        },
        error: function() {
            console.log('Error: Failed to fetch top selling kits');
        }
    });
  
$.ajax({
    url: '/sales-by-league',
    method: 'GET',
    success: function(data) {
      
        let maxSales = Math.max(...data.map(item => item.totalSales));

        let progressBarDivs = '';
        for (let i = 0; i < data.length; i++) {
           
            let widthPercentage = (data[i].totalSales / maxSales) * 100;

            progressBarDivs += `
                <div class="mb-3">
                    <span>${data[i]._id} - ${data[i].totalSales} Sales</span>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${widthPercentage}%;" aria-valuenow="${widthPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            `;
        }
        
       
        $('#sales-by-league-data').html(progressBarDivs);
    },
    error: function() {
        console.log('Error: Failed to fetch sales by league');
    }
});


    
    $.ajax({
        url: '/users',
        method: 'GET',
        success: function(data) {
            data.forEach(function(user) {
                var card = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text"><strong>Username:</strong> ${user.username}</p>
                                <p class="card-text"><strong>Email:</strong> ${user.email}</p>
                                <p class="card-text"><strong>Type:</strong> ${user.userType}</p>
                            </div>
                        </div>
                    </div>
                `;
                $('#users-list').append(card);
            });
        },
        error: function() {
            console.log('Error: Failed to fetch users');
        }
    });
    

  });