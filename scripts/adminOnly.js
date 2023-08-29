
function redirectNonAdmin() {
    $.ajax({
      url: '/check-login',
      method: 'GET',
      success: function(response) {
      
        if (!response.userType || response.userType !== 'admin') {
          window.location.href = "/";
        }
      },
      error: function() {
        
        console.log('Error checking admin status');
        window.location.href = "/";
      }
    });
  }
  redirectNonAdmin();