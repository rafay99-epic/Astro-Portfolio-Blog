---
lecture_title: "Heap Sort & Analysis of Algorithms"
lecture_description: Going through Heap Sort Algo
pubDate: 2024-09-18
lecture_draft: false
lectureNumber: "05"
subject: Design and Analysis of Algorithms
---

This lecture delves into Heap Sort, an efficient comparison-based sorting algorithm. We will revisit the definition of a binary heap, understand the core operations, analyze the algorithm's complexity, and discuss important properties related to maintaining the heap structure.

**Heap: Definition Recap**

A **Binary Heap** is a specialized tree-based data structure that satisfies the following conditions:

1.  **Shape Property:** It must be an **almost complete binary tree**. This means the tree is completely filled on all levels, except possibly the lowest level, which is filled from left to right. This structure allows efficient representation using an array.
2.  **Heap Property:** The nodes must satisfy a specific ordering relationship. There are two main types:
    - **Max-Heap:** The value of any node is greater than or equal to the values of its children. Consequently, the largest element in the heap resides at the root.
    - **Min-Heap:** The value of any node is less than or equal to the values of its children. Consequently, the smallest element in the heap resides at the root.

_(Heap Sort typically uses a Max-Heap to sort in ascending order or a Min-Heap to sort in descending order. We will focus on Max-Heap for ascending sort.)_

Every node must follow the heap property. Leaf nodes trivially satisfy the condition as they have no children.

**Heap Sort Algorithm**

Heap Sort leverages the properties of a max-heap to sort an array `A`. The core idea is to first arrange the array elements into a max-heap structure and then repeatedly extract the maximum element (which is always at the root of the heap) and place it at the end of the sorted portion of the array.

The algorithm consists of two main phases:

**Phase 1: Build Max Heap**
Transform the input array `A` (of length `n`) into a max-heap.

- **`BUILD-MAX-HEAP(A)` Pseudocode:**
  1.  `heap-size[A] ← length[A]` (Initialize heap size, though often implicitly the array length `n`)
  2.  `for i ← floor(length[A]/2) downto 1` (Iterate from the last non-leaf node up to the root - using 1-based indexing convention here for pseudocode consistency)
  3.  `do MAX-HEAPIFY(A, i)` (Call Max-Heapify on each non-leaf node to establish the heap property)

  _(Note: If using 0-based indexing as in Python, the loop runs from `n//2 - 1` down to `0`)_

**Phase 2: Sort by Extraction**
Repeatedly extract the maximum element and rebuild the heap.

- **`HEAPSORT(A)` Pseudocode:**
  1.  `BUILD-MAX-HEAP(A)` (First, build the initial max-heap)
  2.  `for i ← length[A] downto 2` (Iterate from the last element down to the second element - using 1-based indexing)
  3.  `do exchange A[1] ↔ A[i]` (Swap the root (max element) with the last element in the current heap)
  4.  `heap-size[A] ← heap-size[A] – 1` (Reduce the effective heap size by one, excluding the now-sorted element at the end)
  5.  `MAX-HEAPIFY(A, 1)` (Restore the max-heap property on the reduced heap, starting from the root)

  _(Note: If using 0-based indexing, the loop runs from `n-1` down to `1`, the swap is `A[0] ↔ A[i]`, and the `MAX-HEAPIFY` call is on the heap of size `i` starting at index `0`)_

**The `MAX-HEAPIFY` Procedure**

This is a crucial subroutine used both in building the heap and during the sorting phase. It ensures that the subtree rooted at index `i` satisfies the max-heap property, assuming its children's subtrees already satisfy it.

- **`MAX-HEAPIFY(A, i)` Pseudocode (1-based index):**
  1.  `l ← LEFT(i)` (Get index of left child, e.g., `2*i`)
  2.  `r ← RIGHT(i)` (Get index of right child, e.g., `2*i + 1`)
  3.  `if l ≤ heap-size[A] and A[l] > A[i]`
  4.  `then largest ← l`
  5.  `else largest ← i`
  6.  `if r ≤ heap-size[A] and A[r] > A[largest]`
  7.  `then largest ← r`
  8.  `if largest ≠ i`
  9.  `then exchange A[i] ↔ A[largest]`
  10. `MAX-HEAPIFY(A, largest)` (Recursively call on the subtree where the swap occurred)

_(The `heap-size[A]` checks are essential to ensure children indices are within the bounds of the current heap being considered.)_

**Python Implementation (Revisiting from Lecture 4):**

```python
def max_heapify(arr, n, i):
    """ Ensure subtree rooted at index i is a max heap. n is size of heap."""
    largest = i     # Initialize largest as root (using 0-based index)
    l = 2 * i + 1   # left child index
    r = 2 * i + 2   # right child index

    # Check if left child exists and is greater than root
    if l < n and arr[l] > arr[largest]:
        largest = l

    # Check if right child exists and is greater than the largest found so far
    if r < n and arr[r] > arr[largest]:
        largest = r

    # If root is not the largest, swap with largest and heapify down
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # swap
        # Recursively heapify the affected sub-tree
        max_heapify(arr, n, largest)

def build_max_heap(arr):
    """Builds a max heap from an array."""
    n = len(arr)
    # Start from the last non-leaf node (n//2 - 1) and move upwards to index 0
    start_index = n // 2 - 1
    for i in range(start_index, -1, -1):
        max_heapify(arr, n, i) # Pass n (total size) as heap size initially

def heap_sort(arr):
    """Sorts an array using Heap Sort."""
    n = len(arr)

    # 1. Build a maxheap.
    build_max_heap(arr)
    # print(f"Heap built: {arr}") # Optional: view the heap structure

    # 2. One by one extract elements
    # Iterate from the end of the array (n-1) down to the second element (1)
    for i in range(n - 1, 0, -1):
        # Move current root (max element) to the end (index i)
        arr[i], arr[0] = arr[0], arr[i]
        # print(f"Swapped {arr[i]} to end, Array: {arr}, Heap Size: {i}") # Optional

        # Call max heapify on the reduced heap (size i) starting at root (0)
        max_heapify(arr, i, 0) # Pass i as the new heap size
        # print(f"Heap restored: {arr[:i]}") # Optional

# Example usage
my_list = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]
print(f"Original list: {my_list}")
heap_sort(my_list)
print(f"Sorted list (Heap Sort): {my_list}")
```

