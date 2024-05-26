from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def hello():
    return {"message": "I'm Fast"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
