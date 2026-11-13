export const personalInfo = {
  name: "Robiul Suny",
  nameBn: "রবিউল সানি",
  role: "Software Engineer",
  company: "makTech",
  companyUrl: "https://maktech.com",
  email: "robiulsunyemon@gmail.com",
  publisher: "robiulsuny.com",
  publisherUrl: "https://pub.dev/publishers/robiulsuny.com",
  location: "Dhaka, Bangladesh",
  bio: "Software Engineer at makTech specializing in high-performance mobile applications and resilient cloud backends. Passionate about bridging clean object-oriented architecture, offline-first sync engines, and distributed backend systems using Flutter, Python FastAPI, Java Spring Boot, Golang, and AWS.",
  bioBn: "makTech-এ কর্মরত সফটওয়্যার ইঞ্জিনিয়ার। ফ্লাটার, পাইথন ফাস্টএপিআই, স্প্রিং বুট, গোল্যাং ও এডাব্লিউএস দিয়ে স্কেলেবল মোবাইল এবং ক্লাউড ব্যাকএন্ড আর্কিটেকচার তৈরিতে বিশেষজ্ঞ।",
  socials: {
    github: "https://github.com/robiulsunnyemon",
    linkedin: "https://linkedin.com/in/robiulsuny",
    pubDev: "https://pub.dev/publishers/robiulsuny.com",
    hashnode: "https://robiulsuny.hashnode.dev",
    twitter: "https://twitter.com/robiulsuny",
  },
  stats: [
    { label: "Pub.dev Packages", value: "3+", subtext: "Verified publisher" },
    { label: "Pub Score Rating", value: "160/160", subtext: "Maximum 100% score" },
    { label: "Package Downloads", value: "1.3k+", subtext: "Active developers" },
    { label: "Play Store Apps", value: "Published", subtext: "Production grade" },
  ]
};

export const pubPackages = [
  {
    id: "bd_locations",
    name: "bd_locations",
    version: "v0.2.0",
    likes: 27,
    pubPoints: 160,
    downloads: 651,
    description: "Complete offline geographic dataset of Bangladesh (Divisions, Districts, Upazilas, Unions, Postcodes) in Bengali and English with lightning-fast search utilities.",
    tags: ["#bangladesh", "#location", "#geo", "#bangla", "#dataset"],
    platforms: ["Android", "iOS", "Linux", "macOS", "Web", "Windows"],
    sdks: ["Dart", "Flutter"],
    license: "MIT",
    pubUrl: "https://pub.dev/packages/bd_locations",
    installCmd: "flutter pub add bd_locations",
    highlights: [
      "Zero network dependency: 100% offline dataset",
      "Bilingual support: English & Bengali names for every upazila and union",
      "Built-in fuzzy search and filtering utilities",
      "Tiny footprint with optimized JSON compression"
    ]
  },
  {
    id: "sync_pilot",
    name: "sync_pilot",
    version: "v0.1.2",
    likes: 6,
    pubPoints: 160,
    downloads: 370,
    description: "Database-agnostic, offline-first sync engine for Dart and Flutter with outbox compaction, 3-way conflict resolution, and delta synchronization.",
    tags: ["#sync", "#offline-first", "#local-first", "#database", "#cache"],
    platforms: ["Android", "iOS", "Linux", "macOS", "Web", "Windows"],
    sdks: ["Dart", "Flutter"],
    license: "MIT",
    pubUrl: "https://pub.dev/packages/sync_pilot",
    installCmd: "flutter pub add sync_pilot",
    highlights: [
      "Offline-first outbox pattern with compaction",
      "Deterministic 3-way client/server conflict resolution",
      "Pluggable storage: works with SQLite, Hive, Isar, or in-memory",
      "Network state awareness with auto retry and backoff"
    ]
  },
  {
    id: "bclean",
    name: "bclean",
    version: "v0.1.5",
    likes: 1,
    pubPoints: 160,
    downloads: 286,
    description: "A powerful CLI tool for Flutter to generate Clean Architecture with BLoC or Cubit state management and dartz functional error handling, inspired by get_cli.",
    tags: ["#bloc", "#clean-architecture", "#codegen", "#flutter", "#cli"],
    platforms: ["Android", "iOS", "Linux", "macOS", "Windows"],
    sdks: ["Dart", "Flutter"],
    license: "MIT",
    pubUrl: "https://pub.dev/packages/bclean",
    installCmd: "dart pub global activate bclean",
    highlights: [
      "Automated feature scaffolding for Clean Architecture",
      "Generates Domain (Entities, UseCases), Data (Models, DataSources), and Presentation (BLoC/Cubit)",
      "Built-in Dartz Either<Failure, Success> functional error patterns",
      "Dependency injection wiring with get_it / injectable ready templates"
    ]
  }
];

