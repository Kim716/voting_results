import csv
import json

csv_file_path_cand = './src/assets/data/elcand.csv'
json_file_path = './src/assets/data/candidate.json'

formatted_data = []
with open(csv_file_path_cand, 'r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    current_vicePresidentName = ''
    current_data = {}

    for row in csv_reader:
        if row['副手'] == 'Y' and current_data['candidateNumber'] == row['號次']:
            current_data['vicePresident'] = row['名字']
            formatted_data.append(current_data)
        else:
            current_data = {
                'candidateNumber': row['號次'],
                'president': row['名字'],
                'vicePresident': '',
                'note': row['當選註記']
            }
    
    
with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(formatted_data, json_file, ensure_ascii=False, indent=2)
