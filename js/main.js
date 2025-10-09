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
        // repoLink: "#"
    },
    {
        id: 2,
        title: "medyour",
        description: 'A comprehensive Medical Portal designed to streamline healthcare access, offering seamless  and personalized health management for users and corporate employees.',
        technologies: ["Next.js", "Typescript", "MUI", "Tailwind CSS"],
        image: 'images/projects/medyour.png',
        videoUrl: '/videos/med.mp4',
        liveLink: 'https://portal.medyour.com/',
        repoLink: null
    },
    {
        id: 3,
        title: "Siminds",
        description: 'Siminds, a UK-based company, develops cutting-edge virtual reality and simulation solutions.',
        technologies: ["HTML", "CSS", "JavaScript"],
        image: 'images/projects/siminds.png',
        videoUrl: null,
        liveLink: 'https://www.siminds.com/',
        repoLink: "#"
    },
    {
        id: 4,
        title: 'Duroob Al-majd',
        description: 'a customizable Arabic-language dashboard using Next.js (React) and Firebase to manage customer data and dynamic questionnaires, later integrated into a Unity-based game.',
        technologies: ["Next.js", "Typescript", "MUI", "Tailwind CSS", "Firebase"],
        image: 'images/projects/droub.png',
        videoUrl: '/videos/durob.mp4',
        liveLink: 'https://droobalmjd.netlify.app/',
        repoLink: null
    },
    {
        id: 5,
        title: 'Egyptian Robotics & RC Sports Federation',
        description: 'The Federation empowers youth in Robotics, AI, RC Sports, and Unmanned Vehicles.',
        technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
        image: 'images/projects/errcf.png',
        videoUrl: null,
        liveLink: 'https://staging.errcsf.org/',
        repoLink: null
    },
    {
        id: 6,
        title: 'Arcon',
        description: 'Arcon delivers innovative solutions to enhance productivity and growth across sectors.',
        technologies: ["HTML", "Bootstrap", "Next.js"],
        image: 'images/projects/arcon.png',
        videoUrl: null,
        liveLink: 'https://www.arconcorp.com/',
        repoLink: null
    },
    {
        id: 7,
        title: 'Movies App',
        description: 'A movies site offering a vast collection of films with ratings, reviews, and trailers.',
        technologies: ["HTML", "Bootstrap", "React.js"],
        image: 'images/projects/movies.png',
        videoUrl: null,
        liveLink: 'https://cimaforu.netlify.app/',
        repoLink: null
    },
    {
        id: 8,
        title: 'E-Commerce Site',
        description: 'An e-commerce site with a user-friendly experience.',
        technologies: ["HTML", "Bootstrap", "React.js"],
        image: 'images/projects/market.png',
        videoUrl: null,
        liveLink: 'https://marketoz.netlify.app/',
        repoLink: null
    },
];

// 2. GET DOM ELEMENTS
const projectsGrid = document.getElementById('projects-grid');
const filterButtonsContainer = document.getElementById('filter-buttons');
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close-btn');

// 3. RENDER PROJECTS AND FILTERS
function displayProjects(filter = 'All') {
    // Clear existing grid
    projectsGrid.innerHTML = '';

    // Filter projects
    const filteredProjects = filter === 'All'
        ? projectsData
        : projectsData.filter(p => p.technologies.includes(filter));

    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `<p class="text-gray-400 text-center md:col-span-2 lg:col-span-3">No projects found for this technology.</p>`;
        return;
    }

    // Create and append project cards
    filteredProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = "bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer";
        card.innerHTML = `
                    <div class="aspect-video bg-black overflow-hidden">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                        <p class="text-gray-400 text-sm mb-4 line-clamp-2">${project.description}</p>
                        <div class="mt-auto pt-4 border-t border-gray-700">
                             <p class="text-xs text-blue-300 font-semibold">${project.technologies.join(' • ')}</p>
                        </div>
                    </div>
                `;
        // Add click event to open modal
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
            // Update active button style
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Filter projects
            displayProjects(tech);
        });
        filterButtonsContainer.appendChild(button);
    });
}