export const skillCategories = [
  {
    category: "Mobile & Cross-Platform",
    icon: "Smartphone",
    color: "from-blue-500/20 to-cyan-500/20",
    skills: [
      { name: "Flutter & Dart", level: "Expert", desc: "Complex UI, Clean Arch, Custom Packages" },
      { name: "BLoC & Cubit", level: "Expert", desc: "Predictable reactive state management" },
      { name: "Offline-First Sync", level: "Advanced", desc: "Conflict resolution, local SQLite/Isar" },
      { name: "Play Store Release", level: "Advanced", desc: "Signing, Bundling, CI/CD Fastlane" },
    ]
  },
  {
    category: "Backend & Distributed APIs",
    icon: "Server",
    color: "from-emerald-500/20 to-teal-500/20",
    skills: [
      { name: "Python FastAPI", level: "Advanced", desc: "Async microservices, Pydantic, OpenAPI" },
      { name: "Java Spring Boot", level: "Advanced", desc: "Enterprise MVC, Spring Security, JPA/Hibernate" },
      { name: "Golang (Go)", level: "Proficient", desc: "High-throughput microservices, Goroutines" },
      { name: "REST & WebSockets", level: "Advanced", desc: "Real-time bidirectional communication" },
    ]
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    color: "from-amber-500/20 to-orange-500/20",
    skills: [
      { name: "AWS Services", level: "Advanced", desc: "EC2, S3, RDS, Lambda, ECS, API Gateway" },
      { name: "Docker & Containers", level: "Advanced", desc: "Multi-stage builds, orchestration" },
      { name: "CI / CD Pipelines", level: "Proficient", desc: "GitHub Actions, automated test & deploy" },
      { name: "Linux & Nginx", level: "Advanced", desc: "Server administration, reverse proxy, SSL" },
    ]
  },
  {
    category: "Databases & Architecture",
    icon: "Database",
    color: "from-purple-500/20 to-pink-500/20",
    skills: [
      { name: "PostgreSQL & MySQL", level: "Advanced", desc: "Query optimization, indexing, schema design" },
      { name: "Redis", level: "Advanced", desc: "In-memory caching, Pub/Sub, rate limiting" },
      { name: "Clean Architecture", level: "Expert", desc: "Domain-driven design, SOLID principles" },
      { name: "Microservices", level: "Advanced", desc: "Event-driven architecture, resilient API design" },
    ]
  }
];

