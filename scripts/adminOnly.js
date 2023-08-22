
function redirectNonAdmin() {
    $.ajax({
      url: '/check-login',
      method: 'GET',
      success: function(response) {
        console.log(response)
        if (!response.userType || response.userType !== 'admin') {
          window.location.href = "/";
        }
      },
      error: function() {
        // Handle error
        console.log('Error checking admin status');
        window.location.href = "/";
      }
    });
  }
  redirectNonAdmin();