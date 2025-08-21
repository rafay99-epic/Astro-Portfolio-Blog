---
lecture_title: Lecture 02
lecture_description: "Basics of OS "
pubDate: 2025-08-21
lecture_draft: true
lectureNumber: "02"
subject: advance-operating-system
---
\## 1. **Process Control Block (PCB)**

The **PCB** is the _data structure_ the operating system uses to store all information about a process. Think of it as the **“identity card”** of a process.

\### Contents of PCB:

1\. **Process Identification Data**

\- Process ID (PID)

\- Parent process ID

\- User ID

2\. **Processor State Information**

\- Program Counter (PC) → next instruction to execute

\- CPU registers (general, stack pointer, etc.)

\- PSW (Program Status Word: condition codes, mode bits)

3\. **Process Control Information**

\- Process state (new, ready, running, waiting, terminated)

\- Scheduling priority

\- Accounting info (CPU time used, execution time, etc.)

\- I/O status (open files, devices allocated)

📌 **Key Idea:**

When a process is switched out (context switch), the OS saves its state in the PCB. When it’s resumed, the OS restores the state from the PCB.

\---

\## 2. **Timeout**

A **timeout** occurs when a process or system call takes longer than the allowed time to complete.

It’s a **safety mechanism** to prevent indefinite waiting.

\### Uses:

\- **Process Scheduling:** A process is given a _time quantum_ (in Round Robin scheduling). If it doesn’t finish, a timeout occurs → process is preempted.

\- **Deadlock Handling:** Timeout can break indefinite waits.

\- **Networking:** If a response isn’t received in time, a timeout triggers retransmission.

📌 **Example:**

In Round Robin, if a process gets 100ms CPU time and doesn’t finish → timeout → CPU is taken away and given to the next process.

\---

\## 3. **Inter-Process Communication (IPC)**

Processes often need to **communicate and synchronize** with each other.

\### Two Main Models:

1\. **Message Passing**

\- Processes send/receive messages via OS.

\- Useful in distributed systems.

\- Example: `send(message)`, `receive(message)`

2\. **Shared Memory**

\- Processes share a region of memory.

\- Faster but requires synchronization (semaphores, mutexes).

\### IPC Mechanisms:

\- Pipes

\- Message Queues

\- Shared Memory

\- Semaphores

\- Signals

\- Sockets (for networked IPC)

📌 **Key Idea:** IPC ensures **coordination** and **data exchange** between processes.

\---

\## 4. **Dispatcher**

The **dispatcher** is the OS module that **gives control of the CPU to the process selected by the scheduler**.

\### Responsibilities:

\- Performs **context switching**

\- Switches to **user mode**

\- Jumps to the correct instruction in the process

📌 **Dispatcher Latency:**

The time it takes for the dispatcher to stop one process and start another.

\---

\## 5. **Scheduler**

The **scheduler** decides _which process runs when_.

\### Types of Scheduling:

1\. **Long-term Scheduler**

\- Controls admission of jobs into the system.

\- Decides which jobs enter the ready queue.

\- Runs less frequently.

2\. **Medium-term Scheduler**

\- Temporarily suspends/resumes processes.

\- Improves mix of I/O-bound and CPU-bound processes.

3\. **Short-term Scheduler (CPU Scheduler)**

\- Decides which process in the ready queue gets CPU next.

\- Runs very frequently (milliseconds).

\---

\## 6. **Executing Timeout**

When a process **exceeds its allocated CPU time quantum**, the OS:

1\. Issues a **timeout interrupt**.

2\. Saves the process state in PCB.

3\. Moves the process back to the **ready queue**.

4\. Dispatcher loads the next process.

📌 **This ensures fairness** in CPU allocation (especially in Round Robin scheduling).

* * *

\## 7. **Scheduling Basics**

Scheduling is about **maximizing CPU utilization and minimizing waiting time**.

\### Scheduling Criteria:

\- **CPU Utilization** → keep CPU busy

\- **Throughput** → number of processes completed per unit time

\- **Turnaround Time** → completion time - arrival time

\- **Waiting Time** → time spent in ready queue

\- **Response Time** → time from request to first response

\- **Fairness** → no starvation

\### Common Scheduling Algorithms:

1\. **First Come First Serve (FCFS)** – simple, but can cause convoy effect.

2\. **Shortest Job Next (SJN/SJF)** – optimal for average waiting time, but needs job length prediction.

3\. **Priority Scheduling** – processes with higher priority run first (risk of starvation).

4\. **Round Robin (RR)** – each process gets a fixed time quantum, good for time-sharing.

5\. **Multilevel Queue Scheduling** – different queues for different process types.

6\. **Multilevel Feedback Queue** – processes can move between queues (adaptive).

* * *

**Quick Analogy:**

\- **Scheduler** = “decides who gets the mic next.”

\- **Dispatcher** = “hands the mic to the chosen speaker.”

\- **PCB** = “the speaker’s notes and position in the script.”

\- **Timeout** = “if you talk too long, your mic is cut off.”

\- **IPC** = “passing notes between speakers.”