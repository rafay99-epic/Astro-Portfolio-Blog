---
lecture_title: "O(N^2) Sorting Algorithms and Introduction to Recurrence Relations"
lecture_description: This lecture is about sorting alogorithms and recurrence relations.
pubDate: 2024-09-06
lecture_draft: false
lectureNumber: "03"
subject: Design and Analysis of Algorithms
---

This lecture begins with a review of asymptotic notation concepts through a quiz discussion, followed by an exploration of fundamental sorting algorithms with quadratic time complexity (O(N²)), namely Bubble Sort, Insertion Sort, and Selection Sort. We will analyze their mechanisms, efficiency (time and space complexity), stability, and other characteristics. Finally, the lecture introduces recurrence relations as a tool for analyzing the performance of recursive algorithms and demonstrates how to form and solve them using the iteration/substitution method.

**Quiz Solution Discussion**

Several statements related to asymptotic notation were evaluated:

1.  **`2n² = Ω(n³)`:** This statement is **False**. The Big-Omega (Ω) notation describes a lower bound. For `f(n) = Ω(g(n))`, `f(n)` must grow at least as fast as `g(n)` (times some constant) for large `n`. Here, `f(n) = 2n²` grows slower than `g(n) = n³`. A function cannot have a lower bound that grows asymptotically faster than the function itself.
2.  **`n²log₂n = O(n²)`:** This statement is **False**. Big-O (O) notation describes an upper bound. For `f(n) = O(g(n))`, `f(n)` must grow no faster than `g(n)` (times some constant) for large `n`. Here, `f(n) = n²log₂n` grows faster than `g(n) = n²` because the `log₂n` factor increases with `n`. The upper limit cannot be asymptotically lower (better performing) than the actual function.
3.  **If `f(n) = O(g(n))` & `g(n) = O(h(n))`, then `h(n) = Ω(f(n))`:** This statement is **True**. If `f` is upper-bounded by `g`, and `g` is upper-bounded by `h`, it implies `f` is also upper-bounded by `h` (i.e., `f(n) = O(h(n))` due to the transitive property of Big-O). The relationship `f(n) = O(h(n))` is equivalent to `h(n) = Ω(f(n))`. This follows directly from the definitions: if `f(n) ≤ c₁·h(n)` for `n ≥ n₀`, then `h(n) ≥ (1/c₁)·f(n)` for `n ≥ n₀`.
4.  **`n/500 = Ω(n)`:** This statement is **True**. `f(n) = n/500` and `g(n) = n`. We need to show that `n/500 ≥ c·n` for some constant `c > 0` and large `n`. We can choose `c = 1/500` (or any smaller positive constant, like 1/1000). Since `n/500 ≥ (1/500)·n` is true for all `n ≥ 1`, the condition holds. The constant factor (1/500) does not affect the asymptotic lower bound.
5.  **Let `f(n) = Σᵢ<0xE1><0xB5><0xA3> (from i=1 to n)` and `g(n) = n²`, then `f(n) = Θ(g(n))`:** This statement is **True**. The summation `f(n) = 1 + 2 + ... + n` is the sum of an arithmetic series, which equals `n(n+1)/2`. Expanding this, we get `(n²/2) + (n/2)`. Asymptotically, the dominant term is `n²/2`. Since `f(n)` is both `O(n²)` (because `(n²/2) + (n/2) ≤ 1·n²` for `n ≥ 1`) and `Ω(n²)` (because `(n²/2) + (n/2) ≥ (1/2)·n²` for `n ≥ 0`), it follows that `f(n) = Θ(n²)`. Thus, `f(n) = Θ(g(n))`.

---

**Sorting Techniques and Analysis (I): O(N²) Algorithms**

The fundamental sorting problem involves arranging a sequence of records based on their key fields into a non-decreasing (or non-increasing) order. We often evaluate sorting algorithms based on:

- Number of algorithm steps (overall time complexity).
- Number of key comparisons (especially if comparisons are costly).
- Number of times records are moved or swapped (important for large records).

We will now examine three simple sorting algorithms known for their O(N²) time complexity in the average and worst cases: Bubble Sort, Insertion Sort, and Selection Sort.

