import pandas as pd
import sys
import matplotlib.pyplot as plt

#open a file
excel_file = '0423.xlsx'
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
    dt = pd.to_datetime(x3['Day'][i])
    #get the week number from the day column
    s = dt.strftime("%U")



