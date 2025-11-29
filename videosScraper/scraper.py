# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions
# import pickle
# import time
import os
import shutil
# import instaloader
import boto3
from botocore.exceptions import ClientError
import json

# ============================================================================
# COMMENTED OUT: Selenium webdriver and Instagram scraping
# ============================================================================
# # change password and resave cookies make sur enot to push
# driver = webdriver.Chrome()
# 
# driver.get("https://www.instagram.com/harrman17/saved/_/18017273600149241/")
# 
# with open('cookies.pkl', 'rb') as file:
#     cookies = pickle.load(file)
#     for cookie in cookies:
#         driver.add_cookie(cookie)
#         print("Cookies added")
# 
# driver.refresh()
# 
# # Accepts cookies
# try:
#     allowcookies = WebDriverWait(driver, 20).until(
#         expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, "._a9--._ap36._asz1"))
#     )
#     allowcookies.click()
#     print("Accepted cookies")
# 
# except Exception as error:
#     print("Failed to accept cookies", error)
# 
# try:
#     inputusername = WebDriverWait(driver, 20).until(
#         expected_conditions.element_to_be_clickable((By.NAME, "username"))
#     )
#     inputusername.send_keys("harrman17")
#     print("Username entered")
# 
#     inputpassword = WebDriverWait(driver, 20).until(
#         expected_conditions.element_to_be_clickable((By.NAME, "password"))
#     )
#     inputpassword.send_keys(os.getenv("PASSWORD"))
#     print("Password entered")
# except Exception as error:
#     print("Failed to enter credentials", error)
# 
# try:
#     login = WebDriverWait(driver, 5).until(
#         expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, "._aswp._aswr._aswu._asw_._asx2"))
#     )
#     login.click()
#     print("Login clicked")
# except Exception as error:
#     print("Failed to click login button", error)
# 
# # Wait for page to load after login
# time.sleep(3)
# 
# # Collect video links progressively as we scroll (Instagram removes old elements from DOM)
# videoLinks = set()  # Use set to avoid duplicates automatically
# 
# # Scroll down to load all content
# print("Scrolling to load all content and collecting video links...")
# last_height = driver.execute_script("return document.body.scrollHeight")
# scroll_attempts = 0
# max_scroll_attempts = 200  # Increased limit for large collections
# no_change_count = 0
# required_no_change = 3  # Require 3 consecutive checks with no change before stopping
# 
# while scroll_attempts < max_scroll_attempts:
#     # Collect links before scrolling (to catch any new ones)
#     try:
#         videos = driver.find_elements(By.XPATH, "//article//a")
#         for video in videos:
#             href = video.get_attribute("href")
#             if href and "/p/" in href:  # Only collect post links
#                 videoLinks.add(href)
#     except Exception as e:
#         print(f"Error collecting links: {e}")
#     
#     # Scroll down to bottom
#     driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
#     
#     # Wait longer for lazy-loaded content to appear
#     time.sleep(3)
#     
#     # Collect links after scrolling
#     try:
#         videos = driver.find_elements(By.XPATH, "//article//a")
#         for video in videos:
#             href = video.get_attribute("href")
#             if href and "/p/" in href:  # Only collect post links
#                 videoLinks.add(href)
#     except Exception as e:
#         print(f"Error collecting links: {e}")
#     
#     # Check multiple times to ensure content has finished loading
#     check_count = 0
#     stable_height = driver.execute_script("return document.body.scrollHeight")
#     
#     # Wait and check again to ensure height is stable
#     while check_count < 2:
#         time.sleep(2)
#         new_check = driver.execute_script("return document.body.scrollHeight")
#         if new_check == stable_height:
#             check_count += 1
#         else:
#             stable_height = new_check
#             check_count = 0
#     
#     new_height = stable_height
#     
#     if new_height == last_height:
#         no_change_count += 1
#         print(f"No height change detected ({no_change_count}/{required_no_change}), videos found so far: {len(videoLinks)}")
#         
#         if no_change_count >= required_no_change:
#             # Verify we're truly at the bottom by checking scroll position
#             current_scroll = driver.execute_script("return window.pageYOffset + window.innerHeight")
#             document_height = driver.execute_script("return document.body.scrollHeight")
#             
#             if abs(current_scroll - document_height) < 100:  # Within 100px of bottom
#                 # Final collection pass at the bottom
#                 try:
#                     videos = driver.find_elements(By.XPATH, "//article//a")
#                     for video in videos:
#                         href = video.get_attribute("href")
#                         if href and "/p/" in href:
#                             videoLinks.add(href)
#                 except Exception as e:
#                     print(f"Error in final link collection: {e}")
#                 
#                 print(f"Confirmed at bottom of page after {scroll_attempts + 1} scroll attempts")
#                 print(f"Total unique video links collected: {len(videoLinks)}")
#                 break
#             else:
#                 # Try scrolling again
#                 no_change_count = 0
#                 print("Height unchanged but not at bottom, continuing scroll...")
#     else:
#         no_change_count = 0  # Reset counter when height changes
#     
#     last_height = new_height
#     scroll_attempts += 1
#     
#     if scroll_attempts % 5 == 0:  # Print progress every 5 scrolls
#         print(f"Scrolled {scroll_attempts} time(s), page height: {new_height}px, unique videos found: {len(videoLinks)}")
# 
# # Convert set to list for easier handling
# videoLinks = list(videoLinks)
# print(f"\n✓ Found {len(videoLinks)} unique video links total")
# if len(videoLinks) > 0:
#     print(f"Sample links: {videoLinks[:3]}")
# time.sleep(2)
# 
# # Gets cookies
# # cookies = driver.get_cookies()
# # with open("cookies.pkl", "wb") as file:
# #     pickle.dump(cookies, file)
# #     print("Cookies saved")
# 
# ============================================================================
# COMMENTED OUT: Instaloader video downloads
# ============================================================================
# loader = instaloader.Instaloader()
# 
# # Download all videos, continue even if some fail
# print(f"Starting download of {len(videoLinks)} videos...")
# successful_downloads = 0
# failed_downloads = []
# 
# for i, link in enumerate(videoLinks, 1):
#     try:
#         shortcode = link.split("/")[-2]
#         print(f"Downloading {i}/{len(videoLinks)}: {shortcode}")
#         
#         post = instaloader.Post.from_shortcode(loader.context, shortcode)
#         loader.download_post(post, target="videos")
#         successful_downloads += 1
#         print(f"✓ Successfully downloaded {shortcode}")
#     except Exception as error:
#         failed_downloads.append((link, str(error)))
#         print(f"✗ Failed to download {link}: {error}")
#         continue
# 
# print(f"\nDownload complete: {successful_downloads} successful, {len(failed_downloads)} failed")
# if failed_downloads:
#     print("Failed downloads:")
#     for link, error in failed_downloads:
#         print(f"  - {link}: {error}")


