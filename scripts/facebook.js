const postToFacebook = async (message) => {
    try {
        const accessToken = `EAAwkEYWcSJ8BO2WrxH1qv5CZA0vZCHMAJgmLbebvzJIZAcpHUSMEZCn6QfVmrvBVqzgCthlASIMFIOYc3fzdvJ7wDZCmuyu9XiLJo3ZCqBzi4vglMjK9hMT9CL9hJGsI9414Fmryd3lziWTM6s5Kb1grOVqZCDx14xCB54IqXms1ORZBQVKosM3g3aeYjJaPiFeFkDwAdn8rtUzuU0FitciH15HVjdYeqQAZD`;
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
