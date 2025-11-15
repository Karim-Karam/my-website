// 1. DEFINE YOUR PROJECTS DATA
const projectsData = [
    {
        id: 1,
        title: 'Labs for Home',
        description: 'LMS Portal designed for seamless course management, user engagement, and efficient learning.',
        technologies: ["Next.js", "Typescript", "MUI"],
        image: 'images/projects/lmsportal.png',
        videoUrl: '/videos/lms-demo.mp4',
        liveLink: 'https://lms.siminds.net/',
    },
    {
        id: 2,
        title: "medyour portal",
        description: 'A comprehensive Medical Portal designed to streamline healthcare access, offering seamless and personalized health management for users and corporate employees.',
        technologies: ["Next.js", "Typescript", "MUI", "Tailwind CSS"],
        image: 'images/projects/medyour.png',
        videoUrl: '/videos/med.mp4',
        liveLink: 'https://portal.medyour.com/',
        repoLink: null
    },
    {
        id: 3,
        title: "Apple Website Clone",
        description: 'A responsive clone of the Apple website, replicating its design and functionality using React, GSAP, and Three js.',
        technologies: ["React.js", "GSAP", "Three.js"],
        image: 'images/projects/apple.png',
        videoUrl: null,
        liveLink: 'https://apple-five-mu.vercel.app/',
        repoLink: "https://github.com/Karim-Karam/apple-website"
    },
    {
        id: 4,
        title: 'medyour Website',
        description: "A clean, responsive, and multi-language corporate website for Medyour, built using HTML, Tailwind CSS, and JavaScript. The site effectively showcases the company's services and provides key information to visitors.",
        technologies: ["HTML", "Tailwind CSS", "JavaScript"],
        image: 'images/projects/medyourWebsite.png',
        videoUrl: null,
        liveLink: 'https://www.medyour.com/',
        repoLink: null
    },
    {
        id: 5,
        title: 'Duroob Al-majd',
        description: 'a customizable Arabic-language dashboard using Next.js (React) and Firebase to manage customer data and dynamic questionnaires, later integrated into a Unity-based game.',
        technologies: ["Next.js", "Typescript", "MUI", "Tailwind CSS", "Firebase"],
        image: 'images/projects/droub.png',
        videoUrl: '/videos/durob.mp4',
        liveLink: 'https://droobalmjd.netlify.app/',
        repoLink: null
    },
    {
        id: 6,
        title: "Siminds",
        description: 'Siminds, a UK-based company, develops cutting-edge virtual reality and simulation solutions.',
        technologies: ["HTML", "CSS", "JavaScript"],
        image: 'images/projects/siminds.png',
        videoUrl: null,
        liveLink: 'https://www.siminds.com/',
        repoLink: "#"
    },
    {
        id: 7,
        title: 'Arcon',
        description: 'Arcon delivers innovative solutions to enhance productivity and growth across sectors.',
        technologies: ["Bootstrap", "Next.js"],
        image: 'images/projects/arcon.png',
        videoUrl: null,
        liveLink: 'https://www.arconcorp.com/',
        repoLink: null
    },
    {
        id: 8,
        title: 'Movies App',
        description: 'A movies site offering a vast collection of films with ratings, reviews, and trailers.',
        technologies: ["Bootstrap", "React.js"],
        image: 'images/projects/movies.png',
        videoUrl: null,
        liveLink: 'https://cimaforu.netlify.app/',
        repoLink: null
    },
    {
        id: 9,
        title: 'E-Commerce Site',
        description: 'An e-commerce site with a user-friendly experience.',
        technologies: ["Bootstrap", "React.js"],
        image: 'images/projects/market.png',
        videoUrl: null,
        liveLink: 'https://marketoz.netlify.app/',
        repoLink: null
    },
];

// Technology to icon mapping
const techIcons = {
    'Next.js': 'nextjs',
    'Typescript': 'ts',
    'MUI': 'materialui',
    'Tailwind CSS': 'tailwind',
    'React.js': 'react',
    'GSAP': "/images/gsap.svg",
    'Three.js': 'threejs',
    'Firebase': 'firebase',
    'HTML': 'html',
    'CSS': 'css',
    'JavaScript': 'js',
    'Bootstrap': 'bootstrap'
};

// 2. GET DOM ELEMENTS
const projectsGrid = document.getElementById('projects-grid');
const filterButtonsContainer = document.getElementById('filter-buttons');
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close-btn');

