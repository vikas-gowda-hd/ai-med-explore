import { useState } from "react";
import { Send, Loader2, Activity, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import SpaceParticles from "@/components/SpaceParticles";

const Query = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a medical query for AI analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      // TODO: Replace with your actual backend endpoint
      // This is a placeholder - connect to your Python backend API
      const apiEndpoint = "YOUR_BACKEND_URL/query"; // e.g., "http://localhost:5000/query"
      
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await res.json();
      setResponse(data.answer || "No response from AI");
      
      toast({
        title: "✓ Analysis Complete",
        description: "AI diagnostic results ready!",
      });
    } catch (error) {
      console.error("Query error:", error);
      
      // For demo purposes, show a simulated response
      setResponse(
        "🚀 DEMO MODE - AI DIAGNOSTIC SYSTEM\n\n" +
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
        `ASTRONAUT QUERY: "${query}"\n\n` +
        "SYSTEM STATUS: Backend connection required\n\n" +
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
        "INTEGRATION STEPS:\n\n" +
        "1. Update apiEndpoint variable with your Python backend URL\n" +
        "2. Ensure backend is running (python app.py)\n" +
        "3. Enable CORS on your Flask/FastAPI backend\n" +
        "4. Backend processes query through llm_integration.py\n" +
        "5. Returns AI-analyzed results from Chroma DB\n\n" +
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
        "Once connected, this system will provide:\n" +
        "• Real-time medical diagnostics\n" +
        "• Symptom analysis\n" +
        "• Treatment recommendations\n" +
        "• Medical research insights\n" +
        "• Emergency protocols\n\n" +
        "Mission Control Standing By... 🛰️"
      );
      
      toast({
        title: "Demo Mode Active",
        description: "Connect your backend for real AI diagnostics.",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <SpaceParticles />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-gradient-primary blur-2xl opacity-50 animate-pulse-glow"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary animate-bounce-slow">
              <Activity className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI Medical Diagnostics
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Advanced artificial intelligence for astronaut health analysis and emergency medical support
          </p>
          
          {/* Status indicators */}
          <div className="flex justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 backdrop-blur-sm animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium">AI Core: Online</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-accent/30 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
              <span className="text-sm font-medium">Database: Ready</span>
            </div>
          </div>
        </div>

        <Card className="p-8 md:p-10 bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-card animate-fade-in relative overflow-hidden">
          {/* Animated corner accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-accent opacity-10 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-3">
              <label htmlFor="query" className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Enter Medical Query
              </label>
              <Textarea
                id="query"
                placeholder="e.g., Astronaut experiencing elevated heart rate during EVA. Recommend diagnostic procedures and potential causes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[150px] bg-input/50 border-2 border-border focus:border-primary transition-all resize-none text-base backdrop-blur-sm"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow-primary text-lg py-6 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Analyzing Medical Data...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
                    Run AI Diagnostic Analysis
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </form>

          {response && (
            <div className="mt-10 pt-10 border-t-2 border-primary/20 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow-accent">
                  <Activity className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">AI Diagnostic Results</h3>
                  <p className="text-sm text-muted-foreground">Analyzed by Stellar Health AI</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-8 border-2 border-primary/20 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
                <pre className="text-foreground whitespace-pre-wrap leading-relaxed font-mono text-sm relative z-10">
                  {response}
                </pre>
              </div>
            </div>
          )}
        </Card>

        {/* Integration Guide */}
        <Card className="mt-8 p-6 md:p-8 bg-accent/10 border-2 border-accent/40 animate-fade-in backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-accent-foreground">Backend Integration Required</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Update <code className="px-2 py-1 bg-muted rounded font-mono">apiEndpoint</code> in <code className="px-2 py-1 bg-muted rounded font-mono">Query.tsx</code> with your backend URL</p>
                <p>• Ensure <code className="px-2 py-1 bg-muted rounded font-mono">app.py</code> has <code className="px-2 py-1 bg-muted rounded font-mono">/query</code> endpoint accepting POST requests</p>
                <p>• Request format: <code className="px-2 py-1 bg-muted rounded font-mono">{`{ "query": "medical question" }`}</code></p>
                <p>• Response format: <code className="px-2 py-1 bg-muted rounded font-mono">{`{ "answer": "AI diagnostic result" }`}</code></p>
                <p>• Backend processes via <code className="px-2 py-1 bg-muted rounded font-mono">llm_integration.py</code> → Chroma DB → LLM response</p>
                <p>• Enable CORS for cross-origin requests from this frontend</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Query;
