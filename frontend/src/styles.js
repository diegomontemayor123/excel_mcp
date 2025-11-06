
const s = {
  c: { display:"flex", flexDirection:"column", minHeight:"100vh", width:"100vw", padding:"0 2vw", boxSizing:"border-box", overflowX:"hidden", background:"linear-gradient(to bottom,#f9fafb,#fff)" },
  h: { display: "flex", alignItems: "center", gap: "1vw", padding: "2vh 0" },
  i: { height: "3vh", width: "3vh", color: "#000" },
  t: { fontSize: "clamp(1.2rem,2vw,1.8rem)", fontWeight: "bold", color: "#000" },
  m: { flex: 1, display: "flex", flexDirection: "column", gap: "1vh", width: "100%", overflow: "hidden" },
  chat: { flex: 1, display: "flex", flexDirection: "column", gap: "1vh", overflowY: "auto", padding: "2vh", background: "#fff", borderRadius: "2vw", boxShadow: "0 0.5vh 1vh rgba(0,0,0,0.05)", border: "1px solid #e5e7eb" },
  p: { color: "#9ca3af", textAlign: "center", fontSize: "clamp(0.8rem,1vw,1.2rem)" },
  row: { display: "flex", transition: "all 0.3s" },
  bub: { maxWidth: "75%", padding: "1vh 1vw", borderRadius: "2vw", whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: "clamp(0.9rem,1.5vw,1.1rem)" },
  ub: { backgroundColor: "#000", color: "#fff" },
  ab: { backgroundColor: "#f3f4f6", color: "#1f2937" },
  sheets: { display: "flex", flexWrap: "wrap", gap: "0.5vw", marginTop: "0.5vh" },
  sheet: { padding: "0.5vh 1vw", fontSize: "clamp(0.7rem,1vw,0.9rem)", borderRadius: "9999px", border: "1px solid transparent", background: "#e5e7eb", cursor: "pointer" },
  sel: { background: "#000", color: "#fff", borderColor: "#000" },
  typ: { background: "#f3f4f6", color: "#1f2937", padding: "1vh 1vw", borderRadius: "2vw", maxWidth: "60%" },
  typText: { animation: "pulse 1.5s infinite" },
  inputRow: { display: "flex", flexWrap: "wrap", gap: "1vw", alignItems: "flex-end", marginTop: "1vh" },
  in: { flex: 1, minWidth: "15vw", padding: "1vh 1vw", borderRadius: "2vw", border: "1px solid #d1d5db", outline: "none",resize: "none", overflow: "hidden" },
  send: { display: "flex", alignItems: "center", gap: "0.5vw", padding: "1vh 1vw", borderRadius: "2vw", background: "#000", color: "#fff", cursor: "pointer" },
  loader: { height: "1.5vh", width: "1.5vh", animation: "spin 1s linear infinite" },
  play: { height: "1.5vh", width: "1.5vh" },
  fileLabel: { padding: "1vh 1vw", borderRadius: "2vw", border: "1px solid #d1d5db", cursor: "pointer", background: "#fff", color: "#374151", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  load: { display: "flex", alignItems: "center", gap: "0.5vw", padding: "1vh 1vw", borderRadius: "2vw", background: "#000", color: "#fff", cursor: "pointer" },
  up: { height: "1.5vh", width: "1.5vh" },
  f: { textAlign: "center", fontSize: "clamp(0.7rem,1vw,1rem)", color: "#6b7280", padding: "2vh 0" }
};

export default s