import csv
import json
import pandas as pd

csv_file_path_cand = './src/assets/data/elcand.csv'
# csv_file_path_ctks = './src/assets/data/elctks.csv'
json_file_path = './src/assets/data/candidate.json'

formatted_data = []

with open(csv_file_path_cand, 'r', encoding='utf-8') as csv_file:
    # df = pd.read_csv(csv_file_path_ctks, encoding='utf-8', dtype={'候選人號次': str,})
    # result_df = df.groupby('候選人號次', as_index=False)['得票數'].sum()
    # total = result_df['得票數'].sum()

    csv_reader = csv.DictReader(csv_file)
    current_vicePresidentName = ''
    current_data = {}

    for row in csv_reader:
        if row['副手'] == 'Y' and current_data['candidateNumber'] == row['號次']:
            current_data['vicePresident'] = row['名字']
            formatted_data.append(current_data)
        else:
            # print(222222, type(row['號次']))
            current_data = {
                'candidateNumber': row['號次'],
                'president': row['名字'],
                'vicePresident': '',
                # 'voteNumber': result_df[result_df['候選人號次'] == row['號次']]['得票數'][0],
                # 'votePercentage': result_df[result_df['候選人號次'] == row['號次']]['得票數'][0] / total,
                'note': row['當選註記']
            }
    
    
with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(formatted_data, json_file, ensure_ascii=False, indent=2)