// 4. MODAL LOGIC
function openModal(project) {
    // Build modal content
    const mediaElement = project.videoUrl
        ? `<iframe class="w-full h-full" src="${project.videoUrl}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        : `<img src="${project.image}" alt="${project.title}" class="w-full h-full object-contain">`;

    const liveLinkButton = project.liveLink
        ? `<a href="${project.liveLink}" target="_blank" class="text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"><i class="fas fa-external-link-alt mr-2"></i>Live Demo</a>`
        : '';

    const repoLinkButton = project.repoLink
        ? `<a href="${project.repoLink}" target="_blank" class="text-gray-300 border border-gray-600 hover:bg-gray-700 transition-colors duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"><i class="fab fa-github mr-2"></i>Source Code</a>`
        : '';


    modalContent.innerHTML = `
                <div class="w-full aspect-video bg-black rounded-t-xl overflow-hidden">
                    ${mediaElement}
                </div>
                <div class="p-8 overflow-y-auto">
                    <h2 class="text-3xl font-bold mb-2">${project.title}</h2>
                    <div class="flex flex-wrap gap-2 my-4">
                        ${project.technologies.map(tech => `<span class="bg-gray-700 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">${tech}</span>`).join('')}
                    </div>
                    <p class="text-gray-300 leading-relaxed mb-6">${project.description}</p>
                    <div class="flex items-center gap-4">
                        ${liveLinkButton}
                        ${repoLinkButton}
                    </div>
                </div>
            `;

    // Show modal
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    // Stop video from playing in the background
    modalContent.innerHTML = '';
}

// 5. EVENT LISTENERS
modalCloseBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    // Close modal if user clicks on the background overlay
    if (e.target === modal) {
        closeModal();
    }
});



document.addEventListener('DOMContentLoaded', () => {
    type();
    displayFilterButtons();
    displayProjects();
    initializeSkillsSlider(); // <-- Replace setupInfiniteScroll() with this
});



/*
=================================================
SKILLS SLIDER LOGIC (REDESIGNED)
=================================================
*/

// Define all your skills in one array
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
    // { name: 'Express', icon: 'express' },
    // { name: 'MongoDB', icon: 'mongodb' },
    { name: 'Firebase', icon: 'firebase' },
    { name: 'Git', icon: 'git' },
    { name: 'GitHub', icon: 'github' },
    { name: 'VS Code', icon: 'vscode' },
    { name: 'Figma', icon: 'figma' },
    { name: 'Postman', icon: 'postman' },
    { name: 'Vercel', icon: 'vercel' },
];

function initializeSkillsSlider() {
    const track = document.getElementById('skills-track');
    if (!track) return;

    // 1. Populate the track with slides
    const slidesHtml = allSkills.map(skill => `
        <div class="skill-slide">
            <div class="skill-slide-content">
                <img src="https://skillicons.dev/icons?i=${skill.icon}" alt="${skill.name} Icon ">
            </div>
        </div>
    `).join('');

    // Create an "infinite" loop by duplicating the slides
    track.innerHTML = slidesHtml + slidesHtml;

    // 2. Slider Logic
    const sliderContainer = document.getElementById('skills-slider-container');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    let animationId;
    let currentPosition = 0;
    const speed = 1; // Speed in pixels per frame

    function animate() {
        currentPosition -= speed;
        // If the first set of slides has scrolled completely out of view, reset to the beginning
        if (Math.abs(currentPosition) >= track.scrollWidth / 2) {
            currentPosition = 0;
        }
        track.style.transform = `translateX(${currentPosition}px)`;
        animationId = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (!animationId) {
            animationId = requestAnimationFrame(animate);
        }
    }

    function stopAnimation() {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    // Manual navigation
    nextBtn.addEventListener('click', () => {
        currentPosition -= 200; // Jump 200px
    });

    prevBtn.addEventListener('click', () => {
        currentPosition += 200; // Jump 200px
        if (currentPosition > 0) currentPosition = 0; // Prevent scrolling too far left
    });

    // Pause on hover
    sliderContainer.addEventListener('mouseenter', stopAnimation);
    sliderContainer.addEventListener('mouseleave', startAnimation);

    // Start the animation
    startAnimation();
}
