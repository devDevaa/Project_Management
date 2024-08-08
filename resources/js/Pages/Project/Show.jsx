import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/constants.js";
import TasksTable from "../Task/TasksTabls";
export default function Show({ auth, project, tasks, queryParams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {`Project > ${project.name}`}
                    </h2>
                    <Link
                        href={route("projects.edit", project.id)}
                        className="bg-gray-700 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-800"
                    >
                        Edit Project
                    </Link>
                </div>
            }
        >
            <Head title={`Project "${project.name}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={project.image_path}
                                alt=""
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="py-6 px-10 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Name
                                        </label>
                                        <p className="mt-1">{project.name}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Status
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={
                                                    "px-2 py-1 rounded text-white " +
                                                    PROJECT_STATUS_CLASS_MAP[
                                                        project.status
                                                    ]
                                                }
                                            >
                                                {
                                                    PROJECT_STATUS_TEXT_MAP[
                                                        project.status
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-8 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                                <div className="grid p-5 gap-1 grid-cols-4 mt-2">
                                    <div className="">
                                        <label className="font-bold text-lg">
                                            Created Date
                                        </label>
                                        <p className="mt-1">
                                            {project.created_at}
                                        </p>
                                    </div>
                                    <div className="">
                                        <label className="font-bold text-lg">
                                            Due Date
                                        </label>
                                        <p className="mt-1">
                                            {project.due_date}
                                        </p>
                                    </div>
                                    <div className="">
                                        <label className="font-bold text-lg">
                                            Create By
                                        </label>
                                        <p className="mt-1">
                                            {project.createdBy.name}
                                        </p>
                                    </div>
                                    <div className="">
                                        <label className="font-bold text-lg">
                                            Updated By
                                        </label>
                                        <p className="mt-1">
                                            {project.updatedBy.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="font-bold text-lg">
                                    Project Description
                                </label>
                                <p className="mt-1">{project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <p className="pb-5  text-lg">
                                All tasks related to the project.
                            </p>
                            <TasksTable
                                tasks={tasks}
                                // success={success}
                                queryParams={queryParams}
                                hideProjectColumn={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
