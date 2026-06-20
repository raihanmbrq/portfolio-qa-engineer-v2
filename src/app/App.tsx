import { useState, useEffect, useRef } from "react";
import {
  Monitor,
  Server,
  Database,
  GitBranch,
  X,
  Play,
  CheckCircle2,
  RefreshCw,
  Zap,
  Shield,
  Activity,
  ChevronRight,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  name: string;
  summary: string;
  frameworks: string[];
  status: "PASSED" | "RETRIED";
  impact: string;
  assignee: string;
  priority: "HIGH" | "MEDIUM" | "CRITICAL";
}

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: { name: string; level: number }[];
  tools: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: "QA-4821",
    name: "E-Commerce Checkout Flow",
    summary: "End-to-end regression suite for multi-currency payment gateway integration across 14 locales.",
    frameworks: ["Selenium", "TestNG", "Allure"],
    status: "PASSED",
    impact: "Reduced release defect rate by 78% over 3 sprints",
    assignee: "A. Rivera",
    priority: "CRITICAL",
  },
  {
    id: "QA-3904",
    name: "Mobile Banking API Suite",
    summary: "Contract-driven API validation for REST endpoints with schema drift detection and load profiling.",
    frameworks: ["Postman", "Newman", "k6"],
    status: "RETRIED",
    impact: "Caught 23 breaking changes before production merge",
    assignee: "A. Rivera",
    priority: "HIGH",
  },
  {
    id: "QA-5117",
    name: "Native iOS & Android App",
    summary: "Cross-platform UI automation for core user journeys on real device cloud infrastructure.",
    frameworks: ["Appium", "WebdriverIO", "BrowserStack"],
    status: "PASSED",
    impact: "90% test coverage across 8 device/OS configurations",
    assignee: "A. Rivera",
    priority: "HIGH",
  },
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    icon: <Monitor size={18} />,
    title: "Frontend Testing",
    skills: [
      { name: "Selenium WebDriver", level: 96 },
      { name: "Cypress", level: 88 },
      { name: "Playwright", level: 82 },
      { name: "TestNG / JUnit", level: 94 },
    ],
    tools: ["Allure", "ExtentReports", "Sauce Labs"],
  },
  {
    icon: <Server size={18} />,
    title: "Backend / API Validation",
    skills: [
      { name: "Postman / Newman", level: 97 },
      { name: "REST Assured", level: 90 },
      { name: "k6 Load Testing", level: 79 },
      { name: "Contract Testing", level: 85 },
    ],
    tools: ["Pact", "Swagger", "WireMock"],
  },
  {
    icon: <Database size={18} />,
    title: "Databases / SQL",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MySQL", level: 85 },
      { name: "Test Data Management", level: 91 },
      { name: "Data Validation", level: 93 },
    ],
    tools: ["DBeaver", "Flyway", "Liquibase"],
  },
  {
    icon: <GitBranch size={18} />,
    title: "DevOps / CI-CD",
    skills: [
      { name: "Jenkins Pipelines", level: 87 },
      { name: "GitHub Actions", level: 92 },
      { name: "Docker Containers", level: 80 },
      { name: "JIRA / Xray", level: 95 },
    ],
    tools: ["SonarQube", "ArgoCD", "Grafana"],
  },
];

