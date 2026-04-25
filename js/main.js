// 1. DEFINE YOUR PROJECTS DATA
const projectsData = [
  {
    id: 1,
    title: "LXERA App",
    description:
      "I developed LXERA from scratch using Expo (React Native) and successfully deployed it to Google Play, Apple App Store, and Huawei AppGallery.",
    technologies: ["React Native", "Expo", "JavaScript"],
    image: "images/projects/lxeraApp/EN1.png",
    gallery: [
      "images/projects/lxeraApp/EN1.png",
      "images/projects/lxeraApp/EN2.png",
      "images/projects/lxeraApp/EN3.png",
      "images/projects/lxeraApp/EN4.png",
      "images/projects/lxeraApp/EN5.png",
      "images/projects/lxeraApp/EN6.png",
    ],
    storeLinks: {
      playStore: "https://play.google.com/store/search?q=lxera&c=apps",
      appStore: "https://apps.apple.com/us/search?term=lxera",
      appGallery: "https://appgallery.huawei.com/app/C117492299",
    },
    isMobileApp: true,
    videoUrl: null,
    liveLink: null,
    repoLink: null,
  },
  {
    id: 2,
    title: "Labs for Home",
    description:
      "LMS Portal designed for seamless course management, user engagement, and efficient learning.",
    technologies: ["Next.js", "Typescript", "MUI"],
    image: "images/projects/lmsportal.png",
    videoUrl: "/videos/lms-demo.mp4",
    liveLink: "https://lms.siminds.net/",
  },
  {
    id: 3,
    title: "medyour portal",
    description:
      "A comprehensive Medical Portal designed to streamline healthcare access, offering seamless and personalized health management for users and corporate employees.",
    technologies: ["Next.js", "Typescript", "MUI", "Tailwind CSS"],
    image: "images/projects/medyour.png",
    videoUrl: "/videos/med.mp4",
    liveLink: "https://portal.medyour.com/",
    repoLink: null,
  },
  {
    id: 4,
    title: "Apple Website Clone",
    description:
      "A responsive clone of the Apple website, replicating its design and functionality using React, GSAP, and Three js.",
    technologies: ["React.js", "GSAP", "Three.js"],
    image: "images/projects/apple.png",
    videoUrl: null,
    liveLink: "https://apple-five-mu.vercel.app/",
    repoLink: "https://github.com/Karim-Karam/apple-website",
  },
  {
    id: 5,
    title: "medyour Website",
    description:
      "A clean, responsive, and multi-language corporate website for Medyour, built using HTML, Tailwind CSS, and JavaScript. The site effectively showcases the company's services and provides key information to visitors.",
    technologies: ["HTML", "Tailwind CSS", "JavaScript"],
    image: "images/projects/medyourWebsite.png",
    videoUrl: null,
    liveLink: "https://www.medyour.com/",
    repoLink: null,
  },
  {
    id: 6,
    title: "Duroob Al-majd",
    description:
      "a customizable Arabic-language dashboard using Next.js (React) and Firebase to manage customer data and dynamic questionnaires, later integrated into a Unity-based game.",
    technologies: ["Next.js", "Typescript", "MUI", "Tailwind CSS", "Firebase"],
    image: "images/projects/droub.png",
    videoUrl: "/videos/durob.mp4",
    liveLink: "https://droobalmjd.netlify.app/",
    repoLink: null,
  },
  {
    id: 7,
    title: "Siminds",
    description:
      "Siminds, a UK-based company, develops cutting-edge virtual reality and simulation solutions.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "images/projects/siminds.png",
    videoUrl: null,
    liveLink: "https://www.siminds.com/",
    repoLink: "#",
  },
  {
    id: 8,
    title: "Arcon",
    description:
      "Arcon delivers innovative solutions to enhance productivity and growth across sectors.",
    technologies: ["Bootstrap", "Next.js"],
    image: "images/projects/arcon.png",
    videoUrl: null,
    liveLink: "https://www.arconcorp.com/",
    repoLink: null,
  },
  {
    id: 9,
    title: "Movies App",
    description:
      "A movies site offering a vast collection of films with ratings, reviews, and trailers.",
    technologies: ["Bootstrap", "React.js"],
    image: "images/projects/movies.png",
    videoUrl: null,
    liveLink: "https://cimaforu.netlify.app/",
    repoLink: null,
  },
  {
    id: 10,
    title: "E-Commerce Site",
    description: "An e-commerce site with a user-friendly experience.",
    technologies: ["Bootstrap", "React.js"],
    image: "images/projects/market.png",
    videoUrl: null,
    liveLink: "https://marketoz.netlify.app/",
    repoLink: null,
  },
];

