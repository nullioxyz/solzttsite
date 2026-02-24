<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', request()->cookie('locale') ?? app()->getLocale()) }}">

@php
    $siteName = config('app.name', 'Solztt');
    $isAdminPath = request()->is('hall-of-justice') || request()->is('hall-of-justice/*');

    $metaTitle = data_get($page, 'props.meta_title')
        ?? data_get($page, 'props.metatags.translation.title')
        ?? data_get($page, 'props.metatags.default_translation.title')
        ?? $siteName;

    $metaDescription = strip_tags(
        data_get($page, 'props.meta_description')
            ?? data_get($page, 'props.metatags.translation.description')
            ?? data_get($page, 'props.metatags.default_translation.description')
            ?? $siteName
    );

    $metaKeywords = data_get($page, 'props.metatags.translation.keywords')
        ?? data_get($page, 'props.metatags.default_translation.keywords')
        ?? '';

    $titleWithBrand = $metaTitle === $siteName ? $siteName : $metaTitle . ' | ' . $siteName;
    $canonicalUrl = url()->current();

    $metaImageUuid = data_get($page, 'props.metaImage.media.0.uuid');
    $metaImageLocale = data_get($page, 'props.currentLanguage.slug', app()->getLocale());
    $metaImageUrl = $metaImageUuid
        ? route('file.index', ['locale' => $metaImageLocale, 'uuid' => $metaImageUuid])
        : asset('images/logo.jpg');

    $robotsContent = $isAdminPath ? 'noindex,nofollow' : 'index,follow';

    $languages = collect(data_get($page, 'props.languages', []))
        ->pluck('slug')
        ->filter()
        ->values();

    $defaultLocale = data_get(
        collect(data_get($page, 'props.languages', []))->firstWhere('default', 1),
        'slug',
        config('app.fallback_locale', 'en')
    );

    $segments = request()->segments();
    $hasLocalePrefix = isset($segments[0]) && $languages->contains($segments[0]);
    $queryString = request()->getQueryString();

    $analyticsCollectUrl = app()->environment('production')
        ? \Illuminate\Support\Facades\URL::temporarySignedRoute('analytics.collect', now()->addHours(12))
        : route('analytics.collect');
    $isContactPage = request()->is('*/contact');
    $isPortfolioPage = request()->is('*/portfolio');
    $isAvailableDesignPage = request()->is('*/available-designs');
    $portfolioLcpUuid = data_get($page, 'props.portfolio.data.0.media.0.uuid');
    $portfolioLcpLocale = data_get($page, 'props.currentLanguage.slug', app()->getLocale());
    $portfolioLcpImage = ($isPortfolioPage && $portfolioLcpUuid)
        ? route('file.index', ['locale' => $portfolioLcpLocale, 'uuid' => $portfolioLcpUuid, 'size' => 'md', 'format' => 'webp'])
        : null;
    $availableDesignLcpUuid = data_get($page, 'props.designs.data.0.media.0.uuid');
    $availableDesignLcpLocale = data_get($page, 'props.currentLanguage.slug', app()->getLocale());
    $availableDesignLcpImage = ($isAvailableDesignPage && $availableDesignLcpUuid)
        ? route('file.index', ['locale' => $availableDesignLcpLocale, 'uuid' => $availableDesignLcpUuid, 'size' => 'md', 'format' => 'webp'])
        : null;
