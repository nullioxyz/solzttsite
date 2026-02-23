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

        <meta property="og:image" content="{{ isset($page['props']['metaImage']['media']) && $page['props']['metaImage']['media']['0']['uuid'] ? route('file.index', ['locale' => $page['props']['currentLanguage']['slug'], 'uuid' => $page['props']['metaImage']['media']['0']['uuid']]) : asset('images/logo.jpg') }}">
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

        <meta name="twitter:image" content="{{ isset($page['props']['metaImage']['media']) && $page['props']['metaImage']['media']['0']['uuid'] ? route('file.index', ['locale' => $page['props']['currentLanguage']['slug'], 'uuid' => $page['props']['metaImage']['media']['0']['uuid']]) : asset('images/logo.jpg') }}">

        <link rel="canonical" href="{{ url()->current() }}">
    @endif

    <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Merriweather:wght@300;400&display=swap" rel="stylesheet">
    <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
    @php
        $gaMeasurementId = config('services.google_analytics.measurement_id');
        $gaEnabled = app()->environment('production') || filter_var(config('services.google_analytics.enabled'), FILTER_VALIDATE_BOOLEAN);
    @endphp
    @if($gaEnabled && !empty($gaMeasurementId))
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ $gaMeasurementId }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }

            function trackGaPageView(url) {
                const parsed = new URL(url, window.location.origin);
                gtag('event', 'page_view', {
                    page_location: parsed.href,
                    page_path: parsed.pathname + parsed.search + parsed.hash,
                    page_title: document.title
                });
            }

            gtag('js', new Date());
            gtag('config', @js($gaMeasurementId), { send_page_view: false });
            trackGaPageView(window.location.href);

            let lastGaTrackedUrl = window.location.href;
            document.addEventListener('inertia:navigate', function (event) {
                const nextUrl = event?.detail?.page?.url
                    ? new URL(event.detail.page.url, window.location.origin).href
                    : window.location.href;

                if (nextUrl !== lastGaTrackedUrl) {
                    trackGaPageView(nextUrl);
                    lastGaTrackedUrl = nextUrl;
                }
            });
        </script>
    @endif

    @php
        $facebookPixelId = config('services.facebook.pixel_id');
        $facebookPixelEnabled = app()->environment('production') || filter_var(config('services.facebook.pixel_enabled'), FILTER_VALIDATE_BOOLEAN);
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
            fbq('track', 'PageView');

            let lastTrackedUrl = window.location.href;
            document.addEventListener('inertia:navigate', function (event) {
                const nextUrl = event?.detail?.page?.url
                    ? new URL(event.detail.page.url, window.location.origin).href
                    : window.location.href;

                if (nextUrl !== lastTrackedUrl) {
                    fbq('track', 'PageView');
                    lastTrackedUrl = nextUrl;
                }
            });
        </script>
        <noscript>
            <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id={{ $facebookPixelId }}&ev=PageView&noscript=1" />
        </noscript>
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
