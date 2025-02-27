# from models import SpotInfo, SpotDetail, SpotDescription
from sqlalchemy.orm import Session, joinedload
from models import User, PassOrFail, Condition
from sqlalchemy import func
import pandas as pd
from datetime import datetime, timedelta

def test(db: Session):
    print("test")
    return "test"

def user(db: Session):
    user = db.query(User)\
        .order_by(User.id.desc())\
        .all()
    return user

def load_data(db: Session):
    data = pd.read_csv("./data/labeled_data.csv")
    data = data.where(pd.notnull(data), None)
    for _, row in data.iterrows():
        condition = Condition(
            time_stamp=datetime.strptime(row['TimeStamp'], "%Y-%m-%d %H:%M:%S"),
            part_name=row['PART_NAME'],
            is_passed=bool(True if row['PassOrFail'] == "Y" else False),
            injection_time=float(row['Injection_Time']),
            filling_time=float(row['Filling_Time']),
            plasticizing=float(row['Plasticizing_Time']),
            cycle_time=float(row['Cycle_Time']),
            clamp_close_time=float(row['Clamp_Close_Time']),
            cushion_position=float(row['Cushion_Position']),
            plasticizing_position=float(row['Plasticizing_Position']),
            clamp_open_position=float(row['Clamp_Open_Position']),
            max_injection_speed=float(row['Max_Injection_Speed']),
            max_screw_rpm=float(row['Max_Screw_RPM']),
            average_screw_rpm=float(row['Average_Screw_RPM']),
            max_injection_pressure=float(row['Max_Injection_Pressure']),
            max_switch_over_pressure=float(row['Max_Switch_Over_Pressure']),
            max_back_pressure=float(row['Max_Back_Pressure']),
            average_back_pressure=float(row['Average_Back_Pressure']),
            barrel_temperature_1=float(row['Barrel_Temperature_1']),
            barrel_temperature_2=float(row['Barrel_Temperature_2']),
            barrel_temperature_3=float(row['Barrel_Temperature_3']),
            barrel_temperature_4=float(row['Barrel_Temperature_4']),
            barrel_temperature_5=float(row['Barrel_Temperature_5']),
            barrel_temperature_6=float(row['Barrel_Temperature_6']),
            hopper_temperature=float(row['Hopper_Temperature']),
            mold_temperature_1=float(row['Mold_Temperature_3']),
            mold_temperature_2=float(row['Mold_Temperature_4'])
        )
        db.add(condition)

        pass_or_fail = PassOrFail(
            condition=condition,
            is_pass=bool(True if row['PassOrFail'] == "Y" else False),
            reason=(row['Reason']),
            part_name=(row['PART_NAME']),
            time_stamp=datetime.strptime(row['TimeStamp'], "%Y-%m-%d %H:%M:%S")
        )
        db.add(pass_or_fail)
    # 변경사항 커밋
    db.commit()
    return condition


def get_condition(db: Session, date, partName):
    query = db.query(Condition).options(joinedload(Condition.pass_or_fail))
    
    if date:
        year, month, day = map(int, date.split("-"))
        start_date = datetime(year, month, day)
        end_date = start_date + timedelta(days=1)
        query = query.filter(
            Condition.time_stamp >= start_date,
            Condition.time_stamp < end_date
        )
    
    if partName:
        query = query.filter(Condition.part_name == partName)
    
    total_count = query.count()
    data = query.all()
    
    response = {
        "total_count": total_count,
        "date_range": f"{start_date.date()} ~ {end_date.date()}",
        "data": data
    }
    return response


def get_products(date: str, db: Session ):
    date = list(map(int, date.split("-")))
    start_date = datetime(date[0], date[1], date[2])
    end_date = start_date + timedelta(days=1)

    # Group By 및 Count 쿼리 작성
    results = (
        db.query(
            PassOrFail.part_name,
            PassOrFail.is_pass,
            func.count(PassOrFail.id).label("count")
        )
        .filter(
            PassOrFail.time_stamp >= start_date,
            PassOrFail.time_stamp < end_date
        )
        .group_by(PassOrFail.part_name, PassOrFail.is_pass)
        .all()
    )

    # 결과를 처리하여 제품별로 데이터 정리
    grouped_data = {}
    for part_name, is_pass, count in results:
        if part_name not in grouped_data:
            grouped_data[part_name] = {"pass": 0, "fail": 0}
        if is_pass:
            grouped_data[part_name]["pass"] += count
        else:
            grouped_data[part_name]["fail"] += count

    # 응답 데이터 생성
    response = {
        "date": f"{start_date.date()}",
        "data": grouped_data,
    }

    return response






def add_date_to_PoF(db :Session):
    PoF_list = db.query(PassOrFail).all()

    for PoF in PoF_list:
        condition = PoF.condition
        PoF.part_name = condition.part_name
        db.add(PoF)
    db.commit()
    return condition











# # tourAPI 에서 관광지 데이터(spot_info, spot_detail)를 받아 db에 저장 
# def get_spot_info(db: Session):
#     serviceKey = TOUR_API_KEY
#     pageNo = 1
#     numOfRows = 53056
#     url = f"{BASE_URL}/areaBasedList1?serviceKey={serviceKey}&MobileOS=AND" \
#         f"&MobileApp=tripeer&pageNo={pageNo}&numOfRows={numOfRows}&_type=json"
    
#     response = requests.get(url)
#     data = response.json()
#     spot_list = data.get("response", {}).get("body", {}).get("items", {}).get("item", [])
#     print(f"가져온 장소 수: {len(spot_list)}")

