import pandas as pd
import sys
import matplotlib.pyplot as plt
import numpy as np

#open a file
excel_file = 'sample.xlsx'
xl = pd.read_excel(excel_file)

#list all columns = first row.
print( xl.keys())

#Get size. = rows and cols
print (xl.shape)

#preview first 20 rows.
print(xl.head(20))

#read all table
for i in xl.index:
	#'Day' is in the first row(one of them)
    dt = pd.to_datetime(xl['OrderDate'][i])
    #get the week number from the day column
    s = dt.strftime("%U")





#clone a datafarame add week column to datafarame
df = pd.DataFrame(xl )
weeks = []

#get week index from date
for i in xl.index:
    dt = pd.to_datetime(xl['OrderDate'][i])
    s = dt.strftime("%U")
    weeks.append( s)

df['week'] = weeks

#save to a local file
df.to_excel('output123.xlsx')

#create subset with some of those column
x3 = xl[['OrderDate', 'Region','Rep','Item']]

#create new column with two columns

x3['Group'] = xl['Units'].astype(str) + ',' + xl['UnitCost'].astype(str) + ',' + xl['Total'].astype(str)
#preview new excel container  
print (x3.shape)
print(x3.head(20))


#get all rows in condition
sub_set = df[ (df['Region']=='East') & (df['Item']=='Pencil')  ]

#get the number of some rows
threhold_count = df[ (df['Region']==East)  ].shape[0]


#get items of a column
print(df['Region'].unique())
