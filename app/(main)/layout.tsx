import SiteNav from "@/components/nav/SiteNav";

// Pages in the new design (home, work, about) share the nav bar.
export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SiteNav />
            {children}
        </>
    );
}
