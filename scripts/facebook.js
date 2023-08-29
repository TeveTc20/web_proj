const postToFacebook = async (message) => {
    try {
        const accessToken = `EAAwkEYWcSJ8BOwj0yZAbQE6czZBGvQJuXEzgQmTCZCUSSUnYMvxTQfweFR25gbBZCt039TCEHFXVfUWYBrGughiGiJwNObZAeMbRxht63A0QANBZAyjxQd2psQIbp6wmCOym8GhXJyVaRWZCMNAUZBSXEav8DNjbVEQ8qXsMpQdsBZB9ZB376rdgqwB33I0xAtrKozM9FxWdeZBhSW49ztaw8MbuZCegevKQZCkmo`;
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
