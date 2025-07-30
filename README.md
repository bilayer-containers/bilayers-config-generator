# Bilayers Configuration Generator

A modern, interactive web application for generating YAML configuration files for bilayers algorithms. Built with React, Vite, and Tailwind CSS.

## ✨ Features

- **Interactive Configuration Builder**: Create comprehensive algorithm configurations through an intuitive UI
- **Real-time YAML Generation**: See your configuration as YAML code in real-time
- **Comprehensive Component Support**:
  - Docker Image configuration
  - Algorithm folder setup
  - Execution function with hidden arguments
  - Input/Output configurations with conditional fields
  - Parameters with type-specific options
  - Display-only items
  - Citations management
- **Glass Morphism UI**: Beautiful modern interface with blur effects
- **Monaco Editor Integration**: Syntax-highlighted YAML editing
- **Type-safe Configuration**: Intelligent form validation and conditional fields

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bilayer-containers/bilayers-config-generator.git
cd bilayers-config-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/
│   ├── ConfigEditor/
│   │   ├── LeftPanel.jsx          # Main configuration interface
│   │   ├── YAMLPanel.jsx          # YAML code display
│   │   ├── AlgorithmFolderItem.jsx
│   │   ├── CitationItem.jsx
│   │   ├── DisplayOnlyItem.jsx
│   │   ├── DockerImageItem.jsx
│   │   ├── ExecFunctionItem.jsx
│   │   ├── InputItem.jsx
│   │   ├── OutputItem.jsx
│   │   └── ParameterItem.jsx
│   └── ui/
│       └── card.jsx               # UI component
├── App.jsx                        # Main application component
├── main.jsx                       # Application entry point
└── index.css                      # Global styles and glass effects
```

## Customization

### Styling
The application uses Tailwind CSS with custom glass morphism effects. Modify `src/index.css` to customize the glass effects:

```css
.glass-magenta {
  @apply bg-slate-500/10 backdrop-blur-md border border-purple-300/30 rounded-xl;
}
```

### Components
Each configuration section is a separate React component, making it easy to extend or modify specific functionality.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m '[Add] some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the BSD-3-Clause License - see the [LICENSE](LICENSE) file for details.

Copyright © 2025 Broad Institute, Inc. All rights reserved.

## Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Code editing powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Icons from [Lucide React](https://lucide.dev/)
- YAML parsing with [js-yaml](https://github.com/nodeca/js-yaml)
