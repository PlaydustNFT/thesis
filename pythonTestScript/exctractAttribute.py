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
df = pd.read_csv('part_05')


#print(df.head(20))


newColumns = create_attribute_columns(df['Attributes'])

for row in range(0, len(newColumns)):
    #print (attributes)
    #row = 0
    counter = 1
    for value in newColumns[row]:
        df.loc[row, 'Trait'+ str(counter)] = value
        #df['Trait'+ str(counter)] = value
        counter = counter + 1

    if row%10000 == 0:
        print (row)
    #row = row + 1
    #break

df.to_csv('part_05Result.csv')
print(df.head(50))
print(df.tail(50))
