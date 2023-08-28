fetch('footer.html')
            .then(response => response.text())
            .then(navHtml => {
            document.querySelector('#footer-placeholder').innerHTML = navHtml;
            });