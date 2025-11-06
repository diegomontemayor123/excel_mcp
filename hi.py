import asyncio

# Your args
args = {
    "query": "munge",
    "k":1,
    "folder": "C:\\Users\\Diego\Downloads\\Data Room - Ritz Carlton Residences South Beach",

}

# Run the tool
async def test_vectorize():
    from server import call_tool  # replace with actual module if needed
    result = await call_tool("vectorize_embed", args)
    for r in result:
        print(r.text)

# Run the async function
asyncio.run(test_vectorize())
