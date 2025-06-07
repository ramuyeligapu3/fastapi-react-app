from backend.app import app
from backend.app.utils.util import *



@app.get("/api/hello")
async def say_hello():
    return {"message": "Hello from FastAPI + Vite!"}

# Catch-all route for React Router
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    file_path = f"frontend/dist/{full_path}"
    if os.path.exists(file_path) and not os.path.isdir(file_path):
        return FileResponse(file_path)
    return FileResponse("frontend/dist/index.html")


