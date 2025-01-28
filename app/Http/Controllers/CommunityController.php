<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommunityRequest;
use App\Models\Community;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CommunityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommunityRequest $request)
    {
        $community = new Community($request->validated());
        $community->user()->associate($request->user());

        if($request->file('icon')) {
            $url = $request->file('icon')->store('community', ['disk' => 'public']);
            $community->icon = Storage::url($url);
        }

        if($request->file('banner')) {
            $url = $request->file('banner')->store('community', ['disk' => 'public']);
            $community->banner = Storage::url($url);
        }

        $community->save();

        return redirect("/r/$community->name");
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request): Response
    {
        $community = Community::where('name', $request->route('community'))->get();
        return Inertia::render('Community/Main', [
            'community' => $community,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function checkUniqueName(CommunityRequest $request)
    {

    }
}
