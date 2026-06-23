function fetchCountryByName(countryName) {
    const container = document.getElementById('country-info');
    container.innerHTML = 'Загрузка...';

    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`)
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) throw new Error("Страна не найдена");
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const country = data[0];
        const name = country.name.common || country.name.official;
        const capital = country.capital ? country.capital[0] : 'Нет столицы';
        const flagUrl = country.flags.svg || country.flags.png;

        container.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Столица:</strong> ${capital}</p>
            <p><strong>Регион:</strong> ${country.region}</p>
            <p><strong>Население:</strong> ${country.population.toLocaleString('ru-RU')}</p>
            <img src="${flagUrl}" width="150" alt="Флаг">
        `;
    })
    .catch(error => {
        container.innerHTML = `<p>${error.message}</p>`;
    });
}

function handleCountrySearch() {
    const countryName = document.getElementById('countryInput').value.trim();
    if (countryName) fetchCountryByName(countryName);
}
