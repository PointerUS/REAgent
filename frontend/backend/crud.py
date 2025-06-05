from sqlalchemy.orm import Session
from . import models, schemas


def create_message(db: Session, message: schemas.Message):
    db_msg = models.ChatMessage(role=message.role, content=message.content)
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg


def create_property(db: Session, prop: schemas.PropertyCreate):
    db_prop = models.Property(**prop.dict())
    db.add(db_prop)
    db.commit()
    db.refresh(db_prop)
    return db_prop


def get_properties(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Property).offset(skip).limit(limit).all()


def get_property(db: Session, property_id: int):
    return db.query(models.Property).filter(models.Property.id == property_id).first()


def delete_property(db: Session, property_id: int):
    prop = get_property(db, property_id)
    if prop:
        db.delete(prop)
        db.commit()
    return prop


def update_property(db: Session, property_id: int, prop: schemas.PropertyCreate):
    db_prop = get_property(db, property_id)
    if not db_prop:
        return None
    for key, value in prop.dict().items():
        setattr(db_prop, key, value)
    db.commit()
    db.refresh(db_prop)
    return db_prop
