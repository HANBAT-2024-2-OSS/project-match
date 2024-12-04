import pandas as pd
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# 크롬 옵션 설정
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-extensions")
chrome_options.add_argument("--disable-infobars")
chrome_options.add_argument("--disable-browser-side-navigation")
chrome_options.add_argument("--disable-features=VizDisplayCompositor")

# 크롬 드라이버 초기화
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# K-리그 일정 기본 URL
url_base = "https://m.sports.naver.com/kfootball/schedule/index?category=kleague&date=2024-03-01"
driver.get(url_base)

# 결과를 저장할 리스트
result = []

# 3월부터 12월까지 반복
for month in range(3, 13):
    try:
        # 월 선택 버튼 클릭
        month_button_xpath = f'//button[./span/em[text()="{month}"]]'
        month_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, month_button_xpath))
        )
        month_button.click()
        time.sleep(1)

        # 페이지 로드 대기
        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located(
                (
                    By.XPATH,
                    "//div[contains(@class, 'ScheduleLeagueType_match_list_group__18ML9')]",
                )
            )
        )

        # 스크롤하여 더 많은 데이터 로드
        last_height = driver.execute_script("return document.body.scrollHeight")
        while True:
            groups = driver.find_elements(
                By.CLASS_NAME, "ScheduleLeagueType_match_list_group__18ML9"
            )
            for group in groups:
                try:
                    # 날짜 추출
                    date_element = group.find_element(
                        By.CLASS_NAME, "ScheduleLeagueType_title__2Kalm"
                    )
                    date = date_element.text.strip()

                    # 경기 정보 추출
                    matches = group.find_elements(
                        By.CLASS_NAME, "MatchBox_match_item__3_D0Q"
                    )
                    for match in matches:
                        try:
                            # 경기 시간 추출
                            time_element = match.find_element(
                                By.CLASS_NAME, "MatchBox_time__nIEfd"
                            )
                            match_time = (
                                time_element.text.strip()
                                .replace("경기 시간\n", "")
                                .replace('"', "")
                            )

                            # 팀 이름 추출
                            teams = match.find_elements(
                                By.CLASS_NAME, "MatchBoxTeamArea_team__3aB4O"
                            )
                            if len(teams) != 2:
                                continue

                            home_team = teams[0].text.strip()
                            away_team = teams[1].text.strip()

                            # 점수 추출
                            scores = match.find_elements(
                                By.CLASS_NAME, "MatchBoxTeamArea_score__1_YFB"
                            )
                            if len(scores) != 2:
                                continue

                            home_score = scores[0].text.strip()
                            away_score = scores[1].text.strip()

                            # 결과 리스트에 경기 정보 추가 (중복 방지)
                            match_info = (
                                date,
                                match_time,
                                home_team,
                                away_team,
                                home_score,
                                away_score,
                            )
                            if match_info not in result:
                                result.append(match_info)
                        except Exception as e:
                            continue
                except Exception as e:
                    continue

            # 스크롤 다운하여 더 많은 데이터 로드
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            WebDriverWait(driver, 3).until(
                lambda driver: driver.execute_script(
                    "return document.body.scrollHeight"
                )
                > last_height
            )
            last_height = driver.execute_script("return document.body.scrollHeight")

        driver.execute_script("window.scrollTo(0, 0);")
    except Exception as e:
        driver.execute_script("window.scrollTo(0, 0);")

# 결과를 DataFrame으로 변환 (날짜는 문자열로 유지)
df = pd.DataFrame(
    result,
    columns=["Date", "Time", "Home Team", "Away Team", "Home Score", "Away Score"],
)

df = df.drop_duplicates()
df.to_csv("kleague_schedule.csv", index=False, encoding="utf-8-sig")
driver.quit()
