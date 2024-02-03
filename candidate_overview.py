import json
import pandas as pd

csv_file_path_ctks = './src/assets/data/elctks.csv'
json_file_path = './src/assets/data/candidateOverview.json'

candidate_data = pd.read_csv(csv_file_path_ctks, encoding='utf-8')

candidate_totals = {}
for _, row in candidate_data.iterrows():
    candidate_number = row['候選人號次']
    vote_count = row['得票數']

    if candidate_number in candidate_totals:
        candidate_totals[candidate_number]['voteCount'] += vote_count
    else:
        candidate_totals[candidate_number] = {
            'voteCount': vote_count,
        }

formatted_data = []
for candidate_number, totals in candidate_totals.items():
    formatted_data.append({
        'candidateNumber': candidate_number,
        'voteCount': totals['voteCount'],
    })

with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(formatted_data, json_file, ensure_ascii=False, indent=2)
