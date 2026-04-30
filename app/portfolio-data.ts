export type Work = {
  slug: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  source: string;
  demo: {
    mode: string;
    stats: string[];
    structure: string[];
  };
};

export const profile = {
  name: "Adrian Wahyu Septianto",
  initials: "AW",
  role: "Full Stack Developer",
  location: "Surabaya, ID",
  email: "adrianwahyuseptianto1@gmail.com",
  github: "github.com/adrianwahyuseptianto1-cloud",
  linkedin: "linkedin.com/in/adrian-wahyu-septianto",
  discord: "discord/@adrcwy",
  telegram: "telegram/@adrcwy",
  timezone: "Asia/Jakarta",
  status: "Available for custom systems",
  headline: {
    line1: "Custom systems",
    line2: "yang rapi dari",
    italic: "request liar."
  },
  shortBio:
    "Programmer asal Indonesia. Suka membuat program baru, custom program by request, dan full stack dev yang turun dari backend sampai tombolnya enak dipakai.",
  bio:
    'Saya membangun <em>custom software</em> di titik temu antara kebutuhan lapangan, backend logic, dan interface yang tidak bikin operator tersesat. Fokus saya sekarang: membuat system by request, dari dashboard admin, automation, scraper, bot, mobile app, sampai web yang siap <b>di-deploy</b> dan dipakai.',
  facts: [
    ["based in", "Surabaya, ID"],
    ["experience", "1 year"],
    ["focus", "Request-based systems"],
    ["education", "Self-directed software engineering"],
    ["languages", "Bahasa / English"],
    ["open to", "Remote, Hybrid"]
  ],
  now: [
    "Refining office automation: dashboards, WhatsApp flow, Excel export",
    "Learning better deployment, SEO, and public repository storytelling",
    "Maintaining request-based internal tools for reporting, monitoring, and daily office workflows",
    "Improving scraper and automation pipelines so repeated data work can run with cleaner logs and safer exports"
  ]
};

export const stack = {
  Languages: ["JavaScript", "TypeScript", "PHP", "SQL", "Lua"],
  Frameworks: ["Next.js", "React", "Laravel", "Express", "Expo"],
  "Infra & Data": ["SQLite", "MongoDB", "Firebase", "Vercel", "Socket.IO"],
  "Tools & Craft": ["Codex", "Antigravity", "Git", "Puppeteer", "ExcelJS"]
};

export const works: Work[] = [
  {
    slug: "company-office-suite",
    year: "2026",
    title: "Company Office Suite",
    description: "Mobile app + web admin for office workflows, reports, QR utilities, maps, exports, and sync.",
    tags: ["EXPO", "REACT", "EXPRESS", "SQLITE"],
    source: "Project/Program Kantor",
    demo: {
      mode: "office command center",
      stats: ["48 check-ins", "7 pending reports", "3 XLSX exports", "98% sync"],
      structure: ["mobile/App.js", "mobile/serverV4.1.js", "web-admin/src"]
    }
  },
  {
    slug: "company-tools-hub",
    year: "2026",
    title: "Company Tools Hub",
    description: "Unified Node.js tools hub for procurement snapshots, sales logs, WhatsApp automation, and scheduled jobs.",
    tags: ["NODE", "SOCKET.IO", "PUPPETEER", "EXCELJS"],
    source: "Project/Tools kebutuhan kantor",
    demo: {
      mode: "automation monitor",
      stats: ["1,280 sales rows", "26 snapshot jobs", "WA ready", "cron online"],
      structure: ["server.js", "public/app.js", "scrapers/marketplace-a.js", "scrapers/marketplace-b.js"]
    }
  },
  {
    slug: "twitter-sna-scraper",
    year: "2026",
    title: "Twitter SNA Scraper",
    description: "Crawler and dashboard for Social Network Analysis with nodes, edges, raw tweets, and Gephi-ready CSV.",
    tags: ["NODE", "EXPRESS", "CSV", "GEPHI"],
    source: "Project/Twitter scraping",
    demo: {
      mode: "network export",
      stats: ["612 nodes", "1,944 edges", "2,500 raw tweets", "CSV export"],
      structure: ["index.js", "server.js", "src/scraper.js", "src/network-parser.js"]
    }
  },
  {
    slug: "auto-store-v2",
    year: "2026",
    title: "Auto Store v2",
    description: "Discord commerce bot with slash commands, balance flow, product stock, webhook topups, and web admin.",
    tags: ["DISCORD.JS", "EXPRESS", "SQL.JS", "MONGODB"],
    source: "Project/BIGPROJECT/auto-store-v2",
    demo: {
      mode: "discord store flow",
      stats: ["42 products", "9 queued orders", "18 topups", "panel live"],
      structure: ["index.js", "commands/admin", "systems/purchaseSystem.js", "web/server.js"]
    }
  },
  {
    slug: "company-website",
    year: "2026",
    title: "Company Website",
    description: "Laravel company platform with secure headers, sitemap utilities, crawler packages, and Vite assets.",
    tags: ["LARAVEL", "PHP", "TAILWIND", "VITE"],
    source: "Project/company-web",
    demo: {
      mode: "company web ops",
      stats: ["24 routes", "sitemap ready", "secure headers", "Vite build"],
      structure: ["app/Http", "routes", "resources", "database/migrations", "public"]
    }
  },
  {
    slug: "proxy-seller-panel",
    year: "2026",
    title: "Proxy Seller Panel",
    description: "VPS tooling and dashboard prototype for provisioning, monitoring, and maintaining proxy seller nodes.",
    tags: ["NODE", "LINUX", "SHELL", "DASHBOARD"],
    source: "Project/BIGPROJECT/proxy-seller",
    demo: {
      mode: "vps seller panel",
      stats: ["12 nodes", "99.1% uptime", "Ubuntu installer", "legacy archived"],
      structure: ["install.sh", "setup-ubuntu.sh", "server.js", "dashboard.html"]
    }
  }
];

export const marquee = [
  "last updated 2026-04-30",
  "// portfolio",
  "adrian wahyu septianto",
  "full stack developer",
  "based in surabaya, id",
  "status: available for custom systems",
  "say hi -> adrianwahyuseptianto1@gmail.com"
];
