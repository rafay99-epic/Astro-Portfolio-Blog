---
lecture_title: "Lecture 03: Direct Communication & InDirect Communication"
pubDate: 2025-08-26
lecture_draft: true
lectureNumber: "03"
subject: advance operating system
---
\### **1\. Direct Communication**

**Definition:**

A systematic communication method where the sender and receiver explicitly name each other to establish a direct, dedicated communication link.

**How Communication is Done:**

\* **Explicit Naming:** The sending process must explicitly name the receiving process, and the receiving process must explicitly name the sending process.

\* Example: `send(Process B, message)`, `receive(Process A, message)`

\* **Direct Link:** A link is established between _exactly two_ communicating processes. This link is automatically created when processes try to communicate and typically exists only between that pair.

\* **Unidirectional or Bidirectional:** The link can be either one-way or two-way, depending on the implementation.

**Process Establishment (of the Communication Link):**

_The communication link is established_ implicitly\* when one process attempts to `send` to another, or when a process is prepared to `receive` from a specific other process. There's no separate "connect" step just for the link in many OS IPC contexts, as the naming itself implies the connection.

\* **Network Context (e.g., Sockets):** If considering network communication (which can be seen as direct if IP addresses and ports are used to connect to a specific target), then establishing a process link involves:

_Server process creating a socket, binding it to a local IP address and_ \*Port\*\*, and listening.

_Client process creating a socket and explicitly connecting to the server's IP address and_ \*Port\*\*. This explicitly names the destination endpoint.

**Ports:**

\* In the purest definition of direct IPC within an OS, ports aren't always a primary conceptual element, as processes name each other directly.

_However, in network communication (like TCP/IP sockets),_ \*ports are fundamental\*\* for direct communication. A process on a host is identified by its IP address _plus_ a port number, forming a complete endpoint address for direct connection.

**Encryption:**

\* **Optional Overlay:** Encryption is _not_ an inherent part of the direct communication _mechanism_ itself.

_It's a security layer that can be applied_ on top\* of the communication channel to protect the data being exchanged. Whether direct or indirect, communication can be encrypted for confidentiality and integrity (e.g., using TLS/SSL over a socket connection).

\### **2\. Indirect Communication**

**Definition:**

A systematic communication method where processes communicate without explicitly naming each other, instead sending and receiving messages via an intermediary object, typically called a "mailbox" or "port."

**How Communication is Done:**

\* **Shared Mailbox/Port:** Processes communicate by sending messages to a specific mailbox (or port) and receiving messages from a specific mailbox (or port). They don't need to know the identity of the other communicating process.

\* **Decoupling:** Sender and receiver are decoupled; multiple processes can send to the same mailbox, and multiple processes can receive from the same mailbox.

\* **Mailbox Identification:** Each mailbox has a unique ID or name that processes use to address it.

**Process Establishment (of the Communication Link):**

\* **Mailbox Creation:** A process (or the OS) must first create a mailbox (or port).

\* **Process Association:** Processes wishing to communicate through that mailbox must then explicitly "open," "attach to," or "register" with that specific mailbox.

\* Example: `send(Mailbox A, message)`, `receive(Mailbox A, message)`

\* The "link" here is conceptual, between the process and the mailbox, rather than between two specific processes.

**Ports:**

\* **Central Concept:** In indirect communication, the term **"port" is often synonymous with "mailbox"** (e.g., in microkernel architectures like Mach, which heavily use ports for IPC).

\* Ports/mailboxes act as queues or buffers where messages are temporarily stored until a receiving process retrieves them.

**Encryption:**

\* **Optional Overlay:** Similar to direct communication, encryption is _not_ an inherent part of the indirect communication _mechanism_.

\* It is a security measure that can be implemented to protect messages as they are sent to or retrieved from the mailbox/port, ensuring that even if an unauthorized process accesses the mailbox, the message content remains confidential.