**1. Bubble Sort**

- **Concept:** Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order (e.g., if the first is greater than the second for ascending sort). The effect is that larger elements "bubble up" towards the end of the array in each pass.
- **Process:** In the first pass, the largest element bubbles up to the last position. In the second pass, the second-largest element bubbles up to the second-to-last position, and so on. After `k` passes, the last `k` elements are in their final sorted positions. Therefore, each subsequent pass needs to consider one less element.
- **Pseudocode Idea (Optimized for passes):**
  ```
  for i from 0 to n-2:
      for j from 0 to n-2-i:
          if A[j+1] < A[j]:
              swap(A[j], A[j+1])
  ```
- **Python Implementation (Optimized Bubble Sort with Early Exit):**
  This version includes an optimization to stop early if a pass completes with no swaps, indicating the array is already sorted.

  ```python
  def bubble_sort_optimized(arr):
      """Sorts an array using optimized Bubble Sort."""
      n = len(arr)
      for i in range(n - 1):  # Outer loop for passes (n-1 passes needed in worst case)
          swapped = False  # Flag to detect any swaps in this pass
          # Inner loop for comparisons and swaps
          # The range decreases with each pass (n-1-i) because the largest elements
          # are already in place at the end of the array.
          for j in range(n - 1 - i):
              if arr[j] > arr[j + 1]:  # Compare adjacent elements
                  # Swap elements
                  arr[j], arr[j + 1] = arr[j + 1], arr[j]
                  swapped = True  # Mark that a swap occurred
          # If no swaps occurred in this pass, the array is sorted
          if not swapped:
              break # Exit the outer loop early
      return arr

  # Example usage:
  my_list = [6, 5, 3, 1, 8, 7, 2, 4]
  print(f"Original list: {my_list}")
  sorted_list = bubble_sort_optimized(my_list)
  print(f"Sorted list (Bubble Sort): {sorted_list}")
  ```

  - **Code Explanation:**
    - The outer loop (`for i in range(n - 1)`) controls the number of passes. Theoretically, `n-1` passes are sufficient to sort `n` elements.
    - `swapped = False` initializes a flag for each pass.
    - The inner loop (`for j in range(n - 1 - i)`) iterates through the unsorted portion of the array, comparing `arr[j]` and `arr[j+1]`. The range `n - 1 - i` shrinks because after pass `i`, the last `i` elements are correctly placed.
    - If `arr[j] > arr[j+1]`, a swap is performed using Python's tuple assignment, and `swapped` is set to `True`.
    - After the inner loop, if `swapped` is still `False`, it means no elements were swapped in that pass, implying the array is already sorted, so we `break` the outer loop.

- **Analysis:**
  - **Time Complexity:**
    - _Worst Case:_ O(N²). This occurs when the array is in reverse order. There are roughly N²/2 comparisons and O(N²) swaps.
    - _Average Case:_ O(N²). Comparisons and swaps are still quadratic on average.
    - _Best Case:_ O(N) (with the `swapped` flag optimization). This occurs when the array is already sorted. Only one pass is needed (N-1 comparisons) to confirm this, resulting in linear time. Without the optimization, it's still O(N²).
  - **Space Complexity:** O(1). It's an **in-place** sort as it only requires a constant amount of extra space (for the temporary variable during swap, implicitly handled in Python's tuple swap, or variables like `i`, `j`, `swapped`).
  - **Stability:** Bubble Sort is a **stable** sort. If two elements have the same key value, their relative order in the input array will be preserved in the sorted output, because equal elements are never swapped.
  - **Adaptivity:** The optimized version is **adaptive**, meaning its performance improves if the input array is partially sorted.

**2. Insertion Sort**

