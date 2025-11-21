import { CheckCircle2, Copy, Download } from 'lucide-react';

interface ClinicalNote {
  transcription: string;
  soap_note: string;
  timestamp: string;
}

interface ResultDisplayProps {
  result: ClinicalNote | null;
}

function parseSOAPNote(note: string): {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
} {
  const sections = {
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
  };

  // Check for full word format: SUBJECTIVE:, OBJECTIVE:, etc.
  if (note.match(/SUBJECTIVE:/i)) {
    const subjMatch = note.match(/SUBJECTIVE:\s*([\s\S]*?)(?=OBJECTIVE:|$)/i);
    const objMatch = note.match(/OBJECTIVE:\s*([\s\S]*?)(?=ASSESSMENT:|$)/i);
    const assMatch = note.match(/ASSESSMENT:\s*([\s\S]*?)(?=PLAN:|$)/i);
    const planMatch = note.match(/PLAN:\s*([\s\S]*?)$/i);

    if (subjMatch) sections.subjective = subjMatch[1].trim();
    if (objMatch) sections.objective = objMatch[1].trim();
    if (assMatch) sections.assessment = assMatch[1].trim();
    if (planMatch) sections.plan = planMatch[1].trim();
  }
  // Check for short format: S:, O:, A:, P:
  else if (note.match(/^\s*S:/i)) {
    const subjMatch = note.match(/S:\s*([\s\S]*?)(?=\nO:|O:|$)/i);
    const objMatch = note.match(/O:\s*([\s\S]*?)(?=\nA:|A:|$)/i);
    const assMatch = note.match(/A:\s*([\s\S]*?)(?=\nP:|P:|$)/i);
    const planMatch = note.match(/P:\s*([\s\S]*?)$/i);

    if (subjMatch) sections.subjective = subjMatch[1].trim();
    if (objMatch) sections.objective = objMatch[1].trim();
    if (assMatch) sections.assessment = assMatch[1].trim();
    if (planMatch) sections.plan = planMatch[1].trim();
  }
  // Fallback: treat entire note as subjective
  else {
    sections.subjective = note;
  }

  return sections;
}

// Helper to format section content with proper line breaks
function formatSectionContent(content: string): string {
  return content
    .replace(/\s+-\s+/g, '\n• ')
    .replace(/^\s*•\s*/, '• ')
    .trim();
}

// Parse content and render with bold headings
function renderFormattedContent(content: string) {
  const formattedContent = formatSectionContent(content);
  
  // Split by lines and process each
  const lines = formattedContent.split('\n');
  
  return lines.map((line, idx) => {
    // Match patterns like "• Chief Complaint:" or "Chief Complaint:" or "1. Diagnosis:"
    const match = line.match(/^(•\s*|\d+\.\s*)?([A-Za-z\s\/]+:)(.*)$/);
    
    if (match) {
      const [, bullet = '', heading, rest] = match;
      return (
        <span key={idx}>
          {bullet}<strong className="font-semibold text-slate-900">{heading}</strong>{rest}
          {idx < lines.length - 1 && '\n'}
        </span>
      );
    }
    
    return (
      <span key={idx}>
        {line}
        {idx < lines.length - 1 && '\n'}
      </span>
    );
  });
}

function SOAPSection({ title, content, icon }: { title: string; content: string; icon: string }) {
  const bgColors: { [key: string]: string } = {
    'S': 'bg-blue-50 border-blue-200',
    'O': 'bg-green-50 border-green-200',
    'A': 'bg-amber-50 border-amber-200',
    'P': 'bg-purple-50 border-purple-200',
  };

  const labelColors: { [key: string]: string } = {
    'S': 'text-blue-700 bg-blue-100',
    'O': 'text-green-700 bg-green-100',
    'A': 'text-amber-700 bg-amber-100',
    'P': 'text-purple-700 bg-purple-100',
  };

  if (!content) return null;

  return (
    <div className={`rounded-lg p-6 border-2 ${bgColors[icon]}`}>
      <div className="flex items-start gap-3 mb-3">
        <span className={`inline-block w-8 h-8 rounded-full ${labelColors[icon]} font-bold text-sm flex items-center justify-center flex-shrink-0`}>
          {icon}
        </span>
        <h4 className="font-semibold text-slate-900 text-lg">{title}</h4>
      </div>
      <div className="text-slate-800 leading-relaxed whitespace-pre-wrap text-sm ml-11">
        {renderFormattedContent(content)}
      </div>
    </div>
  );
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  if (!result) return null;

  const soapSections = parseSOAPNote(result.soap_note);

  const handleCopy = () => {
    const text = `TRANSCRIPTION:\n${result.transcription}\n\nSOAP NOTE:\n${result.soap_note}`;
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    const text = `CLINICAL NOTE - SOAP FORMAT\nGenerated: ${new Date(result.timestamp).toLocaleString()}\n\n${'='.repeat(60)}\n\nTRANSCRIPTION:\n${result.transcription}\n\n${'='.repeat(60)}\n\nSOAP NOTE:\n${result.soap_note}`;
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', `clinical-note-${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-3 mb-8">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
          <h2 className="text-2xl font-bold text-slate-900">Clinical Note Generated</h2>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
              Transcription
            </h3>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <p className="text-slate-800 leading-relaxed whitespace-pre-wrap text-sm">
                {result.transcription}
              </p>
            </div>
          </div>

          <div className="border-t-2 border-slate-100 pt-8">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
              Clinical Note
            </h3>
            <div className="space-y-4">
              <SOAPSection
                title="Subjective - Patient History"
                content={soapSections.subjective}
                icon="S"
              />
              <SOAPSection
                title="Objective - Clinical Findings"
                content={soapSections.objective}
                icon="O"
              />
              <SOAPSection
                title="Assessment - Diagnosis & Analysis"
                content={soapSections.assessment}
                icon="A"
              />
              <SOAPSection
                title="Plan - Treatment & Management"
                content={soapSections.plan}
                icon="P"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Generated: {new Date(result.timestamp).toLocaleString()}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}