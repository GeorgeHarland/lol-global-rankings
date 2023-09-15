import json
import random

def random_ranking(filename):
    with open(filename, 'r') as f:
        data = json.load(f)

    # Extract only team details for shuffling.
    teams = [team_data[1] for team_data in data]

    random.shuffle(teams)

    top_10 = teams[:10]

    # Adapting to the new keys 'teamname' and assuming there's no 'acronym' in the new data format.
    top_10_rankings = [{'name': team['teamname']} for team in top_10]

    return top_10_rankings

if __name__ == "__main__":
    rankings = random_ranking('derived-data/team_winrates.json')
    print("Top 10 Global Rankings:")
    for i, team in enumerate(rankings, 1):
        print(f"{i}. {team['name']}")
