import type { Metadata } from "next";
import Link from "next/link";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ProjectX | Dissertation Manager",
  description: "Weighted task management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn("font-sans", geist.variable)}
        suppressHydrationWarning
      >
        <body className="antialiased text-slate-900 bg-white">
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r p-6 flex flex-col justify-between bg-slate-50/50">
              <div>
                <h2 className="font-bold text-xl tracking-tight text-blue-600">
                  ProjectX
                </h2>
                <nav className="mt-8 flex flex-col gap-4">
                  <Link
                    href="/projects"
                    className="text-sm font-medium hover:text-blue-600 transition-colors"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/reports"
                    className="text-sm font-medium hover:text-blue-600 transition-colors"
                  >
                    Reports
                  </Link>
                </nav>
              </div>

              {/* New Clerk Auth Section */}
              <div className="border-t pt-4">
                <Show when="signed-out">
                  <div className="flex flex-col gap-2">
                    <SignInButton mode="modal">
                      <span className="w-full block text-left text-sm font-medium bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors cursor-pointer rounded-md">
                        Sign In
                      </span>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full text-left text-sm font-medium border border-slate-200 py-2 px-4 rounded-md hover:bg-slate-100 transition-colors">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                </Show>

                <Show when="signed-in">
                  <div className="flex items-center gap-3 px-2">
                    <UserButton />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-900">
                        Active Session
                      </span>
                      <span className="text-[10px] text-slate-500 italic">
                        Dissertation Mode
                      </span>
                    </div>
                  </div>
                </Show>
              </div>
            </aside>

            {/* Page content */}
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
