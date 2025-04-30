---
lecture_title: "Code And Analysis of Algorithms"
lecture_description: This lecture will explore the basics of algorithms, including code and analysis of algorithms.
pubDate: 2024-06-28
lecture_draft: false
lectureNumber: "02"
subject: Design and Analysis of Algorithms
---

**Why Bother? The Need for Speed (and Smarts!)**

Imagine you've written two programs to do the same thing. One finishes in a blink; the other takes ages, maybe even years if the input is big enough! How do we predict this _before_ running the code for a million years? That's where algorithm analysis comes in. It's like having a superpower to see how code behaves as the amount of data it has to handle (we call this input size 'n') grows.

We're especially interested in **Asymptotic Performance** – what happens when 'n' gets _really_ big. An algorithm that's slightly slower for tiny inputs might totally crush another one when the data piles up. Think `n^2` vs `n^3`. For small `n`, `n^3` might even be faster if it has smaller constant factors, but as `n` grows, `n^3` takes off like a runaway rocket, while `n^2` just jogs along faster. The _order of growth_ (like `n`, `n^2`, `log n`) is the key!

**Our Magic Wand: Big O Notation**

Trying to count _every single_ tiny computer step is tedious and often unnecessary. Instead, we use **Big O Notation** (like O(n), O(n^2), O(log n)). It's a wonderfully lazy (and smart!) way to classify algorithms based on their dominant growth rate.

The Big O rule is simple:

1. Figure out the rough formula for the number of steps based on input size 'n'.
2. **Drop all the less important terms.** If you have `5n^2 + 3n + 10`, the `n^2` part grows fastest, so the `3n` and `10` are like dust bunnies – ignore 'em for large `n`.
3. **Drop any constant multipliers.** That `5` in front of `n^2`? Doesn't change the _way_ it grows (quadratically). So, `5n^2 + 3n + 10` becomes just **O(n^2)**.

It tells us the _upper bound_ – the algorithm won't perform worse than this rate as 'n' gets huge.

