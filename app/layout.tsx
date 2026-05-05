export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 border-r p-4">
            <h2 className="font-bold">ProjectX</h2>
            <nav className="mt-4 space-y-2">
              <a href="/dashboard">Dashboard</a>
              <a href="/projects">Projects</a>
              <a href="/reports">Reports</a>
            </nav>
          </aside>

          {/* Page content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}