import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment configurations
const environments = {
  local: "http://localhost:4321",
};

async function runLighthouse(url, options = {}) {
  console.log(`\n🔍 Testing ${url}`);
  console.log("=====================================");

  // Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--disable-gpu", "--no-sandbox"],
  });

  // Configure Lighthouse
  const flags = {
    port: chrome.port,
    output: "json",
    onlyCategories: ["performance"],
    // Device configuration based on options
    formFactor: options.mobile ? "mobile" : "desktop",
    screenEmulation: options.mobile
      ? {
          mobile: true,
          width: 360,
          height: 640,
          deviceScaleFactor: 2,
          disabled: false,
        }
      : {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
    throttling: options.mobile
      ? {
          // Mobile 4G throttling
          cpuSlowdownMultiplier: 4,
          rttMs: 150,
          throughputKbps: 1638.4,
        }
      : {
          // Desktop throttling
          cpuSlowdownMultiplier: 1,
          rttMs: 40,
          throughputKbps: 10240,
        },
  };

  try {
    // Run Lighthouse
    const results = await lighthouse(url, { ...flags, ...options });

    // Create environment-specific folder name
    const envName =
      Object.entries(environments).find(([, value]) =>
        url.includes(value)
      )?.[0] || "custom";
    const deviceType = options.mobile ? "mobile" : "desktop";
    const dateStr = new Date().toISOString().replace(/[:.]/g, "-");

    // Create directory structure
    const reportDir = path.join(
      __dirname,
      "../performance-reports",
      envName,
      deviceType
    );
    fs.mkdirSync(reportDir, { recursive: true });

    // Save full report
    const outFile = path.join(reportDir, `report-${dateStr}.json`);
    fs.writeFileSync(outFile, JSON.stringify(results.lhr, null, 2));

    // Log performance metrics
    console.log("\n📊 Performance Metrics:");
    console.log("---------------------");
    console.log(
      `🎯 Overall Score: ${(results.lhr.categories.performance.score * 100).toFixed(1)}%`
    );

    // Core Web Vitals
    const metrics = {
      "First Contentful Paint (FCP)":
        results.lhr.audits["first-contentful-paint"],
      "Largest Contentful Paint (LCP)":
        results.lhr.audits["largest-contentful-paint"],
      "Total Blocking Time (TBT)": results.lhr.audits["total-blocking-time"],
      "Cumulative Layout Shift (CLS)":
        results.lhr.audits["cumulative-layout-shift"],
      "Speed Index": results.lhr.audits["speed-index"],
    };

    Object.entries(metrics).forEach(([name, metric]) => {
      const score = metric.score * 100;
      const value = metric.displayValue;
      const icon = score >= 90 ? "��" : score >= 50 ? "🟡" : "🔴";
      console.log(`${icon} ${name}: ${value} (Score: ${score.toFixed(1)}%)`);
    });

    console.log(`\n📝 Full report saved to: ${outFile}`);
  } catch (error) {
    console.error("❌ Error running Lighthouse:", error);
  }

  // Close Chrome
  await chrome.kill();
}

// Parse command line arguments
const args = process.argv.slice(2);
const isMobile = args.includes("--mobile");
const isDesktop = args.includes("--desktop");
const options = { mobile: isMobile || !isDesktop };

// Run tests for all environments
(async () => {
  console.log(
    `\n🚀 Starting performance tests (${options.mobile ? "Mobile" : "Desktop"} mode)`
  );

  for (const [env, url] of Object.entries(environments)) {
    try {
      if (env === "local") {
        // Check if localhost is running
        const localAvailable = await fetch(url).catch(() => false);
        if (!localAvailable) {
          console.log("\n⚠️ Local development server not running, skipping...");
          continue;
        }
      }
      await runLighthouse(url, options);
    } catch (error) {
      console.error(`\n❌ Error testing ${env} environment:`, error.message);
    }
  }

  console.log("\n✅ Performance testing complete!");
})();
