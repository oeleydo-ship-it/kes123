import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProjectEstimate,
  formatCurrencyRange,
  validateInquiryForm,
} from './estimator';

test('calculateProjectEstimate computes baseline marketing core project', () => {
  const estimate = calculateProjectEstimate({
    projectType: 'marketing',
    complexity: 'core',
    addons: [],
  });

  assert.equal(estimate.minWeeks, 5);
  assert.equal(estimate.maxWeeks, 7);
  assert.equal(estimate.minCostUsd, 18000);
  assert.equal(estimate.maxCostUsd, 21500);
  assert.equal(estimate.phases.length, 3);
  const sumPhaseWeeks = estimate.phases.reduce((acc, p) => acc + p.weeks, 0);
  assert.equal(sumPhaseWeeks, estimate.minWeeks);
});

test('calculateProjectEstimate scales with complexity tier and unique add-ons', () => {
  const estimate = calculateProjectEstimate({
    projectType: 'commerce',
    complexity: 'enterprise',
    addons: ['billing', 'audit', 'billing'], // duplicate 'billing' should be deduplicated
  });

  // Base commerce: 8w, $34,000; enterprise: +6w, *1.75 => 59,500; billing + audit: +4w, +14,000 => 73,500
  assert.equal(estimate.minWeeks, 18);
  assert.equal(estimate.minCostUsd, 73500);
  assert.match(estimate.recommendedSquad, /Systems Architect/);
});

test('formatCurrencyRange formats compact USD ranges accurately', () => {
  assert.equal(formatCurrencyRange(18000, 22000), '$18k – $22k');
  assert.equal(formatCurrencyRange(42500, 51000), '$42.5k – $51k');
});

test('validateInquiryForm rejects missing or malformed fields', () => {
  const emptyResult = validateInquiryForm({
    fullName: '',
    email: 'not-an-email',
    company: '',
    launchWindow: '2-3 months',
    brief: 'Too short',
  });

  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.fullName);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.brief);
});

test('validateInquiryForm accepts valid inquiry submissions', () => {
  const validResult = validateInquiryForm({
    fullName: 'Elena Vance',
    email: 'elena@northbridge.io',
    company: 'Northbridge',
    launchWindow: '2-3 months',
    brief: 'We need a full rebuild of our B2B customer portal in React and TypeScript.',
  });

  assert.equal(validResult.isValid, true);
  assert.deepEqual(validResult.errors, {});
});
