"use client";

import { type CSSProperties, type ReactNode, useState } from "react";
import type { Work } from "../../portfolio-data";

type MenuItem = {
  id: string;
  label: string;
  tone?: string;
};

export default function DemoExperience({ work }: { work: Work }) {
  if (work.slug === "company-office-suite") return <OfficeSuiteDemo />;
  if (work.slug === "company-tools-hub") return <ToolsHubDemo />;
  if (work.slug === "twitter-sna-scraper") return <TwitterSnaDemo />;
  if (work.slug === "auto-store-v2") return <AutoStoreDemo />;
  if (work.slug === "company-website") return <CompanyWebsiteDemo />;
  return <ProxySellerDemo />;
}

function OfficeSuiteDemo() {
  const menus: MenuItem[] = [
    { id: "home", label: "Menu Aplikasi", tone: "#1f7fd3" },
    { id: "pricelist", label: "Pricelist", tone: "#08bdd3" },
    { id: "stock", label: "Cek Stock Gudang", tone: "#259be8" },
    { id: "attendance", label: "Absensi & Kunjungan", tone: "#ff9800" },
    { id: "request", label: "Permintaan SPH", tone: "#2a9ceb" },
    { id: "marketing", label: "Order Marketing", tone: "#7c3ee6" },
    { id: "checklist", label: "Checklist Gudang", tone: "#009b8b" },
    { id: "delivery", label: "Pengiriman", tone: "#48af50" },
    { id: "reports", label: "Laporan Penjualan", tone: "#ff572f" },
    { id: "admin", label: "Developer Tools", tone: "#e91e63" }
  ];
  const [active, setActive] = useState("home");
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState(false);
  const selected = menus.find((item) => item.id === active) ?? menus[0];

  return (
    <section className="project-lab office-lab">
      <DemoSidebar title="Office suite" items={menus} active={active} onSelect={setActive} />
      <div className="lab-stage">
        <div className="device-row">
          <PhoneShell tone={selected.tone ?? "#1f7fd3"}>
            {active === "home" && <OfficeHome menus={menus.filter((item) => item.id !== "home")} onSelect={setActive} />}
            {active === "pricelist" && <PricelistScreen query={query} setQuery={setQuery} />}
            {active === "stock" && <StockScreen query={query} setQuery={setQuery} />}
            {active === "attendance" && <AttendanceScreen checked={checked} setChecked={setChecked} />}
            {active === "checklist" && <ChecklistScreen checked={checked} setChecked={setChecked} />}
            {active !== "home" && active !== "pricelist" && active !== "stock" && active !== "attendance" && active !== "checklist" && (
              <OfficeModuleScreen menu={selected} />
            )}
          </PhoneShell>

          <WebAdminPreview active={selected.label} />
        </div>
      </div>
    </section>
  );
}

function ToolsHubDemo() {
  const menus: MenuItem[] = [
    { id: "monitor", label: "Monitor" },
    { id: "snapshots", label: "Procurement Snapshots" },
    { id: "whatsapp", label: "WhatsApp Queue" },
    { id: "exports", label: "Sales Export" },
    { id: "scheduler", label: "Scheduler" }
  ];
  const [active, setActive] = useState("monitor");
  const [runs, setRuns] = useState(26);

  return (
    <section className="project-lab">
      <DemoSidebar title="Tools hub" items={menus} active={active} onSelect={setActive} />
      <div className="lab-stage">
        <LabHeader title={menus.find((item) => item.id === active)?.label ?? "Monitor"} action="Run job" onAction={() => setRuns((value) => value + 1)} />
        <MetricStrip items={[["Snapshots", String(runs)], ["WA Session", "Ready"], ["Exports", "14 files"], ["Cron", "Online"]]} />
        <WorkbenchGrid>
          <LogPanel lines={[
            `module: ${active}`,
            "source: Project/Tools kebutuhan kantor",
            "dummy: real client data removed",
            active === "whatsapp" ? "queue: 8 messages waiting" : "status: job completed"
          ]} />
          <DataList title="Latest automation output" rows={[
            ["Marketplace snapshot", "Success", "09:12"],
            ["Sales log export", "Ready", "09:16"],
            ["WhatsApp reminder", active === "whatsapp" ? "Queued" : "Idle", "09:20"],
            ["Daily cleanup", "Scheduled", "23:00"]
          ]} />
        </WorkbenchGrid>
      </div>
    </section>
  );
}

