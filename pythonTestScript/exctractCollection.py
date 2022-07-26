from pytrends.request import TrendReq
import pandas as pd
import numpy
import math
import time

df = pd.read_csv('reducedTxColl.csv')


df = df['Collection'].unique()
print(len(df))

df = pd.DataFrame(df, columns = ['Collection'])

df.to_csv('test.csv', header=False, index=False)



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