// Technology to icon mapping
const techIcons = {
  "Next.js": "nextjs",
  Typescript: "ts",
  MUI: "materialui",
  "Tailwind CSS": "tailwind",
  "React.js": "react",
  "React Native": "react",
  Expo: "https://cdn.simpleicons.org/expo/ffffff",
  GSAP: "/images/gsap.svg",
  "Three.js": "threejs",
  Firebase: "firebase",
  HTML: "html",
  CSS: "css",
  JavaScript: "js",
  Bootstrap: "bootstrap",
};

// 2. GET DOM ELEMENTS
const projectsGrid = document.getElementById("projects-grid");
const filterButtonsContainer = document.getElementById("filter-buttons");
const modal = document.getElementById("project-modal");
const modalContent = document.getElementById("modal-content");
const modalCloseBtn = document.getElementById("modal-close-btn");
let modalGallery = [];
let modalGalleryIndex = 0;

// 3. RENDER PROJECTS AND FILTERS
function displayProjects(filter = "All") {
  projectsGrid.innerHTML = "";

  const filteredProjects =
    filter === "All"
      ? projectsData
      : projectsData.filter((p) => p.technologies.includes(filter));

  if (filteredProjects.length === 0) {
    projectsGrid.innerHTML = `<p class="text-gray-400 text-center md:col-span-2 lg:col-span-3">No projects found for this technology.</p>`;
    return;
  }

  filteredProjects.forEach((project) => {
    const card = document.createElement("div");
    card.className =
      "bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col min-h-[520px] transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group relative";
    const isMobileApp = Boolean(project.isMobileApp);

    // Create tech icons HTML
    const techIconsHtml = project.technologies
      .map((tech) => {
        // 1. Get the identifier from your map. Default to 'js' if not found.
        const iconIdentifier = techIcons[tech] || "js";

        // 2. Check if it's a file path or a skillicons slug
        const isFilePath = iconIdentifier.includes("."); // e.g., 'gsap.svg'

        // 3. Determine the final src URL
        const src = isFilePath
          ? iconIdentifier // Use the path directly (e.g., "gsap.svg")
          : `https://skillicons.dev/icons?i=${iconIdentifier}`; // Build the skillicons URL

        // 4. Return the HTML template ONCE
        return `
        <div class="relative group/icon">
            <img src="${src}" 
                 alt="${tech}" 
                 class="w-6 h-6 transition-transform hover:scale-120"
                 title="${tech}">
        </div>
    `;
      })
      .join("");

    const projectMediaHtml = isMobileApp
      ? `
        <div class="flex-1 min-h-[320px] bg-gradient-to-br from-gray-900 via-black to-blue-950/60 overflow-hidden relative py-4 px-3">
          <div class="absolute -inset-10 bg-blue-600/10 blur-3xl"></div>
          <div class="relative h-full flex items-center justify-center">
            <div class="absolute h-[80%] w-[32%] bg-black border-[4px] border-gray-800 rounded-[2rem] shadow-xl overflow-hidden -translate-x-16 rotate-[-8deg] opacity-70 group-hover:opacity-90 transition-all duration-500">
              <img src="${project.gallery?.[1] || project.image}" alt="${project.title} preview left" class="w-full h-full object-cover">
            </div>
            <div class="absolute h-[88%] w-[36%] bg-black border-[4px] border-blue-500/40 rounded-[2rem] shadow-2xl overflow-hidden z-10 group-hover:scale-105 transition-all duration-500">
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-2 bg-gray-800 rounded-b-xl z-10  sm:block"></div>
              <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
            </div>
            <div class="absolute h-[80%] w-[32%] bg-black border-[4px] border-gray-800 rounded-[2rem] shadow-xl overflow-hidden translate-x-16 rotate-[8deg] opacity-70 group-hover:opacity-90 transition-all duration-500">
              <img src="${project.gallery?.[2] || project.image}" alt="${project.title} preview right" class="w-full h-full object-cover">
            </div>
                </div>
                <div class="absolute top-3 left-3 flex items-center justify-center bg-blue-600/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full shadow-lg z-10">
                    <i class="fas fa-mobile-alt mr-1.5 text-[11px]"></i> App
                </div>
                <div class="absolute bottom-3 left-3 flex items-center justify-center gap-1.5 bg-black/70 backdrop-blur-sm text-gray-100 text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full shadow-lg z-10 border border-gray-700">
                  <img src="https://cdn.simpleicons.org/expo/ffffff" alt="Expo" class="w-3.5 h-3.5 rounded-sm" />
                  Expo
                </div>
                <div class="absolute top-3 right-3 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm text-gray-200 text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full shadow-lg z-10">
                    ${project.gallery?.length || 1} <span class="ml-1 opacity-70">Screens</span>
                </div>
                <div class="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/80 transition-all duration-300 flex items-center justify-center backdrop-blur-[0px] group-hover:backdrop-blur-[2px] z-20">
                    <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <span class="text-white text-sm font-semibold bg-blue-600 shadow-xl px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-blue-500 transition-colors">
                            <i class="fas fa-play text-xs"></i>
                            View Flow
                        </span>
                    </div>
                </div>
            </div>
            `
      : `
          <div class="flex-1 min-h-[320px] bg-black overflow-hidden relative">
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
            `;

    card.innerHTML = `
            ${projectMediaHtml}
        <div class="p-6 flex flex-col">
                <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                <p class="text-gray-400 text-sm mb-4 line-clamp-2">${project.description}</p>
                <div class="mt-auto pt-2 border-t border-gray-700">
                    <div class="flex gap-2 flex-wrap">
                        ${techIconsHtml}
                    </div>
                </div>
            </div>
        `;

    card.addEventListener("click", () => openModal(project));
    projectsGrid.appendChild(card);
  });

  animateProjectCardsOnScroll();
}

