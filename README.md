# 🎯 Job Tracker

A modern, full-stack job application tracking system built with Next.js 15, TypeScript, and Vercel KV.

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure sign-in with NextAuth
- 📊 **Kanban Board** - Drag-and-drop interface for managing applications
- 📈 **Analytics Dashboard** - Visual charts showing application statistics
- ⚡ **Optimistic UI** - Instant feedback with automatic rollback on errors
- 🎨 **Modern Design** - Beautiful UI with Tailwind CSS and shadcn/ui
- 🔄 **Real-time Sync** - Data stored in Vercel KV with instant updates
- 📱 **Responsive** - Works perfectly on desktop and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Vercel account (for KV database)
- Google Cloud Console account (for OAuth)

### Installation

1. **Clone and install dependencies:**

```bash
cd job-tracker
bun install
```

2. **Set up Vercel KV:**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Create a new KV database
   - Copy the environment variables

3. **Set up Google OAuth:**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy Client ID and Client Secret

4. **Generate NextAuth Secret:**

```bash
openssl rand -base64 32
```

5. **Create `.env.local` file:**

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

KV_URL=your-kv-url
KV_REST_API_URL=your-kv-rest-api-url
KV_REST_API_TOKEN=your-kv-rest-api-token
KV_REST_API_READ_ONLY_TOKEN=your-kv-rest-api-read-only-token
```

6. **Run the development server:**

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Authentication:** NextAuth.js
- **Database:** Vercel KV (Redis)
- **State Management:** Zustand
- **Drag & Drop:** dnd-kit
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Notifications:** react-hot-toast

## 🎨 Application Statuses

- **Applied** - Initial application submitted
- **Screening** - Under review/phone screening
- **Interview** - Interview scheduled or completed
- **Offer** - Job offer received
- **Rejected** - Application rejected

## 🔧 Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Don't forget to update `NEXTAUTH_URL` and Google OAuth redirect URI with your production URL.

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

