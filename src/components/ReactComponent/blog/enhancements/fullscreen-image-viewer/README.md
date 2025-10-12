# Fullscreen Image Viewer Components

This package provides optimized, performant React components for displaying images with fullscreen viewing capabilities in blog posts.

## Components

### 1. EnhancedImageCaptionRenderer

Automatically processes all images in blog posts and adds fullscreen functionality to them.

**Usage:**

```astro
---
import EnhancedImageCaptionRenderer from "@react/blog/enhancements/image-caption-renderer/EnhancedImageCaptionRenderer";
---

<EnhancedImageCaptionRenderer client:load />
```

### 2. ClickableImage

A standalone React component for images with fullscreen capability.

**Usage:**

```tsx
import ClickableImage from "@react/blog/enhancements/clickable-image/ClickableImage";

<ClickableImage
  src="/path/to/image.jpg"
  alt="Image description"
  caption="Optional caption"
  className="custom-class"
  width={800}
  height={600}
  loading="lazy"
/>;
```

### 3. ImageWrapper

A lightweight wrapper component that can be used as a drop-in replacement for regular `<img>` tags.

**Usage:**

```tsx
import ImageWrapper from "@react/blog/enhancements/image-wrapper/ImageWrapper";

<ImageWrapper
  src="/path/to/image.jpg"
  alt="Image description"
  enableFullscreen={true}
  showCaption={true}
  caption="Custom caption"
/>;
```

### 4. OptimizedFullscreenViewer

The most optimized version with custom hook integration.

**Usage:**

```tsx
import OptimizedFullscreenViewer from "@react/blog/enhancements/fullscreen-image-viewer/OptimizedFullscreenViewer";

<OptimizedFullscreenViewer
  src="/path/to/image.jpg"
  alt="Image description"
  caption="Optional caption"
  enableZoom={true}
  showCaption={true}
/>;
```

## Features

- ✅ **React.memo** optimization for performance
- ✅ **useCallback** hooks to prevent unnecessary re-renders
- ✅ **No useEffect** in main render functions (following React best practices)
- ✅ **Lazy loading** support
- ✅ **Keyboard navigation** (ESC to close)
- ✅ **Click outside to close**
- ✅ **Smooth animations** with Framer Motion
- ✅ **Loading states** with blur effects
- ✅ **Responsive design**
- ✅ **Accessibility** features (ARIA labels, keyboard support)
- ✅ **Custom styling** support
- ✅ **Automatic image processing** for existing blog posts

## Performance Optimizations

1. **Memoization**: All components use `React.memo` to prevent unnecessary re-renders
2. **Callback Optimization**: All event handlers are wrapped in `useCallback`
3. **Lazy Loading**: Images load only when needed
4. **Efficient State Management**: Minimal state updates and optimized re-renders
5. **Custom Hook**: `useFullscreenImage` hook for reusable logic
6. **Animation Performance**: Hardware-accelerated animations with Framer Motion

## Integration

The `EnhancedImageCaptionRenderer` is already integrated into the `BlogPost.astro` layout and will automatically process all images in your blog posts, adding fullscreen functionality without requiring any changes to existing content.

## Browser Support

- Modern browsers with ES6+ support
- Touch devices (mobile/tablet)
- Keyboard navigation support
- Screen reader compatible

## Diagram

``
graph TD
A[Your Blog Posts] --> B[EnhancedImageCaptionRenderer]
A --> C[ClickableImage - New Posts]
A --> D[ImageWrapper - Gradual Migration]
A --> E[OptimizedFullscreenViewer - Performance Critical]

    B --> F[Automatic Processing]
    C --> G[Full Control]
    D --> H[Flexible Options]
    E --> I[Maximum Performance]

    F --> J[All Images Get Fullscreen]
    G --> K[Custom Styling & Behavior]
    H --> L[Toggle Features On/Off]
    I --> M[Custom Hook Integration]

```

```
