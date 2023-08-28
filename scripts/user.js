
  document.addEventListener('DOMContentLoaded', function() {
    
    function handleUserIconClick() {
        $.ajax({
            url: '/check-login',
            method: 'GET',
            success: function(response) {
                if (response.isloggedin && response.userType ==="admin") {
                    window.location.href = '/admin';
                }
                 else if (response.isloggedin) {
                    window.location.href = '/myAccount';
                } 
                else {
                    window.location.href = '/login';
                }
                
            },
            error: function() {
                console.log('Error checking login status');
            }
        });
    }

    
    setTimeout(function() {
        $(document).ready(function() {
            $('#userIcon').on("click", handleUserIconClick);
        });
    }, 500); 
});