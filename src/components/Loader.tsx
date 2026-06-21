import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, CheckCircle2, Cpu, ShieldAlert, Play } from "lucide-react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Smooth percentage counter
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Dynamic random increment to feel organic (like checking/loading modules)
      const increment = Math.floor(Math.random() * 4) + 1; // 1 to 4
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current === 100) {
        clearInterval(interval);
      }
    }, 45); // Completes in ~2-2.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Update diagnostic logs based on progress threshold
  useEffect(() => {
    const activeLogs: string[] = [];
    
    if (progress >= 0) {
      activeLogs.push("▶ Initializing E2E QA Test Engine...");
    }
    if (progress >= 15) {
      activeLogs.push("▶ [OK] TestNG & Selenium WebDriver instances active.");
    }
    if (progress >= 35) {
      activeLogs.push("▶ [LOAD] Connecting to Oracle Database & API repositories...");
    }
    if (progress >= 55) {
      activeLogs.push("▶ [OK] DB Handshake established. Fetching projects configuration.");
    }
    if (progress >= 75) {
      activeLogs.push("▶ Running pipeline validation gates...");
    }
    if (progress >= 92) {
      activeLogs.push("▶ Verifying system build: STABLE");
    }
    if (progress === 100) {
      activeLogs.push("✔ [PASS] ALL PIPELINE GATES GREEN. LAUNCHING WORKSPACE...");
    }

    setLogs(activeLogs);
  }, [progress]);

  // Delay calling onComplete to let the user see the 100% PASS status
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#121214",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
        padding: "24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Name / Title Banner */}
        <div style={{ textAlign: "center" }}>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#E8E8F0",
              letterSpacing: "0.15em",
              margin: "0 0 4px 0",
              textTransform: "uppercase",
            }}
          >
            RAIHAN MUBAROQ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: "0.72rem",
              color: "#6C7086",
              letterSpacing: "0.1em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Systems QA Engineer • Portfolio Workspace
          </motion.p>
        </div>

        {/* Console Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            background: "#0D0D10",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "4px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            display: "flex",
            flexDirection: "column",
            height: "260px",
            overflow: "hidden",
          }}
        >
          {/* Console Header */}
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FEBC2E", display: "inline-block" }} />
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
            </div>
            <span style={{ color: "#6C7086", fontSize: "0.68rem", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: "6px" }}>
              <Terminal size={12} style={{ color: "#00E5FF" }} />
              qa_diagnostics.log
            </span>
            <span style={{ color: "#6C7086", fontSize: "0.65rem" }}>v2.4.1</span>
          </div>

          {/* Console Body */}
          <div
            style={{
              padding: "16px",
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              scrollbarWidth: "none",
            }}
          >
            {logs.map((log, index) => {
              const isPass = log.startsWith("✔");
              return (
                <div
                  key={index}
                  style={{
                    color: isPass ? "#4AF626" : log.includes("[OK]") ? "#00E5FF" : "#6C7086",
                    fontSize: "0.72rem",
                    lineHeight: "1.4",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {isPass ? (
                    <CheckCircle2 size={12} style={{ color: "#4AF626", flexShrink: 0 }} />
                  ) : log.includes("[LOAD]") ? (
                    <Cpu size={12} className="animate-spin" style={{ color: "#FF9100", flexShrink: 0 }} />
                  ) : (
                    <Play size={10} style={{ color: "#6C7086", opacity: 0.5, flexShrink: 0 }} />
                  )}
                  {log}
                </div>
              );
            })}
            
            {progress < 100 && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="animate-pulse" style={{ color: "#4AF626", fontSize: "0.72rem" }}>█</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Progress Bar Container */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* Progress Bar Visual */}
          <div
            style={{
              background: "#1E1E24",
              border: "1px solid rgba(255,255,255,0.08)",
              height: "6px",
              borderRadius: "999px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                background: progress === 100 ? "#4AF626" : "linear-gradient(90deg, #00E5FF 0%, #4AF626 100%)",
                width: `${progress}%`,
                transition: "width 0.1s ease-out, background-color 0.3s ease",
                boxShadow: progress === 100 ? "0 0 12px rgba(74, 246, 38, 0.6)" : "0 0 8px rgba(0, 229, 255, 0.4)",
              }}
            />
          </div>

          {/* Progress Metrics */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.68rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: progress === 100 ? "#4AF626" : "#FF9100",
                  display: "inline-block",
                }}
                className={progress < 100 ? "animate-pulse" : ""}
              />
              <span style={{ color: "#6C7086", textTransform: "uppercase" }}>
                {progress === 100 ? "STATUS: SUCCESS" : "STATUS: VERIFYING COMPONENTS"}
              </span>
            </div>
            <div style={{ color: progress === 100 ? "#4AF626" : "#00E5FF", fontWeight: 700 }}>
              {progress}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
