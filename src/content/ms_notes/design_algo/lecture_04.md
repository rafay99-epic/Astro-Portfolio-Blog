---
lecture_title: "Solving Recurrences (Recursion Tree, Master Theorem) & Divide and Conquer Algorithms (Merge Sort, Quick Sort, Heap Sort)"
lecture_description: This lecture covers solving recurrence relations, including the recursion tree method and the master theorem. It also introduces divide and conquer algorithms, such as merge sort, quick sort, and heap sort.
pubDate: 2024-09-13
lecture_draft: false
lectureNumber: "04"
subject: Design and Analysis of Algorithms
---

This lecture builds upon the previous discussion of recurrence relations. We will explore two powerful techniques for solving them: the Recursion Tree Method and the Master Theorem. We will then delve into the Divide and Conquer algorithm design paradigm, illustrating it with three fundamental sorting algorithms: Merge Sort, Quick Sort, and Heap Sort (though Heap Sort isn't strictly Divide and Conquer, its analysis and build process share some concepts).

**Recap: Solving Recurrences**

In the previous lecture, we introduced recurrence relations for analyzing recursive algorithms and discussed the **Iteration/Substitution Method** for solving them. Today, we explore two additional methods:

1.  **Recursion Tree Method**
2.  **Master Theorem**

---

**Solving Recurrences: The Recursion Tree Method**

The Recursion Tree method provides a visual and intuitive way to analyze the cost of a recursive algorithm defined by a recurrence relation.

- **Approach:**

  1.  **Expand:** Start with the initial recurrence. Represent the cost `f(n)` associated with the top-level call as the root of a tree. The recursive terms (e.g., `aT(n/b)`) become the children of the root. Each child node represents the cost associated with a subproblem. Continue expanding each node recursively until you reach the base cases (leaves).
  2.  **Sum Costs per Level:** Calculate the total cost incurred across all nodes at each depth (level) of the tree.
  3.  **Sum Level Costs:** Sum the costs calculated for all levels (from the root down to the level just above the leaves) and add the cost of the base cases (leaves) to get the total cost, which represents `T(n)`.

- **Tree Terminology Refresher:**
  - **Node:** Represents the cost of a single subproblem.
  - **Root:** Represents the cost of the initial problem call.
  - **Level/Depth:** The distance from the root (root is at level 0).
  - **Height:** The length of the longest path from the root to a leaf.
  - **Leaves:** Represent the base cases of the recursion.

**Example 1: T(n) = 2T(n/2) + cn (where c > 0 is constant)**

Let's solve this recurrence using the recursion tree method (assuming `T(1) = Θ(1)` and n is a power of 2).

1.  **Expand:**

    - **Level 0:** The root represents the cost `cn`. It has two children representing `T(n/2)`.
    - **Level 1:** There are 2 nodes. Each corresponds to a subproblem of size `n/2`. The cost _at each node_ for the divide/combine step is `c(n/2)`. The total cost at this level is `2 * c(n/2) = cn`. These nodes have children representing `T(n/4)`.
    - **Level 2:** There are `2^2 = 4` nodes. Each corresponds to a subproblem of size `n/4`. The cost at each node is `c(n/4)`. The total cost at this level is `4 * c(n/4) = cn`.
    - **Level i:** There are `2^i` nodes. Each corresponds to a subproblem of size `n/2^i`. The cost at each node is `c(n/2^i)`. The total cost at this level is `2^i * c(n/2^i) = cn`.

2.  **Determine Tree Height and Leaves:**

    - The recursion stops when the subproblem size reaches the base case, typically size 1. So, `n/2^h = 1`, which implies `n = 2^h`, or `h = log₂n`. The tree has `h + 1` levels (from 0 to `h`).
    - The number of leaves at the last level (`h = log₂n`) is `2^h = 2^(log₂n) = n`. Each leaf represents a base case `T(1)`, which has a cost of `Θ(1)`. The total cost at the leaf level is `n * Θ(1) = Θ(n)`.

3.  **Sum Costs:**

    - The total cost is the sum of costs at all levels (0 to h-1) plus the cost of the leaves (level h).
    - Total Cost = `(Cost Level 0) + (Cost Level 1) + ... + (Cost Level h-1) + (Cost Level h)`
    - Total Cost = `cn + cn + ... + cn` (`h` times) + `Θ(n)`
    - Total Cost = `h * cn + Θ(n)`
    - Total Cost = `(log₂n) * cn + Θ(n)`
    - Total Cost = `c * n log₂n + Θ(n)`

4.  **Result:** `T(n) = Θ(n log n)`.

_(Slide 3b/8 presents an alternative calculation focusing on cost per node, but the summation across levels yields the same result)_. This `Θ(n log n)` complexity is characteristic of efficient sorting algorithms like Merge Sort and the average case of Quick Sort.

**Example 2: T(n) = T(n/3) + T(2n/3) + n**

1.  **Expand:**

    - **Level 0:** Root cost `n`. Children `T(n/3)` and `T(2n/3)`.
    - **Level 1:** Costs at nodes are `n/3` and `2n/3`. Total cost = `n/3 + 2n/3 = n`.
    - **Level 2:** Nodes represent `T(n/9)`, `T(2n/9)` (from `T(n/3)`) and `T(2n/9)`, `T(4n/9)` (from `T(2n/3)`). Costs are `n/9`, `2n/9`, `2n/9`, `4n/9`. Total cost = `(1+2+2+4)n/9 = 9n/9 = n`.
    - Observation: The cost seems to sum to `n` at every level.

2.  **Determine Tree Height:** The tree is unbalanced. The longest path follows the `T(2n/3)` branch. It stops when the size is `Θ(1)`. `(2/3)^h * n = 1 => n = (3/2)^h => h = log_{3/2} n`.

3.  **Sum Costs:** The total cost is the sum of the costs per level (`n`) multiplied by the number of levels (height `h`).

    - Total Cost ≈ `n * h = n * log_{3/2} n`.

4.  **Result:** `T(n) = O(n log n)`. (Using O-notation as the summation isn't perfectly uniform).

**Example 3: T(n) = 3T(n/4) + cn²**

1.  **Expand:**

    - **Level 0:** Root cost `cn²`. 3 children `T(n/4)`.
    - **Level 1:** Costs at nodes `c(n/4)² = cn²/16`. Total cost = `3 * cn²/16 = (3/16)cn²`.
    - **Level 2:** `3²=9` nodes. Costs `c(n/16)² = cn²/256`. Total = `9 * cn²/256 = (9/256)cn² = (3/16)²cn²`.
    - **Level i:** Total cost = `(3/16)^i * cn²`.

2.  **Determine Tree Height and Leaves:**

    - `n/4^h = 1 => h = log₄n`.
    - Number of leaves = `3^h = 3^(log₄n) = n^(log₄3)`. Total leaf cost = `n^(log₄3) * T(1) = Θ(n^(log₄3))`.

3.  **Sum Costs:**

    - Total Cost = `Σ (from i=0 to h-1) [(3/16)^i * cn²] + Θ(n^(log₄3))`
    - This is a geometric series with ratio `r = 3/16 < 1`. The sum is bounded by a constant factor of the first term (`i=0`).
    - Total Cost = `cn² * Θ(1) + Θ(n^(log₄3))`

4.  **Result:** `T(n) = Θ(n²)`, as the root's cost dominates.

**Example 4 (Task 1): T(n) = T(n/4) + T(n/2) + n²**

1.  **Expand:**

    - **Level 0:** Root cost `n²`. Children `T(n/4)` and `T(n/2)`.
    - **Level 1:** Node costs `(n/4)² = n²/16` and `(n/2)² = n²/4`. Total = `n²/16 + n²/4 = 5n²/16`.
    - **Level 2:** Total cost = `(n/16)² + (n/8)² + (n/8)² + (n/4)² = n²/256 + 2n²/64 + n²/16 = (1 + 8 + 16)n²/256 = 25n²/256 = (5/16)²n²`.
    - **Level i:** Total cost appears to be `(5/16)^i * n²`.

2.  **Sum Costs:**

    - Total Cost = `Σ (from i=0 to h) [(5/16)^i * n²]`. (Height `h` is determined by the deeper `n/2` path, `log₂n`).
    - Geometric series with ratio `r = 5/16 < 1`. Dominated by the first term.
    - Total Cost = `n² * Θ(1)`.

3.  **Result:** `T(n) = Θ(n²)`.

**Example 5 (Task 2): T(n) = 2T(n/2) + n²**

1.  **Expand:**

    - **Level 0:** Root cost `n²`. Children `T(n/2)`.
    - **Level 1:** 2 nodes. Costs `(n/2)² = n²/4`. Total = `2 * n²/4 = n²/2`.
    - **Level 2:** 4 nodes. Costs `(n/4)² = n²/16`. Total = `4 * n²/16 = n²/4`.
    - **Level i:** `2^i` nodes. Costs `(n/2^i)² = n²/4^i`. Total = `2^i * n²/4^i = n²/2^i`.

2.  **Determine Tree Height:** `h = log₂n`.

3.  **Sum Costs:**

    - Total Cost = `Σ (from i=0 to h-1) [n²/2^i] + Θ(n)` (Leaves: `n` leaves \* `T(1)` cost)
    - Total Cost = `n² * Σ (from i=0 to logn-1) [(1/2)^i] + Θ(n)`
    - Geometric series with `r=1/2 < 1`. Sum is `Θ(1)`.
    - Total Cost = `n² * Θ(1) + Θ(n)`.

4.  **Result:** `T(n) = Θ(n²)`.

_(Note: The geometric series formula is helpful here. For `r < 1`, `Σ (from i=0 to ∞) r^i = 1/(1-r)`, meaning the sum is constant. For `r > 1`, the sum is dominated by the last term. For `r = 1`, the sum is number of terms.)_

---

**Algorithm Design Paradigm: Divide and Conquer (D&C)**

Divide and Conquer is a general strategy for designing algorithms, particularly effective for problems that can be broken down recursively.

- **Nature:** Inherently recursive.
- **Analysis:** Naturally leads to recurrence relations.
- **Three Steps:**

  1.  **Divide:** Break the original problem of size `n` into `a` smaller, independent subproblems, each of size `n/b`.
  2.  **Conquer:** Solve the subproblems recursively. If a subproblem size is small enough (base case), solve it directly.
  3.  **Combine:** Combine the solutions of the subproblems to form the solution for the original problem. The work done in the Divide and Combine steps is represented by `f(n)` in the recurrence.

- **General Recurrence Relation:**
  `T(n) = aT(n/b) + f(n)`
  - `a`: Number of subproblems (`a ≥ 1`).
  - `n/b`: Size of each subproblem (`b > 1`).
  - `f(n)`: Cost of dividing the problem and combining the subproblem solutions.

---

**Solving Recurrences: The Master Theorem**

The Master Theorem provides a "cookbook" method for solving recurrences of the form `T(n) = aT(n/b) + f(n)`, provided `f(n)` can be expressed as `Θ(n^d)` for some `d ≥ 0`.

- **Conditions:**

  - `a ≥ 1` (number of subproblems)
  - `b > 1` (factor by which subproblem size decreases)
  - `f(n) = Θ(n^d)` where `d ≥ 0` (cost of divide/combine is polynomial)

- **Three Cases:** Compare `a` (rate of subproblem proliferation) with `b^d` (rate of work decrease per subproblem at each level).

  1.  **If `a < b^d` (Work decreases rapidly):** The cost is dominated by the work done at the root.
      `T(n) = Θ(f(n)) = Θ(n^d)`

  2.  **If `a = b^d` (Work per level is roughly equal):** The cost is the work per level times the number of levels.
      `T(n) = Θ(f(n) * log n) = Θ(n^d log n)`

  3.  **If `a > b^d` (Subproblems proliferate rapidly):** The cost is dominated by the work done at the leaves.
      `T(n) = Θ(n^(log_b a))`

**Master Theorem Examples:**

1.  **T(n) = 9T(n/3) + n**

    - `a = 9`, `b = 3`, `f(n) = n = Θ(n^1) => d = 1`.
    - Compare `a` with `b^d`: `9` vs `3^1 = 3`.
    - Since `9 > 3`, this is **Case 3**.
    - `T(n) = Θ(n^(log_b a)) = Θ(n^(log₃9)) = Θ(n²)`.

2.  **T(n) = 8T(n/2) + n²**

    - `a = 8`, `b = 2`, `f(n) = n² = Θ(n²) => d = 2`.
    - Compare `a` with `b^d`: `8` vs `2² = 4`.
    - Since `8 > 4`, this is **Case 3**.
    - `T(n) = Θ(n^(log_b a)) = Θ(n^(log₂8)) = Θ(n³)`.

3.  **T(n) = T(n/2) + 1**

    - `a = 1`, `b = 2`, `f(n) = 1 = Θ(n⁰) => d = 0`.
    - Compare `a` with `b^d`: `1` vs `2⁰ = 1`.
    - Since `1 = 1`, this is **Case 2**.
    - `T(n) = Θ(n^d log n) = Θ(n⁰ log n) = Θ(log n)`.

4.  **T(n) = 2T(n/2) + n**
    - `a = 2`, `b = 2`, `f(n) = n = Θ(n¹) => d = 1`.
    - Compare `a` with `b^d`: `2` vs `2¹ = 2`.
    - Since `2 = 2`, this is **Case 2**.
    - `T(n) = Θ(n^d log n) = Θ(n¹ log n) = Θ(n log n)`.

**Limitations of this Master Theorem Version:**

- `f(n)` must be polynomially bounded (`Θ(n^d)`). It doesn't work directly for `f(n) = 2^n`, `f(n) = n log n` (though extended versions exist).
- `T(n)` must be monotone.
- `a` must be constant, `b` must be a constant > 1.

**Home Task Examples (Master Theorem):**

1.  `T(n) = 3T(n/2) + n^2`: `a=3, b=2, d=2`. `b^d=4`. `a<b^d` -> Case 1. `T(n)=Θ(n^2)`.
2.  `T(n) = 4T(n/2) + n^2`: `a=4, b=2, d=2`. `b^d=4`. `a=b^d` -> Case 2. `T(n)=Θ(n^2 log n)`.
3.  `T(n) = 2T(n/2) + n log n`: `f(n)` is not `Θ(n^d)`. Basic Master Theorem N/A. (Result is `Θ(n log² n)`)
4.  `T(n) = 3T(n/2) + n`: `a=3, b=2, d=1`. `b^d=2`. `a>b^d` -> Case 3. `T(n)=Θ(n^(log₂3))`. (log₂3 ≈ 1.58)
5.  `T(n) = 6T(n/3) + n^2 log n`: `f(n)` is not `Θ(n^d)`. Basic Master Theorem N/A.

---

**Divide and Conquer Example: Merge Sort**

Merge Sort is a classic D&C sorting algorithm.

- **Algorithm:**

  1.  **Divide:** If the sequence `A[p...r]` has more than one element (`p < r`), find the midpoint `q = floor((p+r)/2)` and divide it into two subsequences `A[p...q]` and `A[q+1...r]`.
  2.  **Conquer:** Recursively sort the two subsequences using Merge Sort: `MERGE-SORT(A, p, q)` and `MERGE-SORT(A, q+1, r)`.
  3.  **Combine:** Merge the two now-sorted subsequences `A[p...q]` and `A[q+1...r]` back into a single sorted sequence in `A[p...r]`. This is done by the `MERGE(A, p, q, r)` procedure.

- **Merge Procedure:**

  - Takes two sorted subarrays (conceptually `L` and `R`, often implemented using a temporary array) and merges them into a single sorted array.
  - Uses pointers (indices) into `L`, `R`, and the output array `A`.
  - Repeatedly compares the elements pointed to by the `L` and `R` pointers, copies the smaller element to the next position in `A`, and advances the corresponding pointer.
  - Continues until one subarray is exhausted, then copies the remaining elements from the other subarray into `A`.
  - This merge step takes linear time, `Θ(n)`, where `n` is the total number of elements being merged (`r-p+1`).

- **Python Implementation:**

  ```python
  def merge(arr, p, q, r):
      """Merges two sorted subarrays arr[p..q] and arr[q+1..r]"""
      n1 = q - p + 1
      n2 = r - q

      # Create temporary arrays
      L = [0] * n1
      R = [0] * n2

      # Copy data to temporary arrays L[] and R[]
      for i in range(n1):
          L[i] = arr[p + i]
      for j in range(n2):
          R[j] = arr[q + 1 + j]

      # Merge the temporary arrays back into arr[p..r]
      i = 0     # Initial index of first subarray
      j = 0     # Initial index of second subarray
      k = p     # Initial index of merged subarray

      while i < n1 and j < n2:
          if L[i] <= R[j]:
              arr[k] = L[i]
              i += 1
          else:
              arr[k] = R[j]
              j += 1
          k += 1

      # Copy the remaining elements of L[], if any
      while i < n1:
          arr[k] = L[i]
          i += 1
          k += 1

      # Copy the remaining elements of R[], if any
      while j < n2:
          arr[k] = R[j]
          j += 1
          k += 1

  def merge_sort(arr, p, r):
      """Sorts arr[p..r] using merge sort"""
      if p < r:
          q = (p + r) // 2  # Find the middle point

          # Sort first and second halves
          merge_sort(arr, p, q)
          merge_sort(arr, q + 1, r)

          # Merge the sorted halves
          merge(arr, p, q, r)

  # Example usage
  my_list = [6, 5, 3, 1, 8, 7, 2, 4]
  print(f"Original list: {my_list}")
  merge_sort(my_list, 0, len(my_list) - 1)
  print(f"Sorted list (Merge Sort): {my_list}")
  ```

- **Analysis:**
  - **Recurrence Relation:** `T(n) = 2T(n/2) + Θ(n)` (2 subproblems of size n/2, Θ(n) merge time).
  - **Time Complexity:** Using the Master Theorem (Case 2) or Recursion Tree, `T(n) = Θ(n log n)` in all cases (best, average, worst).
  - **Space Complexity:** O(N) due to the temporary array used in the merge step. Not in-place.
  - **Stability:** Merge Sort is stable if implemented carefully (when elements are equal, prioritize the one from the left subarray `L`).

---

**Divide and Conquer Example: Quick Sort**

Quick Sort is another efficient D&C sorting algorithm, often faster in practice than Merge Sort despite its worst-case performance.

- **Algorithm:**

  1.  **Divide:** Choose an element from the array `A[p...r]` called the **pivot**. Rearrange the elements in `A[p...r]` such that all elements less than or equal to the pivot come before it, and all elements greater than the pivot come after it. The pivot ends up in its final sorted position, say index `q`. This step is called **Partitioning**. The array is divided into `A[p...q-1]` and `A[q+1...r]`.
  2.  **Conquer:** Recursively sort the two subarrays `A[p...q-1]` and `A[q+1...r]` by calling Quick Sort.
  3.  **Combine:** Trivial. Since the subarrays are sorted in place, no work is needed to combine them. The entire array `A[p...r]` is now sorted.

- **Partitioning:**

  - The core operation. Several schemes exist (e.g., Lomuto, Hoare).
  - Goal: Given `A[p...r]` and a chosen pivot (often `A[r]` in Lomuto), rearrange so elements `<= pivot` are left, elements `> pivot` are right, and return the pivot's final index `q`.
  - Typically takes linear time, `Θ(n)`, where `n = r-p+1`.

- **Pivot Selection:** Crucial for performance.

  - _Bad Choices (Worst Case):_ Always picking the smallest or largest element (e.g., first/last element in sorted/reversed array) leads to unbalanced partitions (sizes 0 and n-1) and `Θ(n²) `time.
  - _Good Choices (Average/Best Case):_ Picking a pivot near the median leads to balanced partitions (sizes roughly n/2) and `Θ(n log n)` time.
  - _Strategies:_
    - First/Last element: Simple but risky.
    - Random element: Good on average, avoids worst-case for specific inputs.
    - Median-of-three: Pick median of `A[p]`, `A[r]`, `A[(p+r)//2]`. A robust practical choice.

- **Python Implementation (using Lomuto partition and last element as pivot):**

  ```python
  def partition(arr, low, high):
      """
      Lomuto partition scheme. Takes last element as pivot, places pivot element
      at its correct position in sorted array, places all smaller (smaller than pivot)
      to left of pivot and all greater elements to right of pivot.
      Returns the index of the pivot.
      """
      pivot = arr[high]  # Choose the last element as the pivot
      i = low - 1      # Index of smaller element

      for j in range(low, high):
          # If current element is smaller than or equal to pivot
          if arr[j] <= pivot:
              i = i + 1 # Increment index of smaller element
              arr[i], arr[j] = arr[j], arr[i] # Swap

      # Swap the pivot element (arr[high]) with the element at i+1
      # (the first element greater than the pivot)
      arr[i + 1], arr[high] = arr[high], arr[i + 1]
      return i + 1 # Return the partition index

  def quick_sort_recursive(arr, low, high):
      """Recursive helper function for Quick Sort"""
      if low < high:
          # pi is partitioning index, arr[pi] is now at right place
          pi = partition(arr, low, high)

          # Separately sort elements before partition and after partition
          quick_sort_recursive(arr, low, pi - 1)
          quick_sort_recursive(arr, pi + 1, high)

  def quick_sort(arr):
      """Main function to initiate Quick Sort"""
      quick_sort_recursive(arr, 0, len(arr) - 1)

  # Example usage
  my_list = [6, 5, 3, 1, 8, 7, 2, 4]
  print(f"Original list: {my_list}")
  quick_sort(my_list)
  print(f"Sorted list (Quick Sort): {my_list}")
  ```

- **Analysis:**
  - **Recurrence Relation:**
    - _Worst Case:_ `T(n) = T(n-1) + T(0) + Θ(n) = T(n-1) + Θ(n)` (Unbalanced partition)
    - _Best Case:_ `T(n) = 2T(n/2) + Θ(n)` (Perfectly balanced partition)
    - _Average Case:_ Closer to the best case, `T(n) ≈ 2T(n/2) + Θ(n)` (Reasonably balanced partitions on average).
  - **Time Complexity:**
    - _Worst Case:_ `Θ(n²)`
    - _Best Case:_ `Θ(n log n)`
    - _Average Case:_ `Θ(n log n)` (Often faster than Merge Sort in practice due to lower constant factors and in-place nature).
  - **Space Complexity:** O(log n) average (due to recursion stack depth), O(n) worst case (recursion stack depth for unbalanced partitions). Considered in-place as it doesn't require large auxiliary arrays like Merge Sort (swaps happen within the original array).
  - **Stability:** Quick Sort is generally not stable. The partitioning step can change the relative order of equal elements.

---

**Heap Sort**

Heap Sort uses a binary heap data structure to sort an array. While it uses array manipulation and has good time complexity, it's not typically classified as a D&C algorithm.

- **Binary Heap:** A **complete binary tree** stored efficiently in an array, satisfying the **heap property**:
  - **Max-Heap:** The value of each node is greater than or equal to the values of its children. The largest element is at the root.
  - **Min-Heap:** The value of each node is less than or equal to the values of its children. The smallest element is at the root.
- **Array Representation (0-based indexing):**

  - Root: `A[0]`
  - Parent(i): `A[(i-1)//2]`
  - Left Child(i): `A[2*i + 1]`
  - Right Child(i): `A[2*i + 2]`

- **Algorithm (using Max-Heap for ascending sort):**

  1.  **Build-Max-Heap:** Convert the input array `A` into a max-heap. This is done efficiently by calling `Max-Heapify` on nodes from the last non-leaf node (`n//2 - 1`) up to the root (`0`). Time: `O(N)`.
  2.  **Sort:** Repeat `n-1` times:
      - Swap the root element `A[0]` (the current maximum) with the last element of the current heap `A[heap_size - 1]`.
      - Reduce the `heap_size` by 1 (effectively removing the largest element from the heap and placing it at the end of the array).
      - Call `Max-Heapify(A, 0)` to restore the max-heap property for the reduced heap. Time per call `O(log N)`.

- **Max-Heapify(A, i, heap_size):**

  - Assumes the binary trees rooted at `Left(i)` and `Right(i)` are max-heaps, but `A[i]` might violate the property.
  - Find the largest among `A[i]`, `A[Left(i)]`, and `A[Right(i)]` (within heap bounds).
  - If `A[i]` is not the largest, swap it with the largest child.
  - Recursively call `Max-Heapify` on the subtree rooted at the index where the swap occurred.
  - Time: `O(log N)` (height of the heap).

- **Python Implementation:**

  ```python
  def max_heapify(arr, n, i):
      """ Ensure subtree rooted at index i is a max heap. n is size of heap."""
      largest = i     # Initialize largest as root
      l = 2 * i + 1   # left child index = 2*i + 1
      r = 2 * i + 2   # right child index = 2*i + 2

      # See if left child exists and is greater than root
      if l < n and arr[l] > arr[largest]:
          largest = l

      # See if right child exists and is greater than largest so far
      if r < n and arr[r] > arr[largest]:
          largest = r

      # Change root if needed
      if largest != i:
          arr[i], arr[largest] = arr[largest], arr[i]  # swap

          # Recursively heapify the affected sub-tree
          max_heapify(arr, n, largest)

  def build_max_heap(arr):
      """Builds a max heap from an array."""
      n = len(arr)
      # Start from the last non-leaf node and move upwards
      start_index = n // 2 - 1
      for i in range(start_index, -1, -1):
          max_heapify(arr, n, i)

  def heap_sort(arr):
      """Sorts an array using Heap Sort."""
      n = len(arr)

      # 1. Build a maxheap.
      build_max_heap(arr)

      # 2. One by one extract elements
      # Iterate from the end of the array backwards
      for i in range(n - 1, 0, -1):
          # Move current root (max element) to end
          arr[i], arr[0] = arr[0], arr[i]

          # call max heapify on the reduced heap (size i) starting at root (0)
          max_heapify(arr, i, 0)

  # Example usage
  my_list = [6, 5, 3, 1, 8, 7, 2, 4]
  print(f"Original list: {my_list}")
  heap_sort(my_list)
  print(f"Sorted list (Heap Sort): {my_list}")

  ```

- **Analysis:**
  - **Time Complexity:** `O(N log N)` in all cases (best, average, worst). Building the heap takes `O(N)`, and the `n-1` extractions each take `O(log N)`.
  - **Space Complexity:** O(1). It's an in-place sort.
  - **Stability:** Heap Sort is not stable. The heapify and swap operations can change the relative order of equal elements.

This comprehensive analysis covers the primary methods for solving common recurrences and provides detailed explanations and implementations of key Divide and Conquer sorting algorithms alongside Heap Sort.
