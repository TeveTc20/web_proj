const postToFacebook = async (message) => {
    try {
        const accessToken = `EAAwkEYWcSJ8BOxkNuMq1ztbh7CMMAZCTYHcJtcyetaYAWRjKPd7FZCKxu3b5tCMX7Lsa2goKqO8rTugzE2Vf85nnV09v9p3TSa1kZA6Ec04dop3OidI9fzhVgrYun9GDQm7fSyEqMdkPDkxmibtDhnQ7AZAN1FOssSEMXd8ytxZAsRP2OsluoHb4KHafI6iBtFJuHcRuZBjZCfkr82u5GJAbIexgYcUDGgZD`;
        const pageId = '120528934472158';
        const apiUrl = `https://graph.facebook.com/v17.0/${pageId}/feed`;

        const postData = {
            message,
            access_token: accessToken
        };

        
        const fetch = await import('node-fetch');

        const response = await fetch.default(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Posted to Facebook:', responseData);
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
};

module.exports = {
    postToFacebook,
};
