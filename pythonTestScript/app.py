from pyparsing import replaceWith
from pytrends.request import TrendReq
import pandas as pd
import numpy
import math
import time

df2 = pd.read_csv('collMetadata.csv')

df = pd.read_csv('reducedTxColl.csv')

df = df[df['Collection'].notna()]
#print(df.isna().sum())

df = pd.merge(df, df2, how='inner', on = 'Collection')
print(df.head(20))
print(df2.head(20))


#print(df) 
#print(df.info())
print(df.nunique())
print('\n')
#print(df['Collection'].value_counts())
#print(df2['Collection'].value_counts())
print('Mean: ' + str(df['Collection'].value_counts().mean()))
print('Median: ' + str(df['Collection'].value_counts().median()))
print('\n')


pytrends = TrendReq(hl='en-US', tz=0, retries=2, backoff_factor=5)
map = {}
counter = 0
kw_list = ['Pocket Godz'] #More than 1 word => value is scaled to compare the different kw (only 1 term will reach 100)
pytrends.build_payload(kw_list, cat=0, timeframe='today 12-m', geo='', gprop='')
trends = pytrends.interest_over_time()
print(trends)
print(trends.columns)
print(trends.index)
trends = trends.drop('isPartial', axis=1)

for index, row in df2.iterrows():
    if pd.isnull(row['Name']) or row['Name'] == '':
        counter = counter + 1
        continue
    else:
        kw_list = [row['Name']] #More than 1 word => value is scaled to compare the different kw (only 1 term will reach 100)
        pytrends.build_payload(kw_list, cat=0, timeframe='today 12-m', geo='', gprop='')

        #map[row['Name']] = pytrends.interest_over_time()   
        result = pytrends.interest_over_time()
        print(result)
        if not(result.empty):
            trends[row['Name']] = result[row['Name']]
        else:
            trends[row['Name']] = -1

        print(row['Name'])
        trends.to_csv('trendsNegative.csv')
    
    
    counter = counter + 1
    print(counter)
    time.sleep(1)

    #if counter % 50 == 0:
    #   time.sleep(60)
    
print(trends.columns)

'''
for index, row in df.iterrows():
    #print(row['Timestamp'])
    if pd.isnull(row['Name']) or row['Name'] == '' or map[row['Name']].empty :
        row['CollectionTrend'] = 0
        print('zerooo')
    else:
        collData = map[row['Name']]
        #print(collData)
        for row2 in collData.itertuples():
            #print(row2.Index)
            #print((pd.to_datetime(row2.Index) - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s'))
            if row['Timestamp'] >= (pd.to_datetime(row2.Index) - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s'):
                df.at[index, 'CollectionTrend'] = row2[1]
            else:
                break


#print(df.head(50))
df = df.drop('Name', axis=1)
df = df.drop('Symbol', axis=1)
print(df.head(50))

df.to_csv('reducTxCollTrend.csv')


'''







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