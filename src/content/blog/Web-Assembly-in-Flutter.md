---
title: Web Assembly in Flutter
description: "Flutter for web: web assembly "
pubDate: 2024-09-05T19:00:00.000Z
heroImage: /Web Assembly& Flutter(2).png
---

Imagine a world where your web applications run as smoothly as desktop programs, handling complex tasks like gaming, video editing, or heavy data processing without breaking a sweat. Sounds too good to be true? Well, welcome to the era of Web Assembly (WASM)! This groundbreaking technology is transforming how web apps perform, allowing them to execute high-performance code nearly as fast as native applications. And now, with Flutter’s latest updates, we’re getting closer to bridging that gap even further. But before you get too excited, there's a lot to unpack here—especially if you're diving into Flutter for the web. Let’s get into it.

# What is Web Assembly (WASM) & How Does It Work?

Web Assembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.

In simple words, Web Assembly (WASM) is a technology that allows websites to run high-performance code, almost as fast as programs installed on your computer. It helps web applications work more efficiently by letting them use code written in different languages, which is then converted into a special format that web browsers can understand and execute quickly. This makes web apps faster and more powerful, especially for complex tasks like games, video editing, and data processing.

# Flutter + WASM

Before we begin, you must know WASM is not a rendering engine for Flutter in the way that HTML or CanvasKit renderers are. Instead, WASM is a compilation target for code that needs to run efficiently in the web environment.

## Role of Web Assembly (WASM) in Flutter Web

As discussed, WASM is a compilation target for Flutter Web. It is a binary instruction format that allows Flutter Web to run almost at native speed in web browsers. It is mainly used to compile web apps with performance-critical features so that they run faster in the browser.

Because WASM is not a renderer itself, your web app will use the default web renderer or the one you specify.

PS: Now, the Flutter team has changed the `--web-renderer` is equal auto to `canvaskit`, which means if you don’t specify a web renderer, it will automatically use CanvasKit. Earlier, it used to default to the HTML renderer when the app ran in a mobile browser, and CanvasKit when it ran in a desktop browser. ([Issue Link](https://github.com/flutter/flutter/issues/149826))

# How to Use WASM with Flutter?

Now, the only question that remains is: how can we use WASM in Flutter? However, there is a problem as usual. Most Flutter packages do not support WASM, which is crucial for Flutter. If you are using `dart.js` or `dart.html`, these packages are not available for WASM in Flutter. It won’t compile your Dart code for WASM either. So, only code from Dart libraries will be compiled.

To use WASM with Flutter, you need to upgrade your Flutter SDK to version 3.22 or higher. As of now, the latest Flutter version is 3.24.2, and this version does support WASM for Flutter. Once you have the Flutter SDK, you can use it by building your project with this command:

```dart
flutter build web --wasm
```

# Pros and Cons of Using WASM in Flutter

Here are some pros and cons of using WASM in your project:

## Pros

When using WASM with Flutter, you may notice improvements, especially in performance:

- Faster Execution: Parts of your app that are computationally intensive, such as complex calculations, animations, or data processing tasks, will run much faster due to WASM near-native execution speed.
- Smooth Animations: With WASM, animations and transitions can become smoother, especially in graphics-intensive applications. You might also notice smoother scrolling.
- Reduced Load Times: The initial load time for the web app might be faster because WASM modules are compact and optimized for efficient execution.

## Cons

While WASM can help with performance and scrolling issues, there are still some general disadvantages:

- WASM does not include a built-in garbage collector, which means languages that rely heavily on garbage collection (like JavaScript or Dart) need additional handling for memory management when compiled to WASM.
- Not all packages are supported for WASM yet.
- WASM modules can increase the overall memory footprint of the application, which may impact performance on devices with limited resources.

There are still several issues with Flutter + WASM.

# Conclusion

Web Assembly is not just a performance booster for Flutter; it's a pivotal technology that unlocks new potential for web applications, making them faster, more secure, and highly efficient. By embracing WASM, Flutter developers can stay ahead of the curve, delivering exceptional web experiences that rival native applications.

I am still not convinced that Flutter for Web is mature enough to build a whole web application. Sure, with this addition, Flutter has come a long way, but there’s still a long road ahead. One day, I believe Flutter for Web will be awesome, and I’ll be here to tell you that "Flutter for Web is here."

Until then, peace out, nerds. ❤️
