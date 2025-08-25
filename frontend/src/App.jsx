import UrlForm from "./components/UrlForm.jsx";

export default function App() {
  return (
    <div style={{ maxWidth: 720, margin: "60px auto", padding: "0 16px", fontFamily: "system-ui, Arial" }}>
      <h1 style={{ textAlign: "center", marginBottom: 10 }}>🔗 URL Shortener</h1>
      <p style={{ textAlign: "center", marginTop: 0, opacity: 0.8 }}>
        Paste a long URL and get a short link you can share.
      </p>
      <UrlForm />
      <footer style={{ textAlign: "center", marginTop: 40, fontSize: 12, opacity: 0.7 }}>
        Built with MERN
      </footer>
    </div>
  );
}