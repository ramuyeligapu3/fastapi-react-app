from fastapi import FastAPI
from backend.app.utils.util import *
app = FastAPI()

# Serve static files (Vite build)
app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")


from backend.app.routes.users import user

app.include_router(user,prefix="/auth", tags=["Auth"])


