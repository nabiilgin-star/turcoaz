import { getFaqs } from "@/app/lib/get-nav-data";
import QuestionsClient from "./QuestionsClient";

export const dynamic = "force-dynamic";

export default async function FAQPage() {
  const faqs = await getFaqs();

  return <QuestionsClient initialFaqs={faqs || []} />;
}
