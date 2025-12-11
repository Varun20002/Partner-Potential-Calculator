# Partner Potential Earnings Calculator

A modern, responsive web application to calculate potential earnings for business partners based on pending conversions, average investment, and commission rates.

## Features

- 📊 Real-time earnings calculation
- 📈 Interactive charts (Donut & Bar charts)
- 💰 Historical data helper tool
- 📱 Fully responsive design
- 🎨 Clean, minimalist UI inspired by Groww

## Tech Stack

- **React** + **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

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

## Deployment

### Deploy to Vercel

1. **Option 1: Via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite and configure everything

2. **Option 2: Via Vercel CLI**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Deploy
   vercel
   ```

The project is already configured for Vercel with `vercel.json`. Just connect your GitHub repo and deploy!

## Project Structure

```
├── src/
│   ├── components/
│   │   └── PartnerEarningsCalculator.tsx  # Main calculator component
│   ├── App.tsx                              # Root component
│   ├── main.tsx                             # Entry point
│   └── index.css                            # Global styles
├── public/                                  # Static assets
├── vercel.json                              # Vercel configuration
└── package.json                            # Dependencies
```

## Usage

1. Enter the number of pending conversions
2. Set average investment per person per month
3. Adjust commission rate (20-50%)
4. View calculated future earnings
5. Use "Let's Calculate" helper to derive average from historical data
6. Click "Convert now" to reach out via WhatsApp

## License

MIT

