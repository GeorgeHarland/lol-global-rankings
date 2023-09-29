# some team_ids are in tournaments.json that aren't in teams.json
# this script will find tournament data for a team entered in (as the tournaments.json is so long)

import json, os

TEAM_TO_CHECK = "99566404845279652"

script_directory = os.path.dirname(os.path.abspath(__file__))
tournaments_path = os.path.join(script_directory, '..', 'esports-data', 'tournaments.json')
with open(tournaments_path, 'r', encoding='utf-8') as f:
    tournaments = json.load(f)

for tournament in tournaments:
    for stage in tournament["stages"]:
        for section in stage["sections"]:
            for match in section["matches"]:
                for match_team in match["teams"]:
                    if match_team["id"] == TEAM_TO_CHECK:
                        print('')
                        print('From match data: ')
                        print('-----------------')
                        for player in match_team["players"]:
                            print('Player: ', player['id'])
                        print('Tournament ID: ', tournament['id'])
                        print('Tournament name: ', tournament['name'])
                        print('Tournament slug: ', tournament['slug'])
                    # for game in match['games']:
                    #     for team in game['teams']:  
                    #       if team["id"] == TEAM_TO_CHECK:
                    #         print('')
                    #         print('From game data: ') 
                    #         print('-----------------')
                    #         print('Tournament ID: ', tournament['id'])
                    #         print('Tournament name: ', tournament['name'])
                            