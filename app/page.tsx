import Link from "next/link";
import PostList from "@/components/PostList";
import ProjectCard from "@/components/ProjectCard";
import { formatDate, getJournal, getLog, getProjects } from "@/lib/content";

export default function HomePage() {
    const featuredProjects = getProjects().filter((project) => project.featured);
    const latestLog = getLog()[0];
    const recentJournal = getJournal().slice(0, 3);

    return (
        <>
            {/* Intro */}
            <section className="intro-content">
                <div className="left-block">
                    <h1 className="intro-text">HI, I&apos;M EMILY !</h1>
                    <p className="description-box intro-subtext">
                        an 18 year old with a love for exploring and learning new things!
                    </p>
                </div>
                <div className="right-block">
                    <img
                        className="plant-img"
                        src="/assets/images/plant.png"
                        alt="Emily at McGill's Macdonald Campus"
                    />
                    <p className="caption">SHAD McGill 2023 - McGill MacDonald Campus</p>
                </div>
            </section>

            {/* About me */}
            <section className="about-me-block" id="about-me">
                <div className="about-me-content">
                    <h2 className="section-header">about me</h2>
                    <div className="body-text">
                        <p>
                            hey! i&apos;m emily jing, studying{" "}
                            <strong>computer engineering @ university of waterloo</strong>.
                        </p>
                        <p>
                            i am very interested in <strong>machine learning &amp; neural networks</strong>, as well
                            as the intersection between computer science, engineering, business, and healthcare.
                        </p>
                        <p>
                            along with my love for hackathons, you&apos;ll often catch me arranging sheet music of
                            songs I love on the guitar or piano, attending dance workshops, swimming, or biking
                            around in the nature ⛰️🚴🏊🌲 #grasstoucher
                        </p>
                    </div>
                </div>
                <img className="lab-img" src="/assets/images/lab.png" alt="Emily in a lab" />
                <img className="guitar-img" src="/assets/images/guitar.png" alt="Emily playing guitar" />
            </section>

            {/* Projects: featured entries from content/projects */}
            <section className="projects-block" id="projects">
                <h2 className="section-header">projects</h2>
                <div className="projects-row" id="projects-row">
                    {featuredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            href={project.link ?? project.repo ?? `/projects/${project.id}`}
                            summary={project.summary}
                            cover={project.cover}
                            logo={project.logo}
                        />
                    ))}
                </div>
                <p className="body-text">more coming soon...</p>
                <p className="body-text">
                    <Link className="plain-link" href="/projects">
                        all projects &amp; build logs →
                    </Link>
                </p>
            </section>

            {/* Latest: newest log post and the three most recent journal entries */}
            {(latestLog || recentJournal.length > 0) && (
                <section className="latest-block" id="latest">
                    <h2 className="section-header">latest</h2>
                    <div className="latest-columns">
                        {latestLog && (
                            <div className="latest-column">
                                <h3 className="latest-heading">
                                    <Link href="/log">from the log</Link>
                                </h3>
                                <ul className="post-list">
                                    <li className="post-list-item">
                                        <time className="post-date" dateTime={latestLog.date.toISOString()}>
                                            {formatDate(latestLog.date)}
                                        </time>
                                        <Link className="post-list-title" href={`/log#${latestLog.id}`}>
                                            {latestLog.title}
                                        </Link>
                                        {latestLog.summary && (
                                            <p className="post-list-summary">{latestLog.summary}</p>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        )}
                        {recentJournal.length > 0 && (
                            <div className="latest-column">
                                <h3 className="latest-heading">
                                    <Link href="/journal">from the journal</Link>
                                </h3>
                                <PostList posts={recentJournal} hrefFor={(post) => `/journal/${post.id}`} />
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Contact */}
            <section className="contact-block" id="contact">
                <h2 className="section-header">let&apos;s connect!</h2>
                <ul className="body-text">
                    <li>
                        <a href="https://www.linkedin.com/in/emily-jing-377468246/">LinkedIn</a>
                    </li>
                    <li>
                        <a href="https://github.com/ej1ng">Github</a>
                    </li>
                    <li>
                        <a href="mailto:emily.jing@uwaterloo.ca">emily.jing@uwaterloo.ca</a>
                    </li>
                </ul>
            </section>
        </>
    );
}
