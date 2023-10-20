from chalice import Chalice, BadRequestError
import json, os

app = Chalice(app_name='blue-buff-lambdas')

script_directory = os.path.dirname(os.path.abspath(__file__))

teams_data_path = os.path.join(script_directory, 'chalicelib', 'teams_data.json')
with open(teams_data_path, 'r', encoding="utf-8") as f:
    teams_data = json.load(f)

rankings_data_path = os.path.join(script_directory, 'chalicelib', 'rankings_data.json')
with open(rankings_data_path, 'r', encoding="utf-8") as f:
    rankings_data = json.load(f)
    
players_data_path = os.path.join(script_directory, 'chalicelib', 'players.json')
with open(players_data_path, 'r', encoding="utf-8") as f:
    players_data = json.load(f)

@app.route('/teams', methods=['GET'], cors=True)
@app.route('/teams/{team_id}', methods=['GET'], cors=True)
def get_team_data(team_id = ''):
    if not team_id:
        return teams_data
    for team in teams_data:
        if team['team_id'] == team_id:
            return team
    return {"error": "Team not found"}

@app.route('/players', methods=['GET'], cors=True)
@app.route('/players/{player_id}', methods=['GET'], cors=True)
def get_team_data(player_id = ''):
    if not player_id:
        return players_data
    for player in players_data:
        if player['player_id'] == player_id:
            return player
    return {"error": "Player not found"}

@app.route('/global_rankings', methods=['GET'], cors=True)
def get_global_rankings():
    query_params = app.current_request.query_params or {}
    number_of_teams = int(query_params.get('number_of_teams', 20))
    if query_params.get('detailed_data', 'false').lower() == 'true':
        data_source = teams_data
    else:
        data_source = rankings_data
    
    sorted_data = sorted(data_source, key=lambda x: x['rank'])[:number_of_teams]
    return sorted_data

@app.route('/tournament_rankings/{tournament_id}', methods=['GET'], cors=True)
def get_tournament_rankings(tournament_id):
    if not tournament_id:
        raise BadRequestError("tournament_id query parameter is required and should be a single string.")
    stage = app.current_request.query_params.get('stage', None)
    return "To be done"

@app.route('/team_rankings', methods=['GET'], cors=True)
def get_team_rankings():
    team_ids = app.current_request.query_params.getlist('team_ids') if app.current_request.query_params else []
    
    if not team_ids:
        raise BadRequestError("team_ids query parameter is required and should be an array of team ids.")
    
    filtered_rankings = [
        team for team in rankings_data 
        if team['team_id'] in team_ids
    ]
    
    if not filtered_rankings:
        raise BadRequestError(f"No rankings found for team_ids: {team_ids}")
    
    return sorted(filtered_rankings, key=lambda x: x['rank'])

if __name__ == '__main__':
    app.debug = True
    app.run()
