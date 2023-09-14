from chalice import Chalice
import json

from chalicelib.randomly_rank_all_teams import random_ranking
from chalicelib.win_loss_rank_all_teams import compute_win_loss_ratios

app = Chalice(app_name='blue-buff-lambdas')

@app.route('/')
def hello():
    return {'message': 'Hello, world!'}

@app.route('/random')
def generate_random_rankings():
    filename = 'chalicelib/esports-data/teams.json'
    top_10_rankings = random_ranking(filename)
    return {'top_10_rankings': top_10_rankings}

# @app.route('/winlossgames')
# def generate_winlossgames_rankings():
#     top_10_rankings = compute_win_loss_ratios('chalicelib/esports-data/teams.json', 'chalicelib/esports-data/tournaments.json')
#     return {'top_10_rankings': top_10_rankings}

@app.route('/winlossgames')
def generate_winlossgames_rankings():
    with open('chalicelib/derived-data/team_winrates.json', 'r') as infile:
        team_stats = json.load(infile)
    
    top_10_rankings = team_stats[:10]
    return {'top_10_rankings': top_10_rankings}

if __name__ == '__main__':
    app.debug = True
    app.run()
