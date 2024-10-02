---
title: Run LLM on your computer for free
description: Detail notes on learning LLM on your computer
pubDate: 2024-10-02T19:00:00.000Z
draft: true
heroImage: /LLM on your computer.png
---

With the rise of large language model it is uncommon that people spend from 20 dollar to 50 dollar for these AI chatbot and these chatbot have limits as well, for example chatGPT has a limit of a day and with the amount you are paying is not worth it, sure I can see the use of it, on mobile phone or on laptop but still not worth it. 

Don't worry, I am here to give free tip so that you don't have to spend a single dim and use these chatbot for free.

# Requirements

Before we begin, we need to make sure some these are set and these requirements are not rock solid they are Nice to have, if you have these it will make your experience much much better. 

1. Nvidia GPU
   1. If you don't have Nvidia PU then don't worry, This process can also work on CPU as well. 
2. A Processor that have more core then 4, More the cores the better.
   1. With the latest tech and computer you should have 6 cores. 

# Installing some Programs

To run these LLM on your computer you need three programms. 

1. Docker 
2. ollma
3. Ollma WebUI 

To install them it's pretty easy, I will guide you guys, just follow the steps bellow to install these Programs

## Docker Installing Process

### Installing Docker on Windows

1\. \*\*Download Docker Desktop\*\*: Visit \[Docker's official site]\(https\://docs.docker.com/desktop/install/windows-install/).

2\. \*\*System Requirements\*\*: Windows 10 64-bit (Pro, Enterprise, or Education) with WSL 2 enabled.

3\. \*\*Install Docker Desktop\*\*: Run the installer and follow the prompts.

4\. \*\*Configure Settings\*\*: After installation, configure WSL 2 or Hyper-V.

5\. \*\*Verify Installation\*\*: Open PowerShell and run \`docker --version\`.

### Installing Docker on Linux

### Installing Docker on Debian

1\. \*\*Update and Install Dependencies\*\*:

   \`\`\`bash

   sudo apt-get update

   sudo apt-get install ca-certificates curl gnupg lsb-release

   \`\`\`

2\. \*\*Add Docker GPG Key\*\*:

   \`\`\`bash

   curl -fsSL https\://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

   \`\`\`

3\. \*\*Set Up Stable Repository\*\*:

   \`\`\`bash

   echo "deb \[arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https\://download.docker.com/linux/debian $(lsb\_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

   \`\`\`

4\. \*\*Install Docker\*\*:

   \`\`\`bash

   sudo apt-get update

   sudo apt-get install docker-ce docker-ce-cli containerd.io

   \`\`\`

***

### Installing Docker on Arch Linux

1\. \*\*Update the Package Database\*\*:

   \`\`\`bash

   sudo pacman -Syu

   \`\`\`

2\. \*\*Install Docker\*\*:

   \`\`\`bash

   sudo pacman -S docker

   \`\`\`

3\. \*\*Enable and Start Docker\*\*:

   \`\`\`bash

   sudo systemctl enable docker

   sudo systemctl start docker

   \`\`\`

4\. \*\*Add User to Docker Group (Optional)\*\*:

   \`\`\`bash

   sudo usermod -aG docker $USER

   \`\`\`
