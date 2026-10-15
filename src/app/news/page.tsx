import { NewsView } from "@/components/hub/NewsView";
import { announcements } from "@/data/seed";

export const metadata = { title: "Campus News · UFE Hub" };

export default function NewsPage() {
  return <NewsView announcements={announcements} />;
}
