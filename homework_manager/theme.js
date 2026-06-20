document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.querySelector('.theme-toggle-btn');
    const themeMenu = document.querySelector('.theme-menu');
    
    let currentMode = 'dark';
    let currentColor = '#4ade80';

    if (themeBtn && themeMenu) {
        themeBtn.addEventListener('click', () => {
            themeMenu.classList.toggle('hidden');
        });

        
        document.addEventListener('click', (e) => {
            if (!themeBtn.contains(e.target) && !themeMenu.contains(e.target)) {
                themeMenu.classList.add('hidden');
            }
        });
    }
    
    function applyTheme() {
        const rgb = hexToRgb(currentColor);
        if (!rgb) return;
        
        document.documentElement.style.setProperty('--accent-color', currentColor);
        document.documentElement.style.setProperty('--accent-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
        document.documentElement.style.setProperty('--accent-glow', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`);
        
        if (currentMode === 'light') {
            document.documentElement.style.setProperty('--bg-color', `rgb(${255 - Math.floor(rgb.r*0.05)}, ${255 - Math.floor(rgb.g*0.05)}, ${255 - Math.floor(rgb.b*0.05)})`);
            document.documentElement.style.setProperty('--card-bg', '#ffffff');
            document.documentElement.style.setProperty('--surface-bg', 'rgba(0, 0, 0, 0.05)');
            document.documentElement.style.setProperty('--surface-bg-light', 'rgba(0, 0, 0, 0.02)');
            document.documentElement.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)');
            document.documentElement.style.setProperty('--text-primary', '#0f172a');
            document.documentElement.style.setProperty('--text-secondary', '#475569');
        } else {
            // Dark mode tinted backgrounds
            const bgR = Math.floor(rgb.r * 0.03);
            const bgG = Math.floor(rgb.g * 0.03);
            const bgB = Math.floor(rgb.b * 0.03);
            
            const cardR = Math.floor(rgb.r * 0.06);
            const cardG = Math.floor(rgb.g * 0.06);
            const cardB = Math.floor(rgb.b * 0.06);
            
            document.documentElement.style.setProperty('--bg-color', `rgb(${bgR}, ${bgG}, ${bgB})`);
            document.documentElement.style.setProperty('--card-bg', `rgb(${cardR}, ${cardG}, ${cardB})`);
            document.documentElement.style.setProperty('--surface-bg', 'rgba(255, 255, 255, 0.05)');
            document.documentElement.style.setProperty('--surface-bg-light', 'rgba(255, 255, 255, 0.02)');
            document.documentElement.style.setProperty('--border-color', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`);
            document.documentElement.style.setProperty('--text-primary', '#f8fafc');
            document.documentElement.style.setProperty('--text-secondary', '#94a3b8');
        }
        
        
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: currentColor }));
    }

    
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentColor = btn.getAttribute('data-color');
            applyTheme();
        });
    });

    
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentMode = btn.getAttribute('data-mode');
            applyTheme();
        });
    });

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
});