- **Concept:** Insertion Sort builds the final sorted array one item at a time. It iterates through the input array and for each element, it finds the correct position within the already sorted portion of the array and inserts it there. This is analogous to how many people sort a hand of playing cards.
- **Process:** The algorithm maintains a sorted sub-array at the beginning. It takes the next element from the unsorted part and scans backwards through the sorted sub-array, shifting elements that are larger than the current element one position to the right, until it finds the correct spot to insert the current element.
- **Python Implementation:**

  ```python
  def insertion_sort(arr):
      """Sorts an array using Insertion Sort."""
      n = len(arr)
      # Iterate from the second element (index 1) to the end
      for i in range(1, n):
          key = arr[i]  # The element to be inserted into the sorted portion
          j = i - 1     # Index of the last element in the sorted portion

          # Move elements of arr[0..i-1] that are greater than key
          # one position ahead of their current position
          while j >= 0 and key < arr[j]:
              arr[j + 1] = arr[j]  # Shift element to the right
              j -= 1               # Move to the previous element

          # Insert the key at the correct position (after the element
          # smaller than or equal to it)
          arr[j + 1] = key
      return arr

  # Example usage:
  my_list = [6, 5, 3, 1, 8, 7, 2, 4]
  print(f"Original list: {my_list}")
  sorted_list = insertion_sort(my_list)
  print(f"Sorted list (Insertion Sort): {sorted_list}")
  ```

  - **Code Explanation:**
    - The outer loop (`for i in range(1, n)`) iterates through the array, starting from the second element (`i=1`). The sub-array `arr[0...i-1]` is considered sorted.
    - `key = arr[i]` stores the current element to be inserted.
    - `j = i - 1` points to the last element of the currently sorted sub-array.
    - The `while` loop (`while j >= 0 and key < arr[j]`) finds the insertion point. It checks if we haven't run off the beginning of the array (`j >= 0`) and if the element at `arr[j]` is greater than the `key`.
    - If the condition is true, `arr[j + 1] = arr[j]` shifts the element `arr[j]` one position to the right to make space.
    - `j -= 1` moves the index `j` to the left to compare the `key` with the next element in the sorted sub-array.
    - Once the `while` loop finishes (either `j < 0` or `key >= arr[j]`), the correct position for the `key` is `j + 1`.
    - `arr[j + 1] = key` inserts the `key` into its sorted position.

- **Analysis:**
  - **Time Complexity:**
    - _Worst Case:_ O(N²). Occurs when the array is sorted in reverse order. The inner `while` loop has to shift all preceding elements for each `key`.
    - _Average Case:_ O(N²). On average, an element needs to be shifted past half of the preceding elements.
    - _Best Case:_ O(N). Occurs when the array is already sorted. The inner `while` loop condition (`key < arr[j]`) is never met, so each element only requires a single comparison.
  - **Space Complexity:** O(1). It's an **in-place** sort.
  - **Stability:** Insertion Sort is **stable**. Elements with equal keys maintain their relative order because an element is only shifted if it's strictly greater than the `key`.
  - **Adaptivity:** Insertion Sort is highly **adaptive**. It performs efficiently on arrays that are already substantially sorted. It's often considered efficient for small datasets or nearly sorted datasets compared to other simple quadratic sorts. It generally performs fewer swaps than Bubble Sort but can involve more data movements (shifts).

**3. Selection Sort**

