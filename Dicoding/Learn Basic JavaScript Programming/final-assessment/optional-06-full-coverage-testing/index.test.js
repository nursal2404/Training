import test from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

// Test suite untuk fungsi sum
test('sum function test suite', async (t) => {
    await t.test('should return the correct sum of two positive numbers', () => {
        assert.strictEqual(sum(2, 3), 5);
        assert.strictEqual(sum(10, 20), 30);
        assert.strictEqual(sum(100, 200), 300);
    });

    await t.test('should return 0 when one or both numbers are negative', () => {
        assert.strictEqual(sum(-1, 5), 0);
        assert.strictEqual(sum(5, -1), 0);
        assert.strictEqual(sum(-1, -1), 0);
    });

    await t.test('should return 0 when one or both arguments are not numbers', () => {
        assert.strictEqual(sum('2', 3), 0);
        assert.strictEqual(sum(2, '3'), 0);
        assert.strictEqual(sum('a', 'b'), 0);
        assert.strictEqual(sum(null, 3), 0);
        assert.strictEqual(sum(undefined, 3), 0);
        assert.strictEqual(sum({}, 3), 0);
        assert.strictEqual(sum([], 3), 0);
    });

    await t.test('should return correct sum when one or both numbers are zero', () => {
        assert.strictEqual(sum(0, 5), 5); 
        assert.strictEqual(sum(5, 0), 5);
        assert.strictEqual(sum(0, 0), 0);
    });

    await t.test('should handle decimal numbers correctly', () => {
        assert.strictEqual(sum(1.5, 2.5), 4);
        assert.strictEqual(sum(0.1, 0.2), 0.30000000000000004);
    });

    // Test untuk kasus batas
    await t.test('edge cases', () => {
        assert.strictEqual(sum(Number.MAX_SAFE_INTEGER, 1), 9007199254740992); // Tes untuk angka besar
        assert.strictEqual(sum(Number.MAX_VALUE, 0), Number.MAX_VALUE); // Tes untuk nilai maksimum
        assert.strictEqual(sum(Number.MIN_VALUE, 0), Number.MIN_VALUE); // Tes untuk nilai minimum
    });
});