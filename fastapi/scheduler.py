from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()


def train_models():
    print("asd")

# 함수에 파라미터가 없으면 args를 안넣으면 됩니다.
scheduler.add_job(train_models, 'cron', hour=2, minute=0)
# scheduler.add_job(function_1, "interval", seconds=5, kwargs={"a": 1, "b": 2, "c": 3})
 