import { ChevronRight } from "lucide-react";

export default function ProjectCard({ onClick, project }) {
    return (
        <div onClick={() => onClick(project.slug)} className="group flex flex-auto min-w-64 max-h-32">
            <div className="flex w-full w-1/4 justify-between items-center border shadow-2xs rounded-sm hover:shadow-md focus:outline-hidden focus:shadow-md transition border-neutral-800 activityBar hover:!bg-neutral-800 cursor-pointer">
                <div className="flex w-full p-4">
                    <div className="grow">
                        <h3 className="group-hover:text-sky-500 font-semibold text-neutral-100">
                            {project.name}
                        </h3>
                        {project?.description && (
                            <p className="group-hover:text-sky-600 text-sm text-neutral-400">
                                Описание: {project?.description}
                            </p>
                        )}
                        <div className="flex gap-2">
                            <p className="group-hover:text-sky-600 text-sm text-neutral-500">
                                Slug: {project.slug}
                            </p>
                            <p className="group-hover:text-sky-600 text-sm text-neutral-500">
                                Автор: {project?.author}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <ChevronRight />
                </div>
            </div>
        </div>
    );
}
