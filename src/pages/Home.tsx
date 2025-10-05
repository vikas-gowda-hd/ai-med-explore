import { Link } from "react-router-dom";
import { ArrowRight, Brain, Database, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-cosmic-medical.jpg";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Research",
      description: "Advanced language models analyze medical literature to provide instant, accurate insights."
    },
    {
      icon: Database,
      title: "Knowledge Base",
      description: "Upload and query your medical research papers with our intelligent vector database."
    },
    {
      icon: Sparkles,
      title: "Instant Answers",
      description: "Get research-backed answers to complex medical questions in seconds."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  Next-Gen Medical AI
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Accelerate Medical Research with{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  AI Intelligence
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Harness the power of artificial intelligence to unlock insights from medical research papers. 
                Ask questions, get answers, and advance healthcare innovation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/query">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-primary group">
                    Start Querying
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/50 text-foreground hover:bg-primary/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full animate-glow-pulse"></div>
              <img 
                src={heroImage} 
                alt="Cosmic Medical AI Visualization" 
                className="relative rounded-2xl shadow-2xl w-full h-auto animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Medical Research
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to transform how you interact with medical literature
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-8 bg-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-card group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center mb-6 shadow-glow-primary group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 bg-gradient-primary text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Transform Medical Research?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Join the future of AI-powered medical insights today
              </p>
              <Link to="/query">
                <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90 shadow-lg">
                  Get Started Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
