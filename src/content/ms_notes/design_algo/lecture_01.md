---
lecture_title: "Introduction to Algorithms"
lecture_description: This lecture will explore the basics of algorithms, including the definition of an algorithm, its characteristics, and the importance of algorithm design and analysis.
pubDate: 2024-06-28
lecture_draft: false
lectureNumber: "01"
subject: Design and Analysis of Algorithms
---

**I. Introduction to Algorithms**

- **What is an Algorithm?**
  - **Informally:**
    - A process, method, technique, procedure, or recipe.
    - A _tool_ for solving a problem.
    - Takes _Input_, processes it via the _Algorithm_, and produces _Output_.
  - **Formally:**
    - A sequence of well-defined _instructions_ or computation _steps_ for solving a computational _problem_.
    - Takes some value or set of values as _input_.
    - Produces some value or set of values as _output_.
    - Is _effective_ (steps are basic and feasible).
    - Is a _finite_ set of statements guaranteed to finish in a finite time (ideally finding an optimal solution, though this isn't always the case for all algorithms).

- **Example: Sorting**
  - **Input:** A sequence of `n` numbers `<a₁, a₂, ..., aₙ>`.
  - **Output:** A permutation (re-ordering) `<b₁, b₂, ..., bₙ>` of the input sequence such that `b₁ ≤ b₂ ≤ ... ≤ bₙ`.

- **Correctness of an Algorithm**
  - An algorithm is **correct** if, for _every_ possible input instance, it halts with the _correct_ output.
  - An **incorrect** algorithm might:
    - Not halt at all on some inputs.
    - Halt with an incorrect answer for some inputs.

- **Essential Features/Properties of Algorithms**
  - **Valid Input:** Input domain is clearly specified.
  - **Correct Output:** Produces the desired valid output (single or multiple).
  - **Finiteness:** Terminates after a finite number of steps/amount of time.
  - **Definiteness:** Instructions are clear, precise, and unambiguous.
  - **Effectiveness:** Instructions are basic enough to be carried out in principle (feasible).
  - **Generality:** Applicable to all problems of a similar form (not just one specific instance).

**II. The Problem-Solving Process & Algorithm Design**

- **Problem Solving Steps:**
  1.  **Problem Definition:** Understand the problem thoroughly.
  2.  **Algorithm Design:** Devise a method/strategy to solve the problem.
  3.  **Algorithm Analysis:** Evaluate the algorithm's efficiency (time, space) and correctness. Check if it meets requirements.
  4.  **Implementation:** Translate the algorithm into a programming language.
  5.  **Verification/Testing/Experiment:** Test the program with various inputs to ensure correctness and measure performance.
  - _Note:_ This is often an iterative cycle (Analyze -> Design -> Implement -> Experiment -> Analyze...).

- **Characteristics of Good Algorithms/Software:**
  - Good Design
  - Easy to Implement
  - Easy to Use
  - Easy to Maintain
  - Provides a Reliable Solution

- **Nature of Algorithm Design:**
  - It is a **creative** task.
  - Good algorithms often result from **repeated efforts and rework**.

**III. Algorithm Analysis**

- **What is Algorithm Analysis?**
  - Measuring the "goodness" or **efficiency** of an algorithm.
  - Predicting the **resource requirements** (primarily time and space).
  - **Computation Time (Running Time):** Usually the primary concern.
  - **Goal:** Determine how running time increases as the _size of the problem (input size)_ increases.

- **Why Analyze Algorithms?**
  - To **choose** the most efficient algorithm among several options.
  - To **increase** the efficiency of existing algorithms.
  - To determine if an algorithm is **optimal** (the best possible).
  - To understand **scalability**: how the algorithm behaves as input size grows very large.
  - Performance often defines the line between **feasible** and **impossible**.
  - Provides a **language** (mathematics) to talk about program behavior.
  - Performance is the **currency** of computing.

- **Running Time Definition:**
  - The total number of **primitive operations** (or "steps") executed for a given input.
    - Primitive Operations: Simple instructions like arithmetic (+, -, \*, /), data movement (load, store, copy), control (branch, function call), memory access.
  - Each primitive operation is assumed to take a constant amount of time (e.g., 1 time unit).
  - Running time depends on:
    - **Input Size (`n`):** The primary factor. Analysis expresses running time as a function of `n`.
    - **Nature of Input:** The specific input values can sometimes affect performance (e.g., already sorted data for a sorting algorithm).
  - Theoretical analysis aims to be independent of specific machines or operating systems.
  - Also known as **Time Complexity**.

- **Approaches to Analysis:**
  1.  **Experimental Approach:**
      - Implement the algorithm.
      - Run it with various inputs of different sizes.
      - Measure actual running time (e.g., using system clocks like `gettime()`).
      - Plot the results.
      - **Limitations:** Requires implementation; results depend heavily on the specific hardware, programming language, compiler, and programmer skill; hard to compare algorithms fairly unless using the exact same environment.
  2.  **Theoretical Approach (Priori Analysis):**
      - Uses a high-level description (like pseudocode).
      - Computes running time as a function of input size `n`.
      - Considers all possible inputs (often focusing on worst-case).
      - Independent of hardware/software factors.
      - Allows evaluation and comparison before implementation. **This is the focus of this course.**

**IV. Order of Growth & Asymptotic Analysis**

- **Order of Growth:**
  - Describes how the running time scales as the input size `n` becomes very large.
  - Focuses on the dominant term in the running time function, ignoring constant factors and lower-order terms.
  - Example: An algorithm with time `3n² + 10n + 5` has an order of growth of `n²`.
  - Different orders of growth lead to vastly different performance for large `n` (e.g., `log n` vs `n` vs `n²` vs `2ⁿ`).

- **Complexity Classes:**
  - Sets of problems/algorithms with similar orders of growth (complexity).
  - Common classes (from fastest to slowest growing):
    - `1` (Constant)
    - `log n` (Logarithmic)
    - `n` (Linear)
    - `n log n` (Linearithmic)
    - `n²` (Quadratic) - e.g., Simple sorts like Bubble, Insertion, Selection
    - `n³` (Cubic)
    - `2ⁿ` (Exponential)
    - `n!` (Factorial)
    - _Note:_ `n log n` is often associated with efficient sorting algorithms like Heap Sort, Merge Sort, Quick Sort (average case).

- **Asymptotic Analysis:**
  - A method for describing the **limiting behavior** of a function (like running time) as the input `n` approaches infinity (`n -> ∞`).
  - Uses **Asymptotic Notations** to formally capture the order of growth.

- **Asymptotic Notations (O, Ω, Θ):**
  - Used to compare the growth rates of functions `f(n)` (e.g., algorithm's running time) and `g(n)` (a simpler reference function like `n²`).
  - **Big-O Notation (O): Asymptotic Upper Bound**
    - `f(n) = O(g(n))` means `f(n)` grows _no faster than_ `g(n)`.
    - Formal Definition: There exist positive constants `c` and `n₀` such that `0 ≤ f(n) ≤ c * g(n)` for all `n ≥ n₀`.
    - Think: `f(n) <= g(n)` asymptotically.
  - **Big-Omega Notation (Ω): Asymptotic Lower Bound**
    - `f(n) = Ω(g(n))` means `f(n)` grows _at least as fast as_ `g(n)`.
    - Formal Definition: There exist positive constants `c` and `n₀` such that `0 ≤ c * g(n) ≤ f(n)` for all `n ≥ n₀`.
    - Think: `f(n) >= g(n)` asymptotically.
  - **Big-Theta Notation (Θ): Asymptotic Tight Bound**
    - `f(n) = Θ(g(n))` means `f(n)` grows _at the same rate as_ `g(n)`.
    - Formal Definition: There exist positive constants `c₁, c₂`, and `n₀` such that `0 ≤ c₁ * g(n) ≤ f(n) ≤ c₂ * g(n)` for all `n ≥ n₀`.
    - Equivalently: `f(n) = O(g(n))` AND `f(n) = Ω(g(n))`.
    - Think: `f(n) = g(n)` asymptotically.

**V. Describing Algorithms: Pseudocode**

- **Why Pseudocode?**
  - Natural Language: Can be long and ambiguous.
  - Flow Charts: Can be cumbersome for complex algorithms.
  - **Pseudocode:** A good balance – more structured than natural language, less formal and detailed than a programming language. Independent of any specific programming language.
- **Characteristics:**
  - Compact, informal, high-level description.
  - Intended for human reading, not compilation.
  - Uses conventions of programming languages (loops, conditionals, variables, function calls).
  - Common Keywords: `INPUT`, `OUTPUT`, `WHILE`, `FOR`, `REPEAT-UNTIL`, `IF-THEN-ELSE`, `RETURN`.
  - Uses indentation to show structure.
  - Allows mathematical notation (e.g., `←` for assignment, `n²`).
- **Examples (from slides):**
  - Area/Perimeter of Rectangle
  - If/Else (Driving License Age Check)
  - For Loop (Print 1 to 100)
  - Sum of Even Numbers (Reading 10 numbers)
  - Sum of Array Elements
  - Finding Max Element in an Array
  - Selection Sort (`selSort` using `findMin` and `swap` - _Home Task: Define `findMin` and `swap`_)

**VI. Practical Applications & Conclusion**

- **Ubiquity of Algorithms:** Sorting/searching are just the beginning. Algorithms are used everywhere:
  - Internet (routing, searching)
  - E-commerce
  - Manufacturing & Logistics (scheduling, optimization)
  - GPS Navigation (shortest path)
  - Scientific Computing (simulations, matrix operations)
  - Bioinformatics (DNA sequence matching)
- **Conclusion:**
  - Algorithms are a fundamental **technology**, just like hardware.
  - Total system performance depends heavily on choosing **efficient algorithms**, not just fast hardware.
  - There is no "cookbook" for all problems; learning **design and analysis techniques** is crucial.

**VII. References**

- _Introduction to Algorithms_ by Thomas H. Corman, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein (CLRS). (Specifically Chapter 1).
- _Introduction to the Design and Analysis of Algorithms_ by Anany Levitin. (Specifically Chapter 1).
