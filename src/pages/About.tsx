import { useState } from "react";
import { Mail, Send, Loader2, Github, Linkedin, Globe } from "lucide-react";
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
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Stellar Health AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bridging the gap between artificial intelligence and medical research
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* About Section */}
          <Card className="p-8 bg-card border-primary/20 shadow-card animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Our Mission
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Stellar Health AI is an advanced research platform that leverages cutting-edge artificial intelligence 
                to unlock insights from vast medical literature databases.
              </p>
              <p>
                Our system combines state-of-the-art language models with vector databases to provide researchers, 
                healthcare professionals, and students with instant access to evidence-based medical knowledge.
              </p>
              <p>
                By processing and understanding complex medical research papers, we aim to accelerate medical discoveries 
                and improve patient outcomes worldwide.
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
          <Card className="p-8 bg-card border-primary/20 shadow-card animate-fade-in">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center mb-4 shadow-glow-accent">
                <Mail className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Get In Touch</h2>
              <p className="text-muted-foreground">
                Have questions or feedback? We'd love to hear from you.
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
        <Card className="p-6 bg-gradient-primary text-center animate-fade-in">
          <p className="text-primary-foreground font-medium">
            Developed with ❤️ for advancing medical research through AI
          </p>
        </Card>
      </div>
    </div>
  );
};

export default About;
