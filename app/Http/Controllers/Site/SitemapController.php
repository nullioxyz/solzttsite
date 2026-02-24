<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\AvailableDesign;
use App\Models\Language;
use App\Models\Portfolio;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $xml = Cache::remember('sitemap.xml', now()->addMinutes(30), function () {
            $locales = Language::query()->pluck('slug')->filter()->values();
            $locales = $locales->isNotEmpty() ? $locales : collect([config('app.fallback_locale', 'en')]);

            $urls = collect();

            foreach ($locales as $locale) {
                $urls->push([
                    'loc' => route('home.index', ['locale' => $locale]),
                    'changefreq' => 'weekly',
                    'priority' => '1.0',
                ]);

                $urls->push([
                    'loc' => route('site.portfolio', ['locale' => $locale]),
                    'changefreq' => 'daily',
                    'priority' => '0.9',
                ]);

                $urls->push([
                    'loc' => route('site.available_designs', ['locale' => $locale]),
                    'changefreq' => 'daily',
                    'priority' => '0.9',
                ]);

                $urls->push([
                    'loc' => route('site.contact', ['locale' => $locale]),
                    'changefreq' => 'weekly',
                    'priority' => '0.8',
                ]);

                $urls->push([
                    'loc' => route('site.after_care', ['locale' => $locale]),
                    'changefreq' => 'monthly',
                    'priority' => '0.6',
                ]);
            }

            $portfolioItems = Portfolio::query()
                ->select(['slug', 'updated_at'])
                ->whereNotNull('slug')
                ->get();

            foreach ($portfolioItems as $portfolio) {
                foreach ($locales as $locale) {
                    $urls->push([
                        'loc' => route('site.portfolio.show', ['locale' => $locale, 'slug' => $portfolio->slug]),
                        'lastmod' => optional($portfolio->updated_at)->toDateString(),
                        'changefreq' => 'weekly',
                        'priority' => '0.7',
                    ]);
                }
            }

            $availableDesigns = AvailableDesign::query()
                ->select(['slug', 'updated_at'])
                ->whereNotNull('slug')
                ->where('active', 1)
                ->where('available', 1)
                ->get();

            foreach ($availableDesigns as $design) {
                foreach ($locales as $locale) {
                    $urls->push([
                        'loc' => route('site.available_designs.show', ['locale' => $locale, 'slug' => $design->slug]),
                        'lastmod' => optional($design->updated_at)->toDateString(),
                        'changefreq' => 'weekly',
                        'priority' => '0.7',
                    ]);
                }
            }

            $lines = [];
            $lines[] = '<?xml version="1.0" encoding="UTF-8"?>';
            $lines[] = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

            foreach ($urls->unique('loc') as $entry) {
                $lines[] = '  <url>';
                $lines[] = '    <loc>' . e($entry['loc']) . '</loc>';
                if (!empty($entry['lastmod'])) {
                    $lines[] = '    <lastmod>' . e($entry['lastmod']) . '</lastmod>';
                }
                if (!empty($entry['changefreq'])) {
                    $lines[] = '    <changefreq>' . e($entry['changefreq']) . '</changefreq>';
                }
                if (!empty($entry['priority'])) {
                    $lines[] = '    <priority>' . e($entry['priority']) . '</priority>';
                }
                $lines[] = '  </url>';
            }

            $lines[] = '</urlset>';

            return implode("\n", $lines);
        });

        return response($xml, 200)->header('Content-Type', 'application/xml; charset=UTF-8');
    }
}
