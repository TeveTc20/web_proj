const socket = io();

socket.on('showAd', () => {
  // Display the ad popup
  const adPopup = document.getElementById('adPopup');
  adPopup.style.display = 'block';
});

// Close the ad popup when the close button is clicked
const adCloseButton = document.getElementById('adCloseButton');
adCloseButton.addEventListener('click', () => {
  const adPopup = document.getElementById('adPopup');
  adPopup.style.display = 'none';
});

// Redirect to the Barcelona kit page when the link button is clicked
const adLinkButton = document.getElementById('adLinkButton');
adLinkButton.addEventListener('click', () => {
  const adPopup = document.getElementById('adPopup');
  adPopup.style.display = 'none';

  // Redirect to the Barcelona kit page
  window.location.href = 'sKit?id=64dbbef5ed2cfbb78bca952f'; // Replace with the actual URL
});