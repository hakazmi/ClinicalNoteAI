import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { UploadForm } from './components/UploadForm';
import { ResultDisplay } from './components/ResultDisplay';

const API_ENDPOINT = 'https://9e9823ae5b0a.ngrok-free.app';

interface ClinicalNote {
  transcription: string;
  soap_note: string;
  timestamp: string;
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClinicalNote | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please select an audio file');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const endpoint = API_ENDPOINT.endsWith('/') ? `${API_ENDPOINT}upload-audio` : `${API_ENDPOINT}/upload-audio`;
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process audio file');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-6 max-w-4xl mx-auto">
          <UploadForm
            file={file}
            loading={loading}
            error={error}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />

          {result && <ResultDisplay result={result} />}
        </div>
      </main>
    </div>
  );
}

export default App;