s3_client = boto3.client("s3")
bucket = "motivationwatchv3.1"

# Get bucket region for proper URL generation
try:
    bucket_location = s3_client.get_bucket_location(Bucket=bucket)
    bucket_region = bucket_location.get('LocationConstraint') or 'us-east-1'  # Default to us-east-1 if None
except Exception as e:
    print(f"Warning: Could not get bucket region, defaulting to us-east-1: {e}")
    bucket_region = 'us-east-1'

# Create videos directory if it doesn't exist
if not os.path.exists("videos"):
    os.makedirs("videos")

# Clean up non-mp4 files recursively
print("Cleaning up non-video files...")
for root, dirs, files in os.walk("videos"):
    for file in files:
        file_path = os.path.join(root, file)
        if not file.endswith(".mp4"):
            try:
                os.remove(file_path)
                print(f"Deleted non-video file: {file_path}")
            except Exception as error:
                print(f"Error deleting file: {file_path} with error: {error}")


# Get all mp4 files recursively for upload
mp4_files = []
for root, dirs, files in os.walk("videos"):
    for file in files:
        if file.endswith(".mp4"):
            mp4_files.append(os.path.relpath(os.path.join(root, file), "videos"))

print(f"\nFound {len(mp4_files)} video files to upload")

uploaded_count = 0
skipped_count = 0
failed_count = 0

for file in mp4_files:
    file_path = os.path.join("videos", file)
    # Use just the filename as the S3 key (not the full path with subdirectories)
    s3_key = os.path.basename(file)

    try:
        # Check if file already exists in S3
        s3_client.head_object(Bucket=bucket, Key=s3_key)
        print(f"⊘ {s3_key} already exists in s3, skipping")
        skipped_count += 1
        os.remove(file_path)
    except ClientError as error:
        if error.response["Error"]["Code"] == "404":
            try:
                # Upload with One Zone-IA storage class
                print(f"⬆ Uploading {s3_key} to s3 with ONEZONE_IA storage class...")
                s3_client.upload_file(
                    file_path, 
                    bucket, 
                    s3_key,
                    ExtraArgs={'StorageClass': 'ONEZONE_IA'}
                )
                print(f"✓ {s3_key} successfully uploaded to s3")
                uploaded_count += 1
                os.remove(file_path)
            except ClientError as upload_error:
                print(f"✗ Error uploading {s3_key} to s3: {upload_error}")
                failed_count += 1
        else:
            print(f"✗ Error checking {s3_key} in s3: {error}")
            failed_count += 1

print(f"\nUpload complete: {uploaded_count} uploaded, {skipped_count} skipped, {failed_count} failed")

# Clean up videos directory and all subdirectories (optional - comment out if you want to keep the files)
# try:
#     if os.path.exists("videos"):
#         shutil.rmtree("videos")
#         print("Videos folder and all subdirectories deleted")
# except Exception as error:
#     print("Error deleting videos folder: ", error)


# Generate VideoLinks.json with all videos from S3
print("\nGenerating VideoLinks.json...")
video_links = []
paginator = s3_client.get_paginator('list_objects_v2')
pages = paginator.paginate(Bucket=bucket)

for page in pages:
    if "Contents" in page:
        for video in page["Contents"]:
            video_key = video["Key"]
            # Only include .mp4 files
            if video_key.endswith(".mp4"):
                # Use regional endpoint with path-style URL to avoid SSL certificate issues with bucket names containing dots
                if bucket_region == 'us-east-1':
                    video_url = f"https://s3.amazonaws.com/{bucket}/{video_key}"
                else:
                    video_url = f"https://s3.{bucket_region}.amazonaws.com/{bucket}/{video_key}"
                video_links.append(video_url)

video_links.sort()  # Sort for consistency
print(f"Found {len(video_links)} videos in S3 bucket")

# Save to VideoLinks.json
json_path = "VideoLinks.json"
with open(json_path, "w") as json_file:
    json.dump(video_links, json_file, indent=4)

print(f"✓ VideoLinks.json generated successfully with {len(video_links)} video links")

# Close the browser (commented out since we're not using webdriver)
# driver.quit()