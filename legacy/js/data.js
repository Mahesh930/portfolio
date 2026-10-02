// Personal profile & curated resume data for Mahesh Warpe
const PORTFOLIO_DATA = {
  personal: {
    name: "Mahesh Warpe",
    title: "Software Developer & Full-Stack Engineer",
    headline: "Building scalable distributed web applications, enterprise SaaS platforms, and real-time systems across Java/Spring Boot & MERN stacks.",
    location: "Pune, Maharashtra, India",
    phone: "+91-7083235728",
    email: "warpemahesh356@gmail.com",
    githubUsername: "Mahesh930",
    githubUrl: "https://github.com/Mahesh930",
    linkedinUrl: "https://linkedin.com/in/mahesh-warpe-129605255",
    openToWork: true,
    statusText: "Available for Full-Time Software Engineering & SDE Roles",
    summary: `Computer Engineering graduate and full-stack developer with hands-on experience building production-style applications across the MERN stack and Java/Spring Boot, including a multi-tenant SaaS ERP platform and a multi-role marketplace with real-time tracking, secure authentication, and automated testing. Completed a Web Operations internship at TechGeekConnect Technologies. Proficient in React.js, Next.js, Node.js, Express.js, Spring Boot, MongoDB, and PostgreSQL, with a strong foundation in JavaScript, TypeScript, OOP, and DBMS. Solved 400+ coding problems and focused on building reliable, scalable web applications that solve real user problems.`
  },

  metrics: [
    { label: "Problems Solved", value: "400+", subtext: "LeetCode & Competitive Platforms", icon: "code" },
    { label: "HackerRank Rating", value: "5 ★", subtext: "Problem Solving Badge", icon: "award" },
    { label: "GitHub Repositories", value: "17+", subtext: "Actively Synced in Real Time", icon: "git-branch" },
    { label: "Full-Stack Apps", value: "8+", subtext: "Shipped & Production Tested", icon: "layers" }
  ],

  skills: {
    languages: [
      { name: "JavaScript (ES6+)", level: 95, tag: "Primary" },
      { name: "TypeScript", level: 90, tag: "Primary" },
      { name: "Java (17+)", level: 88, tag: "Primary" },
      { name: "C++", level: 82, tag: "Core DSA" },
      { name: "SQL", level: 86, tag: "RDBMS" }
    ],
    frontend: [
      { name: "React.js", level: 94, icon: "react" },
      { name: "Next.js", level: 90, icon: "next" },
      { name: "Redux Toolkit", level: 88, icon: "redux" },
      { name: "RTK Query / TanStack Query", level: 88, icon: "query" },
      { name: "Tailwind CSS", level: 95, icon: "tailwind" },
      { name: "Shadcn UI & Aceternity", level: 90, icon: "palette" },
      { name: "HTML5 / Modern CSS3", level: 96, icon: "html" },
      { name: "Bootstrap 5", level: 85, icon: "bootstrap" }
    ],
    backend: [
      { name: "Node.js", level: 92, icon: "node" },
      { name: "Express.js", level: 92, icon: "express" },
      { name: "Spring Boot 3", level: 88, icon: "spring" },
      { name: "Spring Security", level: 85, icon: "shield" },
      { name: "Hibernate / JPA", level: 86, icon: "database" },
      { name: "RESTful APIs", level: 95, icon: "api" },
      { name: "Socket.io (WebSockets)", level: 88, icon: "radio" },
      { name: "JWT & OAuth2 (Google)", level: 92, icon: "key" }
    ],
    databases: [
      { name: "PostgreSQL", level: 90, icon: "postgres" },
      { name: "MongoDB (Mongoose)", level: 92, icon: "mongo" },
      { name: "MySQL", level: 86, icon: "mysql" },
      { name: "Supabase", level: 85, icon: "supabase" }
    ],
    devopsAndTools: [
      { name: "Docker", level: 80, icon: "docker" },
      { name: "Git & GitHub", level: 94, icon: "github" },
      { name: "Postman", level: 92, icon: "postman" },
      { name: "Cloudinary", level: 88, icon: "cloud" },
      { name: "VS Code", level: 96, icon: "code" },
      { name: "Turborepo & pnpm", level: 84, icon: "layers" },
      { name: "Mapbox GL", level: 82, icon: "map" }
    ],
    coreEngineering: [
      { name: "Data Structures & Algorithms", level: 92 },
      { name: "Object-Oriented Programming (OOP)", level: 94 },
      { name: "Database Management Systems (DBMS)", level: 90 },
      { name: "Operating Systems", level: 85 },
      { name: "Computer Networks", level: 84 }
    ]
  },

  // Deep curated metadata that links with GitHub repos to show architecture & depth
  curatedProjects: {
    "hospitalManagement": {
      title: "MediCore ERP — Multi-Tenant Hospital Management System",
      category: "Enterprise SaaS & Distributed Architecture",
      badge: "Flagship Enterprise SaaS",
      complexity: "Enterprise Architecture (Tier 1)",
      depthScore: 98,
      status: "Production Ready",
      featured: true,
      demoUrl: "https://github.com/Mahesh930/hospitalManagement",
      githubUrl: "https://github.com/Mahesh930/hospitalManagement",
      techStack: [
        "Java 17", "Spring Boot 3", "Spring Security", "PostgreSQL", 
        "Hibernate/JPA", "Next.js", "TypeScript", "TanStack Query", 
        "Tailwind CSS", "Turborepo", "OAuth2 / JWT"
      ],
      description: "Enterprise-grade multi-tenant SaaS ERP engineered with Spring Boot 3, Java 17, and PostgreSQL. Enables multi-hospital isolation, tiered subscription management, role-based security, and high-performance OPD/billing workflows.",
      highlights: [
        "Engineered multi-tenant SaaS architecture supporting multi-hospital onboarding, subscription tiers (Basic/Pro/Enterprise), and dynamic feature-flag controls.",
        "Implemented stateless authentication and role-based access control (RBAC) using Spring Security, JWT, and OAuth2 Google Social Login for SuperAdmin, Admin, Doctor, and Patient roles.",
        "Built OPD, prescription, and billing/invoicing modules with @Transactional integrity and JPQL JOIN FETCH optimizations to completely eliminate N+1 query overhead.",
        "Architected modern Next.js/TypeScript admin frontend in a Turborepo/pnpm monorepo with TanStack Query for optimal client caching and pagination."
      ],
      architectureTags: ["Multi-Tenancy", "Stateless RBAC", "JPQL JOIN FETCH", "Turborepo Monorepo", "ACID Transactions"]
    },

    "waterAqua": {
      title: "AquaHome — Smart Water Delivery Platform",
      category: "Full-Stack MERN & Real-Time Marketplace",
      badge: "Real-Time Marketplace",
      complexity: "Full-Stack Distributed (Tier 2)",
      depthScore: 94,
      status: "Production Tested",
      featured: true,
      demoUrl: "https://github.com/Mahesh930/waterAqua",
      githubUrl: "https://github.com/Mahesh930/waterAqua",
      techStack: [
        "React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", 
        "Redux Toolkit", "Tailwind CSS", "Cloudinary", "Jest", "Playwright"
      ],
      description: "Full-stack MERN on-demand marketplace connecting consumers with water delivery suppliers, featuring real-time geolocation tracking, atomic inventory transactions, and end-to-end delivery verification.",
      highlights: [
        "Built full-stack MERN marketplace connecting customers with water suppliers, supporting real-time delivery tracking, inventory management, and multi-role operations.",
        "Engineered JWT authentication with HttpOnly cookies, role-based access control, and API rate limiting to protect all endpoints from abuse.",
        "Implemented live order push notifications using Socket.io and atomic inventory updates with Mongoose transactions to eliminate race conditions.",
        "Integrated OTP-based delivery verification and audit logging for order integrity; automated test suite with Jest, Supertest, and Playwright."
      ],
      architectureTags: ["Socket.io WebSockets", "Mongoose Transactions", "HttpOnly Cookies", "OTP Verification", "E2E Testing"]
    },

    "routematev2": {
      title: "RouteMate — AI-Powered Multimodal Travel Planner",
      category: "AI & Geospatial Navigation",
      badge: "Geospatial AI Platform",
      complexity: "Modern Cloud & GIS (Tier 2)",
      depthScore: 91,
      status: "Active V2",
      featured: true,
      demoUrl: "https://github.com/Mahesh930/routematev2",
      githubUrl: "https://github.com/Mahesh930/routematev2",
      techStack: [
        "React.js", "TypeScript", "Vite", "Tailwind CSS", "Shadcn UI", 
        "Supabase", "Mapbox GL", "RESTful Routing APIs"
      ],
      description: "Intelligent travel engine optimizing end-to-end journeys across India by aggregating real-time multimodal transport options (flights, trains, buses, local transit), reducing journey planning time by up to 80%.",
      highlights: [
        "Aggregates multimodal transit routes (railways, airways, state buses, and metro) into unified algorithmic itineraries, cutting planning overhead by 80%.",
        "Integrated Mapbox GL for high-performance interactive route mapping, dynamic waypoints, and elevation profiles.",
        "Implemented real-time data synchronization and persistent trip state with Supabase backend and Row-Level Security (RLS).",
        "Engineered live price tracking, price-drop notification alerts, and collaborative route-sharing in a sleek Shadcn UI."
      ],
      architectureTags: ["Mapbox GL Geospatial", "Supabase Realtime", "Multimodal Routing", "Shadcn UI"]
    },

    "Yt": {
      title: "VideoTube — Scalable Video Sharing Backend Application",
      category: "High-Throughput Cloud Backend",
      badge: "Cloud Media Architecture",
      complexity: "Backend Systems (Tier 3)",
      depthScore: 89,
      status: "Completed",
      featured: true,
      demoUrl: "https://github.com/Mahesh930/Yt",
      githubUrl: "https://github.com/Mahesh930/Yt",
      techStack: [
        "Node.js", "Express.js", "MongoDB", "Cloudinary SDK", 
        "JWT Auth", "Multer", "Aggregation Pipelines"
      ],
      description: "Production-ready YouTube-style video streaming and community backend supporting multi-format uploads, cloud transcoding, nested comments, likes, subscriptions, and secure streaming.",
      highlights: [
        "Architected scalable backend with Express and MongoDB supporting video uploads, chunked media streaming, updates, and soft deletes.",
        "Integrated Cloudinary cloud storage SDK with streaming presets and responsive thumbnail generation via Multer pipelines.",
        "Designed high-performance MongoDB aggregation pipelines for watch-history tracking, channel subscriptions, and recommendation queries.",
        "Implemented robust JWT token validation middleware with refresh token rotation and comprehensive error handling."
      ],
      architectureTags: ["Cloudinary Media Streaming", "MongoDB Aggregations", "Token Rotation", "Multer Uploads"]
    },

    "AllowanceTracking": {
      title: "Allowance & Expense Tracking Platform",
      category: "Fintech & Personal Finance",
      badge: "Fintech Tool",
      complexity: "Full-Stack Utility (Tier 3)",
      depthScore: 85,
      status: "Active",
      featured: false,
      githubUrl: "https://github.com/Mahesh930/AllowanceTracking",
      techStack: ["TypeScript", "React", "Node.js", "MongoDB", "Tailwind CSS"],
      description: "Modern financial ledger application for automated allowance management, recurring budget calculations, and graphical expenditure analytics.",
      highlights: [
        "Developed end-to-end expense logging with category breakdowns and month-over-month budgetary forecasting.",
        "Full TypeScript typing across frontend and backend models for complete type safety."
      ],
      architectureTags: ["Type Safety", "Budget Analytics", "Financial Ledger"]
    },

    "swastik-group": {
      title: "Swastik Group — Corporate Enterprise Portal",
      category: "Enterprise Web Systems",
      badge: "Corporate Portal",
      complexity: "Web Application (Tier 4)",
      depthScore: 82,
      status: "Shipped",
      featured: false,
      githubUrl: "https://github.com/Mahesh930/swastik-group",
      techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "SEO"],
      description: "Comprehensive corporate web portal engineered with mobile-first design, fast performance metrics, and lead-generation contact funnels.",
      highlights: [
        "Built responsive interactive UI with modular components and optimized asset pipelines.",
        "Configured high-converting inquiries flow and semantic SEO hierarchy."
      ],
      architectureTags: ["Responsive Architecture", "High Performance", "Lead Funnel"]
    },

    "node_hotels": {
      title: "Hotel & Hospitality Reservation Backend API",
      category: "E-Commerce & Hospitality",
      badge: "Reservation Engine",
      complexity: "Backend Service (Tier 3)",
      depthScore: 84,
      status: "Completed",
      featured: false,
      githubUrl: "https://github.com/Mahesh930/node_hotels",
      techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST API"],
      description: "Modular hotel reservation service with room availability query engine, booking conflict resolution, and customer profiles.",
      highlights: [
        "Engineered booking conflict detection to prevent overbooking across calendar dates.",
        "Implemented structured REST endpoints with query pagination and filtering."
      ],
      architectureTags: ["Booking Engine", "Conflict Resolution", "RESTful Architecture"]
    },

    "FoodApp": {
      title: "FoodExpress — Online Food Delivery System",
      category: "Full-Stack Web App",
      badge: "Food Ordering",
      complexity: "Frontend & State (Tier 4)",
      depthScore: 80,
      status: "Completed",
      featured: false,
      githubUrl: "https://github.com/Mahesh930/FoodApp",
      techStack: ["JavaScript", "React", "HTML5", "CSS3", "State Management"],
      description: "Interactive online restaurant menu browsing and cart management application with live pricing calculations and dynamic checkout UI.",
      highlights: [
        "Designed reactive state management for instant cart recalculations and discount codes.",
        "Implemented smooth filter and search across cuisines and meal categories."
      ],
      architectureTags: ["Cart State", "Dynamic Checkout", "Cuisine Filtering"]
    }
  },

  experience: [
    {
      role: "Web Operations Intern",
      company: "TechGeekConnect Technologies LLP (TCGT)",
      location: "Pune, India",
      period: "Jan 2025 – Feb 2025",
      type: "Internship",
      techStack: ["React.js", "Node.js", "Express.js", "Bootstrap", "MongoDB"],
      bullets: [
        "Designed and developed a fully responsive web application for a Vehicle Rental System module, shipped to production.",
        "Built user verification and authentication flows; engineered mechanisms for detecting and removing fake bots and spam posts using authorization and authentication controls.",
        "Collaborated with cross-functional teams to resolve production bugs and optimize page load speeds across desktop and mobile devices."
      ]
    }
  ],

  education: [
    {
      degree: "B.E. in Computer Engineering",
      institution: "Savitribai Phule Pune University",
      period: "2023 – 2026",
      score: "CGPA: 7.19 / 10",
      description: "Focused on Distributed Systems, Advanced Data Structures, Cloud Computing, Database Engineering, and Software Design Patterns."
    },
    {
      degree: "Diploma in Information Technology",
      institution: "Government Polytechnic, Amravati",
      period: "2020 – 2023",
      score: "Percentage: 72.05%",
      description: "Core technical curriculum covering C, C++, Core Java, Relational Databases, Web Technologies, and Computer Networking fundamentals."
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Balbhim College, Beed",
      period: "2019 – 2021",
      score: "Percentage: 82.67%",
      description: "Specialized in Science stream with Mathematics, Physics, and Chemistry."
    }
  ],

  achievements: [
    {
      title: "5-Star Problem Solver",
      platform: "HackerRank",
      description: "Earned 5-star gold badge demonstrating mastery in algorithmic problem solving and Data Structures.",
      icon: "star"
    },
    {
      title: "400+ Coding Problems Solved",
      platform: "LeetCode & Competitive Coding",
      description: "Consistently solved complex algorithmic challenges covering Trees, Graphs, Dynamic Programming, Strings, and Arrays.",
      icon: "code"
    },
    {
      title: "Shipped 5–10 Production & Full-Stack Projects",
      platform: "Independent Software Engineering",
      description: "Architected multi-tenant SaaS ERP, real-time marketplaces, video streaming platforms, and multimodal AI navigators.",
      icon: "rocket"
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
