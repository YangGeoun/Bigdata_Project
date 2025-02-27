from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# 단일 데이터 항목의 스키마
class ConditionData(BaseModel):
    id: int
    time_stamp: datetime
    part_name: Optional[str]
    is_passed: Optional[bool]
    injection_time: Optional[float]
    filling_time: Optional[float]
    plasticizing: Optional[float]
    cycle_time: Optional[float]
    clamp_close_time: Optional[float]
    cushion_position: Optional[float]
    plasticizing_position: Optional[float]
    clamp_open_position: Optional[float]
    max_injection_speed: Optional[float]
    max_screw_rpm: Optional[float]
    average_screw_rpm: Optional[float]
    max_injection_pressure: Optional[float]
    max_switch_over_pressure: Optional[float]
    max_back_pressure: Optional[float]
    average_back_pressure: Optional[float]
    barrel_temperature_1: Optional[float]
    barrel_temperature_2: Optional[float]
    barrel_temperature_3: Optional[float]
    barrel_temperature_4: Optional[float]
    barrel_temperature_5: Optional[float]
    barrel_temperature_6: Optional[float]
    hopper_temperature: Optional[float]
    mold_temperature_1: Optional[float]
    mold_temperature_2: Optional[float]

# 전체 응답 스키마
class ConditionResponse(BaseModel):
    total_count: int  # 총 데이터 개수
    date_range: str   # 날짜 정보
    data: List[ConditionData]  # 실제 데이터 리스트
