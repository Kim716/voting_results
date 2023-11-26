import csv
import json

csv_file_path = './src/assets/data/elbase.csv'
json_file_path = './src/assets/data/district.json'

with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)

    result_data = {}

    current_province_city = None #縣市
    current_district = None #區
    current_province_city_data = None #{}
    current_district_data = None #[]

    for row in csv_reader:
        district = row["鄉鎮市區"]
        village = row["村里"]
        name = row["名稱"]

        if name == "全國" or name == "臺灣省" or name == "福建省":
            continue

        if district == "000" and village == "0000":
            current_province_city = name
            current_province_city_data = {}
            result_data[current_province_city] = current_province_city_data
            current_district_data = None
        elif village == "0000":
            current_district = name
            current_district_data = []
            if current_province_city_data is not None:
                current_province_city_data[current_district]= current_district_data
        else:
            if current_district_data is not None:
                current_district_data.append(name)

with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(result_data, json_file, ensure_ascii=False, indent=2)
