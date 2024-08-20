import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, projects, queryParams = null, success }) {
    // console.log(projects);

    queryParams = queryParams || {};

    // searching
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("projects.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    // sorting colums
    const sortChanged = (name) => {
        if (name === queryParams.sort_fields) {
            if (queryParams.sort_directon === "asc") {
                queryParams.sort_directon = "desc";
            } else {
                queryParams.sort_directon = "asc";
            }
        } else {
            queryParams.sort_fields = name;
            queryParams.sort_directon = "asc";
        }
        router.get(route("projects.index"), queryParams);
    };

    // delete project
    const deleteProject = (project) => {
        if(!window.confirm("Are you sure to delete this project?")) {
            return ;
        };
        router.delete(route('projects.destroy', project.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Projects
                    </h2>
                    <Link
                        href={route("projects.create")}
                        className="bg-gray-700 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-800"
                    >
                        Create Project
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />

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
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    {/* table header */}
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>

                                            <TableHeading
                                                name="image"
                                                sortChanged={sortChanged}
                                                sortable={false}
                                            >
                                                Image
                                            </TableHeading>

                                            <TableHeading
                                                name="name"
                                                sortChanged={sortChanged}
                                            >
                                                Name
                                            </TableHeading>

                                            <TableHeading
                                                name="status"
                                                sortChanged={sortChanged}
                                            >
                                                Status
                                            </TableHeading>

                                            <TableHeading
                                                name="created_at"
                                                sortChanged={sortChanged}
                                            >
                                                Create Date
                                            </TableHeading>

                                            <TableHeading
                                                name="due_date"
                                                sortChanged={sortChanged}
                                            >
                                                Due Date
                                            </TableHeading>

                                            <TableHeading
                                                name="image"
                                                sortChanged={sortChanged}
                                                sortable={false}
                                            >
                                                Created By
                                            </TableHeading>

                                            <TableHeading
                                                name="image"
                                                sortChanged={sortChanged}
                                                sortable={false}
                                            >
                                                Actions
                                            </TableHeading>
                                        </tr>
                                    </thead>

                                    {/* search header */}
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400 border-b border-gray-700">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th
                                                className="px-3 py-3"
                                                colSpan="3"
                                            >
                                                {/* TextInput component comes with breeze */}
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.name
                                                    }
                                                    placeholder="Project Name"
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("name", e)
                                                    }
                                                />
                                            </th>
                                            <th
                                                className="px-3 py-3"
                                                colSpan="2"
                                            >
                                                <SelectInput
                                                    className="w-full"
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "status",
                                                            e.target.value
                                                        )
                                                    }
                                                    defaultValue={
                                                        queryParams.status
                                                    }
                                                >
                                                    <option value="">
                                                        Select Status
                                                    </option>
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                    <option value="in_progress">
                                                        In Progress
                                                    </option>
                                                    <option value="completed">
                                                        Completed
                                                    </option>
                                                </SelectInput>
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* table data */}
                                    <tbody>
                                        {projects.data.map((project) => (
                                            <tr
                                                key={project.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            >
                                                <td className="px-3 py-2">
                                                    {project.id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <img
                                                        src={project.image_path}
                                                        style={{ width: 60 }}
                                                        alt=""
                                                    />
                                                </td>
                                                <td className="px-3 py-2 text-gray-300 hover:underline">
                                                    <Link
                                                        href={route(
                                                            "projects.show",
                                                            project.id
                                                        )}
                                                    >
                                                        {project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
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
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.created_at}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.due_date}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.createdBy.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Link
                                                        href={route(
                                                            "projects.edit",
                                                            project.id
                                                        )}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={e => deleteProject(project)}
                                                        className="font-mediumtext-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