export const projects = [
  {
    id: "grandmart-app",
    title: "Grandmart — Multi-Vendor E-Commerce Customer App",
    category: "mobile",
    categoryLabel: "Mobile & Cross-Platform",
    isPlayStore: false,
    githubUrl: "https://github.com/robiulsunnyemon/grandmart_app",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    description: "Full-featured multi-vendor e-commerce mobile application built with Flutter and GetX. Features vendor browsing, cart state management, order tracking, and multi-gateway checkout.",
    technologies: ["Flutter", "Dart", "GetX", "REST API", "Payment Gateways", "Clean Architecture"],
    features: [
      "Multi-vendor store browsing with category filtering and instant search",
      "Dynamic cart state management, coupon application, and tax calculations",
      "Real-time order timeline and live delivery tracking integration",
      "Built for Android (API 21+) and iOS with Flutter 3.10+ and Dart 3"
    ]
  },
  {
    id: "thikthok-live-streaming",
    title: "ThikThok — Interactive Live Video Streaming App",
    category: "mobile",
    categoryLabel: "Mobile & Real-Time",
    isPlayStore: false,
    githubUrl: "https://github.com/robiulsunnyemon/thikthok_live_streaming_app",
    image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=800&q=80",
    description: "Low-latency interactive live video broadcasting and audience streaming mobile client. Features real-time broadcaster-viewer interaction, live gifts, and high-concurrency room chat.",
    technologies: ["Flutter", "Dart", "WebRTC", "LiveKit", "WebSockets", "Real-Time Streaming"],
    features: [
      "Ultra-low latency live video broadcasting and viewer synchronization",
      "Real-time interactive chat and animated gift animations during streams",
      "Adaptive bitrate streaming for smooth playback over variable mobile networks",
      "Clean reactive state management with audience room state synchronization"
    ]
  },
  {
    id: "subsync-platform",
    title: "SubSync — Cross-Platform Subscription & Sync Engine",
    category: "mobile",
    categoryLabel: "Mobile & Full-Stack",
    isPlayStore: false,
    githubUrl: "https://github.com/robiulsunnyemon/subsync_app",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    description: "Cross-platform subscription management client that syncs seamlessly with a dedicated Java Spring Boot microservice backend (subsync_backend) for expense tracking and recurring billing alerts.",
    technologies: ["Flutter", "Dart", "Java", "Spring Boot", "REST API", "Local Sync"],
    features: [
      "Tracks recurring SaaS, streaming, and utility subscriptions with upcoming renewal alerts",
      "Pairs with dedicated Java Spring Boot microservice backend (subsync_backend)",
      "Offline-first local caching with conflict-free background data synchronization",
      "Comprehensive monthly spending analytics and budget breakdown charts"
    ]
  },
  {
    id: "otza-flutter-app",
    title: "Otzar App — Secure On-Device Mobile Client",
    category: "mobile",
    categoryLabel: "Mobile & Security",
    isPlayStore: false,
    githubUrl: "https://github.com/robiulsunnyemon/otza_flutter_app",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    description: "Modern Flutter application designed to provide users with a secure and seamless mobile experience, leveraging advanced on-device capabilities, encrypted local storage, and high-performance offline resilience.",
    technologies: ["Flutter", "Dart", "On-Device Security", "Clean Architecture", "BLoC", "SQLite"],
    features: [
      "Advanced on-device security with encrypted local storage mechanisms",
      "Seamless integration with Python microservice backend (otza_backend)",
      "Strict Clean Architecture with separated Domain, Data, and Presentation layers",
      "Smooth 60fps animations and custom responsive design system"
    ]
  },
  {
    id: "magpie-restaurant-dashboard",
    title: "Al Khalifa Restaurant & Convention Hall Dashboard",
    category: "mobile",
    categoryLabel: "Web & Management",
    isPlayStore: false,
    githubUrl: "https://github.com/robiulsunnyemon/magpie-restaurent",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    description: "A premium, responsive, and modern Flutter application and management dashboard built for managing the operations of Al Khalifa Restaurant & Convention Hall. Comprehensive suite of tools for dining orders, reservations, and live analytics.",
    technologies: ["Flutter Web", "Dart", "Responsive Design", "State Management", "Analytics"],
    features: [
      "Live order management pipeline from kitchen queue to dining table delivery",
      "Convention hall event scheduling, advance booking, and seating management",
      "Interactive sales analytics, daily revenue summaries, and PDF report exports",
      "Cross-platform responsive layout optimized for web, desktop, and tablet displays"
    ]
  },
  {
    id: "power-system-backend",
    title: "Power System & Jorden Backend API Service",
    category: "backend",
    categoryLabel: "Backend & Cloud",
    isPlayStore: false,
    githubUrl: "https://github.com/robiulsunnyemon/power_system_backend",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    description: "Robust, high-performance backend service for the Jorden energy & power telemetry platform. Built with FastAPI for async routing, Prisma Client Python as the ORM, and PostgreSQL as the primary database.",
    technologies: ["Python", "FastAPI", "Prisma ORM", "PostgreSQL", "JWT Auth", "Docker"],
    features: [
      "High-throughput asynchronous API endpoints handling energy telemetry data",
      "Modern type-safe database queries powered by Prisma Client Python",
      "JWT-based role-based access control (RBAC) and token authentication",
      "Containerized with Docker for seamless continuous deployment and scaling"
    ]
  },
  {
    id: "mslies-rag-mcq-generator",
    title: "MSLIES — RAG-Powered AI MCQ Generator",
    category: "backend",
    categoryLabel: "Backend & AI",
    isPlayStore: false,
    githubUrl: "https://github.com/robiulsunnyemon/mslies",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "Intelligent Retrieval-Augmented Generation (RAG) backend API using FastAPI and Google Gemini API. Ingests domain documents and automatically synthesizes contextual multiple-choice questions with answer keys.",
    technologies: ["Python", "FastAPI", "Google Gemini API", "RAG Pipeline", "Vector Search", "LLM"],
    features: [
      "RAG pipeline that parses educational materials and synthesizes targeted questions",
      "Powered by Google Gemini generative models for high-accuracy assessment creation",
      "Asynchronous request processing with strict response validation schemas",
      "RESTful API design with interactive Swagger/OpenAPI documentation"
    ]
  },
  {
    id: "bd-locations-pkg",
    title: "bd_locations — Complete Bangladesh Geographic Dataset",
    category: "package",
    categoryLabel: "Open Source Package",
    isPlayStore: false,
    pubUrl: "https://pub.dev/packages/bd_locations",
    githubUrl: "https://github.com/robiulsunnyemon/bd_locations",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
    description: "100% offline Bangladesh geographic dataset with 160/160 pub points on pub.dev. Includes divisions, districts, upazilas, unions, and postal codes in Bengali and English with fast search utilities.",
    technologies: ["Dart", "Flutter", "Offline-First", "Pub.dev", "MIT License"],
    features: [
      "100% test coverage and maximum 160/160 pub points on pub.dev",
      "650+ total active downloads from developers in Bangladesh and abroad",
      "Supports multi-level cascading dropdowns (Division -> District -> Upazila)",
      "Zero network latency: queries resolve instantly from local data"
    ]
  }
];

