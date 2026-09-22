import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import { analyzeResume } from "./api";

function Home() {
  const fileInputRef = useRef(null);
  const progressTimerRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const startProgress = () => {
    setProgress(5);
    setAnalysisStage("Uploading your resume...");

    let currentProgress = 5;

    progressTimerRef.current = setInterval(() => {
      currentProgress += Math.random() * 4;

      if (currentProgress >= 30) {
        currentProgress = 30;
        setAnalysisStage("Extracting resume content...");
      }

      if (currentProgress >= 55) {
        currentProgress = 55;
        setAnalysisStage("Analyzing your resume with AI...");
      }

      if (currentProgress >= 78) {
        currentProgress = 78;
        setAnalysisStage("Evaluating skills and experience...");
      }

      if (currentProgress >= 90) {
        currentProgress = 90;
        setAnalysisStage("Preparing your analysis...");
      }

      setProgress(Math.min(currentProgress, 90));
    }, 700);
  };

  const stopProgress = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  const handleAnalyze = async () => {
    if (!file || isAnalyzing) return;

    try {
      setError("");
      setIsAnalyzing(true);

      startProgress();

      const result = await analyzeResume(file);

      stopProgress();

      setAnalysisStage("Analysis complete");
      setProgress(100);

      // Give the user a tiny moment to see completion.
      setTimeout(() => {
        navigate("/analysis", {
          state: {
            result,
          },
        });
      }, 450);
    } catch (error) {
      stopProgress();

      setIsAnalyzing(false);
      setProgress(0);
      setAnalysisStage("");

      console.error("Resume analysis failed:", error);

      let message = "Something went wrong while analyzing your resume.";

      if (error.response?.data?.detail) {
        message =
          typeof error.response.data.detail === "string"
            ? error.response.data.detail
            : message;
      } else if (error.message) {
        message = error.message;
      }

      setError(message);
    }
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setError("");

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }

    if (selectedFile.size > maxSize) {
      setError("File size must be 10MB or smaller.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileInput = (event) => {
    const selectedFile = event.target.files[0];
    handleFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (isAnalyzing) return;

    setIsDragging(false);

    const droppedFile = event.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const removeFile = () => {
    if (isAnalyzing) return;

    setFile(null);
    setError("");
    setProgress(0);
    setAnalysisStage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFilePicker = () => {
    if (!file && !isAnalyzing) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="brand">
          <div className="brand-icon">AI</div>
          <span>ResumeAI</span>
        </div>

        <div className="header-status">
          <span className="status-dot"></span>
          AI Resume Analyzer
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <section className="hero">
          <p className="eyebrow">SMART RESUME ANALYSIS</p>

          <h1>
            Turn your resume into
            <span> structured insights.</span>
          </h1>

          <p className="subtitle">
            Upload your resume and let AI extract your information, skills,
            experience, education and more.
          </p>

          {/* Upload Area */}
          <div
            className={`upload-box ${isDragging ? "dragging" : ""} ${
              file ? "has-file" : ""
            } ${isAnalyzing ? "analyzing" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();

              if (!isAnalyzing) {
                setIsDragging(true);
              }
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={openFilePicker}
          >
            {!file ? (
              <>
                <div className="upload-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 16V4" />
                    <path d="m7 9 5-5 5 5" />
                    <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
                  </svg>
                </div>

                <h2>Upload your resume</h2>

                <p>
                  Drag & drop your file here, or
                  <span> browse files</span>
                </p>

                <div className="file-types">
                  <span>PDF</span>
                  <span>DOCX</span>
                  <small>Maximum 10MB</small>
                </div>
              </>
            ) : (
              <div className="selected-file">
                <div className="file-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M8 13h8" />
                    <path d="M8 17h5" />
                  </svg>
                </div>

                <div className="file-info">
                  <strong>{file.name}</strong>

                  <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>

                {!isAnalyzing && (
                  <button
                    className="remove-file"
                    onClick={(event) => {
                      event.stopPropagation();
                      removeFile();
                    }}
                    aria-label="Remove file"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileInput}
            hidden
            disabled={isAnalyzing}
          />

          {/* Error */}
          {error && (
            <div className="error-message">
              <span className="error-icon">!</span>
              <span>{error}</span>
            </div>
          )}

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="analysis-progress">
              <div className="progress-header">
                <div className="progress-status">
                  <span className="loader"></span>
                  <span>{analysisStage}</span>
                </div>

                <span className="progress-percent">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-bar"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="progress-steps">
                <span className={progress >= 30 ? "active" : ""}>Upload</span>

                <span className={progress >= 55 ? "active" : ""}>Extract</span>

                <span className={progress >= 78 ? "active" : ""}>Analyze</span>

                <span className={progress >= 100 ? "active" : ""}>Results</span>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <button
            className={`analyze-button ${!file ? "disabled" : ""} ${
              isAnalyzing ? "loading" : ""
            }`}
            disabled={!file || isAnalyzing}
            onClick={handleAnalyze}
          >
            {isAnalyzing ? (
              <>
                <span className="button-loader"></span>
                Analyzing Resume...
              </>
            ) : (
              <>
                Analyze Resume
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </>
            )}
          </button>

          <p className="privacy-note">
            Your resume is processed securely and used only for analysis.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <span>© 2026 ResumeAI</span>

        <div className="footer-links">
          <span>AI Resume Analyzer</span>
          <span className="footer-separator">•</span>
          <span>PDF & DOCX supported</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
