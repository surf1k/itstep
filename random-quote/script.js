function fetchRandomQuote() {
    const apiKey = '9W1s1faBB7FnbHHlISvGyLPdwxHaQzI2AWdocGBV';
    const container = document.getElementById('quote-container');
    container.innerHTML = 'Загрузка...';

    fetch('https://api.api-ninjas.com/v1/quotes', {
        method: 'GET',
        headers: { 'X-Api-Key': apiKey }
    })
    .then(response => {
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        return response.json();
    })
    .then(data => {
        if (data && data.length > 0) {
            container.innerHTML = `<blockquote>"${data[0].quote}"</blockquote><p>- ${data[0].author}</p>`;
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        container.innerHTML = '<p>Ошибка (возможно, неверный API ключ)</p>';
    });
}
