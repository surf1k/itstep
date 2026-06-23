function displayAdvice() {
    const container = document.getElementById('advice-container');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.adviceslip.com/advice?' + Date.now(), true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                container.innerText = response.slip.advice;
            } catch (e) {
                container.innerText = "Error parsing response";
            }
        } else {
            container.innerText = "Error: " + xhr.status;
        }
    };
    xhr.onerror = function() {
        container.innerText = "Network Error";
    };
    xhr.send();
}
displayAdvice();
