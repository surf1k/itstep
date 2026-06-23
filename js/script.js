function getUsers() {
    return JSON.parse(localStorage.getItem("courseStudents") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("courseStudents", JSON.stringify(users));
}

function register() {
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let age = Number(document.getElementById("regAge").value);
    let course = document.getElementById("regCourse").value;
    let password = document.getElementById("regPass").value;

    if (!name || !email || !age || !password) {
        document.getElementById("profile").innerHTML = "Заполните все поля";
        return;
    }

    let users = getUsers();

    if (users.some(u => u.email === email)) {
        document.getElementById("profile").innerHTML = "Пользователь с таким email уже зарегистрирован";
        return;
    }

    users.push({ name, email, age, course, password });
    saveUsers(users);

    document.getElementById("profile").innerHTML = "Регистрация успешна!";
    document.getElementById("regName").value = "";
    document.getElementById("regEmail").value = "";
    document.getElementById("regAge").value = "";
    document.getElementById("regPass").value = "";
}

function login() {
    let email = document.getElementById("logEmail").value.trim();
    let password = document.getElementById("logPass").value;

    let users = getUsers();
    let user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        document.getElementById("profile").innerHTML = "Неверный email или пароль";
        return;
    }

    localStorage.setItem("currentStudent", JSON.stringify(user));
    showProfile();
}

function showProfile() {
    let user = JSON.parse(localStorage.getItem("currentStudent") || "null");

    if (!user) {
        document.getElementById("profile").innerHTML = "Вы не авторизованы";
        return;
    }

    document.getElementById("profile").innerHTML =
        "<b>Имя:</b> " + user.name + "<br>" +
        "<b>Email:</b> " + user.email + "<br>" +
        "<b>Возраст:</b> " + user.age + "<br>" +
        "<b>Курс:</b> " + user.course;
}

function logout() {
    localStorage.removeItem("currentStudent");
    showProfile();
}

showProfile();