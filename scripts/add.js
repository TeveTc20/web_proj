const socket = io();

socket.on('showAd', () => {
 
  const adPopup = document.getElementById('adPopup');
  adPopup.style.display = 'block';
});


const adCloseButton = document.getElementById('adCloseButton');
adCloseButton.addEventListener('click', () => {
  const adPopup = document.getElementById('adPopup');
  adPopup.style.display = 'none';
});


const adLinkButton = document.getElementById('adLinkButton');
adLinkButton.addEventListener('click', () => {
  const adPopup = document.getElementById('adPopup');
  adPopup.style.display = 'none';

 
  window.location.href = 'sKit?id=64dbbef5ed2cfbb78bca952f';
});