function displayFilterButtons() {
  const allTechs = [
    "All",
    ...new Set(projectsData.flatMap((p) => p.technologies)),
  ];

  allTechs.forEach((tech) => {
    const button = document.createElement("button");
    button.className =
      "filter-btn border-2 border-gray-600 text-gray-300 px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-gray-700";
    button.textContent = tech;
    if (tech === "All") {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      displayProjects(tech);
    });
    filterButtonsContainer.appendChild(button);
  });
}

function setModalGalleryImage(index) {
  if (!modalGallery.length || index < 0 || index >= modalGallery.length) return;

  modalGalleryIndex = index;
  const mainImage = document.getElementById("modal-gallery-main");
  const blurImage = document.getElementById("modal-gallery-blur");

  if (mainImage) {
    mainImage.classList.add("opacity-0");
    if (blurImage) blurImage.classList.add("opacity-0");

    setTimeout(() => {
      mainImage.src = modalGallery[index];
      if (blurImage) blurImage.src = modalGallery[index];

      mainImage.classList.remove("opacity-0");
      if (blurImage) blurImage.classList.remove("opacity-0");
    }, 150);
  }

  const thumbButtons = document.querySelectorAll("[data-gallery-index]");
  thumbButtons.forEach((button) => {
    const buttonIndex = Number(button.dataset.galleryIndex);
    if (buttonIndex === modalGalleryIndex) {
      button.classList.add(
        "ring-2",
        "ring-blue-500",
        "opacity-100",
        "scale-105",
        "z-10",
      );
      button.classList.remove("opacity-60", "opacity-70");
    } else {
      button.classList.remove(
        "ring-2",
        "ring-blue-500",
        "opacity-100",
        "scale-105",
        "z-10",
      );
      button.classList.add("opacity-60");
    }
  });
}

