from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schema import ConditionResponse
from typing import Optional

from database import get_db
import  service
# from domain.tourapi import schema

router = APIRouter(
    prefix="/python",
)

@router.get("/test")
async def test(db: Session = Depends(get_db)):
    res = service.test(db)
    return res


@router.get("/user")
async def get_user_data(db: Session = Depends(get_db)):
    res = service.user(db)
    return res

@router.get("/condition", response_model=ConditionResponse)
async def get_condition(date: Optional[str] = None,
                        partName: Optional[str] = None, 
                        db: Session = Depends(get_db)):
    res = service.get_condition(db, date, partName)
    return res


@router.get("/product")
async def get_products(date: str, db: Session = Depends(get_db)):
    res = service.get_products(date, db)
    return res


@router.post("/data")
async def load_data(db: Session = Depends(get_db)):
    res = service.load_data(db)
    return res