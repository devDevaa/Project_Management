import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constants.js";
import TasksTable from "../Task/TasksTabls";
export default function Show({ auth, task, tasks, queryParams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {`Task > ${task.name}`}
                    </h2>
                    <Link
                        href={route("tasks.edit", task.id)}
                        className="bg-gray-700 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-800"
                    >
                        Edit Task
                    </Link>
                </div>
            }
        >
            <Head title={`Task "${task.name}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={task.image_path}
                                alt=""
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="py-6 px-10 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Name
                                        </label>
                                        <p className="mt-1">{task.name}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Status
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={
                                                    "px-2 py-1 rounded text-white " +
                                                    TASK_STATUS_CLASS_MAP[
                                                        task.status
                                                    ]
                                                }
                                            >
                                                {
                                                    TASK_STATUS_TEXT_MAP[
                                                        task.status
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
                                            {task.created_at}
                                        </p>
                                    </div>
                                    <div className="">
                                        <label className="font-bold text-lg">
                                            Due Date
                                        </label>
                                        <p className="mt-1">
                                            {task.due_date}
                                        </p>
                                    </div>
                                    <div className="">
                                        <label className="font-bold text-lg">
                                            Create By
                                        </label>
                                        <p className="mt-1">
                                            {task.createdBy.name}
                                        </p>
                                    </div>
                                    <div className="">
                                        <label className="font-bold text-lg">
                                            Updated By
                                        </label>
                                        <p className="mt-1">
                                            {task.updatedBy.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="font-bold text-lg">
                                    Task Description
                                </label>
                                <p className="mt-1">{task.description}</p>
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
                                All tasks related to the task.
                            </p>
                            <TasksTable
                                tasks={tasks}
                                // success={success}
                                queryParams={queryParams}
                                hideTaskColumn={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
