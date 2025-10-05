import { Link, useLocation } from "react-router-dom";
import { Home, Activity, Upload, Info } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/query", label: "AI Diagnostics", icon: Activity },
    { path: "/upload", label: "Upload Data", icon: Upload },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary animate-pulse-glow">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Stellar Health AI
            </span>
          </Link>
          
          <div className="flex gap-1 md:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-300
                  ${isActive(item.path)
                    ? "bg-primary text-primary-foreground shadow-glow-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }
                `}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
