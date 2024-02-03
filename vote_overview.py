import json
import pandas as pd

csv_file_path_prof = './src/assets/data/elprof.csv'
json_file_path = './src/assets/data/voteOverview.json'

vote_data = pd.read_csv(csv_file_path_prof, encoding='utf-8')

# JSON 序列化不支持 int64 類型的數據。Pandas 中的整數列通常是 int64 類型的
vote_totals = {
    "有效票": int(vote_data["有效票"].sum()),
    "無效票": int(vote_data["無效票"].sum()),
    "選舉人數": int(vote_data["選舉人數"].sum())
}

with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(vote_totals, json_file, ensure_ascii=False, indent=2)
