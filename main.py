from fastapi import FastAPI, Request,UploadFile,HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import base64
import uuid  # For generating unique file names

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class ImageData(BaseModel):
    image: str

@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="index.html",)

@app.get("/location/{lati}/{long}")
async def read_item(request: Request, lati: str,long:str):
    print(lati,long)
    return {"success":"200"}


@app.post("/upload_images")
async def upload_images(image_data: ImageData):
    try:
        # Decode the image
        image_data_bytes = base64.b64decode(image_data.image.split(",")[1])
        filename = f"uploaded_image_{uuid.uuid4()}.png"

        # Save the image to a local file
        with open(filename, "wb") as file:
            file.write(image_data_bytes)

        return {"status": "success", "filename": filename}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")