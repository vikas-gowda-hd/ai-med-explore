import { useState } from "react";
import { Mail, Send, Loader2, Github, Linkedin, Globe, Rocket } from "lucide-react";
import SpaceParticles from "@/components/SpaceParticles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with your actual contact form endpoint
      // You can use services like FormSpree, EmailJS, or your own backend
      console.log("Contact form data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <SpaceParticles />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-gradient-primary blur-2xl opacity-50 animate-pulse-glow"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary animate-spin-slow">
              <Rocket className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Mission Overview
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI medical technology for astronauts exploring the cosmos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* About Section */}
          <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-card animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 blur-3xl animate-pulse-glow"></div>
            
            <h2 className="text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent relative z-10">
              Our Mission
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg relative z-10">
              <p>
                <strong className="text-foreground">Stellar Health AI</strong> is a cutting-edge medical diagnostic system 
                designed specifically for <strong className="text-primary">astronauts in deep space missions</strong>.
              </p>
              <p>
                When medical emergencies occur millions of miles from Earth, immediate expert care isn't an option. 
                Our AI-powered platform provides <strong className="text-foreground">real-time diagnostic support</strong>, 
                analyzing symptoms, vital signs, and medical data to guide astronauts through critical health decisions.
              </p>
              <p>
                By combining advanced language models with comprehensive medical databases, we deliver 
                <strong className="text-accent"> instant, evidence-based medical guidance</strong> for space crews, 
                ensuring their safety and well-being during extended missions to Mars, lunar bases, and beyond.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "LangChain", "Chroma DB", "OpenAI", "React", "TypeScript"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://stellar-health.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-card animate-fade-in relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-accent opacity-10 blur-3xl animate-pulse-glow"></div>
            
            <div className="mb-6 relative z-10">
              <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center mb-4 shadow-glow-accent animate-bounce-slow">
                <Mail className="w-7 h-7 text-accent-foreground" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Mission Control Contact</h2>
              <p className="text-muted-foreground text-lg">
                Questions about the system? Reach out to our team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="bg-input border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="bg-input border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="min-h-[120px] bg-input border-border focus:border-primary transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* Developer Info */}
        <Card className="p-8 bg-gradient-to-br from-primary via-secondary to-accent text-center animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white/10 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-2 border-white/10 rounded-full animate-spin-slow" style={{ animationDirection: "reverse" }}></div>
          
          <div className="relative z-10">
            <p className="text-white text-xl font-bold mb-2">
              🚀 Advancing Space Medicine Through AI Innovation
            </p>
            <p className="text-white/80">
              Protecting astronaut health across the cosmos
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
