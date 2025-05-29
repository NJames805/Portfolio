"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, GitFork, Eye } from "lucide-react"
import Link from "next/link"

interface GitHubTopic {
  topic: {
    name: string;
  };
}

interface GitHubRepository {
  id: string;
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  watchers: {
    totalCount: number;
  };
  primaryLanguage: {
    name: string;
  } | null;
  repositoryTopics: {
    nodes: GitHubTopic[];
  };
}

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string
  topics: string[]
}

export function GitHubProjects({ username }: { username: string }) {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPinnedRepos() {
      try {
        setLoading(true)
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
        
        if (!token) {
          throw new Error('GitHub token is not configured. Please add NEXT_PUBLIC_GITHUB_TOKEN to your .env.local file')
        }

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
                    watchers {
                      totalCount
                    }
                    primaryLanguage {
                      name
                    }
                    repositoryTopics(first: 5) {
                      nodes {
                        topic {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `

        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => null)
          throw new Error(`GitHub API error: ${response.status} - ${errorData?.message || response.statusText}`)
        }

        const data = await response.json()
        
        if (data.errors) {
          throw new Error(`GitHub API error: ${data.errors[0].message}`)
        }

        const pinnedRepos = data.data.user.pinnedItems.nodes.map((repo: GitHubRepository) => ({
          id: parseInt(repo.id),
          name: repo.name,
          description: repo.description,
          html_url: repo.url,
          stargazers_count: repo.stargazerCount,
          forks_count: repo.forkCount,
          watchers_count: repo.watchers.totalCount,
          language: repo.primaryLanguage?.name,
          topics: repo.repositoryTopics.nodes.map((node) => node.topic.name),
        }))

        setRepos(pinnedRepos)
        setError(null)
      } catch (err) {
        console.error("Error fetching GitHub repos:", err)
        setError(err instanceof Error ? err.message : "Failed to load GitHub projects. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPinnedRepos()
  }, [username])

  if (loading) {
    return (
      <div className="w-full grid place-items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-red-500">{error}</p>
        <div className="mt-4">
          <Button variant="outline" asChild>
            <Link href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
              View GitHub Profile
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // For demo purposes, if no repos are found or API is not working
  if (repos.length === 0) {
    const demoRepos: GitHubRepo[] = [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
    setRepos(demoRepos)
  }

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
