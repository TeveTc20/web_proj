
  document.addEventListener('DOMContentLoaded', function() {
    
    function handleUserIconClick() {
        $.ajax({
            url: '/check-login',
            method: 'GET',
            success: function(response) {
                if (response.isloggedin) {
                    window.location.href = '/myAccount.html';
                } else {
                    window.location.href = '/login.html';
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