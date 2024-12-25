from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.webdriver import ActionChains
import pickle
import time
import os
import instaloader
import boto3
from botocore.exceptions import ClientError
import json

# change password and resave cookies make sur enot to push
webdriver = webdriver.Chrome()

webdriver.get("https://www.instagram.com/hilosophy7/saved/all-posts/")

with open('cookies.pkl', 'rb') as file:
    cookies = pickle.load(file)
    for cookie in cookies:
        webdriver.add_cookie(cookie)
        print("Cookies added")

webdriver.refresh()

# Accepts cookies
# try:
#     allowcookies = WebDriverWait(webdriver, 20).until(
#         expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, "._a9--._ap36._a9_0"))
#     )
#     allowcookies.click()
#     print("Accepted cookies")

# except Exception as error:
#     print("Failed to accept cookies", error)

# try:
#     inputusername = WebDriverWait(webdriver, 20).until(
#         expected_conditions.element_to_be_clickable((By.NAME, "username"))
#     )
#     inputusername.send_keys("hilosophy7")
#     print("Username entered")

#     inputpassword = WebDriverWait(webdriver, 20).until(
#         expected_conditions.element_to_be_clickable((By.NAME, "password"))
#     )
#     inputpassword.send_keys(os.getenv("PASSWORD"))
#     print("Password entered")
# except Exception as error:
#     print("Failed to enter credentials", error)

# try:
#     login = WebDriverWait(webdriver, 5).until(
#         expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, "._acan._acap._acas._aj1-._ap30"))
#     )
#     login.click()
#     print("Login clicked")
# except Exception as error:
#     print("Failed to click login button", error)

videoLinks = []

try: 
    videosLoaded = WebDriverWait(webdriver, 3).until(
        expected_conditions.element_to_be_clickable((By.XPATH, "//article//a"))
    )

    videos = videosLoaded.find_elements(By.XPATH, "//article//a")

    for video in videos:
        videoLinks.append(video.get_attribute("href"))

except Exception as error:
    print("Failed to get href", error)


print(videoLinks)
time.sleep(10)

# Gets cookies
# cookies = webdriver.get_cookies()
# with open("cookies.pkl", "wb") as file:
#     pickle.dump(cookies, file)
#     print("Cookies saved")


loader = instaloader.Instaloader()

try:
    for link in videoLinks:
        shortcode = link.split("/")[-2]

        post = instaloader.Post.from_shortcode(loader.context, shortcode)

        loader.download_post(post, target="videos")
        print("Downloaded")
except Exception as error:
    print("Download error: ", error)


s3_client = boto3.client("s3")
bucket = "motivationwatchv3"

for file in os.listdir("videos"):
    file_path = os.path.join("videos", file) 
    print(f"File path: {file_path}")

    if not file.endswith(".mp4"):
        try:
            os.remove(file_path)
            print(f"Successfully deleted {file_path}")
        except Exception as error:
            print(f"Error deleting file: {file_path} with error: ", error)


for file in os.listdir("videos"):
    file_path = os.path.join("videos", file)

    try:
        s3_client.head_object(Bucket=bucket, Key=file)
        print(f"{file} already exists in s3")
        os.remove(file_path)
    except ClientError as error:
        if error.response["Error"]["Code"] == "404":
            try:
                s3_client.upload_file(file_path, bucket, file)
                print(f"{file} successfully uploaded to s3")
                os.remove(file_path)
            except ClientError as error:
                print(f"Error uploading {file} to s3 with error: ", error)

try:
    os.rmdir("videos")
    print("Videos folder deleted")
except Exception as error:
    print("Error deleting videos folder: ", error)


response = s3_client.list_objects_v2(Bucket=bucket)
video_links = []

for video in response["Contents"]:
    video_key = video["Key"]
    video_url = f"https://{bucket}.s3.amazonaws.com/{video_key}"
    video_links.append(video_url)

with open("VideoLinks.json", "w") as json_file:
    json.dump(video_links, json_file, indent=4)

    