// 3. RENDER PROJECTS AND FILTERS
function displayProjects(filter = 'All') {
    projectsGrid.innerHTML = '';

    const filteredProjects = filter === 'All'
        ? projectsData
        : projectsData.filter(p => p.technologies.includes(filter));

    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `<p class="text-gray-400 text-center md:col-span-2 lg:col-span-3">No projects found for this technology.</p>`;
        return;
    }

    filteredProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = "bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group relative";

        // Create tech icons HTML
        const techIconsHtml = project.technologies.map(tech => {
            // 1. Get the identifier from your map. Default to 'js' if not found.
            const iconIdentifier = techIcons[tech] || 'js';

            // 2. Check if it's a file path or a skillicons slug
            const isFilePath = iconIdentifier.includes('.'); // e.g., 'gsap.svg'

            // 3. Determine the final src URL
            const src = isFilePath
                ? iconIdentifier // Use the path directly (e.g., "gsap.svg")
                : `https://skillicons.dev/icons?i=${iconIdentifier}`; // Build the skillicons URL

            console.log(src);

            // 4. Return the HTML template ONCE
            return `
        <div class="relative group/icon">
            <img src="${src}" 
                 alt="${tech}" 
                 class="w-6 h-6 transition-transform hover:scale-120"
                 title="${tech}">
        </div>
    `;
        }).join('');

        card.innerHTML = `
            <div class="aspect-video bg-black overflow-hidden relative">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                    <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                        <span class="text-white text-sm font-semibold bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2">
                            <i class="fas fa-eye"></i>
                            View Project
                        </span>
                    </div>
                </div>
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                <p class="text-gray-400 text-sm mb-4 line-clamp-2">${project.description}</p>
                <div class="mt-auto pt-2 border-t border-gray-700">
                    <div class="flex gap-2 flex-wrap">
                        ${techIconsHtml}
                    </div>
                </div>
            </div>
        `;

        card.addEventListener('click', () => openModal(project));
        projectsGrid.appendChild(card);
    });
}

function displayFilterButtons() {
    const allTechs = ['All', ...new Set(projectsData.flatMap(p => p.technologies))];

    allTechs.forEach(tech => {
        const button = document.createElement('button');
        button.className = "filter-btn border-2 border-gray-600 text-gray-300 px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-gray-700";
        button.textContent = tech;
        if (tech === 'All') {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayProjects(tech);
        });
        filterButtonsContainer.appendChild(button);
    });
}

// 4. MODAL LOGIC
function openModal(project) {
    const mediaElement = project.videoUrl
        ? `<iframe class="w-full h-full" src="${project.videoUrl}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        : `<img src="${project.image}" alt="${project.title}" class="w-full h-full object-contain">`;

    const liveLinkButton = project.liveLink
        ? `<a href="${project.liveLink}" target="_blank" class="text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"><i class="fas fa-external-link-alt mr-2"></i>Live Demo</a>`
        : '';

    const repoLinkButton = project.repoLink
        ? `<a href="${project.repoLink}" target="_blank" class="text-gray-300 border border-gray-600 hover:bg-gray-700 transition-colors duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"><i class="fab fa-github mr-2"></i>Source Code</a>`
        : '';

    const techIconsHtml = project.technologies.map(tech => {
        const iconName = techIcons[tech] || 'js';
        return `
            <div class="flex items-center gap-2 bg-gray-700 text-blue-300 px-3 py-2 rounded-full">
                <img src="${iconName == "/images/gsap.svg" ? "/images/gsap.svg" : `https://skillicons.dev/icons?i=${iconName}`}" alt="${tech}" class="w-5 h-5">
                <span class="text-xs font-semibold">${tech}</span>
            </div>
        `;
    }).join('');

    modalContent.innerHTML = `
        <!-- Close Button -->
        <button class="absolute top-4 right-4 z-50 text-gray-400 hover:text-white transition-colors duration-300 bg-gray-800 hover:bg-gray-700 rounded-full p-2 w-10 h-10 flex items-center justify-center" onclick="closeModal()">
            <i class="fas fa-times text-xl"></i>
        </button>
        
        <!-- Media Section -->
        <div class="w-full aspect-video bg-black rounded-t-xl overflow-hidden">
            ${mediaElement}
        </div>
        
        <!-- Content Section - No Scrolling -->
        <div class="p-6">
            <h2 class="text-3xl font-bold mb-4 text-white">${project.title}</h2>
            
            <div class="flex flex-wrap gap-2 mb-4">
                ${techIconsHtml}
            </div>
            
            <p class="text-gray-300 leading-relaxed mb-6 text-base">${project.description}</p>
            
            <div class="flex items-center gap-4 flex-wrap">
                ${liveLinkButton}
                ${repoLinkButton}
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    modalContent.innerHTML = '';
}

