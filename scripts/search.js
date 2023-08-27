// document.addEventListener('click', (event) => {
//     const searchResults = document.getElementById('searchResults');
//     if (!searchResults.contains(event.target)) {
//         searchResults.style.display = 'none';
//     }
// });

// function sendData(e) {
//     const searchResults = document.getElementById('searchResults');
//     const input = e.value.trim().toLowerCase();
//     const searchBoxRect = e.getBoundingClientRect();
    
//     if (input === '') {
//         searchResults.style.display = 'none';
//         return;
//     }
    
//     fetch('getKits', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ payload: input })
//     }).then(res => res.json()).then(data => {
//         let payload = data.payload;
//         searchResults.innerHTML = '';
        
//         // Prepare a regular expression for fuzzy matching (ignores order and word boundaries)
//         const searchRegex = new RegExp(input.split(' ').map(keyword => `(?=.*\\b${keyword})`).join(''), 'i');
        
//         const matchingItems = payload.filter(item => {
//             return searchRegex.test(item.value);
//         });
        
//         if (matchingItems.length < 1) {
//             searchResults.innerHTML = '<p>No Results</p>';
//             searchResults.style.display = 'block';
//             return;
//         }
        
//         matchingItems.forEach(item => {
//             const resultElement = document.createElement('p');
//             resultElement.textContent = item.value;
//             resultElement.classList.add('search-result');
//             resultElement.addEventListener('click', () => {
//                 if (item.matchedField === 'team_name') {
//                     window.location.href = `team.html?team_name=${encodeURIComponent(item.team_name)}`;
//                 } else if (item.matchedField === 'description') {
//                     window.location.href = `sKit?id=${item.id}`;
//                 } else if (item.matchedField === 'league') {
//                     window.location.href = `leagueKits?league=${encodeURIComponent(item.league)}`;
//                 } else if (item.matchedField === 'combined') {
//                     window.location.href = `sKit?id=${item.id}`;
//                 }
//             });
//             searchResults.appendChild(resultElement);
//         });
        
//         searchResults.style.display = 'block';
//         searchResults.style.top = `${searchBoxRect.bottom}px`;
//     });
// }

document.addEventListener('click', (event) => {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});

function sendData(e) {
    const searchResults = document.getElementById('searchResults');
    const input = e.value.trim().toLowerCase();
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

        // Prepare a regular expression for fuzzy matching (ignores order and word boundaries)
        const searchRegex = new RegExp(input.split(' ').map(keyword => `(?=.*\\b${keyword})`).join(''), 'i');
        
        const matchingItems = payload.filter(item => {
            return searchRegex.test(item.value);
        });

        matchingItems.sort((a, b) => {
            if (a.matchedField === 'league' && b.matchedField !== 'league') {
                return -1; // 'a' comes before 'b'
            } else if (a.matchedField !== 'league' && b.matchedField === 'league') {
                return 1; // 'b' comes before 'a'
            } else {
                return 0; // maintain order or for non-league matches
            }
        });
        
        searchResults.innerHTML = '';
        
        matchingItems.forEach(item => {
            const resultElement = document.createElement('p');
            resultElement.textContent = item.value;
            resultElement.classList.add('search-result');
            resultElement.addEventListener('click', () => {
                if (item.matchedField === 'team_name') {
                    window.location.href = `team.html?team_name=${encodeURIComponent(item.team_name)}`;
                } else if (item.matchedField === 'description') {
                    window.location.href = `sKit?id=${item.id}`;
                } else if (item.matchedField === 'league') {
                    window.location.href = `leagueKits?league=${encodeURIComponent(item.league)}`;
                } else if (item.matchedField === 'combined') {
                    window.location.href = `sKit?id=${item.id}`;
                }
            });
            searchResults.appendChild(resultElement);
        });
        
        searchResults.style.display = 'block';
        searchResults.style.top = `${searchBoxRect.bottom}px`;
    });
}
