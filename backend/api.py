import os
import cv2
import numpy as np
import base64
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from deepface import DeepFace


app = FastAPI()

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VerificationRequest(BaseModel):
    rollNo: str
    image_base64: str

# Create reference directory if it doesn't exist
REFERENCE_DIR = "reference_faces"
os.makedirs(REFERENCE_DIR, exist_ok=True)

@app.post("/api/verify-face/")
async def verify_face(req: VerificationRequest):
    try:
        # Check if reference image exists
        reference_path = os.path.join(REFERENCE_DIR, f"{req.rollNo}.jpg")
        if not os.path.exists(reference_path):
            # For testing purposes, if no reference exists, we just simulate success 
            # so the user isn't totally blocked, but log a warning.
            print(f"Warning: No reference image found for {req.rollNo} at {reference_path}")
            return {"verified": False, "message": f"No reference image found for {req.rollNo}. Please place {req.rollNo}.jpg in backend/reference_faces/"}

        # Decode base64 image to numpy array
        encoded_data = req.image_base64.split(',')[1] if ',' in req.image_base64 else req.image_base64
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        captured_img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if captured_img is None:
            raise HTTPException(status_code=400, detail="Invalid image data")

        # Use DeepFace to verify
        # enforce_detection=True will throw error if no face is found
        result = DeepFace.verify(
            img1_path=captured_img, 
            img2_path=reference_path, 
            enforce_detection=False,
            model_name="VGG-Face" # lightweight 
        )

        is_match = result.get("verified", False)
        
        return {
            "verified": is_match,
            "message": "Face verified successfully." if is_match else "Face verification failed. Faces do not match."
        }

    except Exception as e:
        print(f"Error during verification: {e}")
        return {"verified": False, "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
