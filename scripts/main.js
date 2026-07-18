document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initLeaves();
    initBackToTop();
    initTypingEffect();
    initSkillAnimation();
    initCustomAudio();
});

function showToast(message, isSuccess = true) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = message;
    toast.style.background = isSuccess ? 'var(--forest-green)' : '#c0392b';
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function initTheme() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    toggleBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggleBtn.innerText = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

function initMobileNav() {
    const toggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        toggle.innerText = sidebar.classList.contains('active') ? '✕' : '☰';
    });

    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== toggle) {
            sidebar.classList.remove('active');
            toggle.innerText = '☰';
        }
    });
}

function initLeaves() {
    const container = document.getElementById('leavesContainer');
    if (!container) return;
    const leafEmojis = ['🍂', '🍃', '🌿', '🌱'];
    const leafCount = 15;

    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.innerText = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        leaf.style.left = `${Math.random() * 100}%`;
        leaf.style.animationDuration = `${Math.random() * 8 + 6}s`;
        leaf.style.animationDelay = `${Math.random() * 5}s`;
        leaf.style.fontSize = `${Math.random() * 1 + 1}rem`;
        container.appendChild(leaf);
    }
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initTypingEffect() {
    const target = document.getElementById('typingText');
    if (!target) return;
    const phrasing = "First-year Computer Science Student at Miva Open University";
    let index = 0;

    function type() {
        if (index < phrasing.length) {
            target.innerHTML += phrasing.charAt(index);
            index++;
            setTimeout(type, 60);
        }
    }
    setTimeout(type, 500);
}

function initSkillAnimation() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (bars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetFill = entry.target.getAttribute('data-progress');
                entry.target.style.width = targetFill;
            }
        });
    }, { threshold: 0.1 });

    bars.forEach(bar => observer.observe(bar));
}

function initCustomAudio() {
    const audio = document.getElementById('mainAudio');
    const btn = document.getElementById('audioBtn');
    const progress = document.getElementById('audioProgress');
    const progressBar = document.getElementById('audioProgressBar');

    if (!audio || !btn || !progress || !progressBar) return;

    btn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(() => {
                showToast("Audio playback simulated for local environment demonstration.", true);
                progressBar.style.width = '100%';
                btn.innerText = '⏸';
            });
            btn.innerText = '⏸';
        } else {
            audio.pause();
            btn.innerText = '▶';
        }
    });

    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percent}%`;
    });

    audio.addEventListener('ended', () => {
        btn.innerText = '▶';
        progressBar.style.width = '0%';
    });

    progress.addEventListener('click', (e) => {
        const rect = progress.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        audio.currentTime = (clickX / width) * audio.duration;
    });
}