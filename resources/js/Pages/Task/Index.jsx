import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTabls";

export default function Index({ auth, tasks, queryParams = null, success }) {
    // console.log(tasks);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Tasks
                    </h2>
                    <Link
                        href={route("tasks.create")}
                        className="bg-gray-700 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-800"
                    >
                        Create Task
                    </Link>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
            {success && (
                    <div className="flex items-end justify-end cursor-pointer alertmsg"
                    onClick={() => {
                        const successMessage = document.querySelector('.alertmsg');
                        successMessage.parentNode.removeChild(successMessage);
                    }}>
                        <div className="bg-gray-600 py-2 px-4 w-2/6 text-white rounded mb-3 me-16">
                            {success}
                        </div>

                    </div>
                )}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <TasksTable tasks={tasks} queryParams={queryParams} />

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
