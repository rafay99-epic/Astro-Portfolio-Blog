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
   * If you don't have Nvidia PU then don't worry, This process can also work on CPU as well.
2. A Processor that have more core then 4, More the cores the better.
   * With the latest tech and computer you should have 6 cores.

# Installing some Programs

To run these LLM on your computer you need three programms.

1. Docker
2. ollma
3. Ollma WebUI

To install them it's pretty easy, I will guide you guys, just follow the steps bellow to install these Programs

## Docker Installing Process

### Installing Docker on Windows

1. **Download Docker Desktop:**  Visit [Docker's official site](\[https://docs.docker.com/desktop/install/windows-install/]\(https://docs.docker.com/desktop/install/windows-install/\)).
2. **System Requirements:** Windows 11
3. **Install Docker Desktop**: Run the installer and follow the prompts.
4. **Configure Settings**: After installation, configure WSL 2 or Hyper-V.

5\. \*\*Verify Installation \*\*: Open PowerShell and run \`docker --version\`.

### Installing Docker on Linux

To installed Docker you can follow these step that are under but make sure if face any issue then fdollow the guide on there office [website](https://docs.docker.com/desktop/install/linux/)

### Installing Docker on Debian

These are the steps for installing Docker on Debian and debian based system.

1. **Update and Install Dependencies**:

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
```

1. \*\*Add Docker GPG Key \*\*:

```bash
curl -fsSL [https://download.docker.com/linux/debian/gpg](https://download.docker.com/linux/debian/gpg) | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

1. **Set Up Stable Repository**:

```bash
echo "deb \[arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] [https://download.docker.com/linux/debian](https://download.docker.com/linux/debian) $(lsb\_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

1. **Install Docker**:

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

***

### Installing Docker on Arch Linux

These are the steps for installing Docker on Arch and Arch based system.

1. **Update the Package Database**:
   Updating your system make sure every package is up to date.

```bash
sudo pacman -Syu
```

1. **Install Docker**:

````bash
sudo pacman -S docker
```
3. **Enable and Start Docker**:
```bash
sudo systemctl enable docker
sudo systemctl start docker
```
4. **Add User to Docker Group (Optional)**:
```bash
sudo usermod -aG docker $USER
```

## Ollma Installation: 
Follow these steps to make sure to install Ollam on linux
### On Windows
To install ollma on windows is little tricky but it can be done. You can Install ollam using these process from there official [website](https://ollama.com/download/windows)
### On Linux
Ollama can run with GPU acceleration inside Docker containers for Nvidia GPUs.
To get started using the Docker image, please use the commands below.

#### CPU only
```bash
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```
####Nvidia GPU
- Install the Nvidia container toolkit.
- Run Ollama inside a Docker container
   ```bash
   docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
   ```




````
