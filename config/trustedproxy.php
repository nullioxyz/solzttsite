<?php

return [
    // Use explicit IPs/CIDRs whenever possible. Use "*" only when the
    // application is reachable exclusively through a trusted reverse proxy.
    'proxies' => env('TRUSTED_PROXIES'),
];