// 5. EVENT LISTENERS
modalCloseBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    displayFilterButtons();
    displayProjects();
    initializeSkillsSlider();
});

/*
=================================================
SKILLS SLIDER LOGIC WITH DRAG FUNCTIONALITY
=================================================
*/

const allSkills = [
    { name: 'HTML5', icon: 'html' },
    { name: 'CSS3', icon: 'css' },
    { name: 'JavaScript', icon: 'js' },
    { name: 'TypeScript', icon: 'ts' },
    { name: 'React', icon: 'react' },
    { name: 'Next.js', icon: 'nextjs' },
    { name: 'Redux', icon: 'redux' },
    { name: 'Tailwind CSS', icon: 'tailwind' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'Firebase', icon: 'firebase' },
    { name: 'Git', icon: 'git' },
    { name: 'GitHub', icon: 'github' },
    { name: 'VS Code', icon: 'vscode' },
    { name: 'Figma', icon: 'figma' },
    { name: 'Postman', icon: 'postman' },
    { name: 'threejs', icon: 'threejs' },
    { name: 'Vercel', icon: 'vercel' },
    { name: 'gsap', icon: '/images/gsap.svg' },
];

function initializeSkillsSlider() {
    const track = document.getElementById('skills-track');
    if (!track) return;

    // Populate the track with slides
    const slidesHtml = allSkills.map(skill => {
        const iconIdentifier = skill.icon;

        // Check if it's a file path (like /images/gsap.svg) or a slug
        const isFilePath = iconIdentifier.includes('/') || iconIdentifier.includes('.');

        // Determine the final src URL
        const src = isFilePath
            ? iconIdentifier // Use the path directly (e.g., "/images/gsap.svg")
            : `https://skillicons.dev/icons?i=${iconIdentifier}`; // Build the skillicons URL

        return `
            <div class="skill-slide">
                <div class="skill-slide-content">
                    <img src="${src}" alt="${skill.name} Icon">
                </div>
            </div>
        `;
    }).join('');

    track.innerHTML = slidesHtml + slidesHtml; // Duplicating for infinite scroll

    // --- All the rest of your slider logic remains exactly the same ---
    const sliderContainer = document.getElementById('skills-slider-container');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    let animationId;
    let currentPosition = 0;
    const speed = 2;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationPaused = false;

    function animate() {
        if (!animationPaused && !isDragging) {
            currentPosition -= speed;
            if (Math.abs(currentPosition) >= track.scrollWidth / 2) {
                currentPosition = 0;
            }
            track.style.transform = `translateX(${currentPosition}px)`;
        }
        animationId = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (!animationId) {
            animationId = requestAnimationFrame(animate);
        }
    }

    function stopAnimation() {
        animationPaused = true;
    }

    function resumeAnimation() {
        animationPaused = false;
    }

    // Manual navigation
    nextBtn.addEventListener('click', () => {
        currentPosition -= 200;
    });

    prevBtn.addEventListener('click', () => {
        currentPosition += 200;
        if (currentPosition > 0) currentPosition = 0;
    });

    // Drag functionality
    function touchStart(e) {
        isDragging = true;
        startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        prevTranslate = currentPosition;
        stopAnimation();
        track.style.cursor = 'grabbing';
    }

    function touchMove(e) {
        if (!isDragging) return;
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        currentTranslate = prevTranslate + currentX - startPos;
        currentPosition = currentTranslate;
        track.style.transform = `translateX(${currentPosition}px)`;
    }

    function touchEnd() {
        isDragging = false;
        track.style.cursor = 'grab';

        // Ensure we stay within bounds
        if (Math.abs(currentPosition) >= track.scrollWidth / 2) {
            currentPosition = 0;
        }
        if (currentPosition > 0) {
            currentPosition = -(track.scrollWidth / 2) + currentPosition;
        }

        resumeAnimation();
    }

    // Mouse events
    track.addEventListener('mousedown', touchStart);
    track.addEventListener('mousemove', touchMove);
    track.addEventListener('mouseup', touchEnd);
    track.addEventListener('mouseleave', touchEnd);

    // Touch events
    track.addEventListener('touchstart', touchStart);
    track.addEventListener('touchmove', touchMove);
    track.addEventListener('touchend', touchEnd);

    // Prevent default drag behavior
    track.addEventListener('dragstart', (e) => e.preventDefault());

    // Pause on hover
    sliderContainer.addEventListener('mouseenter', stopAnimation);
    sliderContainer.addEventListener('mouseleave', () => {
        if (!isDragging) resumeAnimation();
    });

    // Set cursor style
    track.style.cursor = 'grab';

    // Start the animation
    startAnimation();
}

