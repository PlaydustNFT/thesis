from multiprocessing.sharedctypes import Value
from pyparsing import replaceWith
from pytrends.request import TrendReq
import pandas as pd
import numpy
import math
import time
pd.options.mode.chained_assignment = None  # default='warn'


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


def create_attribute_columns(column):
    newColumns = []
    for i in column:
        #print(i)
        #False = trait/column name -> we don't care
        #True = trait value -> this is our category
        mode = False
        attributes = []
        tmp = ''
        for j in i:
            if j == ':':
                mode = True
                continue
            if j == ',':
                mode = False
                attributes.append(tmp)
                tmp = ''
                continue

            if mode:
                tmp = tmp + j
        attributes.append(tmp)
        #print(attributes)
        newColumns.append(attributes)
    #print(newColumns)
    #print(len(newColumns))
    #print(len(newColumns[0]))
    return newColumns
        

        
        

        


df = pd.read_csv('pocket_godz.csv')

print(df.head(20))


newColumns = create_attribute_columns(df['Attributes'])

for row in range(0, len(newColumns)):
    #print (attributes)
    #row = 0
    counter = 1
    for value in newColumns[row]:
        df.loc[row, 'Trait'+ str(counter)] = value
        #df['Trait'+ str(counter)] = value
        counter = counter + 1
    #row = row + 1
    #break


print(df)
