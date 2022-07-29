import pandas as pd

def create_attribute_columns(column):
    newColumns = []
    c = 0
    for i in column:
        if(pd.isna(i)):
            newColumns.append([])
            continue
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
        c = c + 1
        if c%100000 == 0:
            print (c)
    #print(newColumns)
    #print(len(newColumns))
    #print(len(newColumns[0]))
    return newColumns
        

        
#       
#   DIVIDE CSV INTO MULTIPLE FILES OTHERWISE IT WILL KILL THE PROCESS!
#        

# df = pd.read_csv('reducedTxColl.csv')
# df = pd.read_csv('pocket_godz.csv')
# df = df.drop('Unnamed: 0.1' ,axis =1)
# df = df.drop('Unnamed: 0' ,axis =1)
df = pd.read_csv('part_00Result.csv')
df1 = pd.read_csv('part_01Result.csv')
df2 = pd.read_csv('part_02Result.csv')
df3 = pd.read_csv('part_03Result.csv')
df4 = pd.read_csv('part_04Result.csv')
df5 = pd.read_csv('part_05Result.csv')




print(df)
print(df1)

df = df.append(df1, ignore_index=True)
df = df.append(df2, ignore_index=True)
df = df.append(df3, ignore_index=True)
df = df.append(df4, ignore_index=True)
df = df.append(df5, ignore_index=True)




df = df.drop('Unnamed: 0.1' ,axis =1)
df = df.drop('Unnamed: 0' ,axis =1)
print(df)