function TwitterSnaDemo() {
  const menus: MenuItem[] = [
    { id: "setup", label: "Scrape Setup" },
    { id: "graph", label: "Network Graph" },
    { id: "nodes", label: "Nodes Table" },
    { id: "edges", label: "Edges Export" },
    { id: "raw", label: "Raw Tweets" }
  ];
  const [active, setActive] = useState("setup");
  const [keyword, setKeyword] = useState("surabaya");
  const nodes = keyword.length > 7 ? 744 : 612;

  return (
    <section className="project-lab">
      <DemoSidebar title="SNA scraper" items={menus} active={active} onSelect={setActive} />
      <div className="lab-stage">
        <div className="lab-search">
          <label>
            Keyword
            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} />
          </label>
          <button onClick={() => setKeyword("custom request")}>Load sample</button>
        </div>
        <MetricStrip items={[["Nodes", String(nodes)], ["Edges", "1,944"], ["Raw tweets", "2,500"], ["Export", "Gephi CSV"]]} />
        {active === "graph" ? <NetworkGraph /> : (
          <WorkbenchGrid>
            <DataList title={menus.find((item) => item.id === active)?.label ?? "Scrape"} rows={[
              [`${keyword}_user_01`, "mentioned", "42"],
              [`${keyword}_user_02`, "replied", "18"],
              [`${keyword}_user_03`, "retweeted", "31"],
              [`${keyword}_user_04`, "edge-weight", "11"]
            ]} />
            <LogPanel lines={["login: browser profile ready", "parse: nodes.csv", "parse: edges.csv", "export: tweets_raw.csv"]} />
          </WorkbenchGrid>
        )}
      </div>
    </section>
  );
}

function AutoStoreDemo() {
  const menus: MenuItem[] = [
    { id: "panel", label: "Discord Panel" },
    { id: "products", label: "Products" },
    { id: "orders", label: "Orders" },
    { id: "topups", label: "Topups" },
    { id: "config", label: "Admin Config" }
  ];
  const [active, setActive] = useState("panel");
  const [balance, setBalance] = useState(120);
  const [orders, setOrders] = useState(9);

  return (
    <section className="project-lab">
      <DemoSidebar title="Auto store" items={menus} active={active} onSelect={setActive} />
      <div className="lab-stage">
        <LabHeader title={menus.find((item) => item.id === active)?.label ?? "Discord Panel"} action="Webhook topup" onAction={() => setBalance((value) => value + 25)} />
        <MetricStrip items={[["Balance", `${balance} WL`], ["Orders", String(orders)], ["Topups", "18"], ["Panel", "Live"]]} />
        <div className="store-products">
          {[
            ["PKT-A", "Starter Pack", 35],
            ["PKT-B", "Builder Pack", 50],
            ["PKT-C", "Premium Pack", 80]
          ].map(([code, name, price]) => (
            <button key={code} onClick={() => {
              if (balance >= Number(price)) {
                setBalance((value) => value - Number(price));
                setOrders((value) => value + 1);
              }
            }}>
              <span>{code}</span>
              <strong>{name}</strong>
              <em>{price} WL</em>
            </button>
          ))}
        </div>
        <LogPanel lines={["slash command: /stock", "button: buy product", "modal: growid registration", "dm delivery: dummy stock file"]} />
      </div>
    </section>
  );
}

function CompanyWebsiteDemo() {
  const menus: MenuItem[] = [
    { id: "pages", label: "Pages" },
    { id: "seo", label: "SEO" },
    { id: "sitemap", label: "Sitemap" },
    { id: "crawler", label: "Crawler" },
    { id: "content", label: "Content" }
  ];
  const [active, setActive] = useState("pages");

  return (
    <section className="project-lab">
      <DemoSidebar title="Company web" items={menus} active={active} onSelect={setActive} />
      <div className="lab-stage">
        <SitePreview active={active} setActive={setActive} />
        <MetricStrip items={[["Routes", "24"], ["Sitemap", "Ready"], ["Headers", "Secure"], ["Build", "Vite"]]} />
      </div>
    </section>
  );
}