// 4. MODAL LOGIC
function openModal(project) {
  const isMobileGallery = Boolean(
    project.isMobileApp && project.gallery?.length,
  );
  let mediaElement = "";

  if (project.videoUrl) {
    mediaElement = `<iframe class="w-full h-full" src="${project.videoUrl}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else if (project.gallery?.length) {
    if (isMobileGallery) {
      mediaElement = `
            <div class="w-full h-full bg-gradient-to-br from-gray-900 via-black to-blue-950/50 p-3 sm:p-4 flex flex-col">
                <div class="flex-1 flex items-center justify-center overflow-hidden relative">
                    <div class="absolute -inset-8 bg-blue-600/10 blur-3xl"></div>

                    <div class="absolute h-[82%] w-[150px] bg-black border-[4px] border-gray-800 rounded-[2rem] shadow-xl overflow-hidden -translate-x-16 rotate-[-8deg] opacity-70">
                      <img src="${project.gallery[1] || project.gallery[0]}" alt="${project.title} preview left" class="w-full h-full object-cover" aria-hidden="true">
                    </div>

                    <div class="relative h-[90%] w-[150px] bg-black border-[4px] border-blue-500/40 rounded-[2rem] shadow-2xl overflow-hidden z-10">
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-2 bg-gray-800 rounded-b-xl z-10  sm:block"></div>
                        <img id="modal-gallery-main" src="${project.gallery[0]}" alt="${project.title}" class="w-full h-full object-cover transition-opacity duration-300">
                    </div>

                    <div class="absolute h-[82%] w-[150px] bg-black border-[4px] border-gray-800 rounded-[2rem] shadow-xl overflow-hidden translate-x-16 rotate-[8deg] opacity-70">
                      <img src="${project.gallery[2] || project.gallery[0]}" alt="${project.title} preview right" class="w-full h-full object-cover" aria-hidden="true">
                    </div>
                </div>
                <div class="mt-3 flex gap-2 overflow-x-auto justify-center pb-1">
                    ${project.gallery
                      .map(
                        (img, index) => `
                        <button type="button" data-gallery-index="${index}" class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg border border-gray-600 overflow-hidden transition-all duration-200 ${index === 0 ? "ring-2 ring-blue-500 opacity-100" : "opacity-70"}">
                            <img src="${img}" alt="${project.title} screenshot ${index + 1}" class="w-full h-full object-cover">
                        </button>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            `;
    } else {
      mediaElement = `
            <div class="w-full h-full bg-gradient-to-b from-gray-900 to-black p-4 flex flex-col">
                <div class="flex-1 flex items-center justify-center overflow-hidden">
                    <div class="h-full max-h-full rounded-[2rem] border border-gray-600 bg-black/40 p-2 shadow-xl">
                        <img id="modal-gallery-main" src="${project.gallery[0]}" alt="${project.title}" class="h-full w-auto object-contain rounded-[1.5rem]">
                    </div>
                </div>
                <div class="mt-3 flex gap-2 overflow-x-auto justify-center">
                    ${project.gallery
                      .map(
                        (img, index) => `
                        <button type="button" data-gallery-index="${index}" class="w-14 h-14 rounded-lg border border-gray-600 overflow-hidden transition-all duration-200 ${index === 0 ? "ring-2 ring-blue-500 opacity-100" : "opacity-70"}">
                            <img src="${img}" alt="${project.title} screenshot ${index + 1}" class="w-full h-full object-cover">
                        </button>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            `;
    }
  } else {
    mediaElement = `<img src="${project.image}" alt="${project.title}" class="w-full h-full object-contain">`;
  }

  const mediaContainerClass = isMobileGallery
    ? "w-full h-[62vh] sm:h-[66vh] lg:h-[70vh] max-h-[760px] bg-black rounded-t-xl overflow-hidden"
    : "w-full aspect-video bg-black rounded-t-xl overflow-hidden";

  modalContent.classList.remove("max-w-4xl", "max-w-5xl");
  modalContent.classList.add(isMobileGallery ? "max-w-5xl" : "max-w-4xl");

  const liveLinkButton = project.liveLink
    ? `<a href="${project.liveLink}" target="_blank" class="text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"><i class="fas fa-external-link-alt mr-2"></i>Live Demo</a>`
    : "";

  const repoLinkButton = project.repoLink
    ? `<a href="${project.repoLink}" target="_blank" class="text-gray-300 border border-gray-600 hover:bg-gray-700 transition-colors duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"><i class="fab fa-github mr-2"></i>Source Code</a>`
    : "";

  const storeLinksButtons = project.storeLinks
    ? `
      <span aria-disabled="true" title="Coming soon" class="cursor-not-allowed opacity-50 text-white bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center">
        <i class="fab fa-google-play mr-2"></i>Google Play
      </span>
      <span aria-disabled="true" title="Coming soon" class="cursor-not-allowed opacity-50 text-white bg-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center">
        <i class="fab fa-app-store-ios mr-2"></i>App Store
      </span>
      <a href="${project.storeLinks.appGallery}" target="_blank" class="text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5zm4 2A1.5 1.5 0 1 0 7 10.5a1.5 1.5 0 0 0 0-3m10 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M7 13.5A1.5 1.5 0 1 0 7 16.5a1.5 1.5 0 0 0 0-3m10 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
        </svg>
        AppGallery
      </a>
    `
    : "";

  const techIconsHtml = project.technologies
    .map((tech) => {
      const iconName = techIcons[tech] || "js";
      const isDirectIconSource =
        iconName.includes("/") || iconName.includes(".");
      const iconSrc = isDirectIconSource
        ? iconName
        : `https://skillicons.dev/icons?i=${iconName}`;
      return `
            <div class="flex items-center gap-2 bg-gray-700 text-blue-300 px-3 py-2 rounded-full">
                <img src="${iconSrc}" alt="${tech}" class="w-5 h-5">
                <span class="text-xs font-semibold">${tech}</span>
            </div>
        `;
    })
    .join("");

  modalContent.innerHTML = `
        <!-- Close Button -->
        <button class="absolute top-4 right-4 z-50 text-gray-400 hover:text-white transition-colors duration-300 bg-gray-800 hover:bg-gray-700 rounded-full p-2 w-10 h-10 flex items-center justify-center" onclick="closeModal()">
            <i class="fas fa-times text-xl"></i>
        </button>
        
        <!-- Media Section -->
        <div class="${mediaContainerClass}">
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
              ${storeLinksButtons}
            </div>
        </div>
    `;

  if (project.gallery?.length) {
    modalGallery = project.gallery;
    modalGalleryIndex = 0;
    const thumbButtons = document.querySelectorAll("[data-gallery-index]");
    thumbButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedIndex = Number(button.dataset.galleryIndex);
        setModalGalleryImage(selectedIndex);
      });
    });
  } else {
    modalGallery = [];
    modalGalleryIndex = 0;
  }

  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  modalContent.innerHTML = "";
  modalContent.classList.remove("max-w-5xl");
  modalContent.classList.add("max-w-4xl");
  modalGallery = [];
  modalGalleryIndex = 0;
}

