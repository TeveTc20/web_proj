document.addEventListener('click', (event) => {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});

function sendData(e) {
    const searchResults = document.getElementById('searchResults');
    const input = e.value.trim();
    const searchBoxRect = e.getBoundingClientRect();
    
    if (input === '') {
        searchResults.style.display = 'none';
        return;
    }
    
    fetch('getKits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: input })
    }).then(res => res.json()).then(data => {
        let payload = data.payload;
        searchResults.innerHTML = '';
        
        if (payload.length < 1) {
            searchResults.innerHTML = '<p>No Results</p>';
            searchResults.style.display = 'block';
            return;
        }
        
        payload.forEach(item => {
            const resultElement = document.createElement('p');
            resultElement.textContent = item.value;
            resultElement.classList.add('search-result');
            resultElement.addEventListener('click', () => {
                if (item.matchedField === 'team_name') {
                    // Handle navigation to team page
                    window.location.href = `team.html?team_name=${encodeURIComponent(item.value)}`;
                } else if (item.matchedField === 'description') {
                    // Handle navigation to specific item page
                    window.location.href = `sKit.html?id=${item.id}`;
                } else if (item.matchedField === 'league') {
                    // Handle navigation to league page
                    window.location.href = `leagueKits.html?league=${item.league}`;
                } else if (item.matchedField === 'combined') {
                    // Handle navigation to specific item page (replace 'sKit.html' with actual item page)
                    window.location.href = `sKit.html?id=${item.id}`;
                }
            });
            searchResults.appendChild(resultElement);
        });
        
        searchResults.style.display = 'block';
        searchResults.style.top = `${searchBoxRect.bottom}px`;
    });
}
