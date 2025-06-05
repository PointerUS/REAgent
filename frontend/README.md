# Multilingual Real Estate Website

A modern, multilingual real estate website built with Next.js, featuring virtual property tours and smooth animations.

## 🌟 Features

- **Multilingual Support**: English and Vietnamese with automatic detection
- **Virtual Tours**: Immersive 360° property experiences with Three.js
- **Smooth Animations**: Framer Motion powered interactions
- **Responsive Design**: Mobile-first approach with touch controls
- **Modern UI**: Tailwind CSS and shadcn/ui components
- **Error Boundaries**: Graceful error handling and recovery

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

### 3. Start the Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── [lang]/            # Internationalized routes (en, vi)
│   ├── api/               # API routes (health, contact)
│   └── globals.css        # Global styles and animations
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── virtual-tour/     # Virtual tour components
│   ├── property/         # Property-related components
│   ├── comparison/       # Property comparison features
│   └── ...               # Other components
├── dictionaries/         # Translation files (en.ts, vi.ts)
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
└── scripts/              # Setup scripts
```

## 🔧 Configuration

### Environment Variables

```env
# Basic configuration - no external dependencies required
NODE_ENV=development
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm start
   ```

## 📱 Features Overview

### Virtual Tours
- Immersive 360° property experiences
- Interactive hotspots and navigation
- Mobile and desktop compatible
- High-resolution imagery

### Property Management
- Advanced filtering and search
- Property comparison tools
- Detailed property information
- Image galleries and media

### Multilingual Support
- Automatic language detection
- English and Vietnamese translations
- Localized content and formatting
- SEO-optimized language routes

### Modern UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Glass morphism effects
- Touch-friendly interactions

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Key Technologies

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D/VR**: Three.js for virtual tours
- **UI Components**: shadcn/ui
- **State Management**: React hooks and context

## 📞 Support

If you encounter any issues:

1. Check that all dependencies are installed: `npm install`
2. Verify Node.js version compatibility (Node 18+)
3. Check the browser console for any errors
4. Ensure environment variables are properly configured

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, Framer Motion, and Three.js**
