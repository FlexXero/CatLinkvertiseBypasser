document.getElementById('bypassForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const linkInput = document.getElementById('linkInput').value;
    const resultDiv = document.getElementById('result');

    if (!linkInput) {
        resultDiv.textContent = 'Please enter a Linkvertise URL.';
        return;
    }

    try {
        const response = await fetch(`/bypass?link=${encodeURIComponent(linkInput)}`);
        const data = await response.json();

        if (data.bypassedLink) {
            resultDiv.innerHTML = `Bypassed Link: <a href="${data.bypassedLink}" target="_blank">${data.bypassedLink}</a>`;
        } else {
            resultDiv.textContent = 'Failed to bypass link. Please try again.';
        }
    } catch (error) {
        console.error(error);
        resultDiv.textContent = 'An error occurred. Please try again later.';
    }
});