function animateProjectCardsOnScroll() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  const projectCards = gsap.utils.toArray("#projects-grid > div");
  projectCards.forEach((card) => {
    gsap.fromTo(
      card,
      { y: 40, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
        },
      },
    );
  });
}

function initializeSectionAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const sections = [
    "#about",
    "#projects",
    "#skills",
    "#experience",
    "#contact",
    "footer",
  ];

  sections.forEach((selector) => {
    gsap.fromTo(
      selector,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: selector,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
        },
      },
    );
  });

  gsap.from("#services h2", {
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: "power2.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: "#services",
      start: "top 78%",
      toggleActions: "play none none none",
      once: true,
    },
  });

  gsap.from("#services .grid > div", {
    opacity: 0,
    y: 35,
    stagger: 0.12,
    duration: 0.7,
    ease: "power2.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: "#services",
      start: "top 75%",
      toggleActions: "play none none none",
      once: true,
    },
  });

  gsap.from("#experience .mb-12", {
    opacity: 0,
    x: -40,
    stagger: 0.18,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#experience",
      start: "top 75%",
      toggleActions: "play none none none",
      once: true,
    },
  });

  gsap.from("#contact .group", {
    opacity: 0,
    y: 24,
    stagger: 0.12,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 78%",
      toggleActions: "play none none none",
      once: true,
    },
  });

  ScrollTrigger.refresh();
}

