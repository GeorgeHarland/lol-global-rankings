import requests
import json
import gzip
import time
from io import BytesIO
import pandas as pd

S3_BUCKET_URL = "https://power-rankings-dataset-gprhack.s3.us-west-2.amazonaws.com"

def load_gzip_to_dataframe(file_name):
    url = f"{S3_BUCKET_URL}/{file_name}.json.gz"
    print(f"Attempting to fetch: {url}")
    
    response = requests.get(url)
    if response.status_code == 200:
        try:
            gzip_bytes = BytesIO(response.content)
            with gzip.GzipFile(fileobj=gzip_bytes, mode="rb") as gzipped_file:
                df = pd.read_json(gzipped_file)
                print(f"Type of data loaded from {file_name}: {type(df)}")
                return df
        except Exception as e:
            print(f"Error processing {file_name}: {e}")
            return None
    else:
        print(f"Failed to load {file_name} with status code {response.status_code}")
        return None

def get_games_for_year(year, tournaments_data):
    games_for_year = []

    for tournament in tournaments_data.itertuples():
        start_date = getattr(tournament, "startDate", "")
        end_date = getattr(tournament, "endDate", "")
        
        # Check if the tournament's start or end date is in the given year
        if str(year) in start_date or str(year) in end_date:
            stages = getattr(tournament, "stages", [])
            for stage in stages:
                for section in stage.get('sections', []):
                    for match in section.get('matches', []):
                        games = match.get('games', [])
                        games_for_year.extend(games)
    return games_for_year

esports_data = {}
esports_data['leagues'] = load_gzip_to_dataframe('esports-data/leagues')
esports_data['tournaments'] = load_gzip_to_dataframe('esports-data/tournaments')
esports_data['players'] = load_gzip_to_dataframe('esports-data/players')
esports_data['teams'] = load_gzip_to_dataframe('esports-data/teams')
esports_data['mapping_data'] = load_gzip_to_dataframe('esports-data/mapping_data')

tournaments_data = esports_data['tournaments']
mappings_data = esports_data['mapping_data']

year = 2023

games_2023 = get_games_for_year(year, tournaments_data)
print(f"Total games found for {year}: {len(games_2023)}")

games_df = pd.DataFrame(games_2023)
games_df.head()
