document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const articles = document.querySelectorAll('.article-section');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active from all
            navLinks.forEach(n => n.classList.remove('active'));
            articles.forEach(a => {
                a.classList.remove('active');
                a.classList.remove('slide-in-right');
                a.classList.remove('slide-in-left');
            });

            // Add active to clicked
            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            const targetArticle = document.getElementById(targetId);
            if (targetArticle) {
                targetArticle.classList.add('active');
                if (targetId === 'projects') {
                    targetArticle.classList.add('slide-in-right');
                } else if (targetId === 'about') {
                    targetArticle.classList.add('slide-in-left');
                }
            }
        });
    });

    // Hold to Enter Logic
    const holdBtn = document.getElementById('hold-btn');
    const holdProgress = document.getElementById('hold-progress');
    const introScreen = document.getElementById('intro-screen');
    const mainContainer = document.getElementById('main-container');
    const introTitle = document.querySelector('.intro-title');
    const introFooter = document.querySelector('.intro-footer');

    // 5-minute skip logic
    const lastVisit = localStorage.getItem('last_visit_time');
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    if (introScreen && mainContainer) {
        if (lastVisit && (now - parseInt(lastVisit)) < fiveMinutes) {
            // Skip intro
            introScreen.classList.add('hidden');
            introScreen.style.display = 'none';
            mainContainer.classList.remove('hidden');
        } else if (holdBtn) {
            let holdInterval;
            let particleInterval;
            let progress = 0;
            let isHolding = false;

            const createParticle = () => {
                const particle = document.createElement('div');
                particle.classList.add('btn-particle', 'eating-particle');
                
                // Random position on the screen
                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * window.innerHeight;
                
                // Target position (the button)
                const btnRect = holdBtn.getBoundingClientRect();
                const targetX = btnRect.left + (btnRect.width / 2);
                const targetY = btnRect.top + (btnRect.height / 2);
                
                particle.style.left = `${startX}px`;
                particle.style.top = `${startY}px`;
                
                const tx = targetX - startX;
                const ty = targetY - startY;
                
                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);
                
                introScreen.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 800);
            };

            const startHold = (e) => {
                isHolding = true;
                holdBtn.classList.add('filling', 'shaking');
                
                const btnRect = holdBtn.getBoundingClientRect();
                window.dispatchEvent(new CustomEvent('introHoldStart', { 
                    detail: { x: btnRect.left + btnRect.width/2, y: btnRect.top + btnRect.height/2 } 
                }));
                
                holdInterval = setInterval(() => {
                    progress += 1.5; 
                    holdProgress.style.width = `${progress}%`;
                    
                    const opacity = 1 - (progress / 100);
                    if (introTitle) introTitle.style.opacity = opacity;
                    if (introFooter) introFooter.style.opacity = opacity;
                    
                    if (progress >= 100) {
                        clearInterval(holdInterval);
                        clearInterval(particleInterval);
                        completeIntro();
                    }
                }, 20);

                particleInterval = setInterval(() => {
                    for(let i=0; i<3; i++) createParticle();
                }, 40); 
            };

            const stopHold = () => {
                if (progress < 100) {
                    isHolding = false;
                    window.dispatchEvent(new CustomEvent('introHoldStop'));
                    clearInterval(holdInterval);
                    clearInterval(particleInterval);
                    progress = 0;
                    holdProgress.style.width = '0%';
                    holdBtn.classList.remove('filling', 'shaking');
                    
                    if (introTitle) introTitle.style.opacity = 1;
                    if (introFooter) introFooter.style.opacity = 1;
                }
            };

            const completeIntro = () => {
                localStorage.setItem('last_visit_time', Date.now().toString());
                window.dispatchEvent(new CustomEvent('introHoldStop'));

                holdBtn.classList.remove('shaking');
                introScreen.classList.add('hidden');
                mainContainer.classList.remove('hidden');
                
                setTimeout(() => {
                    introScreen.style.display = 'none';
                }, 800);
            };

            holdBtn.addEventListener('mousedown', startHold);
            holdBtn.addEventListener('mouseup', stopHold);
            holdBtn.addEventListener('mouseleave', stopHold);

            holdBtn.addEventListener('touchstart', (e) => {
                e.preventDefault(); 
                startHold();
            });
            holdBtn.addEventListener('touchend', stopHold);
            holdBtn.addEventListener('touchcancel', stopHold);
        }
    } else {
        if (mainContainer) {
            mainContainer.classList.remove('hidden');
        }
    }

    // Project Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                const projectCards = document.querySelectorAll('.project-card');
                
                projectCards.forEach(card => {
                    const techText = card.querySelector('.project-tech').textContent.toLowerCase();
                    const titleText = card.querySelector('.project-title').textContent.toLowerCase();
                    const descText = card.querySelector('.project-desc').textContent.toLowerCase();
                    
                    const matchesFilter = filterValue === 'all' || 
                                          techText.includes(filterValue) || 
                                          titleText.includes(filterValue) || 
                                          descText.includes(filterValue);
                    
                    if (matchesFilter) {
                        card.style.display = 'flex';
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Interactive Toys Logic
    const slider = document.getElementById('main-slider');
    const s1 = document.getElementById('switch-1');
    const s2 = document.getElementById('switch-2');
    const s1Parent = document.getElementById('cyber-s1');
    const s2Parent = document.getElementById('cyber-s2');
    const val = document.getElementById('slider-val');
    const ping = document.getElementById('ping-btn');
    const panel = document.getElementById('interactive-panel');

    const updateSlider = (v) => {
        if(slider) {
            slider.value = v;
            slider.style.setProperty('--slider-fill', `${v}%`);
        }
        if(val) val.textContent = v + '%';
    };

    const animateSlider = (targetValue) => {
        if (!slider) return;
        let startValue = parseInt(slider.value);
        let diff = targetValue - startValue;
        if (diff === 0) return;
        
        let startTime = null;
        const duration = 300; 

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            let progress = (timestamp - startTime) / duration;
            if (progress > 1) progress = 1;
            
            let ease = 1 - (1 - progress) * (1 - progress);
            let current = Math.round(startValue + diff * ease);
            updateSlider(current);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    // Initialize initial slider fill
    if(slider) updateSlider(slider.value);

    const pulseSwitch = (el) => {
        el.classList.add('pulse');
        setTimeout(() => el.classList.remove('pulse'), 300);
    };

    if(slider) {
        slider.addEventListener('input', (e) => {
            let v = parseInt(e.target.value);
            updateSlider(v);
            
            if(v >= 75) {
                if(!s1.checked) { s1.checked = true; pulseSwitch(s1Parent); }
                if(!s2.checked) { s2.checked = true; pulseSwitch(s2Parent); }
            } else if (v >= 25) {
                if(!s1.checked) { s1.checked = true; pulseSwitch(s1Parent); }
                if(s2.checked) { s2.checked = false; pulseSwitch(s2Parent); }
            } else {
                if(s1.checked) { s1.checked = false; pulseSwitch(s1Parent); }
                if(s2.checked) { s2.checked = false; pulseSwitch(s2Parent); }
            }
        });

        s1.addEventListener('change', () => {
            let v = parseInt(slider.value);
            if (s1.checked && v < 25) {
                animateSlider(26);
            } else if (!s1.checked) {
                animateSlider(0);
                if(s2.checked) { s2.checked = false; pulseSwitch(s2Parent); }
            }
        });

        s2.addEventListener('change', () => {
            let v = parseInt(slider.value);
            if (s2.checked) {
                if(v < 75) animateSlider(76);
                if(!s1.checked) { s1.checked = true; pulseSwitch(s1Parent); }
            } else if (!s2.checked && v >= 75) {
                animateSlider(26);
            }
        });

        ping.addEventListener('click', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            let ripple = document.createElement('div');
            ripple.classList.add('panel-ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            panel.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
            
            window.dispatchEvent(new CustomEvent('pingEffect', { detail: { x: e.clientX, y: e.clientY } }));
        });
    }

    // Typewriter
    const heroTitle = document.querySelector('.typing-text');
    if (heroTitle) {
        // Simple blinking cursor logic if needed, 
        // CSS handles most of it, but we can restart animation on load.
    }
});
