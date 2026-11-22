import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = { title: "books" };

export default function BooksPage() {
    return <ComingSoon title="books" />;
}