**Heap Sort Analysis**

Let's analyze the time complexity of the different components:

1.  **`MAX-HEAPIFY`:**
    - The work done at each node involves a constant number of comparisons and potential swaps.
    - The recursion depth is limited by the height of the tree, `h`. For a complete or almost complete binary tree with `n` nodes, the height `h = Θ(log n)`.
    - Therefore, the time complexity of `MAX-HEAPIFY(A, i)` is `O(log n)`.

2.  **`BUILD-MAX-HEAP`:**
    - **Simpler Analysis:** The procedure calls `MAX-HEAPIFY` for roughly `n/2` nodes (the non-leaf nodes). Since each call takes `O(log n)`, a straightforward upper bound is `(n/2) * O(log n) = O(n log n)`.
    - **Tighter Analysis (O(n)):** A more precise analysis considers that `MAX-HEAPIFY`'s runtime depends on the height of the node it's called on, not the total height of the heap. Most nodes are near the bottom of the heap with small heights.
      - Number of nodes at height `h` in a complete binary tree is at most `⌈n / 2^(h+1)⌉`.
      - Work done by `MAX-HEAPIFY` at height `h` is `O(h)`.
      - Total time = `Σ (from h=0 to logn) [ ⌈n / 2^(h+1)⌉ * O(h) ]`
      - Total time ≈ `Σ (n / 2^(h+1)) * ch`
      - Total time ≈ `(cn/2) * Σ (h / 2^h)`
      - The summation `Σ (h / 2^h)` converges to a constant (related to the derivative of a geometric series, approximately 2).
      - Therefore, the total time is `O(n)`. Building the heap is surprisingly linear!

3.  **`HEAPSORT`:**
    - **Step 1 (`BUILD-MAX-HEAP`):** Takes `O(n)` time (using the tighter analysis).
    - **Step 2 (Extraction Loop):** Runs `n-1` times.
      - Inside the loop:
        - Swap: `O(1)`.
        - `MAX-HEAPIFY(A, 0)`: Takes `O(log k)` where `k` is the current heap size (`i` in the Python code). In the worst case, this is `O(log n)`.
      - Total time for the loop: `(n-1) * O(log n) = O(n log n)`.
    - **Overall Performance:** The total time is dominated by the extraction loop.
      - `T(n) = O(n) + O(n log n) = O(n log n)`.

- **Summary:**
  - **Time Complexity:** `O(n log n)` for best, average, and worst cases.
  - **Space Complexity:** `O(1)` (assuming the sort is done in-place within the original array).
  - **Stability:** Not stable.
  - **Swaps:** The number of swaps performed is roughly `n-1` in the extraction phase, plus swaps during `BUILD-MAX-HEAP` and `MAX-HEAPIFY`.

**Some Things to Know About Heaps**

Heaps are dynamic structures, and their properties must be maintained when elements are added, deleted, or modified.

- **Restoring Heap Property:**
  - If a node's value **increases** (potentially violating the max-heap property with its parent), the property can be restored by repeatedly swapping the node with its parent until it reaches a position where it's less than or equal to its parent, or it becomes the root. This upward movement is called **Percolation Up** or **Sifting Up**.
  - If a node's value **decreases** (potentially violating the max-heap property with its children), the property can be restored by repeatedly swapping the node with its **larger** child until it reaches a position where it's greater than or equal to both its children, or it becomes a leaf. This downward movement is essentially what `MAX-HEAPIFY` does and is called **Percolation Down** or **Sifting Down**.

- **Array Storage:** The complete binary tree structure allows efficient mapping to an array:
  - (Using 1-based indexing for clarity here, adjust for 0-based)
  - Root: `A[1]`
  - Parent(i): `A[floor(i/2)]`
  - Left Child(i): `A[2i]`
  - Right Child(i): `A[2i + 1]`

**Home Task Examples**

1.  **Maintain Minimum Heap / Sort Descending:**
    - Given array: `[1, 6, 9, 2, 7, 5, 2, 7, 4, 10]`
    - To sort in descending order, you would build a **Min-Heap**.
    - Follow the `HEAP SORT` algorithm steps, but use `BUILD-MIN-HEAP` and `MIN-HEAPIFY`. In the extraction phase, swapping the root (minimum element) to the end of the current heap range effectively places the smallest elements at the end of the array, resulting in descending order.

2.  **Sort Descending using Heap Sort:**
    - Given array: `[24, 21, 23, 22, 36, 29, 30, 34, 28, 27]`
    - Again, build a **Min-Heap** and follow the Heap Sort extraction process to get descending order.

3.  **Sort Descending using Heap Sort:**
    - Given array: `[5, 3, 1, 9, 8, 2, 4, 7]`
    - Build a **Min-Heap** and proceed with extraction for descending sort.

This detailed analysis covers the Heap Sort algorithm, its implementation logic, complexity analysis (including the tighter bound for building the heap), and key heap maintenance operations.