const LOG_LINES = [
  { type: "info", text: "Initializing test runner — TestNG 7.8.0" },
  { type: "info", text: "Loading configuration from testng.xml..." },
  { type: "info", text: "Detected 3 test suites, 247 test methods" },
  { type: "pass", text: "[PASS] CheckoutFlow.testAddToCart — 312ms" },
  { type: "pass", text: "[PASS] CheckoutFlow.testApplyCoupon — 189ms" },
  { type: "pass", text: "[PASS] AuthSuite.testLoginValid — 244ms" },
  { type: "retry", text: "[RETRY] PaymentGateway.testStripeWebhook — timeout 5000ms" },
  { type: "pass", text: "[PASS] PaymentGateway.testStripeWebhook — 4821ms (retry #1)" },
  { type: "pass", text: "[PASS] APIValidation.testUserEndpoint — 88ms" },
  { type: "pass", text: "[PASS] APIValidation.testOrderSchema — 102ms" },
  { type: "pass", text: "[PASS] MobileSuite.testOnboardingFlow — 1.2s" },
  { type: "info", text: "─────────────────────────────────────────────" },
  { type: "pass", text: "Tests run: 247  |  Passed: 246  |  Retried: 1  |  Failed: 0" },
  { type: "info", text: "Bug detection rate: 99.3%  |  Build: STABLE" },
  { type: "pass", text: "✓ Pipeline completed in 4m 31s — All gates green" },
];

// ─── NavBar ──────────────────────────────────────────────────────────────────

function NavBar({ activeSection }: { activeSection: string }) {
  const links = [
    { label: "Home", href: "#home" },
    { label: "Test Suite", href: "#projects" },
    { label: "Bug Log", href: "#projects" },
    { label: "Tech Stack", href: "#techstack" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14"
      style={{
        background: "rgba(18,18,20,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div className="flex items-center gap-2">
        <span style={{ color: "#4AF626", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.12em" }}>
          [&nbsp;QA&nbsp;]
        </span>
        <span style={{ color: "#6C7086", fontSize: "0.7rem", letterSpacing: "0.08em" }}>v2.4.1</span>
      </div>

      <div className="flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            style={{
              color: activeSection === l.label ? "#4AF626" : "#6C7086",
              fontSize: "0.78rem",
              letterSpacing: "0.05em",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (activeSection !== l.label) (e.target as HTMLElement).style.color = "#E8E8F0";
            }}
            onMouseLeave={(e) => {
              if (activeSection !== l.label) (e.target as HTMLElement).style.color = "#6C7086";
            }}
          >
            {l.label}
          </a>
        ))}
      </div>

      <div
        className="flex items-center gap-2 px-3 py-1 rounded-full"
        style={{ background: "rgba(74,246,38,0.08)", border: "1px solid rgba(74,246,38,0.2)" }}
      >
        <span
          className="animate-pulse"
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#4AF626", display: "inline-block" }}
        />
        <span style={{ color: "#4AF626", fontSize: "0.68rem", letterSpacing: "0.1em", fontFamily: "'JetBrains Mono', monospace" }}>
          System Status: STABLE
        </span>
      </div>
    </nav>
  );
}

// ─── IDE Window ──────────────────────────────────────────────────────────────

