import { useState, useRef } from "react";
import { Upload as UploadIcon, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
          description: "Please upload a CSV file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a CSV file to upload.",
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
        title: "Upload Successful",
        description: `File "${file.name}" has been processed and added to the knowledge base.`,
      });
      
      // Reset file after successful upload
      setTimeout(() => {
        setFile(null);
        setUploadStatus("idle");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 3000);
      
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      
      // For demo purposes
      toast({
        title: "Demo Mode",
        description: "File upload simulation. Connect your backend to actually process CSV files into Chroma DB.",
      });
      
      // Simulate success for demo
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
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow-accent">
              <UploadIcon className="w-8 h-8 text-accent-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Upload Data
          </h1>
          <p className="text-xl text-muted-foreground">
            Add CSV files to expand the AI knowledge base
          </p>
        </div>

        <Card className="p-8 bg-card border-primary/20 shadow-card animate-fade-in">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`
              border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300
              ${file ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"}
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
                <UploadIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-muted-foreground">
                  CSV files only
                </p>
              </label>
            ) : (
              <div className="space-y-4">
                <FileText className="w-16 h-16 mx-auto text-primary" />
                <div>
                  <p className="text-lg font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                
                {uploadStatus === "success" && (
                  <div className="flex items-center justify-center gap-2 text-green-500">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Upload Successful!</span>
                  </div>
                )}
                
                {uploadStatus === "error" && (
                  <div className="flex items-center justify-center gap-2 text-destructive">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Upload Failed</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {file && uploadStatus !== "success" && (
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-primary"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadIcon className="mr-2 h-5 w-5" />
                    Upload CSV
                  </>
                )}
              </Button>
              
              <Button
                onClick={() => {
                  setFile(null);
                  setUploadStatus("idle");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                variant="outline"
                disabled={isUploading}
              >
                Cancel
              </Button>
            </div>
          )}
        </Card>

        {/* Integration Guide */}
        <Card className="mt-8 p-6 bg-accent/10 border-accent/30 animate-fade-in">
          <h3 className="font-semibold mb-3 text-accent-foreground">Backend Integration Guide:</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Update <code className="px-2 py-1 bg-muted rounded">apiEndpoint</code> in <code className="px-2 py-1 bg-muted rounded">Upload.tsx</code> with your backend URL</p>
            <p>• Ensure your Python backend has a <code className="px-2 py-1 bg-muted rounded">/upload_csv</code> endpoint</p>
            <p>• The endpoint should accept multipart/form-data with a file field</p>
            <p>• Backend should process the CSV using <code className="px-2 py-1 bg-muted rounded">ingest_papers.py</code></p>
            <p>• Data should be stored in your <code className="px-2 py-1 bg-muted rounded">chroma_db_data/</code> folder</p>
            <p>• Return JSON response: <code className="px-2 py-1 bg-muted rounded">{`{ "status": "success", "message": "..." }`}</code></p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
