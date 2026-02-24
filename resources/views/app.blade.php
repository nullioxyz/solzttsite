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

    $analyticsEnabledForRuntime = app()->environment('production') || filter_var(env('ANALYTICS_ENABLE_LOCAL', false), FILTER_VALIDATE_BOOL);
    $analyticsCollectUrl = \Illuminate\Support\Facades\URL::temporarySignedRoute('analytics.collect', now()->addHours(12), [], absolute: false);
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
        $facebookPixelId = config('services.facebook.pixel_id');
    @endphp
    @if($analyticsEnabledForRuntime && !$isAdminPath)
        <link rel="dns-prefetch" href="//www.googletagmanager.com">
        <link rel="dns-prefetch" href="//connect.facebook.net">
        <script>
            const internalAnalyticsEndpoint = @js($analyticsCollectUrl);
            const gaMeasurementId = @js($gaMeasurementId);
            const facebookPixelId = @js($facebookPixelId);
            const consentStorageKey = 'solztt_cookie_consent_v1';
            const visitorStorageKey = 'solztt_visitor_key';
            const sessionStorageKey = 'solztt_session_key';

            let hasGaLoaded = false;
            let hasMetaLoaded = false;

            function readConsent() {
                try {
                    const raw = window.localStorage.getItem(consentStorageKey);
                    if (!raw) return null;
                    const parsed = JSON.parse(raw);
                    if (typeof parsed !== 'object' || parsed === null) return null;
                    return {
                        necessary: true,
                        analytics: Boolean(parsed.analytics),
                        marketing: Boolean(parsed.marketing),
                        updated_at: parsed.updated_at || null,
                    };
                } catch (_) {
                    return null;
                }
            }

            function saveConsent(preferences) {
                const payload = {
                    necessary: true,
                    analytics: Boolean(preferences.analytics),
                    marketing: Boolean(preferences.marketing),
                    updated_at: new Date().toISOString(),
                };

                try {
                    window.localStorage.setItem(consentStorageKey, JSON.stringify(payload));
                } catch (_) {}

                return payload;
            }

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

            function getOrCreateVisitorKey() {
                try {
                    const existing = window.localStorage.getItem(visitorStorageKey);
                    if (existing) return existing;
                    const random = window.crypto?.randomUUID
                        ? window.crypto.randomUUID()
                        : `${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
                    window.localStorage.setItem(visitorStorageKey, random);
                    return random;
                } catch (_) {
                    return `${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
                }
            }

            function getOrCreateSessionKey() {
                try {
                    const existing = window.sessionStorage.getItem(sessionStorageKey);
                    if (existing) return existing;
                    const random = window.crypto?.randomUUID
                        ? window.crypto.randomUUID()
                        : `${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
                    window.sessionStorage.setItem(sessionStorageKey, random);
                    return random;
                } catch (_) {
                    return `${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
                }
            }

            const visitorKey = getOrCreateVisitorKey();
            const sessionKey = getOrCreateSessionKey();
            let consentState = readConsent();

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
                    visitor_id: visitorKey,
                    source: 'site',
                    referrer: document.referrer || null,
                    payload: {
                        ...payload,
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
                    },
                    consent_preferences: {
                        necessary: true,
                        analytics: Boolean(consentState?.analytics),
                        marketing: Boolean(consentState?.marketing),
                    },
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

            function canTrackAnalytics() {
                return Boolean(consentState?.analytics);
            }

            function canTrackMarketing() {
                return Boolean(consentState?.marketing);
            }

            function ensureGaLoaded() {
                if (hasGaLoaded || !gaMeasurementId) return;

                window.dataLayer = window.dataLayer || [];
                window.gtag = window.gtag || function gtag() {
                    window.dataLayer.push(arguments);
                };

                gtag('js', new Date());
                gtag('config', gaMeasurementId, { send_page_view: false });

                const script = document.createElement('script');
                script.async = true;
                script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
                document.head.appendChild(script);
                hasGaLoaded = true;
            }

            function ensureMetaLoaded() {
                if (hasMetaLoaded || !facebookPixelId) return;

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

                fbq('init', facebookPixelId);

                const script = document.createElement('script');
                script.async = true;
                script.src = 'https://connect.facebook.net/en_US/fbevents.js';
                document.head.appendChild(script);
                hasMetaLoaded = true;
            }

            function applyConsent() {
                if (canTrackAnalytics()) {
                    ensureGaLoaded();
                }

                if (canTrackMarketing()) {
                    ensureMetaLoaded();
                }
            }

            function trackGaPageView(context) {
                if (!canTrackAnalytics()) return;
                if (typeof window.gtag !== 'function') return;
                gtag('event', 'page_view', {
                    page_location: context.page_location,
                    page_path: context.page_path,
                    page_title: context.page_title,
                });
            }

            function trackMetaPageView() {
                if (!canTrackMarketing()) return;
                if (typeof window.fbq !== 'function') return;
                fbq('track', 'PageView');
            }

            window.trackAnalyticsEvent = function (eventName, params) {
                const safeEventName = sanitizeEventName(eventName);
                if (!safeEventName) return;

                const payload = params || {};
                const context = buildPageContext(window.location.href);

                if (canTrackAnalytics() && typeof window.gtag === 'function') {
                    gtag('event', safeEventName, payload);
                }

                if (canTrackMarketing() && typeof window.fbq === 'function') {
                    fbq('trackCustom', safeEventName, payload);
                }

                if (canTrackAnalytics()) {
                    sendInternalAnalytics(safeEventName, context, payload);
                }
            };

            window.trackLeadConversion = function (params) {
                const payload = params || {};
                const context = buildPageContext(window.location.href);

                if (canTrackAnalytics() && typeof window.gtag === 'function') {
                    gtag('event', 'generate_lead', payload);
                }

                if (canTrackMarketing() && typeof window.fbq === 'function') {
                    fbq('track', 'Lead', payload);
                }

                if (canTrackAnalytics()) {
                    sendInternalAnalytics('generate_lead', context, payload);
                }
            };

            function trackPage(url) {
                const context = buildPageContext(url);

                trackGaPageView(context);
                trackMetaPageView();
                if (canTrackAnalytics()) {
                    window.trackAnalyticsEvent('site_page_view', context);
                    window.trackAnalyticsEvent('page_' + context.page_key, context);
                }
            }

            function getCookieBannerElements() {
                return {
                    root: document.getElementById('cookie-consent-root'),
                    banner: document.getElementById('cookie-consent-banner'),
                    customizePanel: document.getElementById('cookie-consent-customize'),
                    openCustomizeBtn: document.getElementById('cookie-open-customize'),
                    acceptAllBtn: document.getElementById('cookie-accept-all'),
                    rejectOptionalBtn: document.getElementById('cookie-reject-optional'),
                    saveBtn: document.getElementById('cookie-save-preferences'),
                    analyticsCheckbox: document.getElementById('cookie-opt-analytics'),
                    marketingCheckbox: document.getElementById('cookie-opt-marketing'),
                };
            }

            function setConsentUI(consent) {
                const { analyticsCheckbox, marketingCheckbox } = getCookieBannerElements();
                if (!analyticsCheckbox || !marketingCheckbox) return;

                analyticsCheckbox.checked = Boolean(consent.analytics);
                marketingCheckbox.checked = Boolean(consent.marketing);
            }

            function hideConsentBanner() {
                const { root } = getCookieBannerElements();
                if (root) {
                    root.style.display = 'none';
                }
            }

            function applyAndPersistConsent(nextConsent) {
                consentState = saveConsent(nextConsent);
                applyConsent();
                hideConsentBanner();

                sendInternalAnalytics(
                    'consent_preferences_updated',
                    buildPageContext(window.location.href),
                    {
                        analytics: Boolean(consentState?.analytics),
                        marketing: Boolean(consentState?.marketing),
                    }
                );

                if (canTrackAnalytics()) {
                    trackPage(window.location.href);
                    lastTrackedUrl = window.location.href;
                }
            }

            function initCookieConsent() {
                const elements = getCookieBannerElements();
                if (!elements.root) return;

                if (consentState) {
                    setConsentUI(consentState);
                    applyConsent();
                    hideConsentBanner();
                    return;
                }

                elements.root.style.display = 'block';
                setConsentUI({ analytics: false, marketing: false });

                elements.openCustomizeBtn?.addEventListener('click', function () {
                    const isVisible = elements.customizePanel?.classList.contains('is-visible');
                    if (elements.customizePanel) {
                        elements.customizePanel.classList.toggle('is-visible', !isVisible);
                    }
                });

                elements.acceptAllBtn?.addEventListener('click', function () {
                    applyAndPersistConsent({ analytics: true, marketing: true });
                });

                elements.rejectOptionalBtn?.addEventListener('click', function () {
                    applyAndPersistConsent({ analytics: false, marketing: false });
                });

                elements.saveBtn?.addEventListener('click', function () {
                    applyAndPersistConsent({
                        analytics: Boolean(elements.analyticsCheckbox?.checked),
                        marketing: Boolean(elements.marketingCheckbox?.checked),
                    });
                });
            }

            let lastTrackedUrl = window.location.href;

            function bootAnalytics() {
                initCookieConsent();

                if (canTrackAnalytics()) {
                    trackPage(lastTrackedUrl);
                }

                document.addEventListener('inertia:navigate', function (event) {
                    const nextUrl = event?.detail?.page?.url
                        ? new URL(event.detail.page.url, window.location.origin).href
                        : window.location.href;

                    if (nextUrl === lastTrackedUrl) return;

                    lastTrackedUrl = nextUrl;
                    if (canTrackAnalytics()) {
                        trackPage(nextUrl);
                    }
                });
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', bootAnalytics, { once: true });
            } else {
                bootAnalytics();
            }
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

        #cookie-consent-root {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 70;
            display: none;
            padding: 16px;
        }

        #cookie-consent-banner {
            max-width: 860px;
            margin: 0 auto;
            background: rgba(250, 250, 250, 0.98);
            backdrop-filter: blur(8px);
            border: 1px solid #e4e4e4;
            border-radius: 16px;
            box-shadow: 0 18px 45px rgba(15, 15, 15, 0.12);
            padding: 18px;
            font-family: 'Merriweather', serif;
            color: #242424;
        }

        .cookie-consent-title {
            margin: 0;
            font-size: 0.95rem;
            font-weight: 700;
            font-family: 'Lora', serif;
            letter-spacing: 0.01em;
        }

        .cookie-consent-text {
            margin: 10px 0 0;
            font-size: 0.82rem;
            line-height: 1.6;
            color: #4f4f4f;
        }

        .cookie-consent-actions {
            margin-top: 14px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        #cookie-consent-banner .cookie-btn {
            border: 1px solid #cfcfcf;
            background: #fff;
            color: #222;
            border-radius: 10px;
            padding: 9px 13px;
            font-size: 0.78rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        #cookie-consent-banner .cookie-btn:hover {
            border-color: #b9b9b9;
            background: #f7f7f7;
        }

        #cookie-consent-banner .cookie-btn:focus-visible {
            outline: none;
            box-shadow: 0 0 0 3px rgba(45, 45, 45, 0.2);
        }

        #cookie-consent-banner .cookie-btn-primary {
            background: #111111;
            color: #ffffff;
            border-color: #111111;
            box-shadow: 0 6px 18px rgba(10, 10, 10, 0.22);
        }

        #cookie-consent-banner .cookie-btn-primary:hover {
            background: #1d1d1d;
            border-color: #1d1d1d;
        }

        #cookie-consent-customize {
            display: none;
            margin-top: 12px;
            border-top: 1px solid #e6e6e6;
            padding-top: 12px;
        }

        #cookie-consent-customize.is-visible {
            display: block;
        }

        .cookie-option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-top: 10px;
            font-size: 0.8rem;
            color: #3f3f3f;
        }

        .cookie-option input[type="checkbox"] {
            width: 16px;
            height: 16px;
            accent-color: #1f1f1f;
        }

        @media (max-width: 640px) {
            #cookie-consent-root {
                padding: 10px;
            }

            #cookie-consent-banner {
                padding: 12px;
            }

            #cookie-consent-banner .cookie-btn {
                flex: 1 1 calc(50% - 8px);
                text-align: center;
            }
        }
    </style>
