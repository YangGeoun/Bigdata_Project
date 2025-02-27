from sqlalchemy import Column, BigInteger, String, Boolean, Float, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'User'
    id = Column(BigInteger, primary_key=True, nullable=False)
    name = Column(String(100))
    role = Column(String(20))
    email = Column(String(100))
    password = Column(String(100))

class PassOrFail(Base):
    __tablename__ = 'pass_or_fail'
    id = Column(BigInteger, primary_key=True, nullable=False)
    condition_id = Column(BigInteger, ForeignKey('Condition.id'), nullable=False)
    is_pass = Column(Boolean)
    reason = Column(BigInteger)
    time_stamp = Column(DateTime)
    part_name = Column(String(100))

    condition = relationship("Condition", back_populates="pass_or_fail")


class Condition(Base):
    __tablename__ = 'Condition'
    id = Column(BigInteger, primary_key=True, nullable=False)
    time_stamp = Column(DateTime)
    is_passed = Column(Boolean)
    part_name = Column(String(100))
    injection_time = Column(Float)
    filling_time = Column(Float)
    plasticizing = Column(Float)
    cycle_time = Column(Float)
    clamp_close_time = Column(Float)
    cushion_position = Column(Float)
    plasticizing_position = Column(Float)
    clamp_open_position = Column(Float)
    max_injection_speed = Column(Float)
    max_screw_rpm = Column(Float)
    average_screw_rpm = Column(Float)
    max_injection_pressure = Column(Float)
    max_switch_over_pressure = Column(Float)
    max_back_pressure = Column(Float)
    average_back_pressure = Column(Float)
    barrel_temperature_1 = Column(Float)
    barrel_temperature_2 = Column(Float)
    barrel_temperature_3 = Column(Float)
    barrel_temperature_4 = Column(Float)
    barrel_temperature_5 = Column(Float)
    barrel_temperature_6 = Column(Float)
    hopper_temperature = Column(Float)
    mold_temperature_1 = Column(Float)
    mold_temperature_2 = Column(Float)

    pass_or_fail = relationship("PassOrFail", back_populates="condition", uselist=False)  # 1:1 관계