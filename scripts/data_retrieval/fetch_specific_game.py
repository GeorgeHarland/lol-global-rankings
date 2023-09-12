import requests
import gzip
import json
import shutil
import os
from io import BytesIO

PLATFORM_ID =  "ESPORTSTMNT01:1693483"
S3_BUCKET_URL = "https://power-rankings-dataset-gprhack.s3.us-west-2.amazonaws.com"

def download_gzip_and_write_to_json(file_name):
    local_file_name = file_name.replace(':', '_')
    # If file already exists locally do not re-download game
    if os.path.isfile(f"{file_name}.json"):
        return

    response = requests.get(f"{S3_BUCKET_URL}/{file_name}.json.gz")
    if response.status_code == 200:
        try:
            gzip_bytes = BytesIO(response.content)
            with gzip.GzipFile(fileobj=gzip_bytes, mode="rb") as gzipped_file:
                with open(f"{local_file_name}.json", 'wb') as output_file:
                    shutil.copyfileobj(gzipped_file, output_file)
                print(f"{local_file_name}.json written")
        except Exception as e:
            print("Error:", e)
    else:
        print(f"Failed to download {local_file_name}")

def download_specific_game(game_id):
    directory = "games"
    if not os.path.exists(directory):
        os.makedirs(directory)

    download_gzip_and_write_to_json(f"{directory}/{game_id}")

if __name__ == "__main__":
    download_specific_game(PLATFORM_ID)
