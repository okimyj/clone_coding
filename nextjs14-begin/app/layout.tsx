import { Metadata } from "next";
import Navigation from "../components/navigation";
export const metadata: Metadata = {
  title: {
    template: "%s | OKIMYJ Movies",
    default: "OKIMYJ Movies",
  },
  description: "The best framework",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
