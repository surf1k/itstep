function getHomework() {
    return JSON.parse(localStorage.getItem('homeworkList') || '[]');
}

function saveHomework(list) {
    localStorage.setItem('homeworkList', JSON.stringify(list));
}

function addHomework() {
    const subject = document.getElementById('hwSubject').value.trim();
    const desc = document.getElementById('hwDesc').value.trim();
    const date = document.getElementById('hwDate').value;

    if (!subject || !desc || !date) {
        alert("Заполните все поля");
        return;
    }

    const hw = {
        id: Date.now().toString(),
        subject,
        desc,
        date,
        done: false
    };

    const list = getHomework();
    list.push(hw);
    saveHomework(list);

    document.getElementById('hwSubject').value = '';
    document.getElementById('hwDesc').value = '';
    document.getElementById('hwDate').value = '';

    renderHomework();
}

function toggleDone(id) {
    const list = getHomework();
    const item = list.find(hw => hw.id === id);
    if (item) {
        item.done = !item.done;
        saveHomework(list);
        renderHomework();
    }
}

function deleteHomework(id) {
    let list = getHomework();
    list = list.filter(hw => hw.id !== id);
    saveHomework(list);
    renderHomework();
}

function renderHomework() {
    const list = getHomework();
    const container = document.getElementById('hwList');
    
    if (list.length === 0) {
        container.innerHTML = "<div class='card' style='text-align: center;'>Нет заданий. Вы можете отдохнуть!</div>";
        return;
    }

    
    list.sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        return new Date(a.date) - new Date(b.date);
    });

    container.innerHTML = '';
    list.forEach(hw => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'hw-item' + (hw.done ? ' done' : '');
        
        itemDiv.innerHTML = `
            <div class="hw-item-header">
                <span>${hw.subject}</span>
                <span class="hw-item-date">${hw.date}</span>
            </div>
            <div class="hw-item-desc">${hw.desc}</div>
            <div class="hw-actions">
                <button class="btn" onclick="toggleDone('${hw.id}')">
                    ${hw.done ? 'Вернуть' : 'Выполнено'}
                </button>
                <button class="btn danger" onclick="deleteHomework('${hw.id}')">Удалить</button>
            </div>
        `;
        container.appendChild(itemDiv);
    });
}

document.addEventListener('DOMContentLoaded', renderHomework);
