# LiveCodes Integration

A React wrapper component for embedding [LiveCodes](https://livecodes.io/) interactive code playgrounds into your Astro blog posts. This integration provides a seamless way to showcase interactive code examples, games, and applications directly in your content.

## Overview

LiveCodes is an open-source, client-side code playground that supports over 90 languages and frameworks. This integration allows you to:

- Embed interactive code playgrounds in MDX files
- Support Python, React, JavaScript, TypeScript, Bash, and more
- Showcase complex applications including games and visualizations
- Provide real-time code editing and execution
- No server-side dependencies - everything runs in the browser

## Installation

The `livecodes` package has been installed via npm. The component loads the SDK dynamically from CDN, so no additional build configuration is needed.

## Components

### LiveCodesPlayground

The main component for embedding LiveCodes playgrounds.

**Props:**

```typescript
interface LiveCodesPlaygroundProps {
  template?:
    | "react"
    | "python"
    | "bash"
    | "html"
    | "react-native"
    | "typescript"
    | "javascript";
  initialCode?: {
    markup?: string; // HTML/Markup content
    style?: string; // CSS content
    script?: string; // JavaScript/Python content
  };
  height?: string; // Default: "600px"
  width?: string; // Default: "100%"
  title?: string; // Optional title displayed above playground
  showConsole?: boolean; // Default: false
  readOnly?: boolean; // Default: false
  className?: string; // Additional CSS classes
  id?: string; // Optional ID for the container
}
```

**Basic Usage:**

```tsx
import LiveCodesPlayground from "../../components/LiveCodes/LiveCodesPlayground";

<LiveCodesPlayground
  template="python"
  initialCode={{
    script: `print("Hello from Python!")`,
  }}
  height="500px"
  title="Python Example"
  showConsole={true}
/>;
```

### Demo Components

Pre-configured demo components for common use cases:

#### PythonScriptDemo

Demonstrates Python script execution with the rate limiting algorithms example.

```tsx
import { PythonScriptDemo } from "../../components/LiveCodes";

<PythonScriptDemo height="700px" title="Python Rate Limiting Algorithms" />;
```

#### PythonGUIDemo

Shows how Python can generate interactive web-based GUIs (since tkinter doesn't work in browsers).

```tsx
import { PythonGUIDemo } from "../../components/LiveCodes";

<PythonGUIDemo height="800px" title="Python Web-Based GUI Generator" />;
```

#### InteractiveGameDemo

Embeds a complete HTML5 Canvas interactive particle game.

```tsx
import { InteractiveGameDemo } from "../../components/LiveCodes";

<InteractiveGameDemo height="700px" title="Particle Playground" />;
```

## Examples

### Python Script

```tsx
<LiveCodesPlayground
  template="python"
  initialCode={{
    script: `
import time
from collections import deque

def rate_limiter(max_requests, window_seconds):
    requests = deque()
    
    def allow_request():
        now = time.time()
        while requests and requests[0] < now - window_seconds:
            requests.popleft()
        
        if len(requests) < max_requests:
            requests.append(now)
            return True
        return False
    
    return allow_request

limiter = rate_limiter(5, 2.0)
for i in range(10):
    print(f"Request {i+1}: {'Allowed' if limiter() else 'Blocked'}")
    time.sleep(0.3)
    `,
  }}
  height="600px"
  showConsole={true}
/>
```

### React Component

```tsx
<LiveCodesPlayground
  template="react"
  initialCode={{
    markup: '<div id="root"></div>',
    script: `
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}

ReactDOM.render(<Counter />, document.getElementById('root'));
    `,
  }}
  height="400px"
/>
```

### HTML/CSS/JavaScript Game

```tsx
<LiveCodesPlayground
  template="html"
  initialCode={{
    markup: `
<div id="game">
  <canvas id="canvas"></canvas>
  <div id="controls">
    <button id="start">Start</button>
    <button id="reset">Reset</button>
  </div>
</div>
    `,
    style: `
#game {
  text-align: center;
  padding: 20px;
}
#canvas {
  border: 2px solid #333;
  background: #000;
}
    `,
    script: `
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Your game logic here
let x = 400, y = 300;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
  requestAnimationFrame(animate);
}
animate();
    `,
  }}
  height="700px"
/>
```

