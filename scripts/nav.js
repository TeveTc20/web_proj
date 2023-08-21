fetch('nav.html')
    .then(response => response.text())
    .then(navHtml => {
        document.querySelector('#nav-placeholder').innerHTML = navHtml;
    });



    







   