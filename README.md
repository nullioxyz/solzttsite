# Solztt Site

Laravel + Inertia.js + React application for the public website and the admin panel.

Production is hosted on DigitalOcean and deployed via GitHub Actions (SSH + artifact upload flow).

## Requirements

- PHP 8.2+
- Composer
- Node.js 20+
- MySQL 8

Preferably, run with Laravel Sail.

## Local setup (Laravel Sail)

1. Copy environment file:
```bash
cp .env.example .env
```

2. Start containers:
```bash
./vendor/bin/sail up -d --build
```

3. Install dependencies and bootstrap the app:
```bash
./vendor/bin/sail composer install
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --seed
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

## Local setup (without Docker)

1. Install dependencies:
```bash
composer install
npm install
```

2. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

3. Configure DB in `.env` and run:
```bash
php artisan migrate --seed
npm run dev
php artisan serve
```

## Production build

```bash
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Tests

```bash
php artisan test
```

If you run tests with Sail/MySQL, ensure the `mysql` host is reachable from the test environment.

## Main routes

- Public home: `/{locale}`
- Portfolio: `/{locale}/portfolio`
- Available designs: `/{locale}/available-designs`
- Contact: `/{locale}/contact`
- Admin panel: `/hall-of-justice`

## Analytics / observability

GA4 and Meta Pixel scripts are loaded only when `APP_ENV=production`.

Page and conversion events are centralized in the main layout and JS tracking helpers.
