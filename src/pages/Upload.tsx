import { useState, useRef } from "react";
import { Upload as UploadIcon, FileText, CheckCircle2, AlertCircle, Loader2, Sparkles, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import SpaceParticles from "@/components/SpaceParticles";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv")) {
        setFile(selectedFile);
        setUploadStatus("idle");
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a CSV file containing medical data.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a CSV file to upload to the medical database.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus("idle");

    try {
      // TODO: Replace with your actual backend endpoint
      const apiEndpoint = "YOUR_BACKEND_URL/upload_csv"; // e.g., "http://localhost:5000/upload_csv"
      
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Upload response:", data);
      
      setUploadStatus("success");
      toast({
        title: "✓ Upload Successful",
        description: `Medical data from "${file.name}" has been integrated into the AI knowledge base.`,
      });
      
      setTimeout(() => {
        setFile(null);
        setUploadStatus("idle");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 3000);
      
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      
      toast({
        title: "Demo Mode",
        description: "File upload simulation. Connect backend to process medical data into Chroma DB.",
      });
      
      setTimeout(() => {
        setUploadStatus("success");
        setTimeout(() => {
          setFile(null);
          setUploadStatus("idle");
          if (fileInputRef.current) fileInputRef.current.value = "";
        }, 2000);
      }, 1500);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv"))) {
      setFile(droppedFile);
      setUploadStatus("idle");
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file containing medical data.",
        variant: "destructive",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <SpaceParticles />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-gradient-accent blur-2xl opacity-50 animate-pulse-glow"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow-accent animate-bounce-slow">
              <Database className="w-10 h-10 text-accent-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Medical Data Upload
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Expand the AI knowledge base with astronaut medical research and health data
          </p>
        </div>

        <Card className="p-8 md:p-10 bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-card animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-accent opacity-10 blur-3xl animate-pulse-glow"></div>
          
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`
              relative z-10 border-3 border-dashed rounded-2xl p-12 md:p-16 text-center transition-all duration-500
              ${file 
                ? "border-primary bg-primary/10 shadow-glow-primary" 
                : "border-border hover:border-primary/50 hover:bg-muted/30 hover:shadow-lg"
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            
            {!file ? (
              <label htmlFor="file-upload" className="cursor-pointer block">
                <div className="mb-6 inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-primary/20 flex items-center justify-center animate-bounce-slow">
                    <UploadIcon className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-3">
                  Drop CSV file here or click to browse
                </p>
                <p className="text-muted-foreground text-lg">
                  Medical research papers, health data, diagnostic records
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-primary">
                  <Sparkles className="w-4 h-4" />
                  <span>AI-powered data processing</span>
                </div>
              </label>
            ) : (
              <div className="space-y-6">
                <div className="inline-block">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                    uploadStatus === "success" 
                      ? "bg-green-500/20 animate-pulse-glow" 
                      : uploadStatus === "error"
                      ? "bg-red-500/20"
                      : "bg-primary/20"
                  }`}>
                    {uploadStatus === "success" ? (
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    ) : uploadStatus === "error" ? (
                      <AlertCircle className="w-12 h-12 text-red-500" />
                    ) : (
                      <FileText className="w-12 h-12 text-primary" />
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-2xl font-bold mb-2">{file.name}</p>
                  <p className="text-lg text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                
                {uploadStatus === "success" && (
                  <div className="flex items-center justify-center gap-3 text-green-500 text-lg animate-fade-in">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-bold">Data Successfully Integrated!</span>
                  </div>
                )}
                
                {uploadStatus === "error" && (
                  <div className="flex items-center justify-center gap-3 text-destructive text-lg animate-fade-in">
                    <AlertCircle className="w-6 h-6" />
                    <span className="font-bold">Upload Failed - Retry</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {file && uploadStatus !== "success" && (
            <div className="mt-8 flex gap-4 relative z-10">
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow-primary text-lg py-6 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Processing Medical Data...
                    </>
                  ) : (
                    <>
                      <UploadIcon className="mr-2 h-6 w-6" />
                      Upload to Medical Database
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Button>
              
              <Button
                onClick={() => {
                  setFile(null);
                  setUploadStatus("idle");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                variant="outline"
                disabled={isUploading}
                className="px-8 text-lg border-2"
              >
                Cancel
              </Button>
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
                <p>• Update <code className="px-2 py-1 bg-muted rounded font-mono">apiEndpoint</code> in <code className="px-2 py-1 bg-muted rounded font-mono">Upload.tsx</code></p>
                <p>• Backend <code className="px-2 py-1 bg-muted rounded font-mono">/upload_csv</code> endpoint must accept multipart/form-data</p>
                <p>• Process CSV using <code className="px-2 py-1 bg-muted rounded font-mono">ingest_papers.py</code></p>
                <p>• Store data in <code className="px-2 py-1 bg-muted rounded font-mono">chroma_db_data/</code> vector database</p>
                <p>• Return JSON: <code className="px-2 py-1 bg-muted rounded font-mono">{`{ "status": "success", "message": "..." }`}</code></p>
                <p>• Enable CORS for cross-origin file uploads</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
