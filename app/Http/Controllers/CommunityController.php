<?php

namespace App\Http\Controllers;

use App\Models\Community;
use Illuminate\Http\Request;
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
    public function store(Request $request)
    {
        //
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
}