**Quick Math Pit Stop (Don't Panic!)**

To wield Big O effectively, we need a tiny bit of math intuition:

1.  **Exponents & Logs:** Remember `2^3 = 8`? Logarithms are the opposite: `log base 2 of 8 = 3`. Logs pop up when algorithms repeatedly chop the problem in half (like binary search). They grow _super slowly_, which is awesome for performance! `log n` is much faster than `n`.
2.  **Summations (Σ):** Just a fancy way to add things up, often used when analyzing loops. The key takeaways are the _results_:
    - Adding a constant `c` for `n` times (`1+1+...+1` n times) gives `c*n`, which is O(n).
    - Adding `1 + 2 + 3 + ... + n` (an Arithmetic Series) gives `n(n+1)/2`, which is roughly `n^2/2`. We drop the `/2`, so it's **O(n^2)**.
    - Adding `1^2 + 2^2 + ... + n^2` (a Quadratic Series) ends up being **O(n^3)**.
    - Adding `1 + x + x^2 + ... + x^n` (a Geometric Series) is dominated by the last term, roughly **O(x^n)**.

**Analyzing Code Blocks: The Building Bricks**

Let's look at common code structures:

1.  **Constant Time: O(1)**
    These are the lightning-fast operations that take roughly the same amount of time regardless of 'n'. Think simple assignments (`x = y;`), basic math (`x = 5 * y + 4 - z;`), accessing an array element (`A[j] = 5;`), or a simple `if (x < 12)` check. Blink and you miss it!

2.  **Loops: Where Things Get Interesting**

    - **Simple Linear Loops: O(n)**
      If a loop runs `n` times, and the work inside is just O(1), the total time grows directly with `n`. Like `for (j=0; j < n; j++) { sum = sum + j; }`. This is **O(n)**.
      _Watch Out!_ If a loop runs a _fixed_ number of times, like `for (j=0; j < 100; j++)`, that's just constant work! 100 is a constant, so the loop is O(1).
    - **Logarithmic Loops: O(log n)**
      These are loops where the counter variable jumps up (multiplication) or down (division) by a constant factor each time. Like `for (int i = 1; i <= n; i *= 2)` or `for (int i = n; i > 0; i /= 2)`. They finish incredibly quickly compared to linear loops because they slash the remaining work dramatically each iteration.
    - **Nested Loops: O(n^2), O(n^3), ...**
      Loops inside loops! If an outer loop runs `n` times, and an inner loop _also_ runs `n` times for _each_ outer iteration, you're doing `n * n = n^2` work. That's **O(n^2)** (Quadratic). Three nested loops? Often **O(n^3)** (Cubic).
    - **Dependent Nested Loops:** Sometimes the inner loop's iterations depend on the outer loop's counter (e.g., `for (j=0; j < i; j++)`). We saw that summing `0 + 1 + 2 + ... + (n-1)` gives O(n^2). So, even these often end up being **O(n^2)**. Another variant `for (j=i; j < n; j++)` also sums up iterations in a way that leads to **O(n^2)**.

3.  **Sequences of Statements**
    What if you have an O(n^2) block followed by an O(n) block? Just add them: O(n^2) + O(n). But remember our Big O rule: drop lower terms! The O(n^2) dominates, so the whole sequence is just **O(n^2)**.

4.  **Conditional Statements (if/else)**
    When analyzing `if/else`, we usually consider the **worst case**. If the `if` part takes O(n) and the `else` part takes O(n^2), the whole structure's complexity is **O(n^2)**, because _sometimes_ it might take that long.

5.  **Function Calls in Loops**
    Be careful! If you call a function inside a loop, you need to know the complexity of the function itself. If `myFunction(k)` takes O(k) time, and you call it in a loop like `for (i=0; i<n; i++) { result += myFunction(i); }`, the total time is like O(0) + O(1) + ... + O(n-1), which adds up to **O(n^2)**!

**Common Complexity Classes (The Speed Rankings!)**

Here's a quick lineup from fastest to slowest (generally):

- **O(1)** - Constant: Awesome!
- **O(log n)** - Logarithmic: Super fast. (Binary search)
- **O(n)** - Linear: Pretty good. (Simple list scan)
- **O(n log n)** - Linearithmic: Very common for efficient sorting. (MergeSort)
- **O(n^2)** - Quadratic: Okay for smaller 'n'. (Simple nested loops, Bubble Sort)
- **O(n^3)** - Cubic: Getting slow.
- **O(2^n)** - Exponential: Danger Zone! Gets incredibly slow very quickly. (Trying all subsets)
- **O(n!)** - Factorial: Even worse! (Trying all permutations)

**Best, Worst, and Average Cases**

An algorithm might not always take the same amount of time.

- **Best Case:** The absolute minimum time it _could_ take. (Finding an item at the _start_ of a list: O(1)).
- **Worst Case:** The absolute maximum time it _could_ take. (Finding an item at the _end_ of a list, or not finding it at all: O(n) for linear search).
- **Average Case:** What happens on typical inputs (often similar to the worst case, like O(n) for linear search).

We usually focus on the **Worst Case** because it gives us a guarantee: the algorithm won't perform worse than this.

**Big O, Big Omega (Ω), Big Theta (Θ)**

- **Big O:** Upper Bound (≤) - "It's no worse than this."
- **Big Ω (Omega):** Lower Bound (≥) - "It's no better than this."
- **Big Θ (Theta):** Tight Bound (=) - "It's exactly this." (Means O and Ω match).

We can apply these to best/worst/average cases. Linear search _best_ case is Θ(1). Linear search _worst_ case is Θ(n).

**Putting it All Together**

Analyzing code isn't about scary math; it's about understanding _patterns_. Look for loops, how they nest, how the variables change (additively, multiplicatively), and what the dominant part of the work is. Use Big O to simplify and communicate how the algorithm _scales_ as the input grows. This helps you choose smarter, faster algorithms for your programming quests! Now go forth and analyze!
