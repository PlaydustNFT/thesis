from pyparsing import replaceWith
from pytrends.request import TrendReq
import pandas as pd
import numpy
import math
import time

df2 = pd.read_csv('collMetadata.csv')
df = pd.read_csv('reducedTxColl.csv')
df = df.drop('Unnamed: 0', axis=1)
trends = pd.read_csv('./file/trendsNegative.csv')

df = df[df['Collection'].notna()]
#print(df.isna().sum())

df = pd.merge(df, df2, how='inner', on = 'Collection')
print(df.head(20))
print(trends)


#print(df) 
#print(df.info())
print(df.nunique())
print('\n')
#print(df['Collection'].value_counts())
#print(df2['Collection'].value_counts())
print('Mean: ' + str(df['Collection'].value_counts().mean()))
print('Median: ' + str(df['Collection'].value_counts().median()))
print('\n')




counter = 0
for index, row in df.iterrows():
    #print(row['Timestamp'])
    # print(index)
    # print(row)
    if pd.isnull(row['Name']) or row['Name'] == '' or row['Name'] not in trends.columns:
        row['CollectionTrend'] = -1
        #print('zerooo')
    else:
        for index2, row2 in trends.iterrows():
            # print('\n')
            # print(index2)
            # print('\n')
            # print(row2)
            # print('\n')
            # print(row2['date'])
            
            #print(row2.Index)
            #print((pd.to_datetime(row2.Index) - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s'))
            if row['Timestamp'] >= (pd.to_datetime(row2['date']) - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s'):
                df.at[index, 'CollectionTrend'] = row2[row['Name']]
            else:
                break
            
    counter = counter + 1
    if counter % 1000 == 0:
        print(counter)


#print(df.head(50))
df = df.drop('Name', axis=1)
df = df.drop('Symbol', axis=1)

print(df.head(20))

df.to_csv('reducTxCollTrend.csv')










'''
coll1 = map[tmpColl]
print(coll1)
print(coll1.index)
print(coll1.dtypes)
print('\n')
for row2 in coll1.itertuples():
    #print(row2)
    #print('\n')
    if (row2[0] - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s') >= (pd.to_datetime(['2022-02-20']) - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s'):
        print(row2[1])
        break
'''







#print(counter)















'''
for index, row in df.iterrows():
    #print(index)
    print(row)
'''     

'''
dfColl = pd.DataFrame(df['Collection'].unique())
print(dfColl)
dfColl.to_csv('test.csv', header=None, index=None)
'''

#print(df.isna().sum())
#print(df.sort_values(by='Timestamp', ascending=True).head(200))

'''
df2 = df[df['Collection'].notna()]
print(df2)
print(df2.isna().sum())
'''

'''
JUST NAN collection value!
print('\n')
nan_values = df[df['Collection'].isna()]
print(nan_values)

print(nan_values.nunique())
uniqueMints = pd.DataFrame(nan_values["TokenMintAccount"].unique())
uniqueMints.to_csv('test.csv', header=None, index=None)
'''




'''
EXTRA DATA
print(pytrends.related_queries().values())
print(pytrends.related_topics().values())
'''