@endphp

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ $titleWithBrand }}</title>
    <meta name="description" content="{{ $metaDescription }}">
    @if(!empty($metaKeywords))
        <meta name="keywords" content="{{ $metaKeywords }}">
    @endif
    <meta name="robots" content="{{ $robotsContent }}">

    <meta property="og:site_name" content="{{ $siteName }}">
    <meta property="og:title" content="{{ $titleWithBrand }}">
    <meta property="og:description" content="{{ $metaDescription }}">
    <meta property="og:image" content="{{ $metaImageUrl }}">
    <meta property="og:url" content="{{ $canonicalUrl }}">
    <meta property="og:type" content="website">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $titleWithBrand }}">
    <meta name="twitter:description" content="{{ $metaDescription }}">
    <meta name="twitter:image" content="{{ $metaImageUrl }}">

    <link rel="canonical" href="{{ $canonicalUrl }}">
    @if($portfolioLcpImage)
        <link rel="preload" as="image" href="{{ $portfolioLcpImage }}" fetchpriority="high">
    @endif
    @if($availableDesignLcpImage)
        <link rel="preload" as="image" href="{{ $availableDesignLcpImage }}" fetchpriority="high">
    @endif

    @if(!$isAdminPath && $languages->isNotEmpty() && $hasLocalePrefix)
        @foreach($languages as $langSlug)
            @php
                $localizedSegments = $segments;
                $localizedSegments[0] = $langSlug;
                $localizedPath = implode('/', $localizedSegments);
                $hreflangUrl = url($localizedPath) . ($queryString ? ('?' . $queryString) : '');
            @endphp
            <link rel="alternate" hreflang="{{ $langSlug }}" href="{{ $hreflangUrl }}">
        @endforeach
        @php
            $defaultSegments = $segments;
            $defaultSegments[0] = $defaultLocale;
            $defaultPath = implode('/', $defaultSegments);
            $defaultHreflangUrl = url($defaultPath) . ($queryString ? ('?' . $queryString) : '');
        @endphp
        <link rel="alternate" hreflang="x-default" href="{{ $defaultHreflangUrl }}">
    @endif

    @if(!$isAdminPath)
        <link rel="dns-prefetch" href="//fonts.googleapis.com">
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Merriweather:wght@300;400&display=swap"
            onload="this.onload=null;this.rel='stylesheet'"
        >
        <noscript>
            <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Merriweather:wght@300;400&display=swap" rel="stylesheet">
        </noscript>
    @endif
    @if($isContactPage)
        <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
    @endif

    @php
        $gaMeasurementId = config('services.google_analytics.measurement_id');
        $gaEnabled = app()->environment('production') && !$isAdminPath;
    @endphp
    @if($gaEnabled && !empty($gaMeasurementId))
        <link rel="dns-prefetch" href="//www.googletagmanager.com">
        <script>
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag() {
                dataLayer.push(arguments);
            };

            gtag('js', new Date());
            gtag('config', @js($gaMeasurementId), { send_page_view: false });

            (function loadGaWhenIdle() {
                function inject() {
                    const script = document.createElement('script');
                    script.async = true;
                    script.src = 'https://www.googletagmanager.com/gtag/js?id={{ $gaMeasurementId }}';
                    document.head.appendChild(script);
                }

                if (document.readyState === 'complete') {
                    inject();
                    return;
                }

                window.addEventListener('load', inject, { once: true });
            })();
        </script>
    @endif

    @php
        $facebookPixelId = config('services.facebook.pixel_id');
        $facebookPixelEnabled = app()->environment('production') && !$isAdminPath;
    @endphp
    @if($facebookPixelEnabled && !empty($facebookPixelId))
        <link rel="dns-prefetch" href="//connect.facebook.net">
        <script>
            !function(f){
                if (f.fbq) return;
                const n = f.fbq = function() {
                    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = true;
                n.version = '2.0';
                n.queue = [];
            }(window);

            fbq('init', @js($facebookPixelId));

            (function loadMetaWhenIdle() {
                function inject() {
                    const script = document.createElement('script');
                    script.async = true;
                    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
                    document.head.appendChild(script);
                }

                if (document.readyState === 'complete') {
                    inject();
                    return;
                }

                window.addEventListener('load', inject, { once: true });
            })();
        </script>
        <noscript>
            <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id={{ $facebookPixelId }}&ev=PageView&noscript=1" />
        </noscript>
    @endif

    @if(app()->environment('production') && !$isAdminPath)
        <script>
            const internalAnalyticsEndpoint = @js($analyticsCollectUrl);

            function sanitizeEventName(name) {
                return String(name || '')
                    .toLowerCase()
                    .replace(/[^a-z0-9_]/g, '_')
                    .replace(/_+/g, '_')
                    .replace(/^_+|_+$/g, '')
                    .slice(0, 40);
            }

            function buildPageContext(url) {
                const parsed = new URL(url, window.location.origin);
                const allSegments = parsed.pathname.split('/').filter(Boolean);
                const locale = allSegments[0] || 'unknown';
                const isLocalePrefix = /^[a-z]{2}$/i.test(locale);
                const segments = isLocalePrefix ? allSegments.slice(1) : allSegments;

                let pageKey = 'home';
                if (segments.length === 0) {
                    pageKey = 'home';
                } else if (segments[0] === 'portfolio' && segments[1] === 'detail') {
                    pageKey = 'portfolio_detail';
                } else if (segments[0] === 'portfolio') {
                    pageKey = 'portfolio';
                } else if (segments[0] === 'available-designs' && segments[1] === 'detail') {
                    pageKey = 'available_design_detail';
                } else if (segments[0] === 'available-designs') {
                    pageKey = 'available_designs';
                } else if (segments[0] === 'contact') {
                    pageKey = 'contact';
                } else if (segments[0] === 'after-care') {
                    pageKey = 'after_care';
                } else {
                    pageKey = segments
                        .slice(0, 2)
                        .join('_')
                        .replace(/[^a-zA-Z0-9]/g, '_')
                        .toLowerCase();
                }

                return {
                    page_key: pageKey || 'unknown',
                    locale: locale.toLowerCase(),
                    page_path: parsed.pathname + parsed.search + parsed.hash,
                    page_location: parsed.href,
                    page_title: document.title,
                };
            }

            function getOrCreateSessionKey() {
                const storageKey = 'solztt_visitor_key';
                try {
                    const existing = window.localStorage.getItem(storageKey);
                    if (existing) return existing;
                    const random = window.crypto?.randomUUID
                        ? window.crypto.randomUUID()
                        : `${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
                    window.localStorage.setItem(storageKey, random);
                    return random;
                } catch (_) {
                    return `${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
                }
            }

            const sessionKey = getOrCreateSessionKey();

            function sendInternalAnalytics(eventName, context = {}, payload = {}) {
                if (!internalAnalyticsEndpoint) return;

                const body = {
                    event_name: sanitizeEventName(eventName),
                    page_key: context.page_key ?? null,
                    page_path: context.page_path ?? window.location.pathname,
                    page_location: context.page_location ?? window.location.href,
                    page_title: context.page_title ?? document.title,
                    locale: context.locale ?? null,
                    session_key: sessionKey,
                    source: 'site',
                    referrer: document.referrer || null,
                    payload,
                    occurred_at: new Date().toISOString(),
                };

                if (!body.event_name) return;

                const encodedBody = JSON.stringify(body);
                const blob = new Blob([encodedBody], { type: 'application/json' });

                if (navigator.sendBeacon) {
                    navigator.sendBeacon(internalAnalyticsEndpoint, blob);
                    return;
                }

                fetch(internalAnalyticsEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: encodedBody,
                    keepalive: true,
                }).catch(() => {});
            }

            function trackGaPageView(context) {
                if (typeof window.gtag !== 'function') return;
                gtag('event', 'page_view', {
                    page_location: context.page_location,
                    page_path: context.page_path,
                    page_title: context.page_title,
                });
            }

            function trackMetaPageView() {
                if (typeof window.fbq !== 'function') return;
                fbq('track', 'PageView');
            }

            window.trackAnalyticsEvent = function (eventName, params) {
                const safeEventName = sanitizeEventName(eventName);
                if (!safeEventName) return;

                const payload = params || {};
                const context = buildPageContext(window.location.href);

                if (typeof window.gtag === 'function') {
                    gtag('event', safeEventName, payload);
                }

                if (typeof window.fbq === 'function') {
                    fbq('trackCustom', safeEventName, payload);
                }

                sendInternalAnalytics(safeEventName, context, payload);
            };

            window.trackLeadConversion = function (params) {
                const payload = params || {};
                const context = buildPageContext(window.location.href);

                if (typeof window.gtag === 'function') {
                    gtag('event', 'generate_lead', payload);
                }

                if (typeof window.fbq === 'function') {
                    fbq('track', 'Lead', payload);
                }

                sendInternalAnalytics('generate_lead', context, payload);
            };

            function trackPage(url) {
                const context = buildPageContext(url);

                trackGaPageView(context);
                trackMetaPageView();
                window.trackAnalyticsEvent('site_page_view', context);
                window.trackAnalyticsEvent('page_' + context.page_key, context);
            }

            let lastTrackedUrl = window.location.href;
            trackPage(lastTrackedUrl);

            document.addEventListener('inertia:navigate', function (event) {
                const nextUrl = event?.detail?.page?.url
                    ? new URL(event.detail.page.url, window.location.origin).href
                    : window.location.href;

                if (nextUrl === lastTrackedUrl) return;

                lastTrackedUrl = nextUrl;
                trackPage(nextUrl);
            });
        </script>
    @endif

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])

    <style>
        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        #initial-loader {
            position: fixed;
            inset: 0;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
        }

        .loader-animation {
            width: 40px;
            height: 40px;
            border: 4px solid gray;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
    </style>
</head>

<body class="antialiased">
    @inertia
</body>

</html>
