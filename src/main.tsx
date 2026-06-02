import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import PrivacyPolicy from "./components/PrivacyPolicy.tsx";
import TermsOfService from "./components/TermsOfService.tsx";
import Navigation from "./components/Navigation.tsx";
import Footer from "./components/Footer.tsx";

function LegalPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<LegalPage><PrivacyPolicy /></LegalPage>} />
        <Route path="/terms" element={<LegalPage><TermsOfService /></LegalPage>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
