import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = { title: "braindump" };

export default function BraindumpPage() {
    return <ComingSoon title="braindump" />;
}
