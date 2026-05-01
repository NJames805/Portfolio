import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, GitFork, Eye } from "lucide-react"
import Link from "next/link"

interface GitHubRepo {
  id: string
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string | null
  topics: string[]
}

const demoReposForUser = (username: string): GitHubRepo[] => [
  {
    id: "demo-1",
    name: "project-one",
    description: "A responsive web application built with React and Node.js",
    html_url: `https://github.com/${username}/project-one`,
    stargazers_count: 12,
    forks_count: 5,
    watchers_count: 8,
    language: "JavaScript",
    topics: ["react", "nodejs", "web-app"],
  },
  {
    id: "demo-2",
    name: "data-visualization",
    description: "Interactive data visualization dashboard using D3.js",
    html_url: `https://github.com/${username}/data-visualization`,
    stargazers_count: 8,
    forks_count: 2,
    watchers_count: 5,
    language: "JavaScript",
    topics: ["d3js", "data-viz", "dashboard"],
  },
  {
    id: "demo-3",
    name: "api-service",
    description: "RESTful API service with Express and MongoDB",
    html_url: `https://github.com/${username}/api-service`,
    stargazers_count: 15,
    forks_count: 7,
    watchers_count: 10,
    language: "TypeScript",
    topics: ["api", "express", "mongodb"],
  },
  {
    id: "demo-4",
    name: "mobile-app",
    description: "Cross-platform mobile application built with React Native",
    html_url: `https://github.com/${username}/mobile-app`,
    stargazers_count: 20,
    forks_count: 8,
    watchers_count: 15,
    language: "TypeScript",
    topics: ["react-native", "mobile", "cross-platform"],
  },
  {
    id: "demo-5",
    name: "ml-project",
    description: "Machine learning project for image classification",
    html_url: `https://github.com/${username}/ml-project`,
    stargazers_count: 10,
    forks_count: 3,
    watchers_count: 7,
    language: "Python",
    topics: ["machine-learning", "image-classification", "tensorflow"],
  },
  {
    id: "demo-6",
    name: "portfolio-website",
    description: "Personal portfolio website built with Next.js",
    html_url: `https://github.com/${username}/portfolio-website`,
    stargazers_count: 5,
    forks_count: 2,
    watchers_count: 4,
    language: "TypeScript",
    topics: ["nextjs", "portfolio", "tailwindcss"],
  },
]

async function fetchPinnedRepos(username: string): Promise<GitHubRepo[] | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null

  try {
    const query = `
      query {
        user(login: "${username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                stargazerCount
                forkCount
                watchers { totalCount }
                primaryLanguage { name }
                repositoryTopics(first: 5) {
                  nodes { topic { name } }
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) return null

    const data = (await response.json().catch(() => null)) as any
    if (!data?.data?.user?.pinnedItems?.nodes) return null

    return data.data.user.pinnedItems.nodes.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      watchers_count: repo.watchers?.totalCount ?? 0,
      language: repo.primaryLanguage?.name ?? null,
      topics: repo.repositoryTopics?.nodes?.map((n: any) => n.topic?.name).filter(Boolean) ?? [],
    }))
  } catch {
    return null
  }
}

export async function GitHubProjects({ username }: { username: string }) {
  let repos = await fetchPinnedRepos(username)
  if (!repos || repos.length === 0) repos = demoReposForUser(username)

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
      {repos.map((repo) => (
        <Card key={repo.id} className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-xl truncate">{repo.name}</CardTitle>
            <CardDescription>
              {repo.language && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {repo.language}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
              {repo.description || "No description provided"}
            </p>
            <div className="flex flex-wrap gap-1 mt-3">
              {repo.topics &&
                repo.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                <span>{repo.forks_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{repo.watchers_count}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                View Project
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
