export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ display: "flex" }}>
        <nav style={{ width: "200px", padding: "20px", background: "#eee" }}>
          <h3>ProjectX</h3>
          <a href="/">Dashboard</a><br/>
          <a href="/projects">Projects</a><br/>
          <a href="/reports">Reports</a>
        </nav>

        <main style={{ padding: "20px", flex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
