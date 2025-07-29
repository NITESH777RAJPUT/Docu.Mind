// ... (keep your existing imports)
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../App.css";


// --- SVG Icons (No changes here, but adding one new icon for the menu) ---
const PaperAirplaneIcon = (props) => ( <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg> );
const DocumentTextIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><polyline points="10 9 9 9 8 9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );
const UploadIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );
const SummarizeIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M12 20h9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 20h2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 4h9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 4h2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12h9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12h2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 20V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 20V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );
const ClearIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><polyline points="3 6 5 6 21 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="10" y1="11" x2="10" y2="17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="14" y1="11" x2="14" y2="17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> );
const LogoutIcon = (props) => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg> );
const BrainIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-3 10v-6m-3 3h6m-3-10a9 9 0 11-9 9 4.5 4.5 0 011.58-3.417L7.5 12.5m6-1.5L15.083 9.583A4.5 4.5 0 0116.5 12H18a9 9 0 10-9-9z" /></svg>);
const TargetIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
const ScaleIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5 0 006.001 0M6 7l3-1M6 7l-3 9M9 6l-3-1m0 0l3 9a5.002 5 0 006.001 0M9 6l3 9m-3-9l-3 1m6-10v2m-3 0v2m6-2v2m-3 0v2m6 3.5c0 2.485-2.015 4.5-4.5 4.5S7.5 14.985 7.5 12.5 9.515 8 12 8s4.5 2.015 4.5 4.5z" /></svg>);
// NEW: Icon for the mobile menu
const MenuIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>);


function Chat() {
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
  
  // NEW: State to manage sidebar visibility on mobile
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // ... (keep all your useEffect and other functions as they are)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.id;

    axios.get(`http://localhost:5000/api/query/files/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setFileHistory(res.data.files))
      .catch((err) => console.error("❌ File history fetch failed:", err));
  }, []);

  useEffect(() => {
    const savedChat = localStorage.getItem("chat_history");
    const savedFileId = localStorage.getItem("file_id");
    if (savedChat) {
      try {
        setChat(JSON.parse(savedChat));
      } catch {
        localStorage.removeItem("chat_history");
      }
    }
    if (savedFileId) setFileId(savedFileId);
  }, []);

  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(chat));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileId("");
      localStorage.removeItem("file_id");
      setChat([{ type: "bot", content: `📁 File "${selectedFile.name}" has been loaded. I'm ready to answer your questions.` }]);
      setStructuredQuery({});
      setTopMatches([]);
      setLogicEvaluation([]);
    }
  };

  const handleApiCall = async (userMessage) => {
    if (!file && !fileId) {
      alert("📂 Please upload a file first.");
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
      formData.append("userQuery", userMessage);

      const res = await axios.post("http://localhost:5000/api/query/file-query", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { response, structuredQuery, topMatches, logicEvaluation, fileId: returnedFileId } = res.data;

      if (returnedFileId) {
        setFileId(returnedFileId);
        localStorage.setItem("file_id", returnedFileId);
      }

      const botReply = response || "⚠️ I couldn't find a specific answer in the document.";
      setChat((prev) => [...prev, { type: "bot", content: botReply }]);
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) handleApiCall(query);
  };
  
  const handleTextareaKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleSummarize = () => {
    handleApiCall("Summarize this document in detail, providing key points, main sections, and any important conclusions or data.");
  };
  
  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat and remove the file?")) {
      setChat([]);
      setFile(null);
      setFileName("");
      setFileId("");
      setStructuredQuery({});
      setTopMatches([]);
      setLogicEvaluation([]);
      localStorage.removeItem("chat_history");
      localStorage.removeItem("file_id");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  // UPDATED: This function now closes the sidebar on mobile after loading a file
  const loadFileData = (fileObj) => {
    setFile(null);
    setFileName(fileObj.fileName);
    setFileId(fileObj._id);
    localStorage.setItem("file_id", fileObj._id);
    setChat(fileObj.chatHistory || []);
    setStructuredQuery(fileObj.structuredQuery || {});
    setTopMatches(fileObj.topMatches || []);
    setLogicEvaluation(fileObj.logicEvaluation || []);
    localStorage.setItem("chat_history", JSON.stringify(fileObj.chatHistory || []));
    
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
        setSidebarOpen(false);
    }
  };

  const ChatBubble = ({ entry }) => {
    const avatarChar = entry.type === 'user' ? 'You' : 'AI';
    return (
      <div className={`chat-bubble-wrapper ${entry.type}`}>
        <div className="chat-bubble-avatar">{avatarChar}</div>
        <div className="chat-bubble">{entry.content}</div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* NEW: Overlay for mobile view */}
      <div 
        className={`overlay ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* UPDATED: Sidebar with conditional class */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div>
          <header className="sidebar-header">
            <img
              src="/logo.png"
              alt="AI-DocuMind Logo"
              style={{
                height: "48px",
                marginBottom: "8px",
                borderRadius: "6px",
                boxShadow: "0 0 8px rgba(0,0,0,0.1)"
              }}
            />
            <h2 style={{ fontSize: "1.4rem", margin: 0 }}>AI-DocuMind</h2>
            <p>Smart parsing, logic, and answers — powered by AI.</p>
          </header>

          <div className="sidebar-controls">
            <button className="control-button" onClick={() => fileInputRef.current.click()}>
              <UploadIcon /> {fileName ? 'Change File' : 'Upload File'}
            </button>
            <input
              type="file"
              accept=".txt,.pdf,.doc,.docx,.md"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button onClick={handleSummarize} disabled={loading || (!file && !fileId)} className="control-button">
              <SummarizeIcon /> {loading ? "Summarizing..." : "Summarize File"}
            </button>
          </div>

          {fileName && <p className="file-info"><strong>Active File:</strong> {fileName}</p>}

          <div className="sidebar-panels">
            {fileHistory.length > 0 && (
              <div className="info-panel">
                <h4>🗂 File History</h4>
                <ul>
                  {fileHistory.map((f, idx) => (
                    <li key={f._id} onClick={() => loadFileData(f)} style={{ cursor: 'pointer', color: '#007bff' }}>
                      {idx + 1}. {f.fileName}
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

      {/* Chat Area */}
      <main className="chat-area">
        {/* NEW: Hamburger menu button for mobile */}
        <button className="menu-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <MenuIcon style={{ width: '24px', height: '24px' }} />
        </button>

        <div className="chat-messages">
          {chat.length === 0 ? (
            <div className="empty-chat">
              <DocumentTextIcon className="empty-chat-icon" />
              <h3>Welcome to AI-DocuMind</h3>
              <p>Upload a document using the sidebar to begin intelligent analysis.</p>
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
            placeholder={file || fileId ? "Ask about your file..." : "Please upload a file to begin"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleTextareaKeyPress}
            disabled={(!file && !fileId) || loading}
          />
          <button type="submit" disabled={(!file && !fileId) || loading || !query.trim()}>
            <PaperAirplaneIcon />
          </button>
        </form>
      </main>
    </div>
  );
}

export default Chat;