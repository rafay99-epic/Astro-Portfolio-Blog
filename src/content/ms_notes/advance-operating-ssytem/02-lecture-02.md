---
lecture_title: "Lecture 02:  Process Control Block, Timeout, Inter-Process
  Communication, Dispatcher, Scheduler, and Scheduling Basics"
lecture_description: "Basics of OS "
pubDate: 2025-08-21
lecture_draft: true
lectureNumber: "02"
subject: advance-operating-system
---
\## Process Control Block (PCB)

The **Process Control Block (PCB)** serves as a comprehensive data structure maintained by the operating system for each active process. It contains all the necessary information about the process, essentially acting as its unique identifier and control center. The PCB holds three main categories of information: process identification data, processor state information, and process control information. Process identification data includes the Process ID (PID), Parent Process ID, and User ID. The PID is a unique identifier assigned to each process by the operating system, allowing it to be distinguished from all other processes. The Parent Process ID indicates the process that created the current process, forming a hierarchical relationship. The User ID identifies the user associated with the process, enabling the operating system to enforce security and access control policies.

Processor state information encompasses the Program Counter (PC), CPU registers, and Program Status Word (PSW). The Program Counter holds the address of the next instruction that the process will execute. CPU registers store data and intermediate results used by the process during execution, while the Program Status Word contains condition codes and mode bits that describe the current state of the processor.

Process control information includes the process state (new, ready, running, waiting, terminated), scheduling priority, accounting information, and I/O status. The process state indicates the current activity of the process. The scheduling priority determines the order in which processes are selected for execution. Accounting information tracks CPU time and execution time, while I/O status details open files and allocated devices.

\## Timeout

A **timeout** is a mechanism implemented to prevent processes or system calls from indefinitely waiting for an event or resource. It enforces a maximum time limit for a particular operation to complete. If the operation exceeds the allotted time, a timeout event is triggered, causing the operating system to intervene and take appropriate action. Timeouts are used in various scenarios, including process scheduling, deadlock handling, and network communication.

In process scheduling, a process may be assigned a specific time quantum, representing the duration for which it can execute before potentially being preempted. If the process does not complete its execution within the time quantum, a timeout occurs, and the operating system saves the process's state and moves it back to the ready queue. This ensures fair distribution of CPU time and prevents any single process from monopolizing the processor.

In deadlock handling, timeouts can be used to break potential deadlocks. When multiple processes are blocked indefinitely, waiting for each other to release resources, a timeout can be set for each process. If a process remains blocked for an extended period, the timeout will trigger, allowing the operating system to interrupt the process, release its resources, and potentially resolve the deadlock situation.

In networking, timeouts are essential for reliable communication. When sending data over a network, the sender expects an acknowledgment from the receiver within a certain timeframe. If the acknowledgment is not received within the timeout period, the sender assumes that the data was lost and retransmits it. This ensures that data is eventually delivered, even in the presence of network congestion or failures.

\## Inter-Process Communication (IPC)

**Inter-Process Communication (IPC)** enables processes to communicate, coordinate, and synchronize with each other. This is essential for building complex applications consisting of multiple interacting processes. There are two main models: Message Passing and Shared Memory. In message passing, processes send and receive messages to exchange data. This method is particularly useful in distributed systems where processes may reside on different machines.

Shared memory involves creating a region of memory that multiple processes can access. This enables processes to share data directly, leading to faster communication compared to message passing. However, shared memory requires careful synchronization to prevent data corruption or race conditions.

\## Dispatcher

The **dispatcher** is the OS module that **gives control of the CPU to the process selected by the scheduler**.

\### Responsibilities:

\- Performs **context switching**

\- Switches to **user mode**

\- Jumps to the correct instruction in the process

\## Scheduler

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

\## Executing Timeout

When a process **exceeds its allocated CPU time quantum**, the OS:

1\. Issues a **timeout interrupt**.

2\. Saves the process state in PCB.

