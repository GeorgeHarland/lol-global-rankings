from chalice import Chalice
import json

from chalicelib.randomly_rank_all_teams import random_ranking

app = Chalice(app_name='blue-buff-lambdas')

mock_rankings = [
        {
            "team_id": "100205573495116443",
            "team_code": "GEN",
            "team_name": "Gen.G",
            "rank": 1
        },
        {
            "team_id": "98767991877340524",
            "team_code": "C9",
            "team_name": "Cloud9",
            "rank": 1
        },
        {
            "team_id": "99566404853058754",
            "team_code": "WBG",
            "team_name": "WeiboGaming FAW AUDI",
            "rank": 3
        }
    ]

mock_teams = [
        {
            "team_id": "100205573495116443",
            "team_code": "GEN",
            "team_name": "Gen.G",
            "team_icon_url": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e3/Gen.Glogo_square.png/revision/latest?cb=20210325073128",
        },
        {
            "team_id": "98767991877340524",
            "team_code": "C9",
            "team_name": "Cloud9",
            "team_icon_url": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/88/Cloud9logo_square.png/revision/latest?cb=20230426052413",
        },
        {
            "team_id": "99566404853058754",
            "team_code": "WBG",
            "team_name": "WeiboGaming FAW AUDI",
            "team_icon_url": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/a2/T1logo_square.png/revision/latest?cb=20230512040747",
        }
    ]

mock_players = [
        {
            "player_id": "123123",
            "player_name": "Faker",
            "player_team": "T1",
            "past_teams": "none"
        },
        {
            "player_id": "321321",
            "player_name": "Jensen",
            "player_team": "C9",
            "past_teams": "none"
        },
    ]

@app.route('/', methods=['GET'])
def hello():
    return {'message': 'Hello, world!'}

@app.route('/teams', methods=['GET'])
@app.route('/teams/{team_name}', methods=['GET'])
def get_team(team_name = ''):
    # if no team name, provide list of teams
    if not team_name:
        return {'teams': mock_teams}
    for team in mock_teams:
        if team['team_name'] == team_name:
            return team
    return {"error": "Team not found"}

@app.route('/players', methods=['GET'])
@app.route('/players/{player_name}', methods=['GET'])
def get_player(player_name = ''):
    # if no player name, provide list of players? maybe, less important than the teams one
    if not player_name:
        return {'players': mock_players}
    for player in mock_players:
        if player['player_name'] == player_name:
            return player
    return {"error": "Player not found"}

@app.route('/random', methods=['GET'])
def generate_random_rankings():
    filename = 'chalicelib/derived-data/team_winrates.json'
    top_10_rankings = random_ranking(filename)
    return {'top_10_rankings': top_10_rankings}

@app.route('/winlossgames', methods=['GET'])
def generate_winlossgames_rankings():
    with open('chalicelib/derived-data/team_winrates.json', 'r') as infile:
        team_stats = json.load(infile)
    top_10_rankings = team_stats[:10]
    return {'top_10_rankings': top_10_rankings}

@app.route('/tournament_rankings/{tournament_id}', methods=['GET'])
def get_tournament_rankings(tournament_id):
    # params: tournament_id (string, path, required*), stage (string, query)
    # rankings should be historical to the tournament
    # return {"message": f"Tournament rankings for ID {tournament_id}"}
    return {"rankings": mock_rankings}

@app.route('/global_rankings', methods=['GET'])
def get_global_rankings():
    # params: number_of_teams (integer, query)
    # return {"message": "Global rankings"}
    return {"rankings": mock_rankings}

@app.route('/team_rankings', methods=['GET'])
def get_team_rankings():
    # params: team_ids (array[string], query, required*)
    # team_ids = app.current_request.query_params.getlist('team_ids')
    # return {"message": f"Team rankings for IDs {team_ids}"}
    return {"rankings": mock_rankings}

if __name__ == '__main__':
    app.debug = True
    app.run()
