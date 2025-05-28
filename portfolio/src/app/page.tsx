import { Github, Mail, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GitHubProjects } from "@/components/github-projects"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold">
            <Link href="/">Nathanael James</Link>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link href="#about" className="text-sm font-medium">
              About
            </Link>
            <Link href="#projects" className="text-sm font-medium">
              Projects
            </Link>
            <Link href="#contact" className="text-sm font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Hi, I&apos;m <span className="text-primary">Nathanael James</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A passionate developer showcasing my projects and skills.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="#contact">Contact Me</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#projects">View Projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    I&apos;m a developer with a passion for building web applications and solving complex problems. I
                    specialize in JavaScript, React, and Node.js, and I&apos;m always eager to learn new technologies.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://github.com/NJames805" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://linkedin.com/in/nathanael-james-6b7455277/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center w-[500px] h-[500px]">
                <div className="relative w-full h-full">
                  <Image
                    alt="Profile"
                    className="rounded-full object-contain bg-background"
                    fill
                    src="/Profile.jpeg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My GitHub Projects</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Check out some of my recent work and open-source contributions.
                </p>
              </div>
              <GitHubProjects username="NJames805" />
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Have a project in mind or want to chat? Feel free to reach out.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col space-y-4">
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
                          >
                            Name
                          </label>
                          <input
                            id="name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label
                            htmlFor="message"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter your message"
                          />
                        </div>
                        <Button type="submit">Send Message</Button>
                      </div>
                    </CardContent>
                  </Card>
                </form>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <Link href="mailto:your.email@example.com">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://github.com/NJames805" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://linkedin.com/in/nathanael-james-6b7455277/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left dark:text-gray-400">
            © {new Date().getFullYear()} Nathanael James. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://github.com/NJames805"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/nathanael-james-6b7455277/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