3\. Moves the process back to the **ready queue**.

4\. Dispatcher loads the next process.

\## Scheduling Basics

Scheduling is about **maximizing CPU utilization and minimizing waiting time**.

\### Scheduling Criteria:

\- **CPU Utilization** → keep CPU busy

\- **Throughput** → number of processes completed per unit time

\- **Turnaround Time** → completion time - arrival time

\- **Waiting Time** → time spent in ready queue

\- **Response Time** → time from request to first response

\- **Fairness** → no starvation

\### Common Scheduling Algorithms:

1\. **First Come First Serve (FCFS)** – simple, but can cause the convoy effect.

2\. **Shortest Job Next (SJN/SJF)** – optimal for average waiting time, but needs job length prediction.

3\. **Priority Scheduling** – processes with higher priority run first (risk of starvation).

4\. **Round Robin (RR)** – each process gets a fixed time quantum, good for time-sharing.

5\. **Multilevel Queue Scheduling** – different queues for different process types.

6\. **Multilevel Feedback Queue** – processes can move between queues (adaptive).

## Process State Transition Diagram

This diagram illustrates the lifecycle of a process, showcasing the different states a process can be in and the transitions between these states.

\`\`\`mermaid

stateDiagram

\[\*\] --> New : Process Creation

New --> Ready : Admitted

Ready --> Running : Scheduled

Running --> Waiting : I/O Request

Waiting --> Ready : I/O Completion

Running --> Ready : Timeout or Preemption

Running --> Terminated : Process Completion

Ready --> Terminated : Process Aborted

Waiting --> Terminated : Process Aborted

state New {

label: "Process is being created"

}

state Ready {

label: "Waiting for CPU"

}

state Running {

label: "Executing on CPU"

}

state Waiting {

label: "Waiting for I/O"

}

state Terminated {

label: "Process completed"

}

\`\`\`

\## Process Scheduling Queue Diagram

This diagram shows how different processes are organized in queues based on their state, and how the scheduler and dispatcher interact to manage these queues.

\`\`\`mermaid

graph LR

ReadyQueue --> Scheduler

Scheduler --> Dispatcher

Dispatcher --> CPU

CPU --> RunningProcess

RunningProcess --> ReadyQueue : Timeout or Preemption

RunningProcess --> WaitingQueue : I/O Request

WaitingQueue --> ReadyQueue : I/O Completion

RunningProcess --> Terminated : Process Completion

subgraph Queues

ReadyQueue("Ready Queue")

WaitingQueue("Waiting Queue")

Terminated("Terminated")

end

subgraph Components

Scheduler("Scheduler")

Dispatcher("Dispatcher")

CPU("CPU")

RunningProcess("Running Process")

end

\`\`\`

\## Inter-Process Communication Diagram (Shared Memory)

This diagram illustrates how shared memory is used for inter-process communication.

\`\`\`mermaid

graph LR

ProcessA("Process A")

ProcessB("Process B")

SharedMemory("Shared Memory Region")

ProcessA -- Write Data --> SharedMemory

ProcessB -- Read Data --> SharedMemory

SharedMemory -- Data --> ProcessA

SharedMemory -- Data --> ProcessB

\`\`\`

These diagrams should give you a visual representation of the topics you're studying, which can greatly aid in your understanding and retention.

## Two Process Model Sufficient

Here is the thing, this model is not good because there is way too much process switching, and with a timeout, this can lead to much worse problems, and with content switch from one process to another mode, then it requires more memory and more work.

Plus thing is that one process needs to be completed, then we will work on the third model as well.  
  
And because of this limit, we came across Five State Model

## The Five-State Process Model

The **five-state process model** is a way of representing the different stages a process goes through from its creation to its termination. It's a simplified abstraction, but it captures the essential phases and transitions a process experiences. These states are:

1\. **New**

2\. **Ready**

3\. **Running**

4\. **Waiting (Blocked)**

5\. **Terminated**

Here's a detailed breakdown of each state and the transitions between them:

\## 1. New State

\* **Description**: The process is being created but has not yet been admitted into the system. Resources are being allocated, and initial setup is being performed.

\* **Activities**:

\* Process creation and initialization.

\* Allocation of necessary resources (memory, file handles, etc.).

\* Loading the program code into memory.

\* **Transition**:

\* **New → Ready**: Once the OS deems the process ready for execution (sufficient resources are allocated), it transitions to the Ready state. This transition is usually managed by the long-term scheduler (also known as the admission controller).

\## 2. Ready State

\* **Description**: The process is ready to execute but is waiting for its turn to be scheduled by the CPU. It's in the ready queue, competing with other processes for CPU time.

\* **Activities**:

\* Waiting in the ready queue for CPU time.

\* No actual execution happening; the process is just queued up.

\* **Transitions**:

\* **Ready → Running**: When the scheduler selects this process, the dispatcher assigns the CPU to it, and the process enters the Running state.

\* **Ready → Terminated**: In some scenarios, the process might be terminated due to system reasons (e.g., insufficient resources, process aborted by user).

\## 3. Running State

\* **Description**: The process is currently executing on the CPU. Instructions are being processed, and the process is actively performing its intended tasks.

\* **Activities**:

\* Executing instructions and performing computations.

\* Accessing memory and system resources.

\* **Transitions**:

\* **Running → Waiting**: The process may need to wait for an event, such as I/O completion, a lock acquisition, or a message. It then transitions to the Waiting state.

\* **Running → Ready**: If the process's time quantum expires (in time-sharing systems) or a higher-priority process becomes ready, the process is preempted and moves back to the Ready state.

\* **Running → Terminated**: When the process completes its execution or is terminated due to an error, it enters the Terminated state.

\## 4. Waiting (Blocked) State

\* **Description**: The process is waiting for an external event to occur (e.g., I/O operation completion, receipt of a signal, or availability of a resource). The process is blocked and cannot proceed until the event occurs.

\* **Activities**:

\* Waiting for an event to occur.

\* Process is suspended and not eligible for CPU time.

\* **Transitions**:

\* **Waiting → Ready**: When the event the process was waiting for occurs (e.g., I/O completes), the process moves to the Ready state.

\## 5. Terminated State

\* **Description**: The process has completed its execution or has been terminated. It's no longer active and is waiting for its resources to be deallocated by the OS.

\* **Activities**:

\* Releasing resources allocated to the process.

\* Performing any necessary cleanup operations.

\* **Transition**:

\* There are generally no transitions out of the Terminated state. The process is eventually removed from the system.

\## The Process State Diagram

A process state diagram is the graphical representation of the process states and their transitions.

\`\`\`mermaid

stateDiagram

\[\*\] --> New : Process Creation

New --> Ready : Admitted

Ready --> Running : Scheduled

Running --> Waiting : I/O Request

Waiting --> Ready : I/O Completion

Running --> Ready : Timeout or Preemption

Running --> Terminated : Process Completion

Ready --> Terminated : Process Aborted

Waiting --> Terminated : Process Aborted

state New {

label: "Process is being created"

}

state Ready {

label: "Waiting for CPU"

}

state Running {

label: "Executing on CPU"

}

state Waiting {

label: "Waiting for I/O"

}

state Terminated {

label: "Process completed"

}

\`\`\`

\## Key Considerations

\* **Scheduler's Role**: The scheduler (primarily the short-term or CPU scheduler) determines which process moves from the Ready state to the Running state.

\* **Dispatcher's Role**: The dispatcher is responsible for the actual context switch: saving the state of the current process and loading the state of the next process.

\* **Resource Management**: The OS manages resources to prevent starvation (where a process is indefinitely denied necessary resources).

By understanding the five-state process model, you gain a clearer insight into how operating systems manage and schedule processes.

##