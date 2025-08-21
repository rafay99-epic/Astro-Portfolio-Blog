#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main() {
  pid_t pid;

  // Print a message before forking
  printf("Before forking: This is printed once.\n");

  // Create a child process
  pid = fork();

  if (pid == -1) {
    // Error occurred
    perror("Fork failed");
    return 1;
  } else if (pid == 0) {
    // Child process
    printf("Child process: PID = %d, Parent PID = %d\n", getpid(), getppid());
    // Perform some work in the child process
    for (int i = 0; i < 5; i++) {
      printf("Child process: Counter = %d\n", i);
      sleep(1); // Sleep for 1 second
    }
    printf("Child process: Exiting\n");
    exit(0); // Exit child process
  } else {
    // Parent process
    printf("Parent process: PID = %d, Child PID = %d\n", getpid(), pid);
    // Wait for the child to finish
    wait(NULL); // Wait for any child process to terminate
    printf("Parent process: Child process completed\n");
    printf("Parent process: Exiting\n");
  }

  return 0;
}