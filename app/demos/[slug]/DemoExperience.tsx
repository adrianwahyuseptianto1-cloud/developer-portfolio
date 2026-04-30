"use client";

import { useMemo, useState } from "react";
import type { Work } from "../../portfolio-data";

export default function DemoExperience({ work }: { work: Work }) {
  if (work.slug === "company-office-suite") return <OfficeSuiteDemo />;
  if (work.slug === "company-tools-hub") return <ToolsHubDemo />;
  if (work.slug === "twitter-sna-scraper") return <TwitterSnaDemo />;
  if (work.slug === "auto-store-v2") return <AutoStoreDemo />;
  if (work.slug === "company-website") return <CompanyWebsiteDemo />;
  return <ProxySellerDemo />;
}

function OfficeSuiteDemo() {
  const [status, setStatus] = useState("All branches synced");
  const [queue, setQueue] = useState(7);
  const rows = [
    ["08:12", "Field Visit", "Submitted", "Surabaya Barat"],
    ["09:40", "Stock Audit", "Need review", "Warehouse"],
    ["10:25", "QR Delivery", "Submitted", "Surabaya Timur"],
    ["13:10", "Expense Report", "Draft", "Office"]
  ];

  return (
    <section className="app-demo office-demo">
      <DemoSidebar title="Office suite" items={["Dashboard", "Reports", "Check-ins", "Export"]} />
      <div className="demo-workspace">
        <DemoToolbar title="Operations dashboard" action="Generate XLSX" onAction={() => {
          setStatus("Export queued as company-report.xlsx");
          setQueue((value) => value + 1);
        }} />
        <div className="kpi-grid">
          <Kpi label="Today check-ins" value="48" />
          <Kpi label="Pending reports" value={String(queue)} />
          <Kpi label="Device sync" value="98%" />
          <Kpi label="QR jobs" value="16" />
        </div>
        <div className="demo-table">
          {rows.map((row) => (
            <div className="table-row" key={row.join("-")}>
              {row.map((cell) => <span key={cell}>{cell}</span>)}
            </div>
          ))}
        </div>
        <p className="demo-status">{status}</p>
      </div>
    </section>
  );
}

function ToolsHubDemo() {
  const [job, setJob] = useState("Idle");
  const [snapshots, setSnapshots] = useState(26);
  const logs = useMemo(() => [
    "cron: marketplace snapshot checked",
    "whatsapp: session ready",
    "excel: sales_log.xlsx generated",
    `scraper: ${job.toLowerCase()}`
  ], [job]);

  return (
    <section className="app-demo tools-demo">
      <DemoSidebar title="Tools hub" items={["Monitor", "Scrapers", "WhatsApp", "Exports"]} />
      <div className="demo-workspace">
        <DemoToolbar title="Automation monitor" action="Run scraper" onAction={() => {
          setJob("Marketplace scraper completed");
          setSnapshots((value) => value + 1);
        }} />
        <div className="kpi-grid">
          <Kpi label="Snapshots" value={String(snapshots)} />
          <Kpi label="Sales rows" value="1,280" />
          <Kpi label="WA session" value="Ready" />
          <Kpi label="Cron" value="Online" />
        </div>
        <div className="log-panel">
          {logs.map((log) => <code key={log}>-&gt; {log}</code>)}
        </div>
      </div>
    </section>
  );
}

function TwitterSnaDemo() {
  const [keyword, setKeyword] = useState("surabaya");
  const nodes = keyword.length > 6 ? 744 : 612;

  return (
    <section className="app-demo sna-demo">
      <DemoSidebar title="SNA scraper" items={["Scrape", "Nodes", "Edges", "Export"]} />
      <div className="demo-workspace">
        <div className="demo-toolbar">
          <div>
            <span>Query</span>
            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} aria-label="SNA keyword" />
          </div>
          <button onClick={() => setKeyword("custom request")}>Load sample</button>
        </div>
        <div className="network-board">
          {Array.from({ length: 18 }).map((_, index) => (
            <span key={index} style={{ "--x": `${12 + ((index * 19) % 76)}%`, "--y": `${18 + ((index * 31) % 64)}%` } as React.CSSProperties} />
          ))}
        </div>
        <div className="kpi-grid">
          <Kpi label="Nodes" value={String(nodes)} />
          <Kpi label="Edges" value="1,944" />
          <Kpi label="Raw tweets" value="2,500" />
          <Kpi label="Export" value="CSV" />
        </div>
      </div>
    </section>
  );
}