- **Concept:** Selection Sort divides the input list into two parts: a sorted sub-list at the beginning and an unsorted sub-list at the end. Initially, the sorted sub-list is empty. The algorithm repeatedly finds the smallest (or largest, depending on sorting order) element in the unsorted sub-list and swaps it with the first element of the unsorted sub-list, effectively moving it to the end of the sorted sub-list.
- **Process:** In the first pass, it finds the minimum element in the entire array (`A[0...n-1]`) and swaps it with `A[0]`. In the second pass, it finds the minimum element in the remaining unsorted part (`A[1...n-1]`) and swaps it with `A[1]`. This continues until the entire array is sorted.
- **Python Implementation:**

  ```python
  def selection_sort(arr):
      """Sorts an array using Selection Sort."""
      n = len(arr)
      # Iterate through the array. The loop boundary i separates
      # the sorted part (left) from the unsorted part (right).
      for i in range(n - 1): # We only need to go up to n-2
          # Assume the current index i holds the minimum element initially
          min_idx = i

          # Iterate through the unsorted part of the array (from i+1 to end)
          # to find the index of the actual minimum element
          for j in range(i + 1, n):
              if arr[j] < arr[min_idx]:
                  min_idx = j # Update the index of the minimum element

          # If the minimum element wasn't the element at index i,
          # swap the element at i with the minimum element found
          if min_idx != i:
              arr[i], arr[min_idx] = arr[min_idx], arr[i]
      return arr

  # Example usage:
  my_list = [7, 2, 8, 5, 4]
  print(f"Original list: {my_list}")
  sorted_list = selection_sort(my_list)
  print(f"Sorted list (Selection Sort): {sorted_list}")
  ```

  - **Code Explanation:**
    - The outer loop (`for i in range(n - 1)`) iterates from the first element up to the second-to-last element. After pass `i`, `arr[0...i]` contains the `i+1` smallest elements in sorted order.
    - `min_idx = i` initializes the index of the minimum element for the current pass to be the start of the unsorted section.
    - The inner loop (`for j in range(i + 1, n)`) scans the unsorted part (`arr[i+1...n-1]`) to find the index of the smallest element. If a smaller element `arr[j]` is found, `min_idx` is updated.
    - After the inner loop finishes, `min_idx` holds the index of the minimum element in `arr[i...n-1]`.
    - `if min_idx != i:` checks if the minimum element is already in the correct position. If not, `arr[i], arr[min_idx] = arr[min_idx], arr[i]` swaps the element at the current position `i` with the smallest element found in the unsorted part.

- **Analysis:**
  - **Time Complexity:**
    - _Worst Case:_ O(N²). The nested loops structure means roughly N²/2 comparisons are always made.
    - _Average Case:_ O(N²). The number of comparisons is independent of the initial order of the data.
    - _Best Case:_ O(N²). Even if the array is sorted, it still goes through all the comparisons to find the minimum in each pass.
  - **Space Complexity:** O(1). It's an **in-place** sort.
  - **Stability:** Selection Sort is generally **not stable**. Consider `[5₁, 8, 5₂]`. In the first pass, `5₁` is found as the minimum and stays at index 0. The relative order of `5₁` and `5₂` is preserved. Now consider `[5₁, 5₂, 3]`. In the first pass, `3` is the minimum. It swaps with `5₁`, resulting in `[3, 5₂, 5₁]`. The relative order of `5₁` and `5₂` has changed.
  - **Swaps:** A key characteristic is that Selection Sort performs at most **O(N)** swaps (exactly `n-1` swaps in the worst case where the minimum is never already in place). This makes it useful when the cost of writing/swapping elements is very high (e.g., writing to Flash memory).
  - **Adaptivity:** Selection Sort is **not adaptive**. Its runtime doesn't improve for partially or fully sorted arrays.

**Comparison Summary (Bubble vs. Insertion vs. Selection)**

- **Comparisons:** All three typically perform O(N²) comparisons in the average and worst cases. Insertion Sort might perform slightly fewer on average than Selection Sort. Optimized Bubble Sort can do O(N) in the best case.
- **Swaps/Writes:** Bubble Sort performs O(N²) swaps in the average/worst case. Insertion Sort involves O(N²) data movements (shifts) which might be costly. Selection Sort excels here with only O(N) swaps maximum.
- **Best Case Time:** Optimized Bubble Sort and Insertion Sort achieve O(N). Selection Sort remains O(N²).
- **Stability:** Bubble Sort and Insertion Sort are stable. Selection Sort is not.
- **Adaptivity:** Bubble Sort (optimized) and Insertion Sort are adaptive. Selection Sort is not.
- **Simplicity:** Bubble Sort is conceptually very simple, but often less efficient than Insertion Sort. Selection Sort is also relatively straightforward.

Selection Sort's main advantage lies in minimizing swaps, making it suitable when memory write operations are expensive. Insertion Sort often performs best among these three for small or nearly sorted arrays due to its O(N) best-case and adaptive nature.

---

**Recurrence Relations**

Recursive algorithms break a problem down into smaller, self-similar subproblems. Analyzing their efficiency often involves **recurrence relations**.

- **Definition:** A recurrence relation defines a function or sequence, `T(n)`, in terms of its value on smaller inputs (e.g., `T(n-1)`, `T(n/2)`). It consists of:
  - **Base Case(s):** The value of the function for one or more fixed small inputs (e.g., `T(0)`, `T(1)`). This stops the recursion.
  - **Recursive (or Recurrent) Case:** Defines the function for a general input `n` based on its value on smaller inputs and the cost of the work done at that step (e.g., dividing the problem, combining results).

