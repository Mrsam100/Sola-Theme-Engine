<div align="center">
<img width="1200" height="475" alt="Sola Theme Engine Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Sola Theme Engine v2 🎨

Professional AI-powered screenshot-to-dark-mode theme converter using Google Gemini AI.

[![Security](https://img.shields.io/badge/security-hardened-green.svg)](.)
[![TypeScript](https://img.shields.io/badge/typescript-100%25-blue.svg)](.)
[![React](https://img.shields.io/badge/react-19.0-61dafb.svg)](.)

---

## 🎯 What is Sola?

Sola Theme Engine transforms light-mode UI screenshots into professional, high-fidelity dark-mode themes. Unlike simple color inversion, Sola leverages Google's Gemini 3 Pro multimodal AI to understand UI semantics and preserve your brand's emotional resonance.

### Key Features

- ✅ **AI-Powered**: Gemini 3 Pro for intelligent dark mode conversion
- 🔒 **Secure**: API keys protected server-side, never exposed to clients
- 🚀 **Optimized**: Automatic image compression (max 2048px)
- 🛡️ **Hardened**: XSS protection, CSRF tokens, input validation
- 📱 **Responsive**: Works seamlessly on mobile, tablet, and desktop
- ♿ **Accessible**: WCAG AA compliant

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create `.env.local` in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Get your API key:** https://aistudio.google.com/app/apikey

### 3. Run Development Server

```bash
npm start
```

Visit http://localhost:3000

### 4. Build for Production

```bash
npm run build
```

---

## 🏗️ Architecture

### Frontend
- **React 19** + TypeScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Clay Design** - Neumorphic UI system

### Backend (Vercel Serverless)
- **API Proxy** - Secure Gemini API calls
- **Rate Limiting** - 10 transforms/hour, 50 chats/hour
- **Validation** - File type, size, content checks
- **Security Headers** - CSP, HSTS, X-Frame-Options

---

## 🔒 Security (Production-Ready!)

### ✅ All Critical Vulnerabilities Fixed

| Security Feature | Status |
|-----------------|--------|
| API Key Protection | ✅ Server-side only |
| XSS Prevention | ✅ Input sanitization |
| CSRF Protection | ✅ Token validation |
| File Upload Security | ✅ Type/size validation |
| Security Headers | ✅ CSP, HSTS, etc. |
| Error Exposure | ✅ Dev-only logging |

### API Key Protection
- Stored in Vercel environment variables
- Never included in client bundle
- Backend proxy handles all API calls

### Input Validation
- **File types**: PNG, JPG, WebP only
- **File size**: 10MB maximum
- **Image compression**: Auto-resize to 2048px
- **URL validation**: Prevents javascript: and data: URIs

### Security Headers
```
Content-Security-Policy: default-src 'self'; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
```

---

## 📊 What We Fixed

### Phase 1: Critical Security ✅
- ✅ Created Vercel serverless backend ([api/transform.ts](api/transform.ts), [api/chat.ts](api/chat.ts))
- ✅ Removed API key from client ([vite.config.ts](vite.config.ts))
- ✅ Added input validation ([utils/validation.ts](utils/validation.ts))
- ✅ XSS prevention ([utils/sanitize.ts](utils/sanitize.ts))
- ✅ Security headers ([vercel.json](vercel.json))

### Phase 2: High Priority Bugs ✅
- ✅ Error boundary component ([components/ErrorBoundary.tsx](components/ErrorBoundary.tsx))
- ✅ Removed all `any` types - full TypeScript safety
- ✅ Fixed hamburger menu ([components/Navbar.tsx](components/Navbar.tsx))
- ✅ Image compression for performance ([components/Dashboard.tsx](components/Dashboard.tsx))
- ✅ Proper error handling with user-friendly messages

---

## 📁 Project Structure

```
Sola-Theme-Engine/
├── api/                    # Vercel serverless functions
│   ├── transform.ts       # Image transformation (rate-limited)
│   └── chat.ts            # AI chat assistant
├── components/            # React components
│   ├── Dashboard.tsx      # Main conversion UI
│   ├── Navbar.tsx         # Navigation + mobile menu
│   ├── ErrorBoundary.tsx  # Error handling
│   └── ...
├── services/
│   └── geminiService.ts   # Backend API client
├── utils/
│   ├── validation.ts      # Input validation
│   ├── sanitize.ts        # XSS prevention
│   └── logger.ts          # Dev-only logging
├── .env.example           # Environment template
└── vercel.json            # Security headers
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Set Environment Variable:**
   - Go to Vercel dashboard → Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key

4. **Done!** Your app is live with automatic HTTPS and CDN.

---

## 📝 API Documentation

### `POST /api/transform`

Transform light-mode screenshot to dark-mode.

**Request:**
```json
{
  "base64Image": "base64_encoded_image",
  "mimeType": "image/png"
}
```

**Response:**
```json
{
  "success": true,
  "result": "data:image/png;base64,...",
  "remaining": 9
}
```

**Rate Limit:** 10 requests/hour per IP

### `POST /api/chat`

Chat with AI design assistant.

**Request:**
```json
{
  "history": [{ "role": "user", "text": "..." }],
  "message": "How does dark mode work?"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Dark mode adjusts colors...",
  "remaining": 49
}
```

**Rate Limit:** 50 requests/hour per IP

---

## 🎨 What Makes Sola Different?

| Feature | Simple Inversion | Sola Engine |
|---------|-----------------|-------------|
| Color Balance | ❌ Looks washed out | ✅ Perceptual luminance |
| Depth Perception | ❌ Flat | ✅ Layer-aware elevation |
| Typography | ❌ Illegible | ✅ Optimized rendering |
| WCAG Compliance | ❌ Often fails | ✅ AA standard |
| Brand Preservation | ❌ Lost | ✅ Emotional resonance |

### Our Approach

1. **Perceptual Luminance**: Adjusts saturation for balanced colors on dark backgrounds
2. **Layer Awareness**: Identifies UI elevation for natural depth
3. **Type Integrity**: Optimizes font rendering for dark mode legibility
4. **WCAG AA**: Ensures 4.5:1 contrast ratio

---

## 🛠️ Development

### Type Checking
```bash
npm run type-check
```

### Scripts
- `npm start` - Development server (port 3000)
- `npm run build` - Production build
- `npm run preview` - Preview production build

### Configuration

**TypeScript** ([tsconfig.json](tsconfig.json)):
- Target: ES2022
- JSX: react-jsx
- Strict mode enabled

**Vite** ([vite.config.ts](vite.config.ts)):
- React plugin
- Path alias: `@` → project root

---

## 🐛 Known Limitations

- Requires paid Google Cloud Project for Gemini API
- Rate limited to prevent quota exhaustion
- Maximum image size: 10MB
- Supported formats: PNG, JPG, WebP

---

## 📜 License

Apache 2.0

---

## 💡 Credits

**Built by Schroeder Technologies**

- AI Model: Google Gemini 3 Pro
- Framework: React 19 + TypeScript
- Build Tool: Vite
- Hosting: Vercel Serverless
- Design: Clay/Neumorphic System

---

## 🆘 Support

- **Issues**: Open a GitHub issue
- **API Docs**: https://ai.google.dev/gemini-api/docs
- **Security**: Report vulnerabilities privately

---

<div align="center">
  <strong>Transform with intelligence. Deploy with confidence.</strong>
</div>
