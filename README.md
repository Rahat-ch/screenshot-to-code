# Screenshot to Code

Drop a screenshot, get React code instantly. Built with Next.js, Tailwind CSS, and Monaco Editor.

![Demo](https://screenshot-to-code-demo.vercel.app)

## Features

- 📸 **Image Upload** — Drag & drop or select screenshots
- 🤖 **AI-Powered** — Converts UI screenshots to React + Tailwind code
- 💻 **Live Editor** — Monaco Editor for tweaking generated code
- 👁️ **Instant Preview** — See your component render in real-time
- 📋 **One-Click Copy** — Copy code to clipboard instantly

## Demo

Try it live: [screenshot-to-code-demo.vercel.app](https://screenshot-to-code-demo.vercel.app)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Editor:** Monaco Editor (@monaco-editor/react)
- **Icons:** Lucide React
- **AI:** OpenAI GPT-4 Vision API (optional)

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/screenshot-to-code.git
cd screenshot-to-code/my-app
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
```

## Adding AI (OpenAI Integration)

The demo uses mock responses. To add real AI:

1. **Get OpenAI API key:** [platform.openai.com](https://platform.openai.com)

2. **Create `.env.local`:**

```env
OPENAI_API_KEY=sk-your-key-here
```

3. **Update API Route** (`app/api/generate/route.ts`):

Uncomment the OpenAI integration code and remove the mock responses.

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In POST handler:
const response = await openai.chat.completions.create({
  model: "gpt-4-vision-preview",
  messages: [
    {
      role: "user",
      content: [
        { 
          type: "text", 
          text: "Generate React + Tailwind CSS code for this UI screenshot. Return only the component code, no explanations." 
        },
        { 
          type: "image_url", 
          image_url: { url: image } 
        }
      ]
    }
  ]
});

const generatedCode = response.choices[0]?.message?.content || '';
```

## How It Works

1. **Upload** — User drops a UI screenshot
2. **Analyze** — Image sent to GPT-4 Vision API
3. **Generate** — AI returns React + Tailwind code
4. **Edit** — User tweaks code in Monaco Editor
5. **Preview** — Code renders live in an iframe
6. **Export** — Copy code or download component

## Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── generate/      # AI generation endpoint
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # Main UI
├── components/
│   └── ui/                # shadcn components
├── lib/
│   └── utils.ts
├── public/
├── next.config.ts
├── package.json
└── README.md
```

## Customization

### Add More Mock Components

Edit `app/api/generate/route.ts` and add to `MOCK_COMPONENTS`:

```typescript
const MOCK_COMPONENTS: Record<string, string> = {
  "your-component": `export default function YourComponent() {
    return (
      <div>Your code here</div>
    );
  }`,
  // ...existing components
};
```

### Change Editor Theme

In `app/page.tsx`, modify the Editor component:

```tsx
<Editor
  theme="vs-light"  // or "vs-dark", "hc-black"
  // ...
/>
```

### Styling

The app uses a dark theme by default. To change:

1. Edit `app/globals.css` for CSS variables
2. Modify the main div class in `app/page.tsx`

## Deployment

### Vercel (Easiest)

```bash
npm i -g vercel
vercel --prod
```

### Coolify (Self-Hosted)

1. Push to GitHub
2. Connect Coolify to repo
3. Set build command: `npm run build`
4. Set output directory: `dist`

### Static Export

```bash
npm run build
# Output in ./dist folder
```

## API Reference

### POST /api/generate

Generates React code from a screenshot.

**Request:**
```json
{
  "image": "data:image/png;base64,iVBORw0KGgo..."
}
```

**Response:**
```json
{
  "success": true,
  "code": "export default function Component() { ... }",
  "message": "Code generated successfully"
}
```

## Roadmap

- [ ] Multiple framework support (Vue, Svelte, Angular)
- [ ] Component library detection (shadcn, Chakra, Material)
- [ ] Figma plugin integration
- [ ] Batch processing (multiple screenshots)
- [ ] Export to CodeSandbox/StackBlitz
- [ ] Theme customization from screenshot

## Inspiration

Built after seeing the "Screenshot to Code" trend and wanting a clean, fast, no-signup tool.

## License

MIT — use it however you want!

---

**Built with** ⚡️ by [Your Name]