function ProxySellerDemo() {
  const menus: MenuItem[] = [
    { id: "nodes", label: "Nodes" },
    { id: "installer", label: "Installer" },
    { id: "accounts", label: "Accounts" },
    { id: "logs", label: "Logs" },
    { id: "health", label: "Health" }
  ];
  const [active, setActive] = useState("nodes");
  const [count, setCount] = useState(12);

  return (
    <section className="project-lab">
      <DemoSidebar title="Proxy panel" items={menus} active={active} onSelect={setActive} />
      <div className="lab-stage">
        <LabHeader title={menus.find((item) => item.id === active)?.label ?? "Nodes"} action="Provision node" onAction={() => setCount((value) => value + 1)} />
        <MetricStrip items={[["Active nodes", String(count)], ["Uptime", "99.1%"], ["Installer", "Ubuntu"], ["Mode", "Seller"]]} />
        <DataList title="Node status" rows={[
          ["sg-01", "online", "31ms"],
          ["sg-02", "online", "36ms"],
          ["id-01", active === "health" ? "warning" : "online", "82ms"],
          ["jp-01", "online", "44ms"]
        ]} />
      </div>
    </section>
  );
}

function DemoSidebar({ title, items, active, onSelect }: { title: string; items: MenuItem[]; active: string; onSelect: (id: string) => void }) {
  return (
    <aside className="demo-sidebar">
      <strong>{title}</strong>
      {items.map((item) => (
        <button className={active === item.id ? "active" : ""} key={item.id} onClick={() => onSelect(item.id)}>
          {item.label}
        </button>
      ))}
    </aside>
  );
}

function PhoneShell({ tone, children }: { tone: string; children: ReactNode }) {
  return (
    <div className="phone-shell" style={{ "--phone-tone": tone } as CSSProperties}>
      <div className="phone-status"><span>11:19</span><span>Wi-Fi 47%</span></div>
      {children}
    </div>
  );
}

