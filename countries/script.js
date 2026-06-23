function fetchAllCountries() {
    const listElement = document.getElementById('countries-list');
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            listElement.innerHTML = '';
            countries.forEach(country => {
                const li = document.createElement('li');
                li.textContent = country.name.common;
                listElement.appendChild(li);
            });
        })
        .catch(error => {
            console.error(error);
        });
}
fetchAllCountries();
