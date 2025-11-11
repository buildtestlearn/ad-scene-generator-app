import { createRoot } from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App";

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL as string;

// Check if VITE_CONVEX_URL is set
if (!CONVEX_URL || CONVEX_URL === "undefined") {
  createRoot(document.getElementById("root")!).render(
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "32px",
        maxWidth: "600px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ color: "#dc2626", marginBottom: "16px", fontSize: "24px" }}>
          ⚠️ Configuration Error
        </h1>
        <p style={{ marginBottom: "16px", color: "#374151", lineHeight: "1.6" }}>
          The <code style={{ backgroundColor: "#f3f4f6", padding: "2px 6px", borderRadius: "4px" }}>VITE_CONVEX_URL</code> environment variable is not set.
        </p>
        <p style={{ marginBottom: "16px", color: "#374151", lineHeight: "1.6" }}>
          To fix this in Vercel:
        </p>
        <ol style={{ paddingLeft: "20px", marginBottom: "16px", color: "#374151", lineHeight: "1.8" }}>
          <li>Go to your Vercel project settings</li>
          <li>Navigate to <strong>Settings → Environment Variables</strong></li>
          <li>Add a new variable:
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li><strong>Name:</strong> <code style={{ backgroundColor: "#f3f4f6", padding: "2px 6px", borderRadius: "4px" }}>VITE_CONVEX_URL</code></li>
              <li><strong>Value:</strong> Your production Convex deployment URL (e.g., <code style={{ backgroundColor: "#f3f4f6", padding: "2px 6px", borderRadius: "4px" }}>https://your-deployment.convex.cloud</code>)</li>
            </ul>
          </li>
          <li>Redeploy your application</li>
        </ol>
        <p style={{ marginBottom: "0", color: "#6b7280", fontSize: "14px" }}>
          You can find your Convex deployment URL in the <a href="https://dashboard.convex.dev" style={{ color: "#2563eb" }}>Convex Dashboard</a> under Settings → Deployment URL.
        </p>
      </div>
    </div>
  );
} else {
  const convex = new ConvexReactClient(CONVEX_URL);

  createRoot(document.getElementById("root")!).render(
    <ConvexAuthProvider client={convex}>
      <App />
    </ConvexAuthProvider>,
  );
}
