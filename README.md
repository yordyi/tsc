# 🚀 TimestampConverter - Professional Unix Time Converter

A modern, fast, and accurate timestamp converter built with Next.js 14, TypeScript, and Tailwind CSS. Convert Unix timestamps to human-readable dates instantly with batch processing, timezone support, and code examples in 8+ programming languages.

![TimestampConverter](https://your-domain.com/screenshot.png)

## ✨ Features

- **Lightning Fast Conversion** - Instant timestamp conversion with real-time validation
- **Batch Processing** - Convert thousands of timestamps at once via CSV/JSON upload
- **Timezone Support** - Convert to any timezone with automatic DST detection
- **Code Examples** - Ready-to-use snippets in 8+ programming languages
- **Offline Ready** - Progressive Web App that works without internet
- **Privacy First** - All conversions happen in your browser, no data sent to servers
- **Mobile Optimized** - Perfect responsive design for all devices
- **Dark Mode** - Eye-friendly dark theme support
- **History Tracking** - Keep track of your recent conversions locally

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Date Handling**: date-fns + date-fns-tz
- **Deployment**: Vercel
- **Performance**: 100/100 Lighthouse score

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/timestamp-converter.git
cd timestamp-converter
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
timestamp-converter/
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # React components
│   │   ├── TimestampConverter.tsx
│   │   ├── SingleConverter.tsx
│   │   ├── BatchConverter.tsx
│   │   └── ...
│   ├── lib/                 # Utilities and store
│   │   ├── timestamp-utils.ts
│   │   └── store.ts
│   └── types/               # TypeScript definitions
│       └── timestamp.ts
├── public/                  # Static assets
│   ├── manifest.json        # PWA manifest
│   └── icons/              # App icons
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── vercel.json             # Deployment configuration
```

## 🚀 Deploy to Vercel

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/timestamp-converter)

### Method 2: Manual Deploy

1. **Create Vercel account** at [vercel.com](https://vercel.com)

2. **Install Vercel CLI**
```bash
npm i -g vercel
```

3. **Login and deploy**
```bash
vercel login
vercel --prod
```

4. **Configure custom domain** (optional)
- Go to your Vercel dashboard
- Navigate to your project settings
- Add your custom domain in the "Domains" section

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Additional configurations
NEXT_TELEMETRY_DISABLED=1
```

### SEO Configuration

Update the metadata in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Custom Title',
  description: 'Your custom description',
  // ... other metadata
};
```

## 📊 Performance

- ⚡ **Lighthouse Score**: 100/100
- 🚀 **First Contentful Paint**: < 1.2s
- 📱 **Mobile Performance**: 100/100
- ♿ **Accessibility**: 100/100
- 🔍 **SEO**: 100/100

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build test
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built following [哥飞的出海建站教程](https://github.com/gefei-coursework)
- Inspired by modern web development best practices
- Icons from [Lucide React](https://lucide.dev)
- Animations powered by [Framer Motion](https://framer.com/motion)

## 📞 Support

- 📧 Email: support@timestampconverter.dev
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/timestamp-converter/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/timestamp-converter/discussions)

---

**Built with ❤️ for the developer community**

⭐ Star this repo if you found it helpful!