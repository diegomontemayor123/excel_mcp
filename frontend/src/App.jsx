import { useState, useRef, useEffect } from "react";
import { Upload, Brain, Play, Loader2 } from "lucide-react";
import s from "./styles";

export default function App() {
  const [files, setFiles]=useState([]), [session,setSession]=useState(null), [prompt,setPrompt]=useState(""), [chatLog,setChatLog] = useState([]),[apply,setApply]=useState(false), [status,setStatus]=useState(""); const chatEndRef=useRef(null);
  const pushChat = (msg, sender = "system", extra = {}) => setChatLog(prev => [...prev, { id: Date.now(), message: msg, sender, ...extra }]);
  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [chatLog]);
  
  const api = async (url,data,method="POST", isForm = false)=>{const res = await fetch(url,{method,headers:isForm?undefined:{"Content-Type":"application/json"},body:isForm?data:JSON.stringify(data) });
  if (!res.ok) throw new Error(await res.text()); return res.json()}
  const onUpload = async () => {if (!files.length) return
  pushChat(`Uploading: ${files.map(f => f.name).join(", ")}`, "user")
  
  try {const form = new FormData(); files.forEach(f => form.append("files", f))
    const info = await api("http://127.0.0.1:8000/api/upload", form, "POST", true)
    setSession({ ...info });
    pushChat(`Uploaded: ${info.files.join(", ")}. PDFs: ${info.pdfs?.join(", ") || "none"} Office files: ${info.office_files?.join(", ") || "none"}`,"ai")}
    catch (e) {pushChat(`Error: ${e.message}`,"ai"); alert(e.message)}}
  const applyPromptLive = async () => {pushChat(prompt,"user")
  setPrompt(""); setApply(true);setStatus("Thinking...")
  try { const res=await fetch("http://127.0.0.1:8000/api/apply",{method:"POST",headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ prompt: prompt.trim()})})
    if (!res.ok) throw new Error(await res.text()); const data = await res.json()
    if (data.raw_prompt) pushChat(data.raw_prompt, "ai");
    if (data.error) pushChat(`Error: ${data.error}`, "ai");
    if (data.applied_cells) {data.applied_cells.forEach(c => {const note = c.notes ? ` (Note: ${c.notes})` : ""
    pushChat(<div>Updated {c.sheet}!{c.start_cell}{note} <table style={{borderCollapse:"collapse",marginTop:6}}>
      <tbody>{c.data.map((r,i)=><tr key={i}>{r.map((c,j)=>
      <td key={j} style={{border:"1px solid #ccc",padding:"4px 8px"}}>{c}</td>)}</tr>)}</tbody></table></div>, "ai")})}
    if (data.updated_files?.length) {data.updated_files.forEach(file => {
    pushChat(<a key={file} href={`http://127.0.0.1:8000/api/download/${encodeURIComponent(file)}`} target="_blank" rel="noopener noreferrer">{file}</a>,"ai")})
    setSession(prev => ({ ...prev, updated_files: data.updated_files }))}} 
  catch (e) {pushChat(`Error: ${e.message}`,"ai"); alert(e.message);} finally {setApply(false);setStatus("");}}

return (
<div style={s.c}><header style={s.h}><Brain style={s.i} /><h1 style={s.t}>DML Inc.</h1></header><main style={s.m}><div style={s.chat}>
  {!chatLog.length && <p style={s.p}>Upload a file to interact with...</p>}
  {chatLog.map(c =>(<div key={c.id} style={{...s.row,justifyContent:c.sender==="user"?"flex-end":"flex-start"}}>
<div style={{...s.bub,...(c.sender==="user"?s.ub:s.ab) }}>{c.message}
</div></div>))}

{status && <div style={s.row}><div style={s.typ}><span style={s.typText}>{status}</span></div></div>}
<div ref={chatEndRef} /></div><div style={s.inputRow}>
<textarea style={s.in} placeholder="Ask AI to update your workbook..." value={prompt} 
  onChange={e => { setPrompt(e.target.value); e.target.style.height="1px"; e.target.style.height=`${e.target.scrollHeight}px`; }} 
  onKeyDown={e => e.key === "Enter" && applyPromptLive()} disabled={!session || apply}/>
<button onClick={applyPromptLive} disabled={!prompt.trim() || !session || apply} style={s.send}>
  {apply && <Loader2 style={s.loader} />}<Play style={s.play} />Send</button>

<label style={s.fileLabel}>
  <input type="file" accept=".xlsx,.xlsm,.pdf,.ppt,.pptx,.doc,.docx" multiple webkitdirectory="true" directory="true"    
    onChange={e => {const files = e.target.files ? [...e.target.files] : [];
      setFiles(files)}} style={{ display: "none" }} />
  {files.length ? files.map(f => f.name).join(", ") : "Choose files/folder"}
</label>

<button onClick={onUpload} disabled={!files.length} style={s.load}><Upload style={s.up}/>Upload</button>
</div></main><footer style={s.f}>Beta Version</footer></div>)}
