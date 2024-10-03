---
title: "Manage Git Commands"
description: "Lear Git command."
pubDate: "July 25 2024"
heroImage: "/Mastering-Version-Control-with-Git-and-GitHub.png"
draft: false
authorName: Abdul Rafay
authorAvatar: /author.jpg
---

As a Software Engineer, Managing your code is very important, From adding more features to remove bugs and at the same time, make sure the code the readable and other can contribute as well. With all this you need to keep track to your code changes. For that you need to learn how to use git and what is GitHub.

## Before Git

Before I was using Git and GitHub, my application code look something like this:

As you can every single change created a new folder and remember which feature I have added in which folder was a nightmare. I searched and I decided to learn git and GitHub.

## The Significance of Git in Development

Git and GitHub offer indispensable benefits for developers:

- **Version Control:** With Git, you can preserve various iterations of your code, ensuring no data loss.
- **Collaboration:**  Publishing code on GitHub allows others to review, contribute, and enhance your projects.
- **Documentation** Adding documentation enables easy reference and understanding of your code, facilitating maintenance and troubleshooting.

## Personal Insight

The value of Git and GitHub became painfully clear to me after experiencing data loss due to inadequate version control. Following a computer crash that wiped out my work, I adopted Git and GitHub religiously to safeguard my code and projects.

## Understanding Git

Git, a robust version control system, empowers collaboration and project management.
Originating from Linus Torvalds in 2005, Git stands as a mature open-source tool extensively utilized across both commercial and open-source software projects. Its versatility extends across various operating systems and integrated development environments (IDEs), ensuring widespread adoption and a rich talent pool in the developer community.

## Unveiling GitHub

> GitHub, a dynamic code hosting platform, fosters seamless collaboration and version control.
>
> By facilitating teamwork and project sharing, GitHub empowers individuals and teams to collectively contribute and innovate on diverse projects.

## Navigating GitHub Essentials for Seamless Development

Here are some of the essential terms for using github and or using any version control system for seamless development:

### **Repositories:**

- A GitHub repository serves as a central hub for housing and managing development projects, ensuring efficient collaboration and version control.
- Explore various files and folders within repositories, encompassing code (HTML, CSS, JavaScript), documents, data, and images.
- Essential files like the README and license provide crucial project insights and usage terms, enhancing project visibility and compliance.

### Branches

- GitHub branches empower developers to work on different project versions simultaneously, promoting organized and parallel development.
- Leverage default master branches for production-ready code, while creating new branches facilitates isolated bug fixes and feature enhancements.
- Merge changes back into the master branch seamlessly, maintaining code integrity and version consistency.

### Commits

- Commits represent individual changes made to the codebase, fostering transparency and accountability in the development process.
- Craft descriptive commit messages to elucidate the purpose and scope of each modification, aiding code comprehension and traceability.

### Pull Requests

- PRs are the cornerstone of collaborative development, enabling developers to propose and integrate changes into the master branch.
- Showcase alterations in a clear, color-coded format (green for additions, red for deletions) within PRs, fostering efficient code review and discussion.
- Initiate discussions and reviews through PRs, ensuring thorough evaluation before merging changes into the main project branch.

### Push Requests

- Facilitate synchronization between local and remote repositories through push requests, ensuring consistency across development environments.
- Update local code folders with changes from deployed branches on GitHub, optimizing workflow efficiency and project management.

Embrace GitHub's versatile toolkit to streamline your development workflow, foster collaboration, and elevate project success. Explore these essential components to unlock the full potential of GitHub for your projects.

## Git Commands for Version Control

These are some of the essential Git commands for version control:

### Creating a Repository

The entire Process of creating a repository on GitHub:

1. Begin by signing up on [GitHub](https://github.com/) or logging in if you already have an account. Follow the comprehensive guide [here](https://www.wikihow.com/Create-an-Account-on-GitHub) if you're new.
2. Navigate to the "New" button on GitHub to initiate a new repository creation.
3. Complete the repository creation form by specifying the name, description, and license type.
4. Upon submission, your repository will be created, and you'll be redirected to its page.

### Cloning a Repository

- To incorporate files into your repository, start by cloning it onto your local machine using the following command: Replace `<repository URL>` with the URL of your repository.

  ```bash
  git clone <repository URL>
  ```

### Creating a Branch

- Branches allow for independent development and experimentation. To create a new branch, execute: Replace `<branch_name>` with your desired branch name.

  ```bash
  git checkout -b <branch_name>
  ```

### Switching Branches

- Use the following commands to navigate between existing branches:

  ```bash
  git branch
  git checkout <branch_name>
  ```

### Checking Status

- Determine the status of your local repository and view any changes made with:

  ```bash
  git status
  ```

### Adding Files

- Add modified or new files to the staging area for the next commit using:

  ```bash
  git add <file_name>
  git add *
  ```

### Committing Changes

- Commit your changes with a descriptive message using:

  ```bash
  git commit -m "Your message here"
  ```

### Pushing Changes

- Deploy your local branch to the remote repository on GitHub:

  ```bash
  git push --set-upstream origin <branch_name>
  git push
  ```

### Merging Branches

- Integrate changes from one branch into another, typically merging a feature branch into the main branch:

  ```bash
  git checkout main
  git merge <branch_name>
  ```

### Pulling Changes

- Ensure your local repository is up to date with changes from the remote repository:

  ```bash
  git pull origin main    # Pull changes from the main branch
  ```

By mastering these essential Git commands, you'll enhance your development workflow, streamline collaboration, and maintain version control effectively.

## Managing Application Versions with Release Pages

### Understanding Versioning

- Each branch in your Git repository represents a distinct version of your application.
- Branches are developed, tested, and eventually merged into the main branch for deployment.

### Leveraging Release Pages

- Release pages serve as documentation hubs for each version of your application.
- Every version is assigned a unique number and can be thoroughly documented with release notes and changes.

### Creating a Release

- Navigate to the release page and input all relevant information regarding the version, including features, bug fixes, and improvements.
- Once all details are filled out, hit the "Publish" button to make your work available on GitHub.

By utilizing release pages effectively, you can streamline version management, document your progress, and ensure transparency in your development workflow.

## Final Thoughts

Learning Git and utilizing GitHub are crucial for developers across all fields. They facilitate code management, collaboration, and contribution. Don't hesitate to reach out; I'd love to hear your thoughts on this! Until next time! ❤️
