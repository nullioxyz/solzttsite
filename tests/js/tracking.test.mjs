import assert from 'node:assert/strict';
import test from 'node:test';

const calls = [];
const eventId = 'fef0d98e-3a8f-4af3-bf5c-f1e9cad53c55';
const sessionValues = new Map();

globalThis.window = {
  createMetaEventId: () => eventId,
  getMetaTrackingContext: () => ({
    event_source_url: 'https://solztt.test/pt/contact',
    marketing_consent: true,
    fbp: 'fb.1.123.456',
    fbc: 'fb.1.123.click',
  }),
  trackAnalyticsEvent: (...args) => calls.push(['action', ...args]),
  trackLeadConversion: (...args) => calls.push(['lead', ...args]),
  sessionStorage: {
    getItem: (key) => sessionValues.get(key) ?? null,
    setItem: (key, value) => sessionValues.set(key, value),
  },
};

const tracking = await import('../../resources/js/helpers/tracking.js');

test('creates the event ID through the browser tracking runtime', () => {
  assert.equal(tracking.createMetaEventId(), eventId);
});

test('passes the same event ID to the Lead browser event', () => {
  tracking.trackLeadConversion({ references_count: 2, ignored: null }, eventId);

  assert.deepEqual(calls.at(-1), [
    'lead',
    { references_count: 2 },
    eventId,
  ]);
});

test('normalizes custom event names before sending them to the runtime', () => {
  tracking.trackActionEvent('Reference Added!!!', { reference_id: '42' });

  assert.deepEqual(calls.at(-1), [
    'action',
    'reference_added',
    { reference_id: '42' },
  ]);
});

test('returns only the consented Meta tracking context', () => {
  assert.deepEqual(tracking.getMetaTrackingContext(), {
    event_source_url: 'https://solztt.test/pt/contact',
    marketing_consent: true,
    fbp: 'fb.1.123.456',
    fbc: 'fb.1.123.click',
  });
});

test('claims a contact success only once per browser session', () => {
  const completionId = 'completion-123';

  assert.equal(tracking.claimContactSuccess(completionId), true);
  assert.equal(tracking.claimContactSuccess(completionId), false);
});