#     for spot in spot_list:
#         # 관광공사데이터에 무결성 이슈가 있음
#         try:
#             # 데이터베이스에 이미 존재하는지 확인
#             if db.query(SpotInfo).filter(SpotInfo.spot_info_id == spot.get('contentid')).first():
#                 continue
#             # SpotInfo 객체 생성
#             new_spot_info = SpotInfo(
#                 spot_info_id=spot.get('contentid'),
#                 city_id=spot.get('areacode'),
#                 town_id=spot.get('sigungucode'),
#                 content_type_id=spot.get('contenttypeid'),
#                 title=spot.get('title'),
#                 addr1=spot.get('addr1'),
#                 addr2=spot.get('addr2'),
#                 zipcode=spot.get('zipcode'),
#                 tel=spot.get('tel'),
#                 first_image=spot.get('firstimage'),
#                 first_image2=spot.get('firstimage2'),
#                 latitude=spot.get('mapy'),
#                 longitude=spot.get('mapx'),
#                 mlevel=spot.get('mlevel')
#             )

#             # SpotDetail 객체 생성
#             new_spot_detail = SpotDetail(
#                 spot_info_id=spot.get('contentid'),
#                 cat1=spot.get('cat1'),
#                 cat2=spot.get('cat2'),
#                 cat3=spot.get('cat3'),
#                 booktour=spot.get('booktour'),
#                 created_time=spot.get('createdtime'),
#                 modified_time=spot.get('modifiedtime')
#             )

#             db.add(new_spot_info)
#             db.add(new_spot_detail)
#             db.commit()
#         except:
#             db.rollback()
#             continue
#     return data

# # tourAPI 에서 관광지 설명(spot_description)를 받아 db에 저장 
# def get_spot_description(db: Session):
#     spot_list = db.query(SpotInfo)\
#         .order_by(SpotInfo.spot_info_id.desc())\
#         .all()
#     # api가 하루 1000개까지 가능
#     for spot in spot_list:
#         # 관광공사데이터에 무결성 이슈가 있음
#         try:
#             spot_id = spot.spot_info_id
#             # 기존에 설명이 있으면 pass
#             if db.query(SpotDescription).filter(SpotDescription.spot_info_id == spot_id).first():
#                 continue
#             url = f"{BASE_URL}/detailCommon1?serviceKey={TOUR_API_KEY}&MobileOS=AND" \
#                 f"&MobileApp=tripeer&overviewYN=Y&contentId={spot_id}&_type=json"
#             response = requests.get(url)
#             data = response.json()
#             overview = data.get("response", {}).get("body", {}).get("items", {}).get("item")[0].get("overview")
#             new_spot_description = SpotDescription(
#                     spot_info_id=spot_id,
#                     overview=overview,
#                     summary=" "
#                 )
#             db.add(new_spot_description)
#             db.commit()
#             count += 1
#         except:
#             db.rollback()
#     return {"last_spot_id" :spot_id}

# # tourAPI 에서 관광지 상세정보(spot_additional)를 받아 db에 저장 
# def get_deteail_info(db: Session):
#     spot_list = db.query(SpotInfo)\
#         .order_by(SpotInfo.spot_info_id.desc())\
#         .all()
#     for spot in spot_list:
#         time.sleep(random.uniform(0.3, 1.5))
#         # 관광공사데이터에 무결성 이슈가 있음
#         try:
#             spot_id = spot.spot_info_id
#             content_type_id = spot.content_type_id
#             if spot.mlevel == 11:
#                 continue
#             url = f"{BASE_URL}/detailIntro1?serviceKey={TOUR_API_KEY}&MobileOS=WIN" \
#                 f"&MobileApp=tripeer&contentId={spot_id}&_type=json&contentTypeId={content_type_id}"
#             response = requests.get(url)
#             data = response.json()
#             detail_info_data = data.get("response", {}).get("body", {}).get("items", {}).get("item")[0]
#             print(detail_info_data)
#             new_detail_info = make_model_from_detail_info(spot_id, content_type_id, detail_info_data)
#             db.add(new_detail_info)
#             spot.mlevel = 11
#             db.commit()
#         except:
#             db.rollback()
#     return {"count":0, "last_spot_id" :spot_id}
    
# # s3에 이미지 저장을 위해 tourAPI 에서 관광지 이미지(first_image1)를 받아 다운로드
# def download_images(db: Session):
#     spot_list = db.query(SpotInfo).order_by(SpotInfo.spot_info_id.desc()).all()

#     if not spot_list:
#         print("spot_list가 비어 있습니다.")
#         return

#     for spot in spot_list:
#         print("spot.first_image:", spot.first_image) 
#         if 'tong.visitkorea' in (spot.first_image or ''):
#             image_url = spot.first_image
#             file_name = str(spot.spot_info_id) + ".png"

#             print("다운로드 시도 중, URL:", image_url)
#             response = requests.get(image_url, stream=True)

#             if response.status_code == 200:
#                 try:
#                     with open(file_name, 'wb') as file:
#                         for chunk in response.iter_content(1024):
#                             file.write(chunk)
#                     print(f"이미지가 성공적으로 {file_name}으로 저장되었습니다.")
#                     spot.first_image = "https://tripeer207.s3.ap-northeast-2.amazonaws.com/spot/" + file_name
#                     db.add(spot)
#                 except:
#                     continue
#             else:
#                 print("이미지를 다운로드하는 데 실패했습니다. 상태 코드:", response.status_code)
#         else:
#             print("첫 번째 이미지가 유효하지 않습니다:", spot.first_image)
#     db.commit()
#     return "성공"