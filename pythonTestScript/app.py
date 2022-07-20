from pytrends.request import TrendReq

pytrends = TrendReq(hl='en-US', tz=0, retries=2, backoff_factor=0.5)
#pytrends = TrendReq(hl='en-US', tz=360, timeout=(10,25), proxies=['https://34.203.233.13:80',], retries=2, backoff_factor=0.1, requests_args={'verify':False})

print('Test for blockchain keyword')


kw_list = ["Blockchain", 'NFT', 'Crypto', "Bitcoin"] #More than 1 word => value is scaled to compare the different kw (only 1 term will reach 100)
pytrends.build_payload(kw_list, cat=0, timeframe='today 12-m', geo='', gprop='')

dataFrame = pytrends.interest_over_time()
print(dataFrame)


'''
EXTRA DATA
print(pytrends.related_queries().values())
print(pytrends.related_topics().values())
'''