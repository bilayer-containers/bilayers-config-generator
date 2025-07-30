# Deployment Guide

This guide covers various deployment options for the Bilayers Configuration Generator.

## 🚀 Deployment Options

### 1. GitHub Pages (Free)

1. Build the project:
```bash
npm run build
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add deployment script to package.json:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

### 2. Netlify (Free tier available)

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

Or connect your GitHub repository for automatic deployments.

### 3. Vercel (Free tier available)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository on [vercel.com](https://vercel.com).

### 4. Local Development

For local development and testing:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Build Configuration

The project uses Vite as the build tool. The built files will be in the `dist` directory after running `npm run build`.

### Environment Variables

No environment variables are required for basic functionality.

### Build Output

- `dist/index.html` - Main HTML file
- `dist/assets/` - CSS, JS, and other assets
- All assets are automatically optimized and hashed for caching

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

The application uses modern JavaScript features and may not work in older browsers without polyfills.