- **Forming Recurrences from Code:**
  To form a recurrence `T(n)` for the running time of a recursive function on input size `n`:
  1.  Identify the **base case(s)** in the code. The time taken is usually constant, say `a` or `c`. `T(base_value) = constant`.
  2.  Identify the **recursive step(s)**. Determine:
      - The number of recursive calls made.
      - The size of the input for each recursive call (e.g., `n-1`, `n/2`).
      - The amount of work done _outside_ the recursive calls at the current step (comparisons, arithmetic, assignments, etc.). This is often represented as `f(n)`, e.g., `O(1)`, `O(n)`.
  3.  Combine these: `T(n) = (number_of_calls * T(size_of_call)) + f(n)`.
  - **Example 1 (Slide 3b/19 - `f(n)`):**

    ```java
    public void f (int n) {
      if (n > 0) { // Comparison: O(1)
        System.out.println(n); // Print: O(1)
        f(n-1); // Recursive call with size n-1
      }
      // Base case (n <= 0): Implicit return, O(1)
    }
    ```

    - Base Case: `n <= 0`. Constant time work. Let `T(0) = a`.
    - Recursive Case: `n > 0`. Constant work (`b` = comparison + print) + one recursive call `T(n-1)`.
    - Recurrence: `T(n) = b + T(n-1)` for `n > 0`, `T(0) = a`.

  - **Example 2 (Slide 3b/20 - `g(n)`):**
    ```java
    public int g(int n) {
      if (n == 1) // Comparison: O(1)
        return 2; // Return: O(1)
      else // Constant work: +, *, /, return = O(1)
        return 3 * g(n / 2) + g( n / 2) + 5; // 2 recursive calls, size n/2
    }
    ```

    - Base Case: `n == 1`. Constant time work. Let `T(1) = c`.
    - Recursive Case: `n > 1`. Constant work (`b` = comparison, multiplication, addition, return) + two recursive calls `T(n/2)`.
    - Recurrence: `T(n) = b + 2T(n/2)` for `n > 1`, `T(1) = c`.

**Solving Recurrences: Iteration / Substitution Method**

This method, also known as unrolling or back-substitution, involves repeatedly applying the recursive case definition to expand the recurrence until a pattern emerges, typically leading to a summation that can be solved.

- **General Steps:**
  1.  Write down the recurrence relation.
  2.  Substitute the relation back into itself for the smaller term (e.g., replace `T(n-1)` or `T(n/2)` using the definition).
  3.  Repeat the substitution a few times.
  4.  Observe the pattern that emerges after `k` substitutions. Express `T(n)` in terms of `T(n-k)` or `T(n/2^k)` and a summation involving `k`.
  5.  Determine the value of `k` required to reach the base case (e.g., solve `n-k=base` or `n/2^k=base`).
  6.  Substitute this value of `k` and the base case value `T(base)` into the pattern equation.
  7.  Simplify the resulting expression (often involves solving a summation) to get a closed-form solution for `T(n)`.
  8.  Express the final result using Big-O notation.

- **Example 1 Solved (T(n) = T(n-1) + n, T(1)=1):**
  1.  `T(n) = T(n-1) + n`
  2.  `T(n) = [T(n-2) + (n-1)] + n = T(n-2) + (n-1) + n`
  3.  `T(n) = [T(n-3) + (n-2)] + (n-1) + n = T(n-3) + (n-2) + (n-1) + n`
  4.  Pattern after `k` steps: `T(n) = T(n-k) + (n-k+1) + ... + (n-1) + n`
  5.  Base case `T(1)`. Reach when `n-k = 1 => k = n-1`.
  6.  Substitute `k=n-1`: `T(n) = T(1) + (1+1) + ... + (n-1) + n = T(1) + 2 + 3 + ... + n`
  7.  `T(n) = 1 + 2 + 3 + ... + n = n(n+1)/2`
  8.  `T(n) = O(n²)`.

