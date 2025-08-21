#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>

int main() {
  pid_t pid;

  // Create a child process
  pid = fork();

  if (pid == -1) {
    perror("Fork failed");
    return 1;
  } else if (pid == 0) {
    // Child process: Immediately exit
    printf("Child process (PID %d) exiting\n", getpid());
    exit(0);
  } else {
    // Parent process: Sleep for a while without calling wait()
    printf("Parent process (PID %d) sleeping...\n", getpid());
    sleep(60); // Sleep for 60 seconds
    printf("Parent process (PID %d) done sleeping\n", getpid());
  }

  return 0;
}
