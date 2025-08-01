import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../App.css";

// --- SVG Icons (using inline SVG for self-contained code) ---
const PaperAirplaneIcon = (props) => ( <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg> );
const DocumentTextIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );
const BrainIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M12 18a6 6 0 0 0 0-12c-3.314 0-6-2.686-6-6s2.686-6 6-6c2.81 0 5.2 1.93 5.89 4.54a8 8 0 0 1-5.89 11.46z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M12 18a6 6 0 0 1 6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M18 12a6 6 0 0 0 6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M12 12a6 6 0 0 0 6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M12 12a6 6 0 0 1-6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );
const TargetIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><circle cx="12" cy="12" r="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );
const ScaleIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M12 3L2 12h20L12 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M12 12v9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M5 21l7-9 7 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );
const UploadIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );
const SummarizeIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="8" y1="15" x2="16" y2="15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="8" y1="11" x2="16" y2="11" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="8" y1="19" x2="12" y2="19" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );
const ClearIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M15 9l-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M9 9l6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );
const LogoutIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><polyline points="10 17 15 12 10 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="15" y1="12" x2="3" y2="12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );
const MenuIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );
const CloseIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );

function Chat() {
  // State management for file, chat, loading, and structured data
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileId, setFileId] = useState(localStorage.getItem("file_id") || "");
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [structuredQuery, setStructuredQuery] = useState({});
  const [topMatches, setTopMatches] = useState([]);
  const [logicEvaluation, setLogicEvaluation] = useState([]);
  const [fileHistory, setFileHistory] = useState([]);

  // State for PDF URL input and the active URL
  const [pdfUrlInput, setPdfUrlInput] = useState("");
  const [activePdfUrl, setActivePdfUrl] = useState(localStorage.getItem("pdf_url") || "");

  // UI state for the sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // References for DOM elements
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // --- Helper Function for JSON Parsing ---
  const parseJsonResponse = (content) => {
    // Basic check for a string that might be a JSON object
    if (typeof content === 'string' && content.trim().startsWith('{') && content.trim().endsWith('}')) {
      try {
        const parsed = JSON.parse(content);
        // Check for the specific "answer" key
        if (parsed.answer) {
          return { type: 'answer', data: parsed.answer };
        }
        // If no "answer" key, assume it's a raw JSON object to display
        return { type: 'json', data: parsed };
      } catch (e) {
        // If parsing fails, fall through to default text
        console.warn("Could not parse JSON from AI response:", e);
      }
    }
    // Default to plain text
    return { type: 'text', data: content };
  };

  // --- Effect Hooks ---

  // Fetches file history on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.id;

    axios.get(`https://documind-dquf.onrender.com/api/query/files/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setFileHistory(res.data.files))
      .catch((err) => console.error("❌ File history fetch failed:", err));
  }, []);

  // Loads chat history and fileId from localStorage on component mount
  useEffect(() => {
    const savedChat = localStorage.getItem("chat_history");
    const savedFileId = localStorage.getItem("file_id");
    const savedPdfUrl = localStorage.getItem("pdf_url");

    if (savedChat) {
      try {
        setChat(JSON.parse(savedChat));
      } catch {
        localStorage.removeItem("chat_history");
      }
    }
    if (savedFileId) setFileId(savedFileId);
    if (savedPdfUrl) setActivePdfUrl(savedPdfUrl);
  }, []);

  // Scrolls to the bottom of the chat when new messages are added
  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(chat));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Adjusts the height of the textarea automatically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  // --- Event Handlers ---

  // Handles file selection from the file input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileId("");
      setPdfUrlInput("");
      setActivePdfUrl("");
      localStorage.removeItem("file_id");
      localStorage.removeItem("pdf_url");
      setChat([{ type: "bot", content: `📁 File "${selectedFile.name}" has been loaded. I'm ready to answer your questions.` }]);
      setStructuredQuery({});
      setTopMatches([]);
      setLogicEvaluation([]);
    }
  };

  // Handles the submission of a PDF URL
  const handlePdfUrlSubmit = async () => {
    if (!pdfUrlInput.trim()) {
      alert("Please enter a valid PDF URL.");
      return;
    }
    setLoading(true);
    setFile(null);
    setFileName(pdfUrlInput.substring(pdfUrlInput.lastIndexOf('/') + 1) || "URL Document");
    setFileId("");
    setActivePdfUrl(pdfUrlInput);
    localStorage.removeItem("file_id");
    localStorage.setItem("pdf_url", pdfUrlInput);

    setChat([{ type: "bot", content: `🔗 PDF from URL "${pdfUrlInput}" is being processed.` }]);
    setStructuredQuery({});
    setTopMatches([]);
    setLogicEvaluation([]);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("pdfUrl", pdfUrlInput);
      formData.append("userQuery", "Initial document load from URL.");

      const res = await axios.post("https://documind-dquf.onrender.com/api/query/file-query", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { structuredQuery, topMatches, logicEvaluation, fileId: returnedFileId } = res.data;

      if (returnedFileId) {
        setFileId(returnedFileId);
        localStorage.setItem("file_id", returnedFileId);
      }

      setStructuredQuery(structuredQuery || {});
      setTopMatches(topMatches || []);
      setLogicEvaluation(logicEvaluation || []);
      setChat((prev) => [...prev, { type: "bot", content: `🔗 PDF from URL has been processed. I'm ready to answer your questions.` }]);

    } catch (err) {
      console.error("❌ API Error loading PDF from URL:", err?.response?.data || err.message);
      setChat((prev) => [...prev, {
        type: "bot",
        content: "⚠️ An error occurred while processing the PDF from URL. Please check the URL or server."
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Handles API call for user queries
  const handleApiCall = async (userMessage) => {
    if (!file && !fileId && !activePdfUrl) {
      alert("📂 Please upload a file or provide a PDF URL first.");
      return;
    }

    setLoading(true);
    setChat((prev) => [...prev, { type: "user", content: userMessage }]);
    setQuery("");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      if (file) formData.append("file", file);
      else if (fileId) formData.append("fileId", fileId);
      else if (activePdfUrl) formData.append("pdfUrl", activePdfUrl);

      formData.append("userQuery", userMessage);

      const res = await axios.post("https://documind-dquf.onrender.com/api/query/file-query", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { response, structuredQuery, topMatches, logicEvaluation, fileId: returnedFileId, pdfUrl: returnedPdfUrl } = res.data;

      if (returnedFileId) {
        setFileId(returnedFileId);
        localStorage.setItem("file_id", returnedFileId);
      }
      if (returnedPdfUrl) {
          setActivePdfUrl(returnedPdfUrl);
          localStorage.setItem("pdf_url", returnedPdfUrl);
      }

      setChat((prev) => [...prev, { type: "bot", content: response }]);
      setStructuredQuery(structuredQuery || {});
      setTopMatches(topMatches || []);
      setLogicEvaluation(logicEvaluation || []);
    } catch (err) {
      console.error("❌ API Error:", err?.response?.data || err.message);
      setChat((prev) => [...prev, {
        type: "bot",
        content: "⚠️ An error occurred while processing your request. Please check the server or try again."
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Handles the form submission for a new query
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleApiCall(query.trim());
  };

  // Handles the Enter key press in the textarea
  const handleTextareaKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Handles the summarization button click
  const handleSummarize = async () => {
    if (!file && !fileId && !activePdfUrl) {
      alert("📂 Please upload a file or provide a PDF URL first.");
      return;
    }
    setLoading(true);
    setChat((prev) => [...prev, { type: "user", content: "Summarize the document." }]);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://documind-dquf.onrender.com/api/query/summarize", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const summary = res.data.summary;
      setChat((prev) => [...prev, { type: "bot", content: summary }]);
    } catch (err) {
      console.error("❌ Summarization error:", err?.response?.data || err.message);
      setChat((prev) => [...prev, {
        type: "bot",
        content: "⚠️ An error occurred during summarization. Please check the server."
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Clears the current chat session
  const handleClearChat = () => {
    setFile(null);
    setFileName("");
    setFileId("");
    setActivePdfUrl("");
    setChat([]);
    setStructuredQuery({});
    setTopMatches([]);
    setLogicEvaluation([]);
    localStorage.removeItem("file_id");
    localStorage.removeItem("chat_history");
    localStorage.removeItem("pdf_url");
    alert("Chat session cleared!");
  };

  // Logs the user out
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; // Or your login route
  };

  // Loads a file from history
  const loadFileData = (fileObj) => {
    setFile(null);
    setFileName(fileObj.fileName);
    setFileId(fileObj._id);
    setActivePdfUrl(fileObj.pdfUrl || "");
    localStorage.setItem("file_id", fileObj._id);
    localStorage.setItem("pdf_url", fileObj.pdfUrl || "");

    setChat(fileObj.chatHistory || []);
    setStructuredQuery(fileObj.structuredQuery || {});
    setTopMatches(fileObj.topMatches || []);
    setLogicEvaluation(fileObj.logicEvaluation || []);
    localStorage.setItem("chat_history", JSON.stringify(fileObj.chatHistory || []));

    if (window.innerWidth <= 768) {
        setSidebarOpen(false);
    }
  };

  // Component to render individual chat bubbles
  const ChatBubble = ({ entry }) => {
    const avatarChar = entry.type === 'user' ? 'You' : 'AI';
    const parsedResponse = parseJsonResponse(entry.content);
    let contentToRender;

    if (parsedResponse.type === 'answer') {
      contentToRender = parsedResponse.data;
    } else if (parsedResponse.type === 'json') {
      contentToRender = <pre>{JSON.stringify(parsedResponse.data, null, 2)}</pre>;
    } else {
      contentToRender = entry.content;
    }

    return (
      <div className={`chat-bubble-wrapper ${entry.type}`}>
        <div className="chat-bubble-avatar">{avatarChar}</div>
        <div className="chat-bubble">{contentToRender}</div>
      </div>
    );
  };

  // --- JSX for the main component ---
  return (
    <div className="app-container">
      {/* Mobile overlay and toggle button */}
      <div className={`overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}></div>
      <button className="menu-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <CloseIcon style={{ width: '24px', height: '24px' }} /> : <MenuIcon style={{ width: '24px', height: '24px' }} />}
        </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div>
          <header className="sidebar-header">
            <img src="/logo.png" alt="AI-DocuMind Logo" style={{ height: "48px", marginBottom: "8px", borderRadius: "6px", boxShadow: "0 0 8px rgba(0,0,0,0.1)" }} />
            <h2 style={{ fontSize: "1.4rem", margin: 0 }}>AI-DocuMind</h2>
            <p>Smart parsing, logic, and answers — powered by AI.</p>
          </header>

          <div className="sidebar-controls">
            <button className="control-button" onClick={() => fileInputRef.current.click()}>
              <UploadIcon /> {fileName ? 'Change File' : 'Upload File'}
            </button>
            <input type="file" accept=".txt,.pdf,.doc,.docx,.md" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
            
            {/* PDF URL input field and button */}
            <div style={{ marginTop: '10px' }}>
                <input
                    type="text"
                    placeholder="Or enter PDF URL"
                    value={pdfUrlInput}
                    onChange={(e) => setPdfUrlInput(e.target.value)}
                    style={{ width: 'calc(100% - 22px)', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '8px', fontSize: '0.9rem' }}
                />
                <button onClick={handlePdfUrlSubmit} disabled={loading || !pdfUrlInput.trim()} className="control-button">
                    <DocumentTextIcon /> {loading && pdfUrlInput ? "Loading URL..." : "Load PDF from URL"}
                </button>
            </div>

            <button onClick={handleSummarize} disabled={loading || (!file && !fileId && !activePdfUrl)} className="control-button">
              <SummarizeIcon /> {loading ? "Summarizing..." : "Summarize File"}
            </button>
          </div>

          {fileName && <p className="file-info"><strong>Active File:</strong> {fileName}</p>}
          {activePdfUrl && <p className="file-info"><strong>Active PDF URL:</strong> <a href={activePdfUrl} target="_blank" rel="noopener noreferrer">{activePdfUrl}</a></p>}

          <div className="sidebar-panels">
            {fileHistory.length > 0 && (
              <div className="info-panel">
                <h4>🗂 File History</h4>
                <ul>
                  {fileHistory.map((f, idx) => (
                    <li key={f._id} onClick={() => loadFileData(f)} style={{ cursor: 'pointer', color: '#007bff' }}>
                      {idx + 1}. {f.fileName} {f.pdfUrl ? '(URL)' : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {Object.keys(structuredQuery).length > 0 && (
              <div className="info-panel">
                <h4><BrainIcon /> Extracted Clauses</h4>
                <ul>
                  {Object.entries(structuredQuery).map(([key, value], idx) => (
                    <li key={idx}><strong>{key}:</strong> {String(value)}</li>
                  ))}
                </ul>
              </div>
            )}
            {topMatches.length > 0 && (
              <div className="info-panel">
                <h4><TargetIcon /> Similar Clauses</h4>
                <ol>
                  {topMatches.map((m, idx) => (
                    <li key={idx}>{typeof m === "string" ? m : JSON.stringify(m.metadata || m)}</li>
                  ))}
                </ol>
              </div>
            )}
            {logicEvaluation.length > 0 && (
              <div className="info-panel">
                <h4><ScaleIcon /> Rule-Based Evaluation</h4>
                <ul>
                  {logicEvaluation.map((msg, idx) => (
                    <li key={idx} style={{ color: 'var(--error-color)' }}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="logout-section">
          <button onClick={handleClearChat} className="control-button">
            <ClearIcon /> Clear Session
          </button>
          <button onClick={handleLogout} className="control-button logout-btn">
            <LogoutIcon /> Logout
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-area">
        <div className="chat-messages">
          {chat.length === 0 ? (
            <div className="empty-chat">
              <DocumentTextIcon className="empty-chat-icon" />
              <h3>Welcome to AI-DocuMind</h3>
              <p>Upload a document or provide a PDF URL using the sidebar to begin intelligent analysis.</p>
            </div>
          ) : (
            chat.map((entry, idx) => <ChatBubble key={idx} entry={entry} />)
          )}
          {loading && (
            <div className="chat-bubble-wrapper bot">
              <div className="chat-bubble-avatar">AI</div>
              <div className="chat-bubble loading-bubble"><span /><span /><span /></div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            rows="1"
            placeholder={file || fileId || activePdfUrl ? "Ask about your file..." : "Please upload a file or provide a PDF URL to begin"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleTextareaKeyPress}
            disabled={(!file && !fileId && !activePdfUrl) || loading}
          />
          <button type="submit" disabled={(!file && !fileId && !activePdfUrl) || loading || !query.trim()}>
            <PaperAirplaneIcon />
          </button>
        </form>
      </main>
    </div>
  );
}

export default Chat;