</head>

<body class="antialiased">
    @if($analyticsEnabledForRuntime && !$isAdminPath)
        <div id="cookie-consent-root" role="dialog" aria-live="polite" aria-label="{{ __('site.cookie_consent_aria') }}">
            <div id="cookie-consent-banner">
                <p class="cookie-consent-title">{{ __('site.cookie_consent_title') }}</p>
                <p class="cookie-consent-text">
                    {{ __('site.cookie_consent_description') }}
                </p>

                <div class="cookie-consent-actions">
                    <button id="cookie-accept-all" type="button" class="cookie-btn cookie-btn-primary">{{ __('site.cookie_consent_accept') }}</button>
                    <button id="cookie-reject-optional" type="button" class="cookie-btn">{{ __('site.cookie_consent_reject') }}</button>
                    <button id="cookie-open-customize" type="button" class="cookie-btn">{{ __('site.cookie_consent_customize') }}</button>
                </div>

                <div id="cookie-consent-customize">
                    <label class="cookie-option">
                        <span>{{ __('site.cookie_consent_analytics') }}</span>
                        <input id="cookie-opt-analytics" type="checkbox">
                    </label>
                    <label class="cookie-option">
                        <span>{{ __('site.cookie_consent_marketing') }}</span>
                        <input id="cookie-opt-marketing" type="checkbox">
                    </label>
                    <div class="cookie-consent-actions">
                        <button id="cookie-save-preferences" type="button" class="cookie-btn cookie-btn-primary">{{ __('site.cookie_consent_save') }}</button>
                    </div>
                </div>
            </div>
        </div>
    @endif
    @inertia
</body>

</html>
