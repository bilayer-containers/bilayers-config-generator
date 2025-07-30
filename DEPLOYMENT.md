# Deployment Guide

## Deployment on GitHub Pages

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

## Build Configuration

The project uses Vite as the build tool. The built files will be in the `dist` directory after running `npm run build`.

### Environment Variables

No environment variables are required for basic functionality.

### Build Output

- `dist/index.html` - Main HTML file
- `dist/assets/` - CSS, JS, and other assets
- All assets are automatically optimized and hashed for caching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

The application uses modern JavaScript features and may not work in older browsers without polyfills.
