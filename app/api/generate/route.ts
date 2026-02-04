import { NextRequest, NextResponse } from "next/server";

// This would connect to OpenAI GPT-4 Vision API in production
// For demo, returning mock responses

const MOCK_COMPONENTS: Record<string, string> = {
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
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
        <p className="text-gray-600">Your screenshot has been converted to code!</p>
      </header>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="font-semibold mb-2">Feature One</h3>
          <p className="text-sm text-gray-600">Description of the first feature.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="font-semibold mb-2">Feature Two</h3>
          <p className="text-sm text-gray-600">Description of the second feature.</p>
        </div>
      </div>
      
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>
  );
}`,
};

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();
    
    // In production, this would:
    // 1. Send image to GPT-4 Vision API
    // 2. Get back React/Tailwind code
    // 3. Return the generated code
    
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4-vision-preview",
    //   messages: [
    //     {
    //       role: "user",
    //       content: [
    //         { type: "text", text: "Generate React + Tailwind CSS code for this UI screenshot. Return only the component code, no explanations." },
    //         { type: "image_url", image_url: { url: image } }
    //       ]
    //     }
    //   ]
    // });
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // For demo, randomly select a mock component
    const keys = Object.keys(MOCK_COMPONENTS);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const generatedCode = MOCK_COMPONENTS[randomKey];
    
    return NextResponse.json({
      success: true,
      code: generatedCode,
      message: "Code generated successfully",
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate code" },
      { status: 500 }
    );
  }
}
