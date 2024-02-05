import csv
import json
import pandas as pd

csv_file_path_ctks = './src/assets/data/elctks.csv'
csv_file_path_base = './src/assets/data/elbase.csv'
json_file_path = './src/assets/data/districtVoteResult.json'

vote_data = pd.read_csv(csv_file_path_ctks, encoding='utf-8')
district_data = pd.read_csv(csv_file_path_base, encoding='utf-8')
merged_data = pd.merge(vote_data, district_data, on=["省市","縣市", "鄉鎮市區", "村里"], how="left")
grouped = merged_data.groupby(["名稱", "候選人號次"])["得票數"].sum().reset_index()

vote_detail_data = {}
current_number = 0
for i, row in grouped.iterrows():
    current_number += 1
    if current_number == 1:
        vote_detail_data[row["名稱"]] = {}
    vote_detail_data[row["名稱"]][row["候選人號次"]] = row["得票數"]
    if current_number == 3:
        current_number = 0

with open(csv_file_path_base, 'r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    result_data = {}
    current_province_city = None #縣市
    current_district = None #區

    for row in csv_reader:
        district = row["鄉鎮市區"]
        village = row["村里"]
        name = row["名稱"]
        if name == "全國" or name == "臺灣省" or name == "福建省":
            continue
        if district == "000" and village == "0000":
            current_province_city = name
            result_data[current_province_city] = vote_detail_data[current_province_city]
            result_data[current_province_city]['district'] = {}
        elif village == "0000":
            current_district = name
            result_data[current_province_city]['district'][current_district] = vote_detail_data[current_district]
            result_data[current_province_city]['district'][current_district]["village"]={}
        else:
            result_data[current_province_city]['district'][current_district]["village"][name] = vote_detail_data[name]

with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(result_data, json_file, ensure_ascii=False, indent=2)
