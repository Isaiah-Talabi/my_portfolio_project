const projectsData = [
    {
        title: "AgriTech Dashboard",
        description: "A comprehensive farming management system engineered explicitly for small-scale farmers mapping analytical organic metrics.",
        tech: ["HTML", "CSS", "JavaScript"],
        category: "Web Apps",
        status: "In Development",
        icon: "🌾"
    },
    {
        title: "BookHaven Finder",
        description: "An advanced specialized library discovery app designed to hunt and locate historical and rare print literature books globally.",
        tech: ["HTML", "CSS", "JavaScript"],
        category: "Mobile",
        status: "Completed",
        icon: "📖"
    },
    {
        title: "Garden Planner Pro",
        description: "A clean digital space design matrix tracking micro-soil structures for systematic urban landscape agriculture planners.",
        tech: ["HTML", "CSS", "JavaScript"],
        category: "Design",
        status: "In Progress",
        icon: "🌱"
    },
    {
        title: "StudyBuddy",
        description: "A continuous academic scheduler helping university students streamline workflows and align semester milestones cleanly.",
        tech: ["HTML", "CSS", "JavaScript"],
        category: "Web Apps",
        status: "Planning",
        icon: "📚"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projectsGrid');
    const search = document.getElementById('searchBar');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!grid) return;

    let activeFilter = 'All';
    let searchQuery = '';

    function renderProjects() {
        grid.innerHTML = '';
        const filtered = projectsData.filter(p => {
            const matchesFilter = activeFilter === 'All' || p.category === activeFilter;
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; opacity: 0.7;">No project instances align with the active query parameters.</div>`;
            return;
        }

        filtered.forEach(p => {
            const card = document.createElement('article');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-img">${p.icon}</div>
                <div class="project-info">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                            <h3>${p.title}</h3>
                            <span class="status-badge" style="font-size:0.75rem;">${p.status}</span>
                        </div>
                        <p style="margin-top:10px; font-size:0.95rem; opacity:0.8;">${p.description}</p>
                    </div>
                    <div>
                        <div class="project-tags">
                            ${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>
                        <button class="btn btn-secondary btn-details" style="width:100%; padding:8px 0; font-size:0.9rem;">View Details</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        document.querySelectorAll('.btn-details').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast("Simulating details viewing framework. Terminal dynamic details active.", true);
            });
        });
    }

    if (search) {
        search.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderProjects();
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            renderProjects();
        });
    });

    renderProjects();
});