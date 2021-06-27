import pandas as pd
import numpy as np
import json

def getRankList(series, n):
    rankList = []
    cur = series.min()
    while cur < series.max():
        cur += (series.max() - series.min())/n
        rankList.append(cur)
    return rankList

def ranking(data, rankList):
    for index, element in enumerate(rankList):
        if data < element:
            return index
        elif index == len(rankList) - 1:
            return index

def getCountingList(series, n):
    rankList = getRankList(series, n)
    countingList = [0] * n
    for element in series:
        countingList[ranking(element, rankList)] += 1
    return countingList

if __name__ == '__main__':
  with open('./Downloads/육군 신체측정 데이터(수시 업데이터).json', 'r', encoding='utf-8') as j:
      data = json.load(j)
      df = pd.DataFrame(data['DATA'])
      df = df[['statur_cm', 'weight_kg']]
      df['statur_cm'] = df['statur_cm'].str.replace(' cm', '')
      df['height'] = pd.to_numeric(df['statur_cm'])
      df['weight_kg'] = df['weight_kg'].str.replace(' kg', '')
      df['weight'] = pd.to_numeric(df['weight_kg'])
      result = df[['weight', 'height']].copy()
      result['bmi'] = result['weight']/((result['height']/100)**2).copy()
      result = result[result['weight'] != 0]
      dic={}
      for index in result:
          dic[index] = {'rank': getRankList(result[index], 15),'result': getCountingList(result[index], 15)}
      with open('./src/processedData.json', 'w') as f:
          f.write(json.dumps(dic))