function fetchRandomDogImage() {
    const imgElement = document.getElementById('dog-image');
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            imgElement.src = data.message;
        })
        .catch(error => {
            console.error(error);
        });
}
fetchRandomDogImage();
