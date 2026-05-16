// --- GitHub API Integration ---
        const GITHUB_USERNAME = 'EnukNogueira';
        const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&order=desc&per_page=100`;
        
        // Custom tags based on the original request
        const PROJECT_TAGS = {
            'math_test': ['Python', 'Gerador Aleatório', 'Lógica'],
            'projeto_skoob_pucpr': ['Python', 'JSON', 'Dados', 'Web Scraping'],
            'projeto_cotacao': ['Python', 'APIs', 'Análise de Dados', 'JSON', 'Automação', 'Financeiro'],
            'estoque-java': ['Java', 'POO', 'Banco de Dados', 'Negócio'],
        };

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

                // Filter out forks and missing descriptions
                const filteredRepos = repos.filter(repo => !repo.fork && repo.description);
                // Get top 6 projects
                const displayRepos = filteredRepos.length > 0 ? filteredRepos.slice(0, 6) : repos.slice(0, 6);
                
                container.innerHTML = displayRepos.map(repo => createProjectCard(repo)).join('');
                    
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
                        <span class="project-tag" style="border-color: rgba(245, 158, 11, 0.4); color: var(--astrophage-glow)">${language}</span>
                    </div>
                    <a href="${repo.html_url}" class="project-link" target="_blank">
                        Ver Projeto
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                </div>
            `;
        }

        // --- Astrophage Particle System Canvas ---
        function initCanvas() {
            const canvas = document.getElementById('astrophage-canvas');
            const ctx = canvas.getContext('2d');
            let width, height;
            let particles = [];

            function resize() {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }

            window.addEventListener('resize', resize);
            resize();

            class Particle {
                constructor() {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    // Varying sizes to simulate depth
                    this.size = Math.random() * 1.5 + 0.5; 
                    // Slow, drifting movement like microorganisms in space
                    this.speedX = (Math.random() * 0.4) - 0.2;
                    this.speedY = (Math.random() * 0.4) - 0.2;
                    this.opacity = Math.random() * 0.5 + 0.1;
                    
                    // Astrophage colors: Amber, Orange, and occasional pure white
                    const colors = ['#f59e0b', '#fbbf24', '#ea580c', '#ffffff'];
                    // Weight probabilities to mostly amber/gold
                    const weights = [5, 4, 2, 1]; 
                    
                    let totalWeight = weights.reduce((a, b) => a + b);
                    let random = Math.random() * totalWeight;
                    for (let i = 0; i < weights.length; i++) {
                        if (random < weights[i]) {
                            this.color = colors[i];
                            break;
                        }
                        random -= weights[i];
                    }
                    
                    // Pulshing logic
                    this.pulseSpeed = Math.random() * 0.02 + 0.01;
                    this.pulseDir = 1;
                }

                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;

                    // Wrap around screen
                    if (this.x > width) this.x = 0;
                    else if (this.x < 0) this.x = width;
                    
                    if (this.y > height) this.y = 0;
                    else if (this.y < 0) this.y = height;

                    // Pulse opacity
                    this.opacity += this.pulseSpeed * this.pulseDir;
                    if (this.opacity > 0.8 || this.opacity < 0.1) {
                        this.pulseDir *= -1;
                    }
                }

                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = this.opacity;
                    ctx.fill();
                    
                    // Add glow for larger particles
                    if (this.size > 1.2) {
                        ctx.shadowBlur = 12;
                        ctx.shadowColor = this.color;
                    } else {
                        ctx.shadowBlur = 0;
                    }
                }
            }

            function initParticles() {
                particles = [];
                // Density responsive to screen size
                const numParticles = Math.floor((width * height) / 12000); 
                for (let i = 0; i < numParticles; i++) {
                    particles.push(new Particle());
                }
            }

            function animate() {
                ctx.clearRect(0, 0, width, height);
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                }
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0; // Reset
                requestAnimationFrame(animate);
            }

            initParticles();
            animate();
            
            // Re-init on significant resize to fix density
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(initParticles, 300);
            });
        }

        // --- UI Sound Effects (Web Audio API) ---
        const SoundManager = {
            ctx: null,
            
            init() {
                const startAudio = () => {
                    if (!this.ctx) {
                        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                    }
                    if (this.ctx.state === 'suspended') {
                        this.ctx.resume();
                    }
                };
                
                // Initialize on first interaction (required by browsers)
                document.addEventListener('click', startAudio, { once: true });
                document.addEventListener('keydown', startAudio, { once: true });
                
                // Event delegation for hover and click
                document.addEventListener('mouseover', (e) => {
                    const target = e.target.closest('.btn, .nav-links a, .social-links a, .project-card, .cert-card, .project-link');
                    if (target && !target.dataset.hovered) {
                        target.dataset.hovered = 'true';
                        this.playHover();
                        target.addEventListener('mouseleave', () => {
                            target.dataset.hovered = '';
                        }, { once: true });
                    }
                });

                document.addEventListener('click', (e) => {
                    const target = e.target.closest('.btn, .nav-links a, .social-links a, .project-card, .cert-card, .project-link');
                    if (target) {
                        this.playClick();
                    }
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
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.1);
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
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.1);
            }
        };

        // Initialize on Load
        document.addEventListener('DOMContentLoaded', () => {
            loadProjects();
            initCanvas();
            SoundManager.init();
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        });
