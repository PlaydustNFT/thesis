from pyparsing import replaceWith
from pyrsistent import v
from pytrends.request import TrendReq
import pandas as pd
import numpy as np
import math
import time
pd.set_option('display.float_format', lambda x: '%.0f' % x)

df2 = pd.read_csv('./file/reducTxCollTrend.csv')

df3 = df2.sort_values(['Collection', 'Timestamp'],
              ascending = [True, True])
df = df3.reset_index(drop=True)

counter = 0
j = df.columns.get_loc('Price')
c = df.columns.get_loc('Collection')

for row in df.itertuples():
    for i in range(1,11): 
        previous = 0
        if row.Index - i >= 0 and row[c+1] == df.iat[row.Index - i, c]:
            previous = df.iat[row.Index - i, j]
        df.at[row.Index, 'Price' + '-' + str(i)] = previous


    # if row.Index > 0:
    #     previous = df.iat[row.Index - 1, j]
    #     #print(df.iat[row.Index - 1, j])
    # df.at[row.Index, 'lastPrice'] =  previous
    counter = counter + 1
    if counter % 10000 == 0:
        print(counter)

df['CollectionTrend'] = df['CollectionTrend'].fillna(-1).astype(np.int64)
df['Price-1'] = df['Price-1'].fillna(0).astype(np.int64)
df['Price-2'] = df['Price-2'].fillna(0).astype(np.int64)
df['Price-3'] = df['Price-3'].fillna(0).astype(np.int64)
df['Price-4'] = df['Price-4'].fillna(0).astype(np.int64)
df['Price-5'] = df['Price-5'].fillna(0).astype(np.int64)
df['Price-6'] = df['Price-6'].fillna(0).astype(np.int64)
df['Price-7'] = df['Price-7'].fillna(0).astype(np.int64)
df['Price-8'] = df['Price-8'].fillna(0).astype(np.int64)
df['Price-9'] = df['Price-9'].fillna(0).astype(np.int64)
df['Price-10'] = df['Price-10'].fillna(0).astype(np.int64)



'''
print(df.head(50))
print(df.tail(50))


df.loc[0, 'lastPrice'] = 0

for i in range(1, len(df)):
    df.loc[i, 'lastPrice'] = df.loc[i-1, 'Price']
'''

df = df.drop('Unnamed: 0', axis=1)
print(df.head(50))
print(df.dtypes)
#print(df.tail(50))

df.to_csv('txCollTrendTimeseries.csv')