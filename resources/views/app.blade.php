<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', request()->cookie('locale') ?? app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @inertiaHead
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L1M0C8JWXT"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-L1M0C8JWXT');
    </script>

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

    <div id="initial-loader">
        <div class="loader-animation"></div>
    </div>

    @inertia

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const loader = document.getElementById('initial-loader');
            // Remove loader quando o Inertia terminar de carregar a página
            window.addEventListener('load', () => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500); // Remover após 0.5s para transição suave
            });
        });
    </script>
</body>

</html>
