<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        // sorting
        $sortFields = request("sort_fields", "created_at");
        $sortDirecton = request("sort_directon", "desc");

        // search with name
        if (request("name")) {
            $query->where("name", "like", "%".request("name")."%");
        }
        // group with status
        if (request("status")) {
            $query->where("status",request("status"));
        }

        $projects = $query->orderBy($sortFields, $sortDirecton)
                    ->paginate(10)->onEachSide(1);

        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        Project::create($data);
        return to_route('projects.index')->with('success', 'Project was created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
        // sorting
        $sortFields = request("sort_fields", "created_at");
        $sortDirecton = request("sort_directon", "desc");

        // search with name
        if (request("name")) {
            $query->where("name", "like", "%".request("name")."%");
        }
        // group with status
        if (request("status")) {
            $query->where("status",request("status"));
        }
        $tasks = $query->orderBy($sortFields, $sortDirecton)
        ->paginate(10)->onEachSide(1);
        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
