import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# 크롬 옵션 설정 (헤드리스 모드 및 기타 설정) / Set Chrome options for headless mode and other configurations
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-extensions")
chrome_options.add_argument("--disable-infobars")
chrome_options.add_argument("--disable-browser-side-navigation")
chrome_options.add_argument("--disable-features=VizDisplayCompositor")

# 크롬 드라이버 초기화 / Initialize Chrome driver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# KBO 일정 기본 URL / Base URL for KBO schedule
url_base = "https://www.koreabaseball.com/Schedule/Schedule.aspx"
driver.get(url_base)

# 결과를 저장할 리스트 / List to store the results
result = []

# 정규 시즌 / Regular season
select_series = Select(driver.find_element(By.XPATH, '//*[@id="ddlSeries"]'))
select_series.select_by_value("0,9,6")
for month in range(3, 11):
    select = Select(driver.find_element(By.XPATH, '//*[@id="ddlMonth"]'))
    select.select_by_index(month - 1)

    # 페이지 로드 대기 / Wait for the page to load
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.XPATH, '//*[@id="tblScheduleList"]/tbody/tr')
        )
    )

    # 경기 정보 가져오기 / Fetch game information
    rows = driver.find_elements(By.XPATH, '//*[@id="tblScheduleList"]/tbody/tr')
    current_date = ""
    for row in rows:
        try:
            # 날짜가 없을 경우 처리 / Handle cases where the date might be missing
            try:
                date_element = row.find_element(By.XPATH, './td[@class="day"]')
            except:
                date_element = None
            if date_element:
                current_date = date_element.text

            time = row.find_element(By.XPATH, './td[@class="time"]/b').text
            play_info = row.find_element(By.XPATH, './td[@class="play"]')

            # 경기 정보를 원정팀, 홈팀, 점수로 파싱 / Parse game information into away team, home team, and scores
            away_team = play_info.find_element(By.XPATH, "./span[1]").text
            home_team = play_info.find_element(By.XPATH, "./span[2]").text
            away_score = play_info.find_element(By.XPATH, "./em/span[1]").text
            home_score = play_info.find_element(By.XPATH, "./em/span[3]").text

            result.append(
                [
                    current_date,
                    time,
                    away_team,
                    home_team,
                    away_score,
                    home_score,
                    "정규시즌",
                ]
            )
        except:
            continue

# 포스트 시즌 / Postseason
try:
    select_series = Select(driver.find_element(By.XPATH, '//*[@id="ddlSeries"]'))
    select_series.select_by_value("3,4,5,7")
    print("Series selected successfully")
except Exception as e:
    print(f"Error selecting series: {e}")

for month in range(10, 13):
    try:
        select = Select(driver.find_element(By.XPATH, '//*[@id="ddlMonth"]'))
        select.select_by_index(month - 1)

        # 페이지 로드 대기 / Wait for the page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, '//*[@id="tblScheduleList"]/tbody/tr')
            )
        )

        # 경기 정보 가져오기 / Fetch game information
        rows = driver.find_elements(By.XPATH, '//*[@id="tblScheduleList"]/tbody/tr')
        for row in rows:
            try:
                date_element = row.find_element(By.XPATH, './td[@class="day"]').text
                time_element = row.find_elements(By.XPATH, './td[@class="time"]/b')
                time = time_element[0].text if time_element else "N/A"
                play_info = row.find_element(By.XPATH, './td[@class="play"]')

                # 경기 정보를 원정팀, 홈팀, 점수로 파싱 / Parse game information into away team, home team, and scores
                away_team = play_info.find_element(By.XPATH, "./span[1]").text
                home_team = play_info.find_element(By.XPATH, "./span[2]").text
                away_score = play_info.find_element(By.XPATH, "./em/span[1]").text
                home_score = play_info.find_element(By.XPATH, "./em/span[3]").text

                result.append(
                    [
                        date_element,
                        time,
                        away_team,
                        home_team,
                        away_score,
                        home_score,
                        "포스트시즌",
                    ]
                )
            except:
                continue
    except:
        continue

# 결과를 DataFrame으로 변환 / Convert results to a DataFrame
df = pd.DataFrame(
    result,
    columns=[
        "Date",
        "Time",
        "Away Team",
        "Home Team",
        "Away Score",
        "Home Score",
        "Season",
    ],
)

# DataFrame을 CSV로 저장 / Save DataFrame to CSV
df.to_csv("kbo_schedule.csv", index=False, encoding="utf-8-sig")

# 드라이버 종료 / Quit the driver
driver.quit()
