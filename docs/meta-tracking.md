# Meta Pixel and Conversions API

The site sends consented marketing events through both Meta Pixel and the
Conversions API. Browser and server copies share the same event name and event
ID so Meta can deduplicate them.

## Events

| Event | Browser | Server | Trigger |
| --- | --- | --- | --- |
| `PageView` | Pixel | CAPI | Initial page load and Inertia navigation |
| `ViewContent` | Pixel | CAPI | Portfolio and available-design detail pages |
| `ContactFormStarted` | Pixel | CAPI | First interaction with the contact form |
| `ReferenceAdded` | Pixel | CAPI | A portfolio/design reference is selected |
| `Lead` | Pixel | CAPI | Contact passes validation/CAPTCHA and is persisted |

`Lead` is never accepted by the generic browser endpoint. Its server event is
created from the successfully persisted contact, and its browser event is sent
only by the success callback using the same event ID.

## Environment

```dotenv
ANALYTICS_ENABLE_LOCAL=false
FACEBOOK_PIXEL_ID=
FACEBOOK_PIXEL_ENABLED=true
FACEBOOK_CAPI_ENABLED=true
FACEBOOK_CAPI_ACCESS_TOKEN=
FACEBOOK_GRAPH_API_VERSION=v25.0
FACEBOOK_TEST_EVENT_CODE=
FACEBOOK_CAPI_TIMEOUT=5
FACEBOOK_DELIVERY_RETENTION_DAYS=30
QUEUE_CONNECTION=database
TRUSTED_PROXIES=
```

`FACEBOOK_TEST_EVENT_CODE` must be set only while using Test Events. Remove it in
production. Confirm the currently supported Graph API version in Meta's current
documentation before changing `FACEBOOK_GRAPH_API_VERSION`.

Production does not require Supervisor or a long-running process. Configure the
hosting control panel to execute Laravel's scheduler once per minute:

```bash
cd /absolute/path/to/the/project && /usr/bin/php artisan schedule:run >/dev/null 2>&1
```

The scheduler drains the database queues with `--stop-when-empty`, so it works
on basic hosting without keeping a daemon alive. It also removes old delivery
metadata after the configured retention period. Delivery records never contain
the CAPI payload or customer identifiers. Failed queue records, which may retain
the serialized technical payload, are automatically removed after seven days.

On a basic single-server host, keep `CACHE_DRIVER=file` and
`QUEUE_CONNECTION=database`. Leave `TRUSTED_PROXIES` empty when the site is
served directly. Set it only if the hosting provider confirms that requests pass
through a reverse proxy and provides its explicit IPs or CIDRs.

## Local verification

1. Add the Pixel/Dataset ID, CAPI token and Test Events code to `.env`. Set
   `ANALYTICS_ENABLE_LOCAL=true` only for this local verification.
2. Set `APP_URL` to the exact public origin used in the browser. The Meta
   endpoint rejects event source URLs and `Origin` headers from other hosts.
3. Run `php artisan migrate` and `php artisan config:clear`.
4. Run `php artisan schedule:run` manually or configure the production cron.
5. Open Meta Events Manager > Test Events.
6. Reject optional cookies and confirm no Meta browser/server events arrive.
7. Enable only marketing cookies and navigate through the site.
8. Open a portfolio/design detail and add a reference.
9. Submit a valid contact form.
10. Confirm Browser and Server sources have identical event names and event IDs
   and are shown as deduplicated.
11. Remove `FACEBOOK_TEST_EVENT_CODE` before production.

## Authoritative references

- https://developers.facebook.com/documentation/ads-commerce/conversions-api
- https://developers.facebook.com/documentation/ads-commerce/conversions-api/deduplicate-pixel-and-server-events
- https://www.postman.com/meta/facebook-marketing-api/overview
