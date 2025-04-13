document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  let name = document.getElementById('name').value.trim();
  let email = document.getElementById('email').value.trim();
  let subject = document.getElementById('subject').value.trim();
  let message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    alert('Please fill out all fields.');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  alert('Message sent successfully!');
  this.reset();
});

function validateEmail(email) {
  let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