export const blogs = [
  {
    id: "flutter-three-trees",
    title: "Flutter's Three Trees Concept: Widget Tree, Element Tree & Render Tree",
    subtitle: "Flutter UI rendering process এবং Widget, Element ও RenderObject-এর অভ্যন্তরীণ কার্যপদ্ধতি।",
    date: "Nov 6, 2026",
    readTime: "5 min read",
    platform: "Hashnode",
    category: "flutter",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
    url: "https://robiulsuny.hashnode.dev/flutter-s-three-trees-concept-widget-tree-element-tree-render-tree",
    tags: ["Flutter", "Dart", "Rendering", "Internals", "UI"],
    likes: 12,
    snippet: "Flutter একটি powerful UI framework, যেখানে UI তৈরি করার জন্য আমরা সাধারণত Widget ব্যবহার করি। কিন্তু Flutter-এর UI rendering process শুধু Widget দিয়েই সম্পন্ন হয় না। এর পেছনে কাজ করে আরও দুটি অদৃশ্য গাছ..."
  },
  {
    id: "solid-principles-dart-flutter",
    title: "SOLID Principles of Dart/Flutter",
    subtitle: "অবজেক্ট-ওরিয়েন্টেড ডিজাইন প্রিন্সিপাল দিয়ে স্কেলেবল, টেস্টযোগ্য ও মেইনটেইনেবল কোডবেস তৈরি।",
    date: "Nov 5, 2026",
    readTime: "8 min read",
    platform: "Hashnode",
    category: "flutter",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    url: "https://robiulsuny.hashnode.dev/solid-principles-of-dart-flutter",
    tags: ["Dart", "Flutter", "SOLID", "Architecture", "CleanCode"],
    likes: 18,
    snippet: "সফটওয়্যার ইঞ্জিনিয়ারিংয়ে SOLID হলো এমন ৫টি অবজেক্ট-ওরিয়েন্টেড ডিজাইন প্রিন্সিপাল, যা কোডবেসকে স্কেলেবল, টেস্টযোগ্য, বাগ-ফ্রি এবং মেইনটেইনেবল রাখতে সাহায্য করে। ফ্লাটার অ্যাপ্লিকেশনে কীভাবে এটি প্রয়োগ করবেন..."
  },
  {
    id: "dart-flutter-architecture-records-patterns",
    title: "Dart & Flutter Architecture : Records, Patterns, Sealed Class, Extensions and Mixins",
    subtitle: "Dart-এর অভ্যন্তরীণ মেকানিজম, মডার্ন সিনট্যাক্স ও সঠিক আর্কিটেকচারাল টুলস ব্যবহারের গভীর বিশ্লেষণ।",
    date: "Nov 4, 2026",
    readTime: "15 min read",
    platform: "Hashnode",
    category: "flutter",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    url: "https://robiulsuny.hashnode.dev/dart-flutter-architecture-records-patterns-sealed-class-extensions-and-mixins",
    tags: ["Dart", "Architecture", "Patterns", "OOP", "Flutter"],
    likes: 24,
    snippet: "একজন সাধারণ ডেভেলপার এবং একজন সিনিয়র সফটওয়্যার ইঞ্জিনিয়ারের মধ্যে মূল পার্থক্য গড়ে দেয় ভাষাটির (Language) অভ্যন্তরীণ মেকানিজম ও সঠিক টুলস ব্যবহারের দক্ষতা। Dart 2.7 থেকে শুরু করে আধুনিক ফিচারের গভীর বিশ্লেষণ..."
  },
  {
    id: "dart-concurrency-memory-management",
    title: "Dart Concurrency and Memory Management",
    subtitle: "Concurrency, Isolate এবং Memory architecture নিয়ে বিস্তারিত টেকনিক্যাল আলোচনা।",
    date: "Nov 3, 2026",
    readTime: "15 min read",
    platform: "Hashnode",
    category: "flutter",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    url: "https://robiulsuny.hashnode.dev/dart-concurrency-and-memory-management",
    tags: ["Dart", "Concurrency", "Isolate", "MemoryManagement"],
    likes: 21,
    snippet: "Concurrency, Isolate এবং Memory architecture নিয়ে বিস্তারিত আলোচনা। ডার্টে মেমোরি কীভাবে ম্যানেজ হয়, গার্বেজ কালেকশন এবং আইসোলেট কীভাবে মাল্টি-থ্রেডিংয়ের মতো সুবিধা দেয়।"
  },
  {
    id: "dart-flutter-single-thread",
    title: "Dart | Flutter | Single Thread",
    subtitle: "থ্রেড, ইভেন্ট লুপ এবং অ্যাসিনক্রোনাস প্রোগ্রামিংয়ের গভীর রহস্য।",
    date: "Oct 31, 2026",
    readTime: "11 min read",
    platform: "Hashnode",
    category: "flutter",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
    url: "https://robiulsuny.hashnode.dev/dart-flutter-single-thread",
    tags: ["Dart", "EventLoop", "Async", "FlutterInternals"],
    likes: 19,
    snippet: "Dart & Flutter Internals: থ্রেড, ইভেন্ট লুপ এবং অ্যাসিনক্রোনাস প্রোগ্রামিংয়ের গভীর রহস্য। Event Queue এবং Microtask Queue কীভাবে ব্যাকগ্রাউন্ডে রেসপনসিভনেস ধরে রাখে।"
  },
  {
    id: "aws-academy-cloud-foundations-module-04",
    title: "AWS Academy Cloud Foundations (Module 04)",
    subtitle: "ক্লাউডে ডেটা রাখলেই কি সব নিরাপদ? AWS Cloud Security সম্পূর্ণ গাইড।",
    date: "Oct 20, 2026",
    readTime: "16 min read",
    platform: "Hashnode",
    category: "aws",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    url: "https://robiulsuny.hashnode.dev/aws-academy-cloud-foundations-module-04",
    tags: ["AWS", "CloudSecurity", "IAM", "Compliance", "Cloud"],
    likes: 15,
    snippet: "ক্লাউডে ডেটা রাখলেই কি সব নিরাপদ? AWS Cloud Security সম্পূর্ণ গাইড (Module 4)। Shared Responsibility Model, IAM পলিসি, এনক্রিপশন এবং ক্লাউড কমপ্লায়েন্স।"
  },
  {
    id: "aws-academy-cloud-foundations-module-03",
    title: "AWS Academy Cloud Foundations (Module 03)",
    subtitle: "AWS গ্লোবাল ইনফ্রাস্ট্রাকচার এবং কোর ক্লাউড সার্ভিসসমূহ।",
    date: "Oct 6, 2026",
    readTime: "8 min read",
    platform: "Hashnode",
    category: "aws",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    url: "https://robiulsuny.hashnode.dev/aws-academy-cloud-foundations-module-03",
    tags: ["AWS", "CloudInfrastructure", "Regions", "AvailabilityZones"],
    likes: 14,
    snippet: "AWS গ্লোবাল ইনফ্রাস্ট্রাকচার এবং ক্লাউড সার্ভিস। Regions, Availability Zones (AZ), Edge Locations এবং মূল কোর ক্লাউড সার্ভিসসমূহের স্থাপত্য।"
  },
  {
    id: "aws-academy-cloud-foundations-module-02",
    title: "AWS Academy Cloud Foundations (Module 02)",
    subtitle: "Cloud Economics and Billing (ক্লাউড অর্থনীতি এবং বিলিং মেকানিজম)।",
    date: "Sep 10, 2026",
    readTime: "11 min read",
    platform: "Hashnode",
    category: "aws",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    url: "https://robiulsuny.hashnode.dev/aws-academy-cloud-foundations-module-02",
    tags: ["AWS", "CloudEconomics", "FinOps", "Billing"],
    likes: 16,
    snippet: "Cloud Economics and Billing (ক্লাউড অর্থনীতি এবং বিলিং)। ক্লাউড কম্পিউটিংয়ের খরচ নিয়ন্ত্রণ, TCO ক্যালকুলেটর ও কস্ট অপটিমাইজেশন স্ট্র্যাটেজি।"
  },
  {
    id: "aws-academy-cloud-foundations-module-01",
    title: "AWS Academy Cloud Foundations (Module 01)",
    subtitle: "ভূমিকা (Introduction) - ক্লাউড কম্পিউটিংয়ের মূল ভিত্তি ও ব্যবসায়িক সুবিধা।",
    date: "Aug 24, 2026",
    readTime: "6 min read",
    platform: "Hashnode",
    category: "aws",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    url: "https://robiulsuny.hashnode.dev/aws-academy-cloud-foundations-module-01",
    tags: ["AWS", "CloudComputing", "Beginner", "CloudFoundations"],
    likes: 22,
    snippet: "১. ভূমিকা (Introduction) আজকের তথ্যপ্রযুক্তির যুগে 'Cloud Computing' শব্দটি আমরা প্রতিনিয়ত শুনে থাকি। কিন্তু ক্লাউড কম্পিউটিং আসলে কী? এটি কীভাবে বড় বড় কোম্পানির লাখ লাখ টাকা সাশ্রয় করে..."
  }
];

