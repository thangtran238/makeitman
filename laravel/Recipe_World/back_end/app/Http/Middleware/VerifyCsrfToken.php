<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        // Add the routes or route patterns that should be excluded from CSRF verification
        // For example:
        // '/api/login',
        // '/api/register',
    ];

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Check if the request matches any excluded routes
        if ($this->inExceptArray($request)) {
            // Add the necessary CORS headers for the excluded routes
            return $next($request)
                ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
                ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization')
                ->header('Access-Control-Allow-Credentials', 'true');
        }

        return parent::handle($request, $next);
    }

    /**
     * Determine if the request has a URI that should pass through CSRF verification.
     *
     * @param \Illuminate\Http\Request $request
     * @return bool
     */
    protected function inExceptArray($request)
    {
        foreach ($this->except as $except) {
            if ($request->is($except) || $request->fullUrlIs($except)) {
                return true;
            }
        }

        return false;
    }
}
