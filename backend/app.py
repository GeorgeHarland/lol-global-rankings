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

@app.route('/', methods=['GET'])
def hello():
    return {'message': 'Hello, world!'}

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