export const workExperience = [
  {
    role: "Software Engineer",
    company: "makTech",
    companyType: "Software Engineering & Tech Solutions",
    period: "Jul 2026 — Present",
    current: true,
    location: "Dhaka, Bangladesh",
    summary: "Promoted to Software Engineer, leading high-performance cross-platform Flutter mobile applications and resilient cloud backend architectures in FastAPI, Spring Boot, Golang, and AWS.",
    points: [
      "Promoted to Software Engineer following consistent excellence in mobile architecture and cloud engineering.",
      "Architect and maintain production-grade Flutter apps utilizing BLoC, Cubit, and Clean Architecture principles.",
      "Design and deploy high-throughput microservices using Python FastAPI, Java Spring Boot, and Golang.",
      "Manage AWS cloud infrastructure (EC2, ECS, S3, RDS) and implement automated CI/CD deployment pipelines."
    ]
  },
  {
    role: "Associate Software Engineer",
    company: "makTech",
    companyType: "Software Engineering & Tech Solutions",
    period: "Jul 2025 — Jun 2026",
    current: false,
    location: "Dhaka, Bangladesh",
    summary: "Built robust cross-platform mobile apps and backend services, pioneering offline-first caching and clean domain-driven structures.",
    points: [
      "Developed and shipped responsive mobile user experiences using Flutter, Dart, and reactive state management.",
      "Integrated secure REST APIs, WebSockets, and third-party payment gateways for client applications.",
      "Implemented offline-first sync mechanisms and local database caching strategies (SQLite, Isar).",
      "Participated in agile sprint planning, code reviews, and comprehensive unit/widget testing."
    ]
  },
  {
    role: "Software Engineer Intern",
    company: "Omegasoft",
    companyType: "Software Development & Technology",
    period: "Feb 2025 — Jun 2025",
    current: false,
    location: "Dhaka, Bangladesh",
    summary: "Started professional software engineering journey, gaining rigorous hands-on industry experience in mobile development and clean coding standards.",
    points: [
      "Gained foundational industry experience in Dart, Flutter, and object-oriented software design.",
      "Built clean UI widgets, resolved application bugs, and integrated RESTful endpoints under senior mentorship.",
      "Adopted Git version control workflows, agile team rituals, and coding best practices."
    ]
  },
  {
    role: "Open Source Package Author & Publisher",
    company: "pub.dev / robiulsuny.com",
    companyType: "Open Source Ecosystem",
    period: "2025 — Present",
    current: true,
    location: "Global",
    summary: "Creating and maintaining popular Dart and Flutter packages with 100% pub score, serving hundreds of developers worldwide.",
    points: [
      "Published bd_locations (complete offline Bangladesh geographic dataset) with 650+ downloads.",
      "Built sync_pilot (database-agnostic offline-first sync engine with outbox compaction).",
      "Created bclean (Flutter Clean Architecture & BLoC code generation CLI tool).",
      "Maintained 160/160 full pub points across all packages adhering to strict Dart analysis rules."
    ]
  }
];
