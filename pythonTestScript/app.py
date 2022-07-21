from pytrends.request import TrendReq
import pandas as pd
import numpy


'''
pytrends = TrendReq(hl='en-US', tz=0, retries=2, backoff_factor=0.5)
#pytrends = TrendReq(hl='en-US', tz=360, timeout=(10,25), proxies=['https://34.203.233.13:80',], retries=2, backoff_factor=0.1, requests_args={'verify':False})

print('Test for blockchain keyword')


kw_list = ["Blockchain", 'NFT', 'Crypto', "Bitcoin"] #More than 1 word => value is scaled to compare the different kw (only 1 term will reach 100)
pytrends.build_payload(kw_list, cat=0, timeframe='today 12-m', geo='', gprop='')

dataFrame = pytrends.interest_over_time()
print(dataFrame)
'''

df = pd.read_csv('txColl.csv')

df = df[df['Collection'].notna()]
print(df)
print(df.isna().sum())



#print(df) 
#print(df.info())
print(df.nunique())
print('\n')
print(df['Collection'].value_counts())
print('Mean: ' + str(df['Collection'].value_counts().mean()))
print('Median: ' + str(df['Collection'].value_counts().median()))
print('\n')

'''
for index, row in df.iterrows():
    #print(index)
    print(row)
'''     

dfColl = pd.DataFrame(df['Collection'].unique())
print(dfColl)
dfColl.to_csv('test.csv', header=None, index=None)




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