function IDEWindow() {
  const lines = [
    { ln: "01", tokens: [{ c: "#6C7086", t: "// E2E Checkout Regression Suite" }] },
    { ln: "02", tokens: [] as { c: string; t: string }[] },
    { ln: "03", tokens: [{ c: "#00E5FF", t: "@Suite" }, { c: "#E8E8F0", t: "(name = " }, { c: "#FF9100", t: '"CheckoutSuite"' }, { c: "#E8E8F0", t: ")" }] },
    { ln: "04", tokens: [{ c: "#4AF626", t: "public class" }, { c: "#E8E8F0", t: " CheckoutTests " }, { c: "#6C7086", t: "{" }] },
    { ln: "05", tokens: [] as { c: string; t: string }[] },
    { ln: "06", tokens: [{ c: "#6C7086", t: "  " }, { c: "#00E5FF", t: "@BeforeClass" }] },
    { ln: "07", tokens: [{ c: "#4AF626", t: "  void" }, { c: "#E8E8F0", t: " setUp() " }, { c: "#6C7086", t: "{" }] },
    { ln: "08", tokens: [{ c: "#E8E8F0", t: "    driver = WebDriver" }, { c: "#6C7086", t: "." }, { c: "#00E5FF", t: "init" }, { c: "#E8E8F0", t: "(CHROME);" }] },
    { ln: "09", tokens: [{ c: "#6C7086", t: "  }" }] },
    { ln: "10", tokens: [] as { c: string; t: string }[] },
    { ln: "11", tokens: [{ c: "#00E5FF", t: "  @Test" }, { c: "#E8E8F0", t: "(priority = 1)" }] },
    { ln: "12", tokens: [{ c: "#4AF626", t: "  void" }, { c: "#E8E8F0", t: " testAddToCart() " }, { c: "#6C7086", t: "{" }] },
    { ln: "13", tokens: [{ c: "#E8E8F0", t: "    page" }, { c: "#6C7086", t: "." }, { c: "#00E5FF", t: "navigate" }, { c: "#E8E8F0", t: '("/shop");' }] },
    { ln: "14", tokens: [{ c: "#E8E8F0", t: "    cart" }, { c: "#6C7086", t: "." }, { c: "#00E5FF", t: "add" }, { c: "#E8E8F0", t: "(PRODUCT_ID);" }] },
    { ln: "15", tokens: [{ c: "#00E5FF", t: "    Assert" }, { c: "#6C7086", t: "." }, { c: "#E8E8F0", t: "assertEquals(" }] },
    { ln: "16", tokens: [{ c: "#E8E8F0", t: "      cart" }, { c: "#6C7086", t: "." }, { c: "#00E5FF", t: "count()" }, { c: "#6C7086", t: ", " }, { c: "#FF9100", t: "1" }, { c: "#E8E8F0", t: ");" }] },
    { ln: "17", tokens: [{ c: "#6C7086", t: "  }" }] },
    { ln: "18", tokens: [{ c: "#6C7086", t: "}" }] },
  ];

  return (
    <div
      className="rounded-sm overflow-hidden flex flex-col"
      style={{
        background: "#0D0D10",
        border: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "'JetBrains Mono', monospace",
        height: "420px",
        boxShadow: "0 0 40px rgba(0,229,255,0.06)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ background: "#161618", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-2">
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
        </div>
        <span style={{ color: "#6C7086", fontSize: "0.7rem", letterSpacing: "0.05em" }}>CheckoutTests.java</span>
        <div style={{ color: "#6C7086", fontSize: "0.65rem" }}>TestNG</div>
      </div>

      <div
        className="flex items-center px-2 flex-shrink-0"
        style={{ background: "#141416", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="px-4 py-1"
          style={{
            background: "#0D0D10",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "2px solid #00E5FF",
            fontSize: "0.68rem",
            color: "#E8E8F0",
          }}
        >
          CheckoutTests.java
        </div>
        <div className="px-4 py-1" style={{ fontSize: "0.68rem", color: "#6C7086" }}>
          testng.xml
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3" style={{ scrollbarWidth: "none" }}>
        {lines.map((line) => (
          <div key={line.ln} className="flex items-start gap-4" style={{ minHeight: "1.5rem" }}>
            <span
              style={{
                color: "#3A3A4A",
                fontSize: "0.72rem",
                width: "1.5rem",
                textAlign: "right",
                flexShrink: 0,
                paddingTop: "0.05rem",
              }}
            >
              {line.ln}
            </span>
            <span style={{ fontSize: "0.75rem", lineHeight: "1.5rem" }}>
              {line.tokens.map((tok, i) => (
                <span key={i} style={{ color: tok.c }}>
                  {tok.t}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>

      <div
        className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
        style={{ background: "#161618", borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span style={{ color: "#4AF626", fontSize: "0.7rem" }}>▶</span>
        <span style={{ color: "#6C7086", fontSize: "0.7rem" }}>mvn test -Dsuite=CheckoutSuite</span>
        <span
          className="animate-pulse"
          style={{ width: 7, height: 14, background: "#4AF626", display: "inline-block", opacity: 0.8 }}
        />
      </div>
    </div>
  );
}

// ─── Metric Card ─────────────────────────────────────────────────────────────

function MetricCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div
      className="flex-1 px-4 py-3 rounded-sm"
      style={{
        background: "#1E1E24",
        border: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span style={{ color: "#4AF626" }}>{icon}</span>
        <span style={{ color: "#6C7086", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {label}
        </span>
      </div>
      <div style={{ color: "#E8E8F0", fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
        {value}
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ onRunTest }: { onRunTest: () => void }) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-14"
      style={{ background: "linear-gradient(135deg, #121214 0%, #14141A 100%)" }}
    >
      <div
        className="w-full max-w-7xl mx-auto px-8 grid gap-12 items-center py-16"
        style={{ gridTemplateColumns: "55fr 45fr" }}
      >
        <div>
          <IDEWindow />
        </div>

        <div className="flex flex-col gap-6" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <div>
            <span
              style={{
                color: "#6C7086",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              // QA PORTFOLIO
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              fontWeight: 700,
              color: "#E8E8F0",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Ensuring Code
            <br />
            <span style={{ color: "#4AF626" }}>Flawlessness.</span>
          </h1>

          <p
            style={{
              color: "#6C7086",
              fontSize: "0.85rem",
              lineHeight: 1.8,
              maxWidth: "38ch",
              fontFamily: "Inter, sans-serif",
              margin: 0,
            }}
          >
            Senior QA & Automation Engineer with 8+ years shipping bulletproof test infrastructure. I build the safety
            net that lets teams deploy with confidence — every sprint.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onRunTest}
              className="flex items-center gap-2 px-6 py-3 rounded-sm font-bold"
              style={{
                background: "#4AF626",
                color: "#121214",
                fontSize: "0.82rem",
                letterSpacing: "0.08em",
                border: "none",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(74,246,38,0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <Play size={14} />
              Run Test Suite
            </button>
            <a
              href="#projects"
              className="flex items-center gap-1"
              style={{ color: "#6C7086", fontSize: "0.78rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#00E5FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#6C7086";
              }}
            >
              View Projects <ChevronRight size={14} />
            </a>
          </div>

          <div className="flex gap-3 mt-2">
            <MetricCard value="24,847" label="Tests Run" icon={<Activity size={12} />} />
            <MetricCard value="99.3%" label="Bug Detection" icon={<Shield size={12} />} />
            <MetricCard value="99.98%" label="Uptime" icon={<Zap size={12} />} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  const priorityColor: Record<string, string> = {
    CRITICAL: "#FF9100",
    HIGH: "#00E5FF",
    MEDIUM: "#4AF626",
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#1E1E24",
        border: `1px solid ${hovered ? "#00E5FF" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "2px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 32px rgba(0,229,255,0.18), 0 0 0 1px rgba(0,229,255,0.15)" : "none",
        fontFamily: "'JetBrains Mono', monospace",
        display: "flex",
        flexDirection: "column" as const,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          background: "#161618",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: "#00E5FF", fontSize: "0.68rem", letterSpacing: "0.08em" }}>{project.id}</span>
          <span
            style={{
              background: `${priorityColor[project.priority]}18`,
              border: `1px solid ${priorityColor[project.priority]}40`,
              color: priorityColor[project.priority],
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              padding: "1px 6px",
              borderRadius: "2px",
            }}
          >
            {project.priority}
          </span>
        </div>
        {project.status === "PASSED" ? (
          <div className="flex items-center gap-1.5" style={{ color: "#4AF626" }}>
            <CheckCircle2 size={12} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>PASSED</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5" style={{ color: "#FF9100" }}>
            <RefreshCw size={12} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>RETRIED</span>
          </div>
        )}
      </div>

      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" as const, gap: "12px" }}>
        <div>
          <h3
            style={{
              color: "#E8E8F0",
              fontSize: "0.88rem",
              fontWeight: 600,
              marginBottom: "6px",
              lineHeight: 1.4,
              margin: "0 0 6px 0",
            }}
          >
            {project.name}
          </h3>
          <p style={{ color: "#6C7086", fontSize: "0.72rem", lineHeight: 1.7, margin: 0, fontFamily: "Inter, sans-serif" }}>
            {project.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.frameworks.map((fw) => (
            <span
              key={fw}
              style={{
                background: "rgba(0,229,255,0.07)",
                border: "1px solid rgba(0,229,255,0.15)",
                color: "#00E5FF",
                fontSize: "0.62rem",
                padding: "2px 8px",
                borderRadius: "2px",
                letterSpacing: "0.05em",
              }}
            >
              {fw}
            </span>
          ))}
        </div>

        <div
          style={{
            background: "rgba(74,246,38,0.05)",
            border: "1px solid rgba(74,246,38,0.12)",
            borderRadius: "2px",
            padding: "8px 12px",
          }}
        >
          <span
            style={{
              color: "#4AF626",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              display: "block",
              marginBottom: "2px",
            }}
          >
            QA IMPACT
          </span>
          <span style={{ color: "#C0C0CC", fontSize: "0.72rem" }}>{project.impact}</span>
        </div>

        <div className="flex items-center justify-between">
          <span style={{ color: "#6C7086", fontSize: "0.65rem" }}>Assigned: {project.assignee}</span>
          <span style={{ color: "#3A3A4A", fontSize: "0.62rem" }}>Sprint 24</span>
        </div>
      </div>
    </div>
  );
}

// ─── Test Cases Section ───────────────────────────────────────────────────────

function TestCasesSection() {
  return (
    <section id="projects" style={{ padding: "100px 0", background: "#0F0F12" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12">
          <p
            style={{
              color: "#6C7086",
              fontSize: "0.72rem",
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: "8px",
            }}
          >
            {"/* RECENT PROJECTS */"}
          </p>
          <h2
            style={{
              color: "#E8E8F0",
              fontSize: "1.8rem",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              margin: "0 0 8px 0",
            }}
          >
            Active Test Suite
          </h2>
          <p style={{ color: "#6C7086", fontSize: "0.82rem", fontFamily: "Inter, sans-serif", margin: 0 }}>
            Production-validated automation projects with measurable QA outcomes.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skill Card ───────────────────────────────────────────────────────────────

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div
      style={{
        background: "#1E1E24",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
        padding: "24px",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          style={{
            background: "rgba(0,229,255,0.1)",
            border: "1px solid rgba(0,229,255,0.2)",
            borderRadius: "4px",
            padding: "6px",
            color: "#00E5FF",
            display: "flex",
            alignItems: "center",
          }}
        >
          {category.icon}
        </div>
        <h3 style={{ color: "#E8E8F0", fontSize: "0.88rem", fontWeight: 600, margin: 0 }}>{category.title}</h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px", marginBottom: "20px" }}>
        {category.skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span style={{ color: "#A0A0B0", fontSize: "0.7rem" }}>{skill.name}</span>
              <span style={{ color: "#4AF626", fontSize: "0.7rem" }}>{skill.level}%</span>
            </div>
            <div style={{ height: "5px", background: "#2A2A32", borderRadius: "1px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${skill.level}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #4AF626 0%, #7AFF56 100%)",
                  borderRadius: "1px",
                  boxShadow: "0 0 8px rgba(74,246,38,0.4)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {category.tools.map((t) => (
          <span
            key={t}
            style={{
              background: "#2A2A32",
              color: "#6C7086",
              fontSize: "0.62rem",
              padding: "2px 8px",
              borderRadius: "2px",
              border: "1px solid rgba(255,255,255,0.06)",
              letterSpacing: "0.04em",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Tech Stack Section ───────────────────────────────────────────────────────

function TechStackSection() {
  return (
    <section id="techstack" style={{ padding: "100px 0", background: "#121214" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12">
          <p
            style={{
              color: "#6C7086",
              fontSize: "0.72rem",
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: "8px",
            }}
          >
            {"// SKILL_MATRIX.json"}
          </p>
          <h2
            style={{
              color: "#E8E8F0",
              fontSize: "1.8rem",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              margin: "0 0 8px 0",
            }}
          >
            Tech Stack Matrix
          </h2>
          <p style={{ color: "#6C7086", fontSize: "0.82rem", fontFamily: "Inter, sans-serif", margin: 0 }}>
            System resource monitor — current capability allocation across QA disciplines.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
          {SKILL_CATEGORIES.map((cat) => (
            <SkillCard key={cat.title} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Console Drawer ───────────────────────────────────────────────────────────

function ConsoleDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [visibleLines, setVisibleLines] = useState<typeof LOG_LINES>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setVisibleLines([]);
      return;
    }
    setVisibleLines([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < LOG_LINES.length) {
        const line = LOG_LINES[i];
        if (line) setVisibleLines((prev) => [...prev, line]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 220);
    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const lineColor: Record<string, string> = {
    pass: "#4AF626",
    retry: "#FF9100",
    info: "#6C7086",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        height: "320px",
        background: "#0A0A0C",
        borderTop: "1px solid rgba(0,229,255,0.3)",
        boxShadow: "0 -8px 40px rgba(0,229,255,0.1)",
        fontFamily: "'JetBrains Mono', monospace",
        display: "flex",
        flexDirection: "column" as const,
      }}
    >
      <div
        className="flex items-center justify-between px-6 py-2 flex-shrink-0"
        style={{ background: "#111114", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: "#00E5FF", fontSize: "0.7rem", letterSpacing: "0.12em" }}>TEST LOG CONSOLE</span>
          {open && visibleLines.length < LOG_LINES.length && (
            <span className="animate-pulse" style={{ color: "#4AF626", fontSize: "0.65rem" }}>
              ● RUNNING
            </span>
          )}
          {open && visibleLines.length === LOG_LINES.length && (
            <span style={{ color: "#4AF626", fontSize: "0.65rem" }}>● COMPLETE</span>
          )}
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#6C7086",
            cursor: "pointer",
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#E8E8F0";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#6C7086";
          }}
        >
          <X size={16} />
        </button>
      </div>

      <div ref={logRef} className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "none" }}>
        {visibleLines.filter(Boolean).map((line, i) => (
          <div key={i} className="flex gap-4 mb-1">
            <span style={{ color: "#3A3A4A", fontSize: "0.68rem", flexShrink: 0 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ color: lineColor[line.type] ?? "#E8E8F0", fontSize: "0.72rem", lineHeight: 1.6 }}>
              {line.text}
            </span>
          </div>
        ))}
        {open && visibleLines.length < LOG_LINES.length && (
          <div className="flex gap-4">
            <span style={{ color: "#3A3A4A", fontSize: "0.68rem" }}>
              {String(visibleLines.length + 1).padStart(2, "0")}
            </span>
            <span className="animate-pulse" style={{ color: "#4AF626", fontSize: "0.72rem" }}>
              █
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        background: "#0A0A0C",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "32px 0",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <span style={{ color: "#4AF626", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.12em" }}>[ QA ]</span>
        <p style={{ color: "#3A3A4A", fontSize: "0.68rem", letterSpacing: "0.08em", margin: 0 }}>
          © 2024 · All tests passing · Build #4821 ·{" "}
          <span style={{ color: "#4AF626" }}>STABLE</span>
        </p>
        <div className="flex gap-6">
          {["GitHub", "LinkedIn", "Resume"].map((l) => (
            <a
              key={l}
              href="#"
              style={{ color: "#6C7086", fontSize: "0.7rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#00E5FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#6C7086";
              }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [activeSection] = useState("Home");

  const handleRunTest = () => {
    setConsoleOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#121214",
        fontFamily: "'JetBrains Mono', monospace",
        overflowX: "hidden",
      }}
    >
      <NavBar activeSection={activeSection} />
      <HeroSection onRunTest={handleRunTest} />
      <TestCasesSection />
      <TechStackSection />
      <Footer />
      <ConsoleDrawer open={consoleOpen} onClose={() => setConsoleOpen(false)} />
    </div>
  );
}
