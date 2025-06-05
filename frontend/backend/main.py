from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from . import schemas, crud, models
from .chat import chat

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Real Estate Chatbot")


@app.get("/")
def read_root():
    return {"message": "Real Estate Chatbot API"}


@app.post("/chat", response_model=schemas.ChatResponse)
def chat_endpoint(request: schemas.ChatRequest, db: Session = Depends(get_db)):
    for m in request.messages:
        crud.create_message(db, m)
    response = chat(request.messages)
    crud.create_message(db, schemas.Message(role="assistant", content=response))
    return schemas.ChatResponse(response=response)


@app.post("/properties", response_model=schemas.Property)
def create_property(prop: schemas.PropertyCreate, db: Session = Depends(get_db)):
    return crud.create_property(db, prop)


@app.get("/properties", response_model=list[schemas.Property])
def list_properties(db: Session = Depends(get_db)):
    return crud.get_properties(db)


@app.get("/properties/{property_id}", response_model=schemas.Property)
def get_property(property_id: int, db: Session = Depends(get_db)):
    db_prop = crud.get_property(db, property_id)
    if not db_prop:
        raise HTTPException(status_code=404, detail="Property not found")
    return db_prop


@app.put("/properties/{property_id}", response_model=schemas.Property)
def update_property(property_id: int, prop: schemas.PropertyCreate, db: Session = Depends(get_db)):
    db_prop = crud.update_property(db, property_id, prop)
    if not db_prop:
        raise HTTPException(status_code=404, detail="Property not found")
    return db_prop


@app.delete("/properties/{property_id}")
def delete_property(property_id: int, db: Session = Depends(get_db)):
    prop = crud.delete_property(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"detail": "Property deleted"}