function OfficeHome({ menus, onSelect }: { menus: MenuItem[]; onSelect: (id: string) => void }) {
  return (
    <>
      <div className="mobile-hero">
        <h2>Halo, Adrian Wahyu Septianto</h2>
        <p>IT & ADMIN ONLINE</p>
        <div><span>Connect</span><span>Jam Server</span></div>
      </div>
      <h3 className="mobile-title">Menu Aplikasi</h3>
      <div className="mobile-menu-grid">
        {menus.map((menu) => (
          <button key={menu.id} onClick={() => onSelect(menu.id)}>
            <i style={{ background: menu.tone }} />
            <span>{menu.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function PricelistScreen({ query, setQuery }: { query: string; setQuery: (value: string) => void }) {
  const items = ["Filtek Universal Restorative Fullset", "Filtek Z250 Universal Restorative", "Filtek Z350 XT", "Single Bond 2 Adper", "Single Bond Universal", "Bola Tensi + Pentil ABN"];
  const filtered = items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  return (
    <MobileList title="Pricelist Umum & Gigi" subtitle={`${filtered.length || 631} item`} query={query} setQuery={setQuery} placeholder="Cari nama barang...">
      {(filtered.length ? filtered : items).map((item) => <MobileCard key={item} label={item} meta={item.includes("Filtek") ? "3M / GIGI" : "ABN / UMUM"} />)}
    </MobileList>
  );
}

function StockScreen({ query, setQuery }: { query: string; setQuery: (value: string) => void }) {
  const rows = query.length > 1 ? ["Sarung tangan nitrile - 42 box", "Masker medis - 180 pack", "Alkohol swab - 75 box"] : [];
  return (
    <MobileList title="Cek Stock" query={query} setQuery={setQuery} placeholder="Kata kunci: nama, kode, ukuran.">
      {rows.length ? rows.map((row) => <MobileCard key={row} label={row} meta="Gudang utama" />) : <EmptyMobile text="Ketik minimal 2 karakter untuk mencari" />}
    </MobileList>
  );
}

function AttendanceScreen({ checked, setChecked }: { checked: boolean; setChecked: (value: boolean) => void }) {
  return (
    <div className="mobile-screen">
      <MobileTop title="Absensi & Kunjungan" />
      <div className="profile-strip"><i /> <div><strong>Adrian Wahyu Septianto</strong><span>IT & ADMIN ONLINE</span></div></div>
      <div className="status-card"><span>Status Hari Ini</span><strong>{checked ? "SUDAH ABSEN" : "SEDANG BEKERJA"}</strong><em>Check In: 07.58</em></div>
      <div className="action-grid">
        <button onClick={() => setChecked(!checked)}>ABSEN<span>Masuk/Pulang</span></button>
        <button>Mulai<span>Kunjungan</span></button>
        <button>Selesai<span>Kunjungan</span></button>
      </div>
    </div>
  );
}

function ChecklistScreen({ checked, setChecked }: { checked: boolean; setChecked: (value: boolean) => void }) {
  return (
    <div className="mobile-screen">
      <MobileTop title="Checklist Gudang" />
      <div className="tabs"><button className={!checked ? "active" : ""} onClick={() => setChecked(false)}>Belum Dicek</button><button className={checked ? "active" : ""} onClick={() => setChecked(true)}>Sudah Dicek</button></div>
      <div className="month-pill">Mei 2026</div>
      {checked ? <MobileCard label="ORD-2026-014 sudah dicek" meta="Customer dummy / Sales A" /> : <EmptyMobile text="Memuat data dummy..." />}
    </div>
  );
}

function OfficeModuleScreen({ menu }: { menu: MenuItem }) {
  return (
    <MobileList title={menu.label} placeholder="Cari data dummy..." query="" setQuery={() => {}}>
      <MobileCard label="DUMMY-001 / Customer Sample" meta="Status: Pending" />
      <MobileCard label="DUMMY-002 / Internal Request" meta="Status: Admin review" />
      <MobileCard label="DUMMY-003 / Export Ready" meta="Status: Approved" />
    </MobileList>
  );
}

function MobileList({ title, subtitle, query, setQuery, placeholder, children }: { title: string; subtitle?: string; query: string; setQuery: (value: string) => void; placeholder: string; children: ReactNode }) {
  return (
    <div className="mobile-screen">
      <MobileTop title={title} subtitle={subtitle} />
      <label className="mobile-search">
        <span>⌕</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} />
      </label>
      <div className="mobile-list">{children}</div>
    </div>
  );
}

function MobileTop({ title, subtitle }: { title: string; subtitle?: string }) {
  return <div className="mobile-top"><span>←</span><div><strong>{title}</strong>{subtitle && <em>{subtitle}</em>}</div><span>≡</span></div>;
}

function MobileCard({ label, meta }: { label: string; meta: string }) {
  return <article className="mobile-card"><small>{meta}</small><strong>{label}</strong><span>⌄</span></article>;
}

function EmptyMobile({ text }: { text: string }) {
  return <div className="empty-mobile"><i /> <span>{text}</span></div>;
}

function WebAdminPreview({ active }: { active: string }) {
  return (
    <div className="web-admin-preview">
      <aside>
        <strong>Admin Panel</strong>
        {["Cek Stock", "Pricelist", "SPH Tickets", "Order Marketing", "Absensi", "Checklist Gudang", "Pengiriman", "Laporan Penjualan"].map((item) => <span className={active.includes(item) ? "active" : ""} key={item}>{item}</span>)}
      </aside>
      <section>
        <h2>{active}</h2>
        <p>Daftar form, validasi admin, dan export dummy untuk memperlihatkan workflow web admin.</p>
        <div className="admin-tabs"><span>Pending 0</span><span>Admin 5</span><span>Input 349</span></div>
        <DataList title="Preview table" rows={[["No Order", "Tanggal", "Status"], ["ORD-001", "02 Mei 2026", "Pending"], ["ORD-002", "02 Mei 2026", "Approved"]]} />
      </section>
    </div>
  );
}

function LabHeader({ title, action, onAction }: { title: string; action: string; onAction: () => void }) {
  return (
    <div className="lab-header">
      <h2>{title}</h2>
      <button onClick={onAction}>{action}</button>
    </div>
  );
}

function MetricStrip({ items }: { items: Array<[string, string]> }) {
  return <div className="metric-strip">{items.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>;
}

function WorkbenchGrid({ children }: { children: ReactNode }) {
  return <div className="workbench-grid">{children}</div>;
}

function LogPanel({ lines }: { lines: string[] }) {
  return <div className="log-panel">{lines.map((line) => <code key={line}>-&gt; {line}</code>)}</div>;
}

function DataList({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="data-list">
      <h3>{title}</h3>
      {rows.map((row) => <div key={row.join("-")}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}
    </div>
  );
}

function NetworkGraph() {
  return <div className="network-board">{Array.from({ length: 24 }).map((_, index) => <span key={index} style={{ "--x": `${8 + ((index * 23) % 84)}%`, "--y": `${12 + ((index * 31) % 72)}%` } as CSSProperties} />)}</div>;
}

function SitePreview({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  return (
    <div className="site-preview">
      <nav>{["pages", "seo", "sitemap", "crawler", "content"].map((item) => <button className={active === item ? "active" : ""} key={item} onClick={() => setActive(item)}>{item}</button>)}</nav>
      <div>
        <h2>{active}</h2>
        <p>Dummy company content rendered as a safe public preview. Sitemap, secure headers, crawler utilities, and route structure are represented without exposing real client data.</p>
      </div>
    </div>
  );
}
