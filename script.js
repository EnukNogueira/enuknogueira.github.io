/*
  script.js - Contém a lógica JavaScript principal da página, incluindo integração com a API do GitHub, animações de HUD, efeito de máquina de escrever e gerenciamento de áudio.
  Comentários em Português explicam cada seção abaixo:
  - Integração com API do GitHub: busca repositórios do usuário e gera cartões de projeto.
  - Canvas de Partículas Astrophage: cria efeito de partículas interativas.
  - Gerenciador de Sons UI: controla efeitos sonoros de hover e click.
  - Inicialização de HUD: adiciona cantos brilhantes e configura revelações de elementos.
  - Efeito Typewriter: simula digitação de texto com cursor piscante.
  - Carrossel de Ícones Ondulantes: anima ícones de tecnologia em movimento sinusoidal.
  - Trigger de Glitch Spider-Verse: placeholder para futuros efeitos de glitch.
*/

// Configuração da integração com a API do GitHub
// Explicação: Define o usuário e a URL da API para buscar repositórios públicos.
const GITHUB_USERNAME = 'EnukNogueira';
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&order=desc&per_page=100`;

// Tags customizadas para projetos específicos
// Explicação: Mapeia nomes de repositórios a tags de exibição customizadas.
const PROJECT_TAGS = {
    'math_test': ['Gerador Aleatório', 'Lógica'],
    'projeto_skoob_pucpr': ['JSON', 'Dados', 'Web Scraping'],
    'projeto_cotacao': ['APIs', 'Análise de Dados', 'JSON', 'Automação', 'Financeiro'],
    'estoque-java': ['POO', 'Banco de Dados', 'Negócio'],
    'currency-data-pipeline': ['APIs', 'Análise de Dados', 'Automação'],
    'skkob-data-integrator': ['Integração de Dados', 'ETL', 'Automação'],
    'inventory-management-system': ['Sistema de Gerenciamento', 'POO', 'Banco de Dados'],
    'enuknogueira.github.io': ['Engenharia de Prompt', 'IA Agentica', 'Web Design', 'Frontend', 'Portfólio'],
};

// Função assíncrona para carregar projetos do GitHub
// Explicação: Busca repositórios, filtra, cria cartões e aplica animações HUD.
async function loadProjects() {
    const container = document.getElementById('projects-container');
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const repos = await response.json();
        if (!repos || repos.length === 0) {
            container.innerHTML = '<p>Nenhum dado encontrado no banco de dados principal.</p>';
            return;
        }
        // Remove forks e repositórios sem descrição
        const filteredRepos = repos.filter(repo => !repo.fork && repo.description);
        const displayRepos = filteredRepos.length > 0 ? filteredRepos.slice(0, 6) : repos.slice(0, 6);
        container.innerHTML = displayRepos.map(repo => createProjectCard(repo)).join('');
        const newCards = container.querySelectorAll('.project-card');
        newCards.forEach((card, index) => {
            const corners = document.createElement('div');
            corners.className = 'hud-corners';
            card.appendChild(corners);
            card.classList.add('reveal');
            card.style.transitionDelay = `${((index % 3) * 150)}ms`;
            setTimeout(() => window.hudObserver && window.hudObserver.observe(card), 10);
        });
    } catch (error) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: #ef4444; padding: 40px; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 16px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg><br>
                <strong>ERRO AO CARREGAR PROJETOS</strong><br>
                Não foi possível carregar os projetos do GitHub no momento.
            </div>
        `;
    }
}

