import { FileAudio, Upload, Loader2, AlertCircle } from 'lucide-react';

interface UploadFormProps {
  file: File | null;
  loading: boolean;
  error: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export function UploadForm({
  file,
  loading,
  error,
  onFileChange,
  onSubmit,
  onReset,
}: UploadFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Generate Clinical Note</h2>
      <p className="text-slate-600 mb-8">
        Upload an audio recording to automatically generate a clinical note
      </p>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="audio-file" className="block text-sm font-semibold text-slate-700 mb-3">
            Audio File
          </label>
          <div className="relative">
            <input
              id="audio-file"
              type="file"
              accept="audio/*"
              onChange={onFileChange}
              className="hidden"
              disabled={loading}
            />
            <label
              htmlFor="audio-file"
              className={`flex items-center justify-center w-full px-6 py-12 border-3 border-dashed rounded-xl cursor-pointer transition-all ${
                loading
                  ? 'border-slate-200 bg-slate-50 cursor-not-allowed'
                  : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <div className="text-center">
                {file ? (
                  <>
                    <FileAudio className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-700">{file.name}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-700">Click to upload audio file</p>
                    <p className="text-xs text-slate-500 mt-1">MP3, WAV, M4A supported</p>
                  </>
                )}
              </div>
            </label>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading || !file}
            className="flex-1 bg-slate-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Generate Note'
            )}
          </button>
          {(file || error) && (
            <button
              type="button"
              onClick={onReset}
              disabled={loading}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
