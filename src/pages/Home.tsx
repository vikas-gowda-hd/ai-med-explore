import { Link } from "react-router-dom";
import { ArrowRight, Activity, Satellite, Shield, Zap, Heart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SpaceParticles from "@/components/SpaceParticles";
import astronautImage from "@/assets/astronaut-health.jpg";

const Home = () => {
  const features = [
    {
      icon: Activity,
      title: "Real-Time Health Monitoring",
      description: "Continuous vital signs tracking and AI-powered anomaly detection for astronauts in deep space missions.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "AI Medical Diagnostics",
      description: "Advanced machine learning algorithms analyze symptoms and medical data to provide instant diagnostic support.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Satellite,
      title: "Remote Medical Support",
      description: "Connect with Earth-based medical teams and access comprehensive medical databases from anywhere in space.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Shield,
      title: "Radiation Exposure Tracking",
      description: "Monitor and analyze cosmic radiation levels to protect astronaut health during extended missions.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "Emergency Response",
      description: "Instant medical emergency protocols with AI-guided treatment recommendations for critical situations.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Heart,
      title: "Wellness Management",
      description: "Comprehensive health and wellness tracking including mental health, nutrition, and exercise in zero-gravity.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="min-h-screen pt-20 relative">
      <SpaceParticles />
      
      {/* Hero Section with massive animations */}
      <section className="relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-block animate-bounce-slow">
                <span className="px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold border-2 border-primary shadow-glow-primary">
                  🚀 Space Medical Technology
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block animate-fade-in">Astronaut Health</span>
                <span className="block bg-gradient-primary bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  Monitoring System
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
                Advanced AI-powered medical diagnostics for astronauts exploring the cosmos. 
                Real-time health monitoring, instant AI diagnostics, and emergency medical support 
                from millions of miles away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <Link to="/query">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow-primary group relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Start Diagnostics
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary shadow-lg">
                    Mission Details
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 animate-fade-in" style={{ animationDelay: "0.8s" }}>
                <div className="text-center p-4 rounded-lg bg-card/50 border border-primary/20 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card/50 border border-primary/20 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-accent">99.9%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card/50 border border-primary/20 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-secondary">∞</div>
                  <div className="text-sm text-muted-foreground">Range</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin-slow"></div>
              <div className="absolute inset-8 rounded-full border-4 border-accent/20 animate-spin-slow" style={{ animationDirection: "reverse" }}></div>
              
              {/* Glowing orb */}
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full animate-glow-pulse"></div>
              
              <img 
                src={astronautImage} 
                alt="Astronaut with Health Monitoring System" 
                className="relative rounded-2xl shadow-2xl w-full h-auto animate-float border-2 border-primary/30"
              />
              
              {/* Floating badges */}
              <div className="absolute top-10 -left-6 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full border border-primary shadow-glow-primary animate-bounce-slow">
                <span className="text-sm font-bold text-primary">❤️ Heart Rate: Normal</span>
              </div>
              <div className="absolute bottom-10 -right-6 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full border border-accent shadow-glow-accent animate-bounce-slow" style={{ animationDelay: "0.5s" }}>
                <span className="text-sm font-bold text-accent">🧬 AI Analysis: Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with enhanced animations */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Mission-Critical Features
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge technology designed for the unique challenges of space medicine
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-8 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/60 transition-all duration-500 hover:shadow-card group animate-slide-up hover:scale-105 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative`}>
                  <feature.icon className="w-8 h-8 text-white" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with animations */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <Card className="p-12 md:p-16 bg-gradient-to-br from-primary via-secondary to-accent text-center relative overflow-hidden">
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-spin-slow"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white/20 rounded-full animate-spin-slow" style={{ animationDirection: "reverse" }}></div>
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
                Ready to Begin Your Mission?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Join the future of space medicine. Start monitoring astronaut health with AI-powered precision.
              </p>
              <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Link to="/query">
                  <Button size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 shadow-2xl text-lg px-8 py-6 group">
                    Launch Diagnostics System
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