- **Example 2 Solved (T(n) = T(n/2) + 1, T(1)=0):** (Assuming n is power of 2)
  1.  `T(n) = T(n/2) + 1`
  2.  `T(n) = [T(n/4) + 1] + 1 = T(n/4) + 2`
  3.  `T(n) = [T(n/8) + 1] + 2 = T(n/8) + 3`
  4.  Pattern after `k` steps: `T(n) = T(n/2^k) + k`
  5.  Base case `T(1)`. Reach when `n/2^k = 1 => n = 2^k => k = log₂n`.
  6.  Substitute `k=log₂n`: `T(n) = T(1) + log₂n`
  7.  `T(n) = 0 + log₂n = log₂n`
  8.  `T(n) = O(log n)`.

- **Example 3 Solved (T(n) = 2T(n/2) + n, T(1)=0):** (Assuming n is power of 2)
  1.  `T(n) = 2T(n/2) + n`
  2.  `T(n) = 2[2T(n/4) + n/2] + n = 4T(n/4) + n + n = 2²T(n/2²) + 2n`
  3.  `T(n) = 4[2T(n/8) + n/4] + 2n = 8T(n/8) + n + 2n = 2³T(n/2³) + 3n`
  4.  Pattern after `k` steps: `T(n) = 2^k T(n/2^k) + kn`
  5.  Base case `T(1)`. Reach when `n/2^k = 1 => k = log₂n`. Also `2^k = n`.
  6.  Substitute `k=log₂n`: `T(n) = 2^(log₂n) T(1) + (log₂n)n`
  7.  `T(n) = n * T(1) + n log₂n = n * 0 + n log₂n = n log₂n`
  8.  `T(n) = O(n log n)`. (This is characteristic of efficient divide-and-conquer algorithms like Merge Sort).

- **Example 4 Solved (Factorial: T(n) = T(n-1) + b, T(0)=c):**
  1.  `T(n) = T(n-1) + b`
  2.  `T(n) = [T(n-2) + b] + b = T(n-2) + 2b`
  3.  `T(n) = [T(n-3) + b] + 2b = T(n-3) + 3b`
  4.  Pattern after `k` steps: `T(n) = T(n-k) + kb`
  5.  Base case `T(0)`. Reach when `n-k = 0 => k = n`.
  6.  Substitute `k=n`: `T(n) = T(0) + nb`
  7.  `T(n) = c + nb`
  8.  `T(n) = O(n)`.

- **Example 5 Solved (Binary Search: T(n) = T(n/2) + b, T(1)=a):**
  This is identical in structure to Example 2, just with different constants.
  Pattern: `T(n) = T(n/2^k) + kb`
  Base Case `T(1)` reached when `k = log₂n`.
  Substitute: `T(n) = T(1) + (log₂n)b = a + b log₂n`
  `T(n) = O(log n)`.

- **Task 2 Solved (T(n) = T(n-1) + bn, T(0)=c):**
  1.  `T(n) = T(n-1) + bn`
  2.  `T(n) = [T(n-2) + b(n-1)] + bn = T(n-2) + b(n-1 + n)`
  3.  `T(n) = [T(n-3) + b(n-2)] + b(n-1 + n) = T(n-3) + b(n-2 + n-1 + n)`
  4.  Pattern after `k` steps: `T(n) = T(n-k) + b[(n-k+1) + ... + (n-1) + n]`
      `T(n) = T(n-k) + b * Σᵢ<0xE1><0xB5><0xA3> (from i=n-k+1 to n)`
  5.  Base case `T(0)`. Reach when `n-k = 0 => k = n`.
  6.  Substitute `k=n`: `T(n) = T(0) + b * Σᵢ<0xE1><0xB5><0xA3> (from i=1 to n)`
  7.  `T(n) = c + b * [n(n+1)/2] = c + (b/2)n² + (b/2)n`
  8.  `T(n) = O(n²)`.

This concludes the overview of O(N²) sorting algorithms and the introduction to forming and solving recurrence relations using the iteration method. The next steps typically involve learning more advanced sorting algorithms (like Merge Sort, Quick Sort) and other methods for solving recurrences (like the Recursion Tree method and the Master Theorem).
