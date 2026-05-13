import Image from "next/image"
import Link from "next/link"

const NAV_ITEMS = [
  { href: "#", label: "Home" },
  { href: "#", label: "Projects" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
] as const

const BACKGROUND_COPY =
  "I'm a software engineer focused on building modern full-stack, mobile, and AI-powered applications. My experience spans web development, iOS engineering, cloud-backed systems, and data-driven problem solving — from creating tools for community organizations to contributing to platforms like Aparti AI. I enjoy building scalable, user-centered products and solving complex problems across the stack."

export function PortfolioLanding() {
  return (
    <div className="grid min-h-dvh max-w-full grid-rows-[56px_minmax(0,1fr)_auto] overflow-x-hidden bg-gradient-to-b from-black to-[rgb(29,0,91)]">
      <header className="sticky top-0 z-[100] flex h-14 shrink-0 items-center bg-black/35 backdrop-blur-md">
        <nav className="w-full" aria-label="Primary">
          <ul className="mx-auto flex h-full max-w-full list-none flex-wrap items-center justify-center gap-2 px-4 text-lg text-[aliceblue] sm:gap-3 sm:px-6 lg:px-10">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-md px-2.5 py-2 text-inherit no-underline hover:underline focus-visible:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="min-h-0 min-w-0">
        <div className="mx-auto grid w-full max-w-full min-w-0 grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,min(280px,22vw))_minmax(0,1fr)_minmax(0,min(280px,22vw))] lg:gap-8 lg:px-8 xl:gap-10 xl:px-12">
          {/* Profile */}
          <section className="min-w-0 overflow-x-hidden" aria-labelledby="profile-name">
            <div className="w-full min-w-0 overflow-x-hidden rounded-2xl bg-white max-lg:max-h-none lg:sticky lg:top-[68px] lg:max-h-[min(50vh,calc(100vh-7rem))] lg:overflow-y-auto">
              <div className="flex min-h-0 min-w-0 p-2 text-center">
                <figure className="mx-auto grid min-h-0 min-w-0 w-full max-w-full grid-rows-[minmax(0,1fr)_auto] gap-1">
                  <div className="relative min-h-0 w-full min-w-0">
                    <Image
                      src="/imgs/LInkedin_Profile_1.jpeg"
                      alt="Picture of Nathanael James"
                      width={640}
                      height={800}
                      priority
                      sizes="(max-width: 1024px) 100vw, min(280px, 22vw)"
                      className="mx-auto h-auto max-h-[min(40vh,360px)] w-full rounded-[10px] object-contain object-top lg:max-h-[min(45vh,420px)]"
                    />
                  </div>
                  <figcaption className="min-w-0 space-y-1 text-center text-[0.7rem] leading-snug text-neutral-900">
                    <h1 id="profile-name" className="text-[0.85rem] font-bold leading-tight">
                      Nathanael James
                    </h1>
                    <p className="text-[0.68rem] text-gray-500">
                      Building intuitive software experiences across web, mobile, and AI.
                    </p>
                    <ul className="mt-0.5 flex list-none flex-wrap justify-center gap-1.5 p-0">
                      <li>
                        <Link
                          href="https://linkedin.com/in/nathanael-james-6b7455277/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded px-1.5 py-1 text-[0.68rem] text-inherit no-underline hover:underline focus-visible:underline"
                        >
                          Linkedin
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://github.com/NJames805"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded px-1.5 py-1 text-[0.68rem] text-inherit no-underline hover:underline focus-visible:underline"
                        >
                          GitHub
                        </Link>
                      </li>
                    </ul>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* Background */}
          <section className="min-w-0 text-white" aria-labelledby="background-heading">
            <h2 id="background-heading" className="grid text-4xl leading-tight sm:text-5xl">
              <span className="block">My</span>
              <span className="block text-[1.85rem] text-[rgb(91,0,122)] sm:text-[3rem]">Background</span>
            </h2>
            <div className="mt-3 w-full max-w-prose text-lg text-gray-400">
              <p>{BACKGROUND_COPY}</p>
            </div>
          </section>

          {/* Projects */}
          <section className="min-w-0 text-white" aria-labelledby="projects-heading">
            <h2 id="projects-heading" className="grid text-4xl leading-tight sm:text-5xl">
              <span className="block">RECENT</span>
              <span className="block text-[1.85rem] text-[rgb(91,0,122)] sm:text-[3rem]">PROJECTS</span>
            </h2>
            <div className="mt-3 w-full text-lg text-gray-400">{/* project cards */}</div>
          </section>
        </div>
      </div>

      <div
        id="bottom-row"
        className="shrink-0 px-4 pb-6 text-white sm:px-6 lg:px-12"
        aria-label="Additional sections"
      >
        {/* Premium Tools and Lets Work Together */}
      </div>
    </div>
  )
}
