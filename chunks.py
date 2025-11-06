import os
import streamlit as st
from langchain_community.vectorstores import FAISS;from langchain_community.embeddings import HuggingFaceEmbeddings ;from langchain_text_splitters import RecursiveCharacterTextSplitter as Rec

# ---------- CONFIG ----------
VECTOR_PATH = "C:\\Users\\Diego\\Downloads\\Data Room - Ritz Carlton Residences South Beach\\.faiss"  
EMBEDDINGS_MODEL = "BAAI/bge-small-en-v1.5"  # must match the one used when creating FAISS
DEVICE = "cuda"

embeddings = HuggingFaceEmbeddings(
    model_name=EMBEDDINGS_MODEL,
    model_kwargs={"device": DEVICE},
    encode_kwargs={"normalize_embeddings": True, "batch_size": 16}
)
if not os.path.exists(VECTOR_PATH):
    st.error(f"Vector store not found at {VECTOR_PATH}")
    st.stop()

vector = FAISS.load_local(VECTOR_PATH, embeddings, allow_dangerous_deserialization=True)
chunks = []
for doc in vector.docstore._dict.values():
    meta = doc.metadata or {}
    chunks.append({
        "file": meta.get("file"),
        "rows": meta.get("rows"),  
        "pg": meta.get("pg"),
        "chunk_type": meta.get("chunk_type"),
        "text": doc.page_content,
    })

st.title("📊 Saved Chunks Viewer")

# --- Filters ---
file_types = sorted(set(os.path.splitext(c["file"] or "")[1].lower() for c in chunks if c["file"]))
selected_type = st.selectbox("Filter by file type", ["All"] + file_types)

search_query = st.text_input("Search (filename, sheet, or text)", "").strip().lower()

filtered_chunks = chunks
if selected_type != "All":
    filtered_chunks = [c for c in filtered_chunks if os.path.splitext(c["file"] or "")[1].lower() == selected_type]

if search_query:
    filtered_chunks = [
        c for c in filtered_chunks
        if search_query in (c.get("file") or "").lower()
        or search_query in (c.get("sheet") or "").lower()
        or search_query in (c.get("text") or "").lower()
    ]

st.write(f"Showing **{len(filtered_chunks)}** chunks")

# --- Display chunks ---
for i, chunk in enumerate(filtered_chunks):
    file_name = chunk.get("file", "Unknown")
    sheet = chunk.get("sheet")
    rows = chunk.get("rows")
    chunk_type = chunk.get("chunk_type") or "unknown"
    pg = chunk.get("pg")
    idx = chunk.get("rows")

    # Smart header display
    if sheet and rows:
        header = f"📘 {file_name} — {sheet} (Rows {rows})"
    elif sheet:
        header = f"📘 {file_name} — {sheet}"
    elif pg:
        header = f"📄 {file_name} — pg {pg}"
    else:
        header = f"{file_name} — {chunk_type.capitalize()} {idx or ''}"

    with st.expander(header):
        st.text(chunk["text"][:5000])  # show first 2000 chars
        st.json({k: v for k, v in chunk.items() if k != "text"})
