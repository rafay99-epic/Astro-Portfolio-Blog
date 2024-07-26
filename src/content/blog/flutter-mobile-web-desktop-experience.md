---
title: " Flutter: A Full Stack Developer's Perspective"
description: "The Reality of flutter for web and applications"
pubDate: "July 26 2024"
heroImage: "/flutter-state.png"
---

Flutter is great. I love Flutter. As a full stack Flutter developer, I find it awesome and highly effective for developing Android and iOS applications. With its clean UI, simple code, and OOP structure, you can create amazing applications. Flutter also boasts a wide range of packages for different state management needs, making it a superior choice for building Android or iOS applications.

However, Flutter's motto of "write once and cover all platforms" includes mobile, web, and desktop applications. I've used Flutter for all these purposes, and here's a spoiler: Flutter for web and desktop applications isn't great.

It can work, but it's not worth it. Let's break down what makes Flutter for web and desktop applications so problematic.

## Problems
Here are some of the problems I faced while developing Flutter web applications:

### Not Enough Packages
While there are some packages for Flutter web and desktop, many common packages aren't available. For example, push notifications and picking images from your computer are lacking.

There are workarounds, but they often don't work across both web and mobile platforms. Since Dart code compiles for the target platform, using web-specific packages means the code won't compile for mobile devices. This necessitates different checks for each platform, which complicates and degrades code readability.

### Too Much JavaScript
When you write in Dart, the code translates to the native platform—Kotlin for Android, Swift for iOS, and HTML, CSS, and JavaScript for the web. This sounds good, but it isn't simple. At runtime, JavaScript is injected, which can improve performance for small applications but not for full-stack applications.

#### Personal Experience
I built my blog website using Flutter, Firebase, and many packages. The local host was fast, but deployment led to slow application parts. Despite my efforts, the load time didn't improve due to excessive JavaScript. For example, I used Lottie animations with Firebase-loaded content, but the site was still slow.

Moreover, slow loading can be a significant issue, especially if the internet connection is poor. This affects my website's functionality, as it serves as a showcase of my work. Therefore, excessive JavaScript can hinder the user experience.

## Pros
Now, let's discuss the positives of Flutter mobile application.

### Amazing Developer Experience
Flutter offers one of the best developer experiences with features like hot reloading, application restart, OOP structure support, and amazing packages for Android and iOS development. Solid state management options like GetX, Riverpod, and Provider make development efficient and enjoyable.

Each state management solution serves different project sizes, and mastering one can benefit you in the long run. You can even develop applications without state management, making things more flexible and enjoyable.

### Package Support  
The community offers numerous packages that enhance the development experience. For instance, connectivity_plus checks internet connections, and various packages handle login options like Google Sign-In, Apple Sign-In, and GitHub Sign-In. For animations, Flutter has built-in Tween packages, and you can use page transition packages with minimal code and customization.

Flutter excels in developing Android and iOS applications.

### Backend Technology
A robust backend is crucial for application functionality. Various backend options include:

1. Firebase
2. Supabase
3. Pocketbase

Each backend offers full cloud support, with their own pros and cons. Firebase is the largest, Supabase is new but promising, and Pocketbase is self-hosted. I've used all these options, and they are fantastic. Each has a Flutter SDK, allowing you to connect your backend to the frontend in minutes, simplifying development.

### Update Code on the Fly
With packages like Storebird, you can update your application on the fly, bypassing the Google Play Store. This makes life easier, as you can push updates directly, ensuring users have the latest application experience.

## Conclusion
In summary, Flutter is incredible for mobile application development, offering a robust SDK, stunning animations, clean code, and mobile optimization. However, for web applications, it's not yet up to par. Even with web assembly in Flutter 3.22, it still isn't fast enough for seamless web development. Perhaps the new static site generator will improve Flutter's web performance, but we'll have to wait and see.

Judge technology based on its current state, not future promises. With the introduction of Flutter's static site generator, we'll see how things evolve.

Until then, peace out, nerds. 👓

