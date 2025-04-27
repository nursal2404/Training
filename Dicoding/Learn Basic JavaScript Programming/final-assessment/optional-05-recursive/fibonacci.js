function fibonacci(n) {
    // Base case
    if (n === 0) return [0];
    if (n === 1) return [0, 1];
    
    // Recursive case
    const sequence = fibonacci(n - 1);
    sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    return sequence;

}

// Jangan hapus kode di bawah ini!
export default fibonacci;
