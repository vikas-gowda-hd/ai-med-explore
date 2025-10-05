import { useState } from "react";
import { Send, Loader2, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
        description: "Please enter a question to ask the AI.",
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
        title: "Success",
        description: "AI response received!",
      });
    } catch (error) {
      console.error("Query error:", error);
      
      // For demo purposes, show a simulated response
      setResponse(
        "This is a demo response. To connect to your actual backend:\n\n" +
        "1. Update the apiEndpoint variable with your Python backend URL\n" +
        "2. Ensure your backend is running (python app.py)\n" +
        "3. Make sure CORS is enabled on your backend\n\n" +
        `Your query was: "${query}"\n\n` +
        "The backend should process this through llm_integration.py and return results from Chroma DB."
      );
      
      toast({
        title: "Demo Mode",
        description: "Showing simulated response. Connect your backend to get real AI answers.",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Query Interface
          </h1>
          <p className="text-xl text-muted-foreground">
            Ask questions and get instant insights from medical research papers
          </p>
        </div>

        <Card className="p-8 bg-card border-primary/20 shadow-card animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="query" className="text-sm font-medium text-foreground">
                Your Question
              </label>
              <Textarea
                id="query"
                placeholder="e.g., What are the latest findings on immunotherapy for cancer treatment?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[120px] bg-input border-border focus:border-primary transition-colors resize-none"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-primary"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Ask AI
                </>
              )}
            </Button>
          </form>

          {response && (
            <div className="mt-8 pt-8 border-t border-border animate-slide-up">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Response
              </h3>
              <div className="bg-muted/50 rounded-lg p-6 border border-primary/10">
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {response}
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Integration Guide */}
        <Card className="mt-8 p-6 bg-accent/10 border-accent/30 animate-fade-in">
          <h3 className="font-semibold mb-3 text-accent-foreground">Backend Integration Guide:</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Update <code className="px-2 py-1 bg-muted rounded">apiEndpoint</code> in <code className="px-2 py-1 bg-muted rounded">Query.tsx</code> with your backend URL</p>
            <p>• Ensure your Python backend (<code className="px-2 py-1 bg-muted rounded">app.py</code>) has a <code className="px-2 py-1 bg-muted rounded">/query</code> endpoint</p>
            <p>• The endpoint should accept POST requests with JSON: <code className="px-2 py-1 bg-muted rounded">{`{ "query": "your question" }`}</code></p>
            <p>• Backend should return JSON: <code className="px-2 py-1 bg-muted rounded">{`{ "answer": "AI response" }`}</code></p>
            <p>• Enable CORS on your backend to allow requests from this frontend</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Query;
