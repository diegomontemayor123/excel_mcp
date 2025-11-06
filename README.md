# Excel-MCP

Excel-MCP is an intelligent Excel data extraction and querying system powered by the **Machine Context Protocol (MCP)**, **HuggingFace**, **LangChain**, **FAISS**, and **Optical Character Recognition (OCR)**. The server utilizes cutting-edge techniques in retrieval-augmented generation (RAG) to automate and optimize the extraction and querying of structured data from diverse file formats such as Excel, PDF, PowerPoint, and Word.

## Features

* **OCR-powered Document Parsing**: Use OCR (via `pytesseract` and `pdfplumber`) to extract text from scanned PDFs, enabling the ability to work with both structured and unstructured data.
* **Excel Data Parsing**: Efficiently extracts and processes data from Excel spreadsheets, supporting formulas and data-driven analysis.
* **Vector Store Integration**: Integrates with FAISS vector databases for fast semantic search and context-aware retrieval.
* **Contextual Querying**: Support for querying across multiple document types with context-sensitive text chunking.
* **Batch Processing**: Optimized for parallelized document processing, reducing the overhead of data extraction and feature generation.

## Tech Stack

* **MCP**: Machine Context Protocol for connecting various tools in the system.
* **FAISS**: Facebook AI Similarity Search for vector-based querying.
* **HuggingFace**: Pretrained embedding models for generating vector representations of text.
* **LangChain**: Framework for handling RAG pipelines and embeddings.
* **OCR**: Utilizes **Tesseract** and **pdfplumber** to extract text from image-based PDFs.
* **OpenPyXL**: For working with Excel files (both `.xls` and `.xlsx`).
* **Camelot**: Used for parsing tables from PDFs.

## Installation

To run the server, you'll need Python 3.7+ and the necessary dependencies:

1. Clone the repository:

   ```bash
   git clone https://github.com/diegomontemayor123/excel_mcp.git
   cd excel_mcp
   ```

2. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Starting the Server

To start the server, simply run the following command:

```bash
python excel_mcp_server.py
```

The server will listen for incoming requests and expose various tools for interacting with Excel data, querying, and applying updates.

### Tools Available

1. **query_docs**: Extract detailed text and table content from Excel, Word, PDF, or PowerPoint files. Pass multiple file paths in a single request for batch processing.

2. **apply_excel_updates**: Apply structured Excel updates based on JSON-formatted proposals. Ideal for modifying spreadsheet data in bulk.

3. **vectorize_embed**: Vectorize the contents of a folder or query an existing vector store. If no vector store is found, it will process the files and create a new one.

### Example API Call for Extracting Excel Data

You can call the `query_docs` tool to extract content from an Excel file like this:

```python
{
  "tool": "query_docs",
  "args": {
    "paths": ["path/to/excel_file.xlsx"],
    "incl_formulas": false
  }
}
```

### Example API Call for Applying Excel Updates

To apply updates to an Excel file:

```python
{
  "tool": "apply_excel_updates",
  "args": {
    "path": "path/to/excel_file.xlsx",
    "proposal": "{\"Sheet\": \"Sheet1\", \"StartCell\": \"A1\", \"Data\": [[\"value1\", \"value2\"], [\"value3\", \"value4\"]]}"
  }
}
```

### Example API Call for Vectorizing Files

To vectorize files in a folder:

```python
{
  "tool": "vectorize_embed",
  "args": {
    "folder": "path/to/folder",
    "query": "search query",
    "k": 5
  }
}
```

## Code Overview

The main functionality of this repository is implemented through multiple Python functions. Here's a quick breakdown of the important components:

* **Document Parsing** (`parse_file`, `force_ocr`, `excel_str`): Functions to parse Excel, PDF, PowerPoint, and Word documents into structured text or tables.
* **Text Chunking** (`_chunk_rows`, `_merge_consecutive`): Logic to divide large text bodies into manageable chunks for easier processing and querying.
* **OCR** (`force_ocr`): OCR processing for scanned documents, using `pytesseract` to extract text.
* **FAISS Integration** (`vectorize_embed`): The FAISS vector store is used for storing document embeddings and enabling fast, semantic search.
* **Tools and API Calls** (`list_tools`, `call_tool`): The system exposes tools for querying and modifying documents and performing vector-based searches.

## License

This repository does not contain an explicit license. All rights reserved to the author.

## Contributing

Feel free to fork this repository and create pull requests for any improvements or bug fixes. Please follow the existing code style and write tests for new functionality. If you encounter any issues, please open an issue in the repository.

## Acknowledgments

* **Tesseract** for OCR.
* **FAISS** for fast, efficient vector-based search.
* **LangChain** for modular RAG pipeline management.
* **HuggingFace** for state-of-the-art embedding models.

---
This repository is provided "as-is" without any warranty or support. All rights reserved to the author. You may not use, copy, modify, or distribute any part of this repository without explicit permission from the author.
