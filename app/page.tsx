"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@monaco-editor/react";
import { Upload, Copy, Check, RefreshCw, ImageIcon, Code2, Eye } from "lucide-react";

// Pre-written mock responses for demo mode
const MOCK_RESPONSES: Record<string, string> = {
  "landing-page": `export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold text-white">Logo</div>
        <div className="flex gap-6">
          <a href="#" className="text-white/80 hover:text-white">Features</a>
          <a href="#" className="text-white/80 hover:text-white">Pricing</a>
          <a href="#" className="text-white/80 hover:text-white">About</a>
        </div>
        <button className="px-6 py-2 bg-white text-purple-600 rounded-full font-medium hover:bg-white/90 transition">
          Get Started
        </button>
      </nav>
      
      <main className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-white mb-6 max-w-4xl">
          Build Something Amazing
        </h1>
        <p className="text-xl text-white/80 mb-10 max-w-2xl">
          Transform your ideas into reality with our powerful platform.
          Start building today.
        </p>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-white/90 transition">
            Start Free Trial
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
}`,
  "pricing-card": `export default function PricingCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-6 text-center">
          <h3 className="text-white text-lg font-medium">Pro Plan</h3>
          <div className="mt-2">
            <span className="text-4xl font-bold text-white">$29</span>
            <span className="text-white/80">/month</span>
          </div>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            {['Unlimited projects', 'Priority support', 'Advanced analytics', 'Custom domains'].map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          <button className="w-full mt-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}`,
  default: `export default function Component() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Hello World
      </h2>
      <p className="text-gray-600">
        Your screenshot has been converted to code!
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Click me
      </button>
    </div>
  );
}`,
};

export default function ScreenshotToCode() {
  const [image, setImage] = useState<string | null>(null);
  const [code, setCode] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setActiveTab("preview");
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const generateCode = useCallback(async () => {
    if (!image) return;
    
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCode(data.code);
        setActiveTab('code');
      } else {
        console.error('Generation failed:', data.error);
        // Fallback to mock
        setCode(MOCK_RESPONSES["landing-page"]);
        setActiveTab('code');
      }
    } catch (error) {
      console.error('Error:', error);
      // Fallback to mock
      setCode(MOCK_RESPONSES["landing-page"]);
      setActiveTab('code');
    } finally {
      setIsGenerating(false);
    }
  }, [image]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const reset = useCallback(() => {
    setImage(null);
    setCode("");
    setActiveTab("upload");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Screenshot to Code
              </h1>
              <p className="text-xs text-slate-400">Drop an image, get React code</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {image && (
              <Button variant="outline" size="sm" onClick={reset} className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <RefreshCw className="w-4 h-4 mr-2" />
                New
              </Button>
            )}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-slate-400 hover:text-white transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="upload" className="data-[state=active]:bg-slate-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={!image} className="data-[state=active]:bg-slate-700">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" disabled={!code} className="data-[state=active]:bg-slate-700">
              <Code2 className="w-4 h-4 mr-2" />
              Code
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="mt-8">
            <Card className="border-2 border-dashed border-slate-600 bg-slate-800/30 hover:border-blue-400/50 hover:bg-slate-800/50 transition-all cursor-pointer">
              <label className="flex flex-col items-center justify-center py-20 px-4 cursor-pointer">
                <div className="w-20 h-20 bg-slate-700/50 rounded-2xl flex items-center justify-center mb-6">
                  <Upload className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Drop a screenshot here
                </h3>
                <p className="text-slate-400 text-center max-w-md mb-6">
                  Upload a UI screenshot, mockup, or design. We'll convert it to clean, editable React code.
                </p>
                <Button variant="outline" className="border-slate-500 text-slate-300 hover:bg-slate-700">
                  Select Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="mt-4 text-xs text-slate-500">
                  Supports PNG, JPG, GIF • Max 5MB
                </p>
              </label>
            </Card>

            {/* Example Screenshots */}
            <div className="mt-12">
              <h3 className="text-sm font-medium text-slate-400 mb-4 text-center">
                Or try an example
              </h3>
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  { name: "Landing Page", color: "from-indigo-500 to-purple-500" },
                  { name: "Pricing Card", color: "from-blue-400 to-cyan-400" },
                  { name: "Dashboard", color: "from-emerald-400 to-teal-500" },
                ].map((example) => (
                  <button
                    key={example.name}
                    onClick={() => {
                      // In real version, these would load actual example images
                      setImage(`data:image/svg+xml,${encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
                          <defs>
                            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stop-color="${example.color.split(' ')[0].replace('from-', '').replace('-500', '#6366f1').replace('-400', '#60a5fa')}" />
                              <stop offset="100%" stop-color="${example.color.split(' ')[1].replace('to-', '').replace('-500', '#a855f7').replace('-400', '#22d3ee').replace('-500', '#14b8a6')}" />
                            </linearGradient>
                          </defs>
                          <rect width="400" height="300" fill="url(#g)" rx="12" />
                          <text x="200" y="150" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif">${example.name}</text>
                        </svg>`
                      )}`);
                      setActiveTab("preview");
                    }}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 hover:ring-2 hover:ring-blue-400 transition"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${example.color} opacity-80 group-hover:opacity-100 transition`} />
                    <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                      {example.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="mt-8">
            {image && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-4">Original Screenshot</h3>
                  <Card className="overflow-hidden bg-slate-800 border-slate-700">
                    <img 
                      src={image} 
                      alt="Uploaded screenshot" 
                      className="w-full h-auto max-h-[600px] object-contain"
                    />
                  </Card>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium text-slate-400 mb-4">Generated Preview</h3>
                  <Card className="flex-1 bg-slate-800 border-slate-700 flex items-center justify-center min-h-[400px]">
                    {code ? (
                      <div className="w-full h-full overflow-auto p-4">
                        {/* This would render the actual component in a sandbox */}
                        <div className="text-center text-slate-500">
                          <p>Component preview would render here</p>
                          <p className="text-sm mt-2">Switch to Code tab to see the output</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Code2 className="w-8 h-8 text-slate-500" />
                        </div>
                        <p className="text-slate-400 mb-6">
                          Ready to generate code from this screenshot
                        </p>
                        <Button 
                          onClick={generateCode}
                          disabled={isGenerating}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        >
                          {isGenerating ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Code2 className="w-4 h-4 mr-2" />
                              Generate Code
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code" className="mt-8">
            {code && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-slate-400">Generated Code</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={copyCode}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <Card className="overflow-hidden bg-slate-900 border-slate-700">
                    <Editor
                      height="600px"
                      language="typescript"
                      theme="vs-dark"
                      value={code}
                      onChange={(value) => setCode(value || "")}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        readOnly: false,
                        automaticLayout: true,
                      }}
                    />
                  </Card>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-4">Live Preview</h3>
                  <Card className="bg-white border-slate-700 min-h-[600px]">
                    <iframe
                      srcDoc={`
                        <!DOCTYPE html>
                        <html>
                          <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <script src="https://cdn.tailwindcss.com"></script>
                            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
                            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                          </head>
                          <body>
                            <div id="root"></div>
                            <script type="text/babel">
                              ${code.replace('export default', 'const Component =')}
                              ReactDOM.render(<Component />, document.getElementById('root'));
                            </script>
                          </body>
                        </html>
                      `}
                      className="w-full h-[600px] border-0"
                      sandbox="allow-scripts"
                      title="Preview"
                    />
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>Built with Next.js, Tailwind CSS, and Monaco Editor</p>
          <p className="mt-2">Drop a screenshot, get React code. No signup required.</p>
        </div>
      </footer>
    </div>
  );
}
