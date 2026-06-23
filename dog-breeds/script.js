function fetchDogBreeds() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dog.ceo/api/breeds/list/all');
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                const breeds = Object.keys(response.message);
                const listElement = document.getElementById('breed-list');
                listElement.innerHTML = '';
                
                breeds.forEach(breed => {
                    const li = document.createElement('li');
                    li.textContent = breed;
                    listElement.appendChild(li);
                });
            } catch (e) {
                console.error('Ошибка парсинга:', e);
            }
        } else {
            console.error('Ошибка запроса:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Сетевая ошибка.');
    };

    xhr.send();
}