## Supported Templates

- `html` - HTML, CSS, JavaScript
- `react` - React with JSX
- `python` - Python (via Pyodide)
- `typescript` - TypeScript
- `javascript` - Vanilla JavaScript
- `bash` - Bash scripting
- `react-native` - React Native (via react-native-web)
- `vue` - Vue.js
- `svelte` - Svelte

## File Structure

```
src/components/LiveCodes/
├── LiveCodesPlayground.tsx    # Main component
├── types.ts                    # TypeScript definitions
├── index.ts                    # Exports
├── examples/
│   ├── python-rate-limiting.py
│   ├── python-web-gui.py
│   └── interactive-game/
│       ├── index.html
│       ├── style.css
│       └── game.js
├── demos/
│   ├── PythonScriptDemo.tsx
│   ├── PythonGUIDemo.tsx
│   └── InteractiveGameDemo.tsx
└── README.md
```

## Limitations

### Python GUI

- **tkinter doesn't work in browser**: Pyodide (browser-based Python) doesn't support tkinter
- **Solution**: Use Python to generate HTML/CSS/JavaScript for web-based GUIs
- **Alternative**: Use web frameworks like Brython or Skulpt if needed

### React Native

- **Not true native rendering**: LiveCodes uses `react-native-web` for browser rendering
- **Mobile preview**: Requires Expo Snack or similar for true mobile preview
- **Best for**: Web-based React Native demos and learning

### Asset Management

- **Small assets**: Use Base64 encoding
- **Large assets**: Use CDN URLs or LiveCodes asset import feature
- **Images**: Can be embedded as data URIs or loaded from CDN

### Performance

- **Multiple playgrounds**: Consider lazy loading if embedding many playgrounds on one page
- **Large codebases**: May take time to initialize
- **Network dependency**: Requires internet connection for SDK loading

## Comparison with Existing Playground

This LiveCodes integration is **completely separate** from the existing `Playground` component in `src/components/ReactComponent/blog/enhancements/Playground/`.

**Key Differences:**

| Feature          | LiveCodes                    | Existing Playground                        |
| ---------------- | ---------------------------- | ------------------------------------------ |
| **SDK**          | Third-party (LiveCodes)      | Custom implementation                      |
| **Languages**    | 90+ languages                | TypeScript, JavaScript, Dart, Python, Bash |
| **Execution**    | Client-side via LiveCodes    | Custom transpilation (Sucrase, Pyodide)    |
| **Maintenance**  | Maintained by LiveCodes team | Custom maintenance required                |
| **Features**     | Full IDE-like experience     | Simplified playground                      |
| **Dependencies** | External CDN                 | Self-contained                             |

**When to Use:**

- **LiveCodes**: Complex applications, multiple languages, full IDE features, games
- **Existing Playground**: Simple code examples, custom styling, no external dependencies

## Troubleshooting

### SDK Not Loading

If you see "Failed to load LiveCodes SDK":

1. Check internet connection
2. Verify CDN is accessible
3. Check browser console for CORS errors
4. Try refreshing the page

### Python Code Not Executing

1. Ensure `template="python"` is set
2. Check that code is in `initialCode.script`
3. Verify Python syntax is correct
4. Check console for Pyodide errors

### Game/Interactive Demo Not Working

1. Ensure all HTML, CSS, and JavaScript are properly formatted
2. Check for JavaScript errors in console
3. Verify canvas/WebGL support in browser
4. Test in different browsers

## Best Practices

1. **Lazy Loading**: Use React lazy loading for multiple playgrounds
2. **Error Handling**: Always provide fallback UI for loading errors
3. **Performance**: Limit number of playgrounds per page
4. **Accessibility**: Ensure playgrounds are keyboard navigable
5. **Mobile**: Test on mobile devices for touch interactions

## Resources

- [LiveCodes Documentation](https://livecodes.io/docs)
- [LiveCodes GitHub](https://github.com/live-codes/livecodes)
- [LiveCodes Examples](https://livecodes.io/examples)
- [Pyodide Documentation](https://pyodide.org/)

## License

This integration uses LiveCodes, which is open-source. Check LiveCodes license for details.
