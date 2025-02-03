# Ensure the script stops on errors
$ErrorActionPreference = "Stop"

$logFile = "D:\Astro-Portfolio-Blog\error_log.txt"

# Function to log errors
function Write-ErrorLog {
    param([string]$message)
    $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    $logMessage = "$timestamp - $message"
    $logMessage | Out-File -Append -FilePath $logFile
}

# Function to handle errors and exit
function Resolve-Error {
    param ([string]$errorMessage)
    Write-Host "ERROR: $errorMessage" -ForegroundColor Red
    Write-ErrorLog "ERROR: $errorMessage"
    exit 1
}

# Set project directory
$projectDir = "D:\Astro-Portfolio-Blog"
Set-Location -Path $projectDir

# Function to clean the project
function Remove-Dependencies {
    Write-Host "Cleaning the project..." -ForegroundColor Green
    if (Test-Path "$projectDir\node_modules") { Remove-Item "$projectDir\node_modules" -Recurse -Force }
    if (Test-Path "$projectDir\bun.lockb") { Remove-Item "$projectDir\bun.lockb" -Force }
    if (Test-Path "$projectDir\.bun") { Remove-Item "$projectDir\.bun" -Recurse -Force }
    Write-Host "✔ Project cleaned successfully!" -ForegroundColor Green
}

# Function to run the Astro project
function Start-Project {
    Write-Host "Checking Node.js version..." -ForegroundColor Green
    $nodeVersion = node --version
    if ($nodeVersion -notmatch "^v20\.\d+\.\d+") {
        Resolve-Error "Node.js version 20 is required. Current version: $nodeVersion"
    }

    Write-Host "Checking for Bun installation..." -ForegroundColor Green
    if (-not (Get-Command "bun" -ErrorAction SilentlyContinue)) {
        Resolve-Error "Bun is not installed. Please install Bun first."
    }

    Write-Host "Installing dependencies with Bun..." -ForegroundColor Green
    try {
        bun install
    }
    catch {
        Resolve-Error "Failed to install dependencies."
    }

    Write-Host "Starting the Astro project..." -ForegroundColor Green
    try {
        bun run dev
    }
    catch {
        Resolve-Error "Failed to start the Astro project."
    }
}

# Function to push to GitHub
function Push-Git {
    Write-Host "Checking for Git installation..." -ForegroundColor Green
    if (-not (Get-Command "git" -ErrorAction SilentlyContinue)) {
        Resolve-Error "Git is not installed. Please install Git first."
    }

    $commitMessage = Read-Host "Enter your Git commit message"

    Write-Host "Staging changes..." -ForegroundColor Green
    try { git add . } catch { Resolve-Error "Failed to stage changes." }

    Write-Host "Committing changes..." -ForegroundColor Green
    try { git commit -m $commitMessage } catch { Resolve-Error "Failed to commit changes." }

    Write-Host "Pushing to GitHub..." -ForegroundColor Green
    try { git push } catch { Resolve-Error "Failed to push changes." }

    Write-Host "✔ Successfully pushed to GitHub!" -ForegroundColor Green
}

# Ask user for input
Write-Host "Select an option to run the script:" -ForegroundColor Yellow
Write-Host "1. Clean the project" -ForegroundColor Green
Write-Host "2. Run the Astro project" -ForegroundColor Green
Write-Host "3. Push changes to GitHub" -ForegroundColor Green
Write-Host "Enter the corresponding number (1, 2, or 3): " -ForegroundColor Yellow -NoNewline
$userChoice = Read-Host

switch ($userChoice) {
    "1" { Remove-Dependencies }
    "2" { Start-Project }
    "3" { Push-Git }
    default {
        Write-Host "Invalid selection! Please run the script again and choose a valid option (1, 2, or 3)." -ForegroundColor Red
    }
}
