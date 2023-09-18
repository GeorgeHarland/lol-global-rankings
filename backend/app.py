from chalice import Chalice, BadRequestError
import json

app = Chalice(app_name='blue-buff-lambdas')

@app.route('/teams', methods=['GET'], cors=True)
@app.route('/teams/{team_name}', methods=['GET'], cors=True)
def get_team_data(team_name = ''):
    if not team_name:
        return team_data
    for team in team_data:
        if team['team_name'] == team_name:
            return team
    return {"error": "Team not found"}

@app.route('/global_rankings', methods=['GET'], cors=True)
def get_global_rankings():
    number_of_teams = int(app.current_request.query_params.get('number_of_teams', 20))
    sorted_data = sorted(rankings_data, key=lambda x: x['rank'])[:number_of_teams]
    return sorted_data

@app.route('/tournament_rankings/{tournament_id}', methods=['GET'], cors=True)
def get_tournament_rankings(tournament_id):
    stage = app.current_request.query_params.get('stage', None)
    return "To be done"

@app.route('/team_rankings', methods=['GET'], cors=True)
def get_team_rankings():
    team_ids = app.current_request.query_params.get('team_ids', [])
    
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
