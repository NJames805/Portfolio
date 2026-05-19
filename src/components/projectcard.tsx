"passing in the current data to the cards/ will map the data to the cards in"
"a seperate component"
import { projects } from "@/data/projects"

export default function ProjectCard(){
    return (
        <div className="flex flex-col gap-4">
            {projects.map((project) => (
                <div key={project.title} className="bg-black rounded-lg p-4 gap-2 flex flex-col">
                    <h2 className="text-white text-2xl font-bold">{project.title}</h2>
                    <p className="text-gray-400">{project.description}</p>
                    <p className="text-gray-400">{project.tech.join(", ")}</p>
                    <a href={project.github} className="text-blue-500">GitHub</a>
                    <a href={project.demo} className="text-blue-500">Demo</a>
                </div>
            ))}
        </div>
    )
}