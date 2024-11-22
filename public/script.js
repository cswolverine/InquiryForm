document.getElementById('inquiry-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const region = document.getElementById('region').value;
    const type = document.getElementById('type').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://localhost:3000/send-mail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, region, type, message }),
        });

        if (response.ok) {
            alert('Inquiry sent successfully!');
        } else {
            alert('Failed to send inquiry. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
