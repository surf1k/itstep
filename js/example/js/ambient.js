const canvas = document.getElementById('ambient-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

if (canvas && ctx) {
    let width, height;
    let particles = [];
    let mouse = { x: -1000, y: -1000, radius: 150 };
    let isSpiderweb = false;
    let spiderwebAlpha = 0;

    let isHoldingIntro = false;
    let introTarget = { x: 0, y: 0 };
    let pingRipple = { active: false, x: 0, y: 0, radius: 0, maxRadius: 1500 };
    let currentAccentColor = '#4ade80';

    window.addEventListener('themeChanged', (e) => {
        currentAccentColor = e.detail;
    });

    window.addEventListener('introHoldStart', (e) => {
        isHoldingIntro = true;
        introTarget.x = e.detail.x;
        introTarget.y = e.detail.y;
    });

    window.addEventListener('introHoldStop', () => {
        isHoldingIntro = false;
    });

    window.addEventListener('pingEffect', (e) => {
        pingRipple.active = true;
        pingRipple.x = e.detail.x;
        pingRipple.y = e.detail.y;
        pingRipple.radius = 0;
    });

    // Track tab state for spiderweb effect
    document.addEventListener('DOMContentLoaded', () => {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (link.getAttribute('data-target') === 'projects') {
                    isSpiderweb = true;
                } else {
                    isSpiderweb = false;
                }
            });
        });
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.baseSize = Math.random() * 2 + 0.5;
            this.size = this.baseSize;
            this.baseSpeedX = Math.random() * 0.5 - 0.25;
            this.baseSpeedY = Math.random() * 0.5 - 0.25;
            this.speedX = this.baseSpeedX;
            this.speedY = this.baseSpeedY;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            if (pingRipple.active) {
                let dx = pingRipple.x - this.x;
                let dy = pingRipple.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (Math.abs(dist - pingRipple.radius) < 80) {
                    let force = (80 - Math.abs(dist - pingRipple.radius)) / 80;
                    this.speedX -= (dx / dist) * force * 1.5;
                    this.speedY -= (dy / dist) * force * 1.5;
                }
            }

            if (isHoldingIntro) {
                let dx = introTarget.x - this.x;
                let dy = introTarget.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 10) {
                    this.speedX += (dx / dist) * 0.8;
                    this.speedY += (dy / dist) * 0.8;
                } else {
                    this.x = Math.random() < 0.5 ? 0 : width;
                    this.y = Math.random() * height;
                    this.speedX = this.baseSpeedX;
                    this.speedY = this.baseSpeedY;
                }
            } else {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    
                    this.speedX -= forceDirectionX * force * 0.2;
                    this.speedY -= forceDirectionY * force * 0.2;
                } else {
                    this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
                    this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
                }
            }

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = currentAccentColor;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function init() {
        resize();
        particles = [];
        const particleCount = Math.floor(width * height / 9000); 
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connect() {
        if (spiderwebAlpha <= 0) return;
        
        let maxDistance = 120;

        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    let opacityValue = 1 - (distance / maxDistance);
                    ctx.globalAlpha = opacityValue * 0.3 * spiderwebAlpha;
                    ctx.strokeStyle = currentAccentColor;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        if (pingRipple.active) {
            pingRipple.radius += 20;
            if (pingRipple.radius > pingRipple.maxRadius) pingRipple.active = false;
        }

        if (isSpiderweb) {
            spiderwebAlpha += 0.02;
            if (spiderwebAlpha > 1) spiderwebAlpha = 1;
        } else {
            spiderwebAlpha -= 0.02;
            if (spiderwebAlpha < 0) spiderwebAlpha = 0;
        }

        connect();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        init();
    });

    init();
    animate();
}
