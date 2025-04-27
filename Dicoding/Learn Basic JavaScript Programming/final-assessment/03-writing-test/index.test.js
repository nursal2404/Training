import { test } from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

test('sum function should correctly add two numbers', () => {
    assert.strictEqual(sum(2, 3), 5);
    assert.strictEqual(sum(-1, -5), -6);
    assert.strictEqual(sum(0, 7), 7);
    assert.strictEqual(sum(0, -3), -3);
    assert.strictEqual(sum(0, 0), 0);
    assert.strictEqual(sum(999999, 1), 1000000);
});

test('sum function should handle decimal numbers', () => {
    assert.strictEqual(sum(1.5, 2.5), 4);
    // floating point arithmetic, karena pada JavaScript, 0.1 + 0.2 = 0.30000000000000004
    assert.ok(Math.abs(sum(0.1, 0.2) - 0.3) < Number.EPSILON); 
});