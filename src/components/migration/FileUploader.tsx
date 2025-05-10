
import { useState } from "react";
import { Upload, X, File, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FileStatus = "idle" | "uploading" | "success" | "error";

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  status: FileStatus;
  progress: number;
  error?: string;
};

const FileUploader = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };
  
  const processFiles = (newFiles: File[]) => {
    const sqlFiles = newFiles.filter(file => 
      file.name.endsWith('.sql') || 
      file.name.endsWith('.bteq') || 
      file.name.endsWith('.txt') || 
      file.type === 'text/plain'
    );
    
    const newUploadedFiles = sqlFiles.map(file => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      status: "idle" as FileStatus,
      progress: 0
    }));
    
    // Simulate file upload process
    setFiles(prev => [...prev, ...newUploadedFiles]);
    
    newUploadedFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };
  
  const simulateUpload = (fileId: string) => {
    setFiles(prev => 
      prev.map(f => 
        f.id === fileId ? { ...f, status: "uploading" } : f
      )
    );
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      
      setFiles(prev => 
        prev.map(f => 
          f.id === fileId 
            ? { ...f, progress: Math.min(progress, 100) } 
            : f
        )
      );
      
      if (progress >= 100) {
        clearInterval(interval);
        
        setFiles(prev => 
          prev.map(f => {
            if (f.id === fileId) {
              // Randomly simulate success or error for demo
              const isSuccess = Math.random() > 0.2;
              return { 
                ...f, 
                status: isSuccess ? "success" : "error",
                error: isSuccess ? undefined : "Invalid SQL syntax detected"
              };
            }
            return f;
          })
        );
      }
    }, 100);
  };
  
  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };
  
  return (
    <div className="space-y-4">
      <div 
        className={cn(
          "border-2 border-dashed rounded-none p-8 text-center cursor-pointer transition-colors",
          isDragging 
            ? "border-carbon-blue bg-carbon-blue bg-opacity-5" 
            : "border-carbon-gray-30 hover:border-carbon-blue hover:bg-carbon-blue hover:bg-opacity-5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input 
          id="file-input" 
          type="file" 
          className="hidden" 
          onChange={handleFileInput}
          multiple
          accept=".sql,.bteq,.txt,text/plain"
        />
        <Upload size={32} className="mx-auto mb-4 text-carbon-gray-60" />
        <p className="text-carbon-gray-70 mb-1">
          <span className="font-medium">Click to browse</span> or drag and drop
        </p>
        <p className="text-carbon-gray-60 text-sm">
          Upload SQL, BTEQ, or text files (max 10MB per file)
        </p>
      </div>
      
      {files.length > 0 && (
        <div className="border border-carbon-gray-20">
          <div className="px-4 py-3 bg-carbon-gray-10 border-b border-carbon-gray-20 flex justify-between items-center">
            <span className="font-medium">Uploaded Files ({files.length})</span>
            {files.some(f => f.status === "success") && (
              <Button 
                type="button" 
                variant="outline" 
                className="carbon-button-secondary h-8 text-xs"
                onClick={() => {
                  console.log("Processing files:", files.filter(f => f.status === "success"));
                }}
              >
                Process Files
              </Button>
            )}
          </div>
          <ul className="divide-y divide-carbon-gray-20">
            {files.map(file => (
              <li key={file.id} className="flex items-center justify-between p-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-carbon-gray-10 mr-3">
                    <File size={20} className="text-carbon-gray-60" />
                  </div>
                  <div>
                    <p className="text-carbon-gray-90 font-medium text-sm">{file.name}</p>
                    <p className="text-carbon-gray-60 text-xs">
                      {Math.round(file.size / 1024)} KB
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {file.status === "uploading" && (
                    <div className="w-32">
                      <div className="h-1.5 w-full bg-carbon-gray-20">
                        <div 
                          className="h-full bg-carbon-blue" 
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-carbon-gray-60 mt-1 text-right">
                        {file.progress}%
                      </p>
                    </div>
                  )}
                  
                  {file.status === "success" && (
                    <CheckCircle size={18} className="text-carbon-success" />
                  )}
                  
                  {file.status === "error" && (
                    <div className="flex items-center">
                      <AlertTriangle size={18} className="text-carbon-error mr-1" />
                      <span className="text-carbon-error text-xs">{file.error}</span>
                    </div>
                  )}
                  
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-carbon-gray-60 hover:text-carbon-error"
                  >
                    <X size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