function AutoStoreDemo() {
  const [balance, setBalance] = useState(120);
  const [orders, setOrders] = useState(9);
  const products = [
    ["PKT-A", "Starter Pack", 35],
    ["PKT-B", "Builder Pack", 50],
    ["PKT-C", "Premium Pack", 80]
  ] as const;

  return (
    <section className="app-demo store-demo">
      <DemoSidebar title="Auto store" items={["Stock", "Orders", "Topups", "Users"]} />
      <div className="demo-workspace">
        <DemoToolbar title={`User balance: ${balance} WL`} action="Webhook topup" onAction={() => setBalance((value) => value + 25)} />
        <div className="product-grid">
          {products.map(([code, name, price]) => (
            <button key={code} onClick={() => {
              if (balance >= price) {
                setBalance((value) => value - price);
                setOrders((value) => value + 1);
              }
            }}>
              <span>{code}</span>
              <strong>{name}</strong>
              <em>{price} WL</em>
            </button>
          ))}
        </div>
        <div className="kpi-grid">
          <Kpi label="Queued orders" value={String(orders)} />
          <Kpi label="Topups" value="18" />
          <Kpi label="Stock panel" value="Live" />
          <Kpi label="DM delivery" value="Ready" />
        </div>
      </div>
    </section>
  );
}

function CompanyWebsiteDemo() {
  const [page, setPage] = useState("Home");
  const pages = ["Home", "About", "Catalog", "Contact"];

  return (
    <section className="app-demo website-demo">
      <DemoSidebar title="Company web" items={["Pages", "SEO", "Crawler", "Build"]} />
      <div className="demo-workspace">
        <div className="site-preview">
          <nav>
            {pages.map((item) => <button className={page === item ? "active" : ""} key={item} onClick={() => setPage(item)}>{item}</button>)}
          </nav>
          <div>
            <h2>{page}</h2>
            <p>Dummy company content rendered as a safe public preview. Sitemap, headers, and route structure are represented without exposing real client data.</p>
          </div>
        </div>
        <div className="kpi-grid">
          <Kpi label="Routes" value="24" />
          <Kpi label="Sitemap" value="Ready" />
          <Kpi label="Headers" value="Secure" />
          <Kpi label="Build" value="Vite" />
        </div>
      </div>
    </section>
  );
}

function ProxySellerDemo() {
  const [active, setActive] = useState(12);
  const nodes = ["sg-01", "sg-02", "id-01", "jp-01", "us-01"];

  return (
    <section className="app-demo proxy-demo">
      <DemoSidebar title="Proxy panel" items={["Nodes", "Installer", "Health", "Logs"]} />
      <div className="demo-workspace">
        <DemoToolbar title="Seller node monitor" action="Provision node" onAction={() => setActive((value) => value + 1)} />
        <div className="node-list">
          {nodes.map((node, index) => (
            <div key={node}>
              <span>{node}</span>
              <strong>{index === 2 ? "warning" : "online"}</strong>
              <em>{index === 2 ? "82ms" : "31ms"}</em>
            </div>
          ))}
        </div>
        <div className="kpi-grid">
          <Kpi label="Active nodes" value={String(active)} />
          <Kpi label="Uptime" value="99.1%" />
          <Kpi label="Installer" value="Ubuntu" />
          <Kpi label="Panel" value="Live" />
        </div>
      </div>
    </section>
  );
}

function DemoSidebar({ title, items }: { title: string; items: string[] }) {
  return (
    <aside className="demo-sidebar">
      <strong>{title}</strong>
      {items.map((item) => <span key={item}>{item}</span>)}
    </aside>
  );
}

function DemoToolbar({ title, action, onAction }: { title: string; action: string; onAction: () => void }) {
  return (
    <div className="demo-toolbar">
      <h2>{title}</h2>
      <button onClick={onAction}>{action}</button>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="kpi">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