// Cria o HTML de um cartão de projeto
// Explicação: Gera a estrutura visual de cada projeto, incluindo tags e link.
function createProjectCard(repo) {
    const language = repo.language || 'N/A';
    const stars = repo.stargazers_count > 0 ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> ${repo.stargazers_count}` : '';
    const description = repo.description || 'Descrição confidencial.';
    let tags = PROJECT_TAGS[repo.name] || repo.topics || [];
    if (tags.length === 0) {
        if (language.toLowerCase() === 'python') tags = ['Python', 'Automação'];
        else if (language.toLowerCase() === 'java') tags = ['Java', 'POO'];
        else tags = ['Development'];
    }
    // Remove linguagem das tags para evitar duplicação, já que será adicionada separadamente
    tags = tags.filter(tag => tag.toLowerCase() !== language.toLowerCase());
    const tagsHTML = tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
    return `
        <div class="project-card">
            <div class="project-header">
                <h3 class="project-title">${repo.name}</h3>
                ${stars ? `<div class="project-stars">${stars}</div>` : ''}
            </div>
            <p class="project-desc">${description}</p>
            <div class="project-tags">
                ${tagsHTML}
                <span class="project-tag" style="border-color: rgba(239, 68, 68, 0.4); color: var(--astrophage-glow)">${language}</span>
            </div>
            <a href="${repo.html_url}" class="project-link" target="_blank">
                Ver Projeto
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
        </div>
    `;
}

// --- Sistema de Partículas Astrophage (Canvas) ---
// Explicação: Cria um canvas com partículas que reagem ao mouse e ao redimensionamento.
function initCanvas() {
    const canvas = document.getElementById('astrophage-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });
    function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() * 0.8) - 0.4;
            this.speedY = (Math.random() * 0.8) - 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
            const colors = ['#ef4444', '#f87171', '#b91c1c', '#ffffff'];
            const weights = [5, 4, 2, 1];
            let totalWeight = weights.reduce((a, b) => a + b);
            let random = Math.random() * totalWeight;
            for (let i = 0; i < weights.length; i++) {
                if (random < weights[i]) { this.color = colors[i]; break; }
                random -= weights[i];
            }
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulseDir = 1;
        }
        update() {
            this.x += this.speedX; this.y += this.speedY;
            if (this.x > width) this.x = 0; else if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0; else if (this.y < 0) this.y = height;
            this.opacity += this.pulseSpeed * this.pulseDir;
            if (this.opacity > 0.8 || this.opacity < 0.1) this.pulseDir *= -1;
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x; let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= forceDirectionX * force * 3;
                    this.y -= forceDirectionY * force * 3;
                }
            }
        }
        draw() {
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color; ctx.globalAlpha = this.opacity; ctx.fill();
            if (this.size > 1.2) { ctx.shadowBlur = 10; ctx.shadowColor = this.color; } else { ctx.shadowBlur = 0; }
        }
    }
    function initParticles() {
        particles = [];
        const numParticles = Math.floor((width * height) / 9000);
        for (let i = 0; i < numParticles; i++) particles.push(new Particle());
    }
    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) { particles[i].update(); particles[i].draw(); }
        requestAnimationFrame(animate);
    }
    initParticles(); animate();
    let resizeTimeout;
    window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(initParticles, 300); });
}

// --- Efeitos Sonoros da UI (Web Audio API) ---
// Explicação: Gerencia sons de hover e clique usando a API de áudio do navegador.
const SoundManager = {
    ctx: null,
    init() {
        const startAudio = () => {
            if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            if (this.ctx.state === 'suspended') this.ctx.resume();
        };
        document.addEventListener('click', startAudio, { once: true });
        document.addEventListener('keydown', startAudio, { once: true });
        document.addEventListener('mouseover', e => {
            const target = e.target.closest('.btn, .nav-links a, .social-links a, .project-card, .cert-card, .project-link');
            if (target && !target.dataset.hovered) {
                target.dataset.hovered = 'true';
                this.playHover();
                target.addEventListener('mouseleave', () => { target.dataset.hovered = ''; }, { once: true });
            }
        });
        document.addEventListener('click', e => {
            const target = e.target.closest('.btn, .nav-links a, .social-links a, .project-card, .cert-card, .project-link');
            if (target) this.playClick();
        });
    },
    playHover() {
        if (!this.ctx || this.ctx.state === 'suspended') return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.1);
    },
    playClick() {
        if (!this.ctx || this.ctx.state === 'suspended') return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.1);
    }
};

// Inicialização ao carregar a página
// Explicação: Executa funções de carga de projetos, canvas, sons e HUD.
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initCanvas();
    SoundManager.init();
    initHUD();
    // Scroll suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// --- HUD e Animações de Revelação ---
// Explicação: Configura cantos brilhantes e animações de entrada para elementos.
function initHUD() {
    const hudCards = document.querySelectorAll('.stat-card, .cert-card, .stack-container, .project-card');
    hudCards.forEach(card => {
        card.style.position = 'relative';
        const corners = document.createElement('div');
        corners.className = 'hud-corners';
        card.appendChild(corners);
    });
    const revealSelectors = [
        '.tag-pill', 'h1', '.subtitle', '.quote', '.btn-group',
        '.section-title', '.stat-card',
        '.stack-category', '.stack-container', '.cert-card'
    ];
    revealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            if (el.tagName === 'H1') el.style.transitionDelay = '100ms';
            else if (el.classList.contains('subtitle')) el.style.transitionDelay = '200ms';
            else if (el.classList.contains('quote')) el.style.transitionDelay = '300ms';
            else if (el.classList.contains('btn-group')) el.style.transitionDelay = '400ms';
            else if (['stat-card', 'stack-category', 'cert-card'].some(c => el.classList.contains(c))) {
                el.style.transitionDelay = `${(index % 4) * 100}ms`;
            }
        });
    });
    setTimeout(() => { document.querySelectorAll('.reveal').forEach(el => window.hudObserver.observe(el)); }, 100);
}

// --- Efeito Typewriter (Estilo Antigravity) ---
// Explicação: Digita o conteúdo de texto gradualmente e exibe cursor piscante ao final.
function typeWriterHTML(element, speed = 45) {
    if (element.dataset.typing === 'true') return;
    element.dataset.typing = 'true';
    const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let n;
    while (n = walk.nextNode()) {
        if (n.nodeValue.trim().length > 0) textNodes.push(n);
    }
    const originalTexts = textNodes.map(node => { const text = node.nodeValue; node.nodeValue = ''; return text; });
    let currentNodeIndex = 0;
    let charIndex = 0;
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    element.appendChild(cursor);
    function type() {
        if (currentNodeIndex < textNodes.length) {
            const node = textNodes[currentNodeIndex];
            const text = originalTexts[currentNodeIndex];
            if (charIndex < text.length) {
                node.nodeValue += text.charAt(charIndex);
                charIndex++;
                node.parentNode.insertBefore(cursor, node.nextSibling);
                setTimeout(type, speed);
            } else {
                currentNodeIndex++; charIndex = 0; type();
            }
        } else {
            cursor.classList.add('blink');
        }
    }
    type();
}

// Observer que ativa o typewriter quando o elemento entra na viewport
// Explicação: Observa elementos revelados e dispara a digitação.
window.hudObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('active');
            const tag = el.tagName.toLowerCase();
            if (['h1', 'h2', 'h3', 'h4', 'p'].includes(tag) || el.classList.contains('brand')) {
                const delayStr = window.getComputedStyle(el).transitionDelay;
                const delayMs = parseFloat(delayStr) * (delayStr.includes('ms') ? 1 : 1000) || 0;
                setTimeout(() => typeWriterHTML(el, 45), delayMs);
            }
            window.hudObserver.unobserve(el);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

// --- Carrossel de Ícones Ondulantes ---
// Explicação: Anima ícones de tecnologias em um movimento sinusoidal contínuo.
function initWaveCarousel() {
    const track = document.getElementById('wave-track');
    if (!track) return;
    track.innerHTML = '';
    const iconUrls = [
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg'
    ];
    const allIcons = [...iconUrls, ...iconUrls, ...iconUrls, ...iconUrls, ...iconUrls];
    const elements = [];
    allIcons.forEach((url, i) => {
        const el = document.createElement('div');
        el.className = 'wave-icon';
        const img = document.createElement('img');
        img.src = url; img.style.width = '30px'; img.style.height = '30px'; img.style.objectFit = 'contain';
        el.appendChild(img); track.appendChild(el);
        const startX = i * 90; elements.push({ el, x: startX }); el.style.transform = `translate(${startX}px, 0px)`;
    });
    let time = 0;
    function animateWave() {
        time += 0.02;
        elements.forEach(item => {
            item.x -= 0.4;
            if (item.x < -90) {
                const max = Math.max(...elements.map(e => e.x));
                item.x = max + 90;
            }
            const y = Math.sin((item.x + time * 100) * 0.015) * 20;
            item.el.style.transform = `translate(${item.x}px, ${y}px)`;
        });
        requestAnimationFrame(animateWave);
    }
    animateWave();
}

// --- Trigger de Glitch Spider-Verse ---
// Explicação: Placeholder para futura implementação de glitch estilo Spider-Verse.
function initSpiderGlitch() {
    return;
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { initSpiderGlitch(); }, 100);
});
