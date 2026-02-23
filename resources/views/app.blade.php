<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', request()->cookie('locale') ?? app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    @if(isset($page['props']['metatags']))
        <title>{{ isset($page['props']['meta_title']) 
                ? $page['props']['meta_title'].' | '.config('app.name') 
                : (($page['props']['metatags']['translation']['title'] 
                    ?? $page['props']['metatags']['default_translation']['title'] 
                    ?? config('app.name'))) }}</title>

        <meta name="description" content="{{ isset($page['props']['meta_description']) 
                ? strip_tags($page['props']['meta_description']) 
                : strip_tags(
                    $page['props']['metatags']['translation']['description'] 
                    ?? $page['props']['metatags']['default_translation']['description'] 
                    ?? ''
                    ) }}">

        <meta name="keywords" content="{{ $page['props']['metatags']['translation']['keywords'] ?? $page['props']['metatags']['default_translation']['keywords'] ?? '' }}">

        {{-- Open Graph --}}
        <meta property="og:title" 
            content="{{ isset($page['props']['meta_title']) 
                ? $page['props']['meta_title'].' | '.config('app.name') 
                : (($page['props']['metatags']['translation']['title'] 
                    ?? $page['props']['metatags']['default_translation']['title'] 
                    ?? config('app.name'))
                    .' | '.config('app.name')) }}">


        <meta property="og:description" 
            content="{{ isset($page['props']['meta_description']) 
                ? strip_tags($page['props']['meta_description']) 
                : strip_tags(
                    $page['props']['metatags']['translation']['description'] 
                    ?? $page['props']['metatags']['default_translation']['description'] 
                    ?? ''
                    ) }}">

        @php
            $metaImageUuid = data_get($page, 'props.metaImage.media.0.uuid');
            $metaImageLocale = data_get($page, 'props.currentLanguage.slug', app()->getLocale());
            $metaImageUrl = $metaImageUuid
                ? route('file.index', ['locale' => $metaImageLocale, 'uuid' => $metaImageUuid])
                : asset('images/logo.jpg');
        @endphp
        <meta property="og:image" content="{{ $metaImageUrl }}">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:type" content="website">

        {{-- Twitter Card --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ isset($page['props']['meta_title']) 
                ? $page['props']['meta_title'].' | '.config('app.name') 
                : (($page['props']['metatags']['translation']['title'] 
                    ?? $page['props']['metatags']['default_translation']['title'] 
                    ?? config('app.name'))
                    .' | '.config('app.name')) }}">
                    
        <meta name="twitter:description" content="{{ isset($page['props']['meta_description']) 
                ? strip_tags($page['props']['meta_description']) 
                : strip_tags(
                    $page['props']['metatags']['translation']['description'] 
                    ?? $page['props']['metatags']['default_translation']['description'] 
                    ?? ''
                    ) }}">

        <meta name="twitter:image" content="{{ $metaImageUrl }}">

        <link rel="canonical" href="{{ url()->current() }}">
    @else
        <title>{{ config('app.name') }}</title>
        <meta name="description" content="{{ config('app.name') }}">
        <link rel="canonical" href="{{ url()->current() }}">
    @endif

    <meta name="robots" content="index,follow">
    <meta property="og:site_name" content="{{ config('app.name') }}">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="dns-prefetch" href="//www.googletagmanager.com">
    <link rel="dns-prefetch" href="//connect.facebook.net">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Merriweather:wght@300;400&display=swap" rel="stylesheet">
    <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
    @php
        $gaMeasurementId = config('services.google_analytics.measurement_id');
        $gaEnabled = app()->environment('production');
    @endphp
    @if($gaEnabled && !empty($gaMeasurementId))
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ $gaMeasurementId }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag() {
                dataLayer.push(arguments);
            };

            gtag('js', new Date());
            gtag('config', @js($gaMeasurementId), { send_page_view: false });
        </script>
    @endif

    @php
        $facebookPixelId = config('services.facebook.pixel_id');
        $facebookPixelEnabled = app()->environment('production');
    @endphp
    @if($facebookPixelEnabled && !empty($facebookPixelId))
        <script>
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', @js($facebookPixelId));
        </script>
        <noscript>
            <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id={{ $facebookPixelId }}&ev=PageView&noscript=1" />
        </noscript>
    @endif

    @if(app()->environment('production'))
        <script>
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

                if (typeof window.gtag === 'function') {
                    gtag('event', safeEventName, payload);
                }

                if (typeof window.fbq === 'function') {
                    fbq('trackCustom', safeEventName, payload);
                }
            };

            window.trackLeadConversion = function (params) {
                const payload = params || {};

                if (typeof window.gtag === 'function') {
                    gtag('event', 'generate_lead', payload);
                }

                if (typeof window.fbq === 'function') {
                    fbq('track', 'Lead', payload);
                }
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

    <title inertia>{{ config('app.name', 'Solztt') }}</title>

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
