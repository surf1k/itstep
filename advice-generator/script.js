function fetchAdviceByKeyword(keyword) {
    const container = document.getElementById('advice-container');
    container.innerHTML = 'Загрузка...';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.adviceslip.com/advice/search/${encodeURIComponent(keyword)}`);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.slips && response.slips.length > 0) {
                    container.innerHTML = '<ul>' + response.slips.map(slip => `<li>${slip.advice}</li>`).join('') + '</ul>';
                } else {
                    container.innerHTML = '<p>Советы не найдены.</p>';
                }
            } catch (e) {
                container.innerHTML = '<p>Ошибка парсинга данных.</p>';
            }
        } else {
            container.innerHTML = `<p>Ошибка запроса. Статус: ${xhr.status}</p>`;
        }
    };
    
    xhr.onerror = function() {
        container.innerHTML = '<p>Сетевая ошибка.</p>';
    };

    xhr.send();
}

function handleAdviceSearch() {
    const keyword = document.getElementById('adviceKeyword').value.trim();
    if (keyword) fetchAdviceByKeyword(keyword);
}
