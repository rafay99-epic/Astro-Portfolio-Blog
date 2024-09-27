---
title: "SnapRescue: Protect & Rollback Your System"
description: >-
  SnapRescue: Your system’s safety net! Snap, roll back, and relax with this
  easy-to-use script that keeps your snapshots in check.
pubDate: 2024-09-18T19:00:00.000Z
heroImage: /SnapRescue Protect & Rollback Your System.png
draft: false
---

In Linux, system stability is crucial, and recovering from issues like misconfigurations or broken updates can be quite stressful. That's where **SnapRescue** comes in. SnapRescue is a user-friendly Bash script designed to streamline system backup and recovery using **Snapper** snapshots. This post will walk you through how it works, explain each part of the script, and show you how to get started with it.

## **Why Use SnapRescue?**

Imagine you're installing some updates or tweaking system files, and suddenly, your system breaks. A tool like **SnapRescue** helps safeguard your setup by automatically taking regular snapshots of your system. If anything goes wrong, you can simply roll back to the last working state.

## **How Does SnapRescue Work?**

At the core of SnapRescue is the **Snapper** utility, which allows for easy snapshot management on Btrfs file systems. SnapRescue automates the process of configuring Snapper, taking snapshots, and setting up rollback options. It also helps ensure that essential dependencies and configurations are correctly set up.

### **Step-by-Step Breakdown of the Script**

### 1. **Pre-Checks**

The script starts by checking if your file system is **Btrfs** and if you're running an **Arch-based** system. If either of these conditions isn't met, the script exits early to avoid unnecessary errors.

```bash
filesystem=$(findmnt -n -o FSTYPE /)
if [[ "$filesystem" != "btrfs" ]]; then
    echo "File system is not Btrfs. Exiting script."
    exit 1
fi
```

### 2. **Dependency Installation**

The script ensures that essential tools like **snapper**, **grub-btrfs**, and others are installed on your system. If not, it automatically installs them via Pacman.

```bash
required_packages=(snapper snap-pac grub-btrfs inotify-tools git)
sudo pacman -S "${missing_packages[@]}" --needed --noconfirm
```

If the **snapper-rollback** package isn't available from Pacman, it's cloned from the AUR and installed.

### 3. **Snapshot Setup and Configuration**

After cleaning up any old snapshots, the script creates a Snapper configuration for your root partition, setting up timelines for daily, weekly, and monthly snapshots. It ensures that the `.snapshots` directory isn't mounted or in use and allows for easy rollback in case of future issues.

```bash
sudo snapper -c root create-config /
sudo sed -i 's/^[[:space:]]*ALLOW_GROUPS[[:space:]]*=.*/ALLOW_GROUPS="wheel"/' /etc/snapper/configs/root
```

### 4. **Mounting, Hooks, and Grub Updates**

To make the recovery process as smooth as possible, the script configures Grub to display available Snapper snapshots during boot. It also moves necessary hooks and install scripts to appropriate locations.

```bash
sudo cp -r switchsnaprotorw /etc/initcpio/hooks/
sudo cp -r switchsnaprotorw /etc/initcpio/install/
sudo mkinitcpio -P
```

### 5. **Driver Detection and Setup**

The script auto-detects Btrfs partitions or allows you to manually specify them. It then integrates the selected partition into the Snapper rollback configuration.

```bash
driver=$(lsblk -f | grep btrfs | awk '{print $1}')
echo "dev = /dev/$driver" | sudo tee -a /etc/snapper-rollback.conf
```

### 6. **Service Activation**

Once everything is configured, the script enables Snapper's **timeline** and **cleanup** services to ensure snapshots are taken and managed efficiently.

```bash
sudo systemctl enable --now snapper-timeline.timer
sudo systemctl enable --now snapper-cleanup.timer
```

### 7. **Completion and Reboot**

At the end, SnapRescue prompts the user to reboot to finalize the changes or reboot later, depending on preference.

```bash
read -p "Do you want to reboot now? (y/n): " choice
```

## **How to Install SnapRescue**

### **One-Line Installation Command**

To install and execute SnapRescue on your system, run the following command:

```bash
curl -fsSL https://rafay99.com/snaprescue.sh | sh
```

This command will automatically download and run the SnapRescue script, ensuring your system is set up with Snapper snapshots.

---

By the end of this process, your system will be safeguarded by Snapper, allowing you to confidently make changes to your system knowing you can always roll back to a previous snapshot.

## SnapRescue GitHub Project

If you'd like to try out SnapRescue yourself or contribute to its development, the full source code is available on GitHub. The repository includes detailed instructions for setting up and using SnapRescue with Snapper to protect your Linux system through automated snapshots and easy rollbacks.

You can find the project here: [SnapRescue GitHub Repository](https://github.com/rafay99-epic/SnapRescue).

Feel free to explore, report issues, or contribute to the project. Your feedback and contributions are always welcome!

## **Co-Developer**

I'd like to extend my gratitude to [@sharjeelmazhar](https://github.com/sharjeelmazhar) for their invaluable contributions to the SnapRescue project. Their dedication and expertise have significantly enhanced the functionality and usability of the script.

# **Conclusion**

With SnapRescue, you have an efficient and automated tool for handling system snapshots and ensuring a smooth recovery process. Whether you're an advanced user or just starting out, this script simplifies system maintenance and provides peace of mind.

Until then, peace out, nerds. ❤️
