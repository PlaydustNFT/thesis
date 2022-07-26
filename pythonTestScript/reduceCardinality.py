from pytrends.request import TrendReq
import pandas as pd
import numpy
import math
import time
from collections import Counter


def cumulatively_categorise(column,threshold=0.85,return_categories_list=True):
  #Find the threshold value using the percentage and number of instances in the column
  threshold_value=int(threshold*len(column))
  #Initialise an empty list for our new minimised categories
  categories_list=[]
  #Initialise a variable to calculate the sum of frequencies
  s=0
  #Create a counter dictionary of the form unique_value: frequency
  counts=Counter(column)

  #Loop through the category name and its corresponding frequency after sorting the categories by descending order of frequency
  for i,j in counts.most_common():
    #Add the frequency to the global sum
    s+=dict(counts)[i]
    #Append the category name to the list
    categories_list.append(i)
    #Check if the global sum has reached the threshold value, if so break the loop
    if s>=threshold_value:
      break
  #Append the category Other to the list
  categories_list.append('Other')

  #Replace all instances not in our new categories by Other  
  new_column=column.apply(lambda x: x if x in categories_list else 'Other')

  #Return transformed column and unique values if return_categories=True
  if(return_categories_list):
    return new_column,categories_list
  #Return only the transformed column if return_categories=False
  else:
    return new_column





df = pd.read_csv('txColl.csv')

df = df[df['Collection'].notna()]
#print(df.isna().sum())

print(df)
#create_attribute_columns(df['Attributes'])


#print(df) 
#print(df.info())
print(df.nunique())
print('\n')
print(df['Collection'].value_counts())
#print(df2['Collection'].value_counts())
print('Mean: ' + str(df['Collection'].value_counts().mean()))
print('Median: ' + str(df['Collection'].value_counts().median()))
print('\n')


#df.to_csv('reducedCard.csv')




#Call the function with a default threshold of 75%
transformed_column,new_category_list=cumulatively_categorise(df['Collection'],return_categories_list=True)

print('\n')
print(len(new_category_list))
print('\n')
print('\n')
df = df.drop('Collection', axis=1)
df = df.assign(Collection = transformed_column)
print(df['Collection'])
print('\n')
print(df)
print('\n')
#print(df['Collection'].value_counts())
#print(df2['Collection'].value_counts())
print(df['Collection'].value_counts())
print('Mean: ' + str(df['Collection'].value_counts().mean()))
print('Median: ' + str(df['Collection'].value_counts().median()))

print('\n')
print(df.nunique())

df = df[df.Collection != 'Other']

print('\n')
print('Mean: ' + str(df['Collection'].value_counts().mean()))
print('Median: ' + str(df['Collection'].value_counts().median()))
print(df.nunique())
print(df)

df.to_csv('reducedTxColl.csv')

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