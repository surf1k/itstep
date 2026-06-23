function fetchRandomCatImage() {
    const imgElement = document.getElementById('cat-image');
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                imgElement.src = data[0].url;
            }
        })
        .catch(error => {
            console.error(error);
        });
}
fetchRandomCatImage();