// 5. EVENT LISTENERS
modalCloseBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  displayFilterButtons();
  displayProjects();
  initializeSkillsSlider();
  initializeSectionAnimations();
});

/*
=================================================
SKILLS SLIDER LOGIC WITH DRAG FUNCTIONALITY
=================================================
*/

const allSkills = [
  { name: "HTML5", icon: "html" },
  { name: "CSS3", icon: "css" },
  { name: "JavaScript", icon: "js" },
  { name: "TypeScript", icon: "ts" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Redux", icon: "redux" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Firebase", icon: "firebase" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "VS Code", icon: "vscode" },
  { name: "Figma", icon: "figma" },
  { name: "Postman", icon: "postman" },
  { name: "threejs", icon: "threejs" },
  { name: "Vercel", icon: "vercel" },
  { name: "gsap", icon: "/images/gsap.svg" },
];

function initializeSkillsSlider() {
  const track = document.getElementById("skills-track");
  if (!track) return;

  // Populate the track with slides
  const slidesHtml = allSkills
    .map((skill) => {
      const iconIdentifier = skill.icon;

      // Check if it's a file path (like /images/gsap.svg) or a slug
      const isFilePath =
        iconIdentifier.includes("/") || iconIdentifier.includes(".");

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
    })
    .join("");

  track.innerHTML = slidesHtml + slidesHtml; // Duplicating for infinite scroll

  // --- All the rest of your slider logic remains exactly the same ---
  const sliderContainer = document.getElementById("skills-slider-container");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

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
  nextBtn.addEventListener("click", () => {
    currentPosition -= 200;
  });

  prevBtn.addEventListener("click", () => {
    currentPosition += 200;
    if (currentPosition > 0) currentPosition = 0;
  });

  // Drag functionality
  function touchStart(e) {
    isDragging = true;
    startPos = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    prevTranslate = currentPosition;
    stopAnimation();
    track.style.cursor = "grabbing";
  }

  function touchMove(e) {
    if (!isDragging) return;
    const currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    currentTranslate = prevTranslate + currentX - startPos;
    currentPosition = currentTranslate;
    track.style.transform = `translateX(${currentPosition}px)`;
  }

  function touchEnd() {
    isDragging = false;
    track.style.cursor = "grab";

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
  track.addEventListener("mousedown", touchStart);
  track.addEventListener("mousemove", touchMove);
  track.addEventListener("mouseup", touchEnd);
  track.addEventListener("mouseleave", touchEnd);

  // Touch events
  track.addEventListener("touchstart", touchStart);
  track.addEventListener("touchmove", touchMove);
  track.addEventListener("touchend", touchEnd);

  // Prevent default drag behavior
  track.addEventListener("dragstart", (e) => e.preventDefault());

  // Pause on hover
  sliderContainer.addEventListener("mouseenter", stopAnimation);
  sliderContainer.addEventListener("mouseleave", () => {
    if (!isDragging) resumeAnimation();
  });

  // Set cursor style
  track.style.cursor = "grab";

  // Start the animation
  startAnimation();
}
