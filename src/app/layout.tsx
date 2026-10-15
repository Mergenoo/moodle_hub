import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { AppShell } from "@/components/shell/AppShell";
import { hub } from "@/lib/data";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

// Estimate of the production font (docs/00-assumptions.md §14). Cyrillic
// subsets are required for Mongolian Ө ө Ү ү.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "My courses · UFE Hub",
  description: "Unified Moodle Hub prototype for the University of Finance and Economics",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [student, { courses, totalEnrolments }, notifications] = await Promise.all([
    hub.getStudent(),
    hub.getCourses(),
    hub.getNotifications(),
  ]);

  return (
    <html lang={student.locale} className={`${manrope.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full font-sans">
        <I18nProvider initialLocale={student.locale}>
          <AppShell student={student} courses={courses} totalEnrolments={totalEnrolments} notifications={notifications}>
            {children}
          </AppShell>
        </I18nProvider>
      </body>
    </html>
  );
}
