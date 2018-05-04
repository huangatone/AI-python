import pandas as pd
import sys
from datetime import date
import matplotlib.pyplot as plt


#这里指定excel文件
src_file_name='test2018.xlsx'
#这里指定表格名
src_sheet_name = "sheet1"

if len(sys.argv) >1:
    src_file_name = sys.argv[1]

if len(sys.argv) >2:
    src_sheet_name = sys.argv[2]
    
xl = pd.read_excel('test-2018.xlsx') #默认打开第一表格
#xl = pd.read_excel( src_file_name, sheetname=src_sheet_name)

#这里设定列(columns)
group_columns = ['Group','Team']

#设定日期列
date_column = 'Date'
#这里设定数值列 
data_column = 'Value'

#这里指定保存数据的变量
date_list = {}
sum_list = []
total_list = []

    
#开始读数据，一行一行读
for i in xl.index:
    tmp = ""
    for j in group_columns:
        if(tmp != ""):
            tmp = tmp + ","
        tmp = tmp  + xl[j][i]
    #print(xl[date_column][i])
    dt = pd.to_datetime(xl[date_column][i])
    weekNumber = dt.isocalendar()[1]
    tmp = tmp + ","+ str(weekNumber)
   
    
    all_key = date_list.keys()
    if(  tmp in all_key):
       
        date_list[tmp] = date_list[tmp] + "," +str ( xl[data_column][i] ) 
    else:
        
        date_list[tmp] =str ( xl[data_column][i] ) 
innnn = 0
total = len(date_list)

for key,value in date_list.items():
    #print( key , "= ", value)
    arr = value.split(",")
    #print(arr)
    print(float(arr[0]))
    n1 = 0
    n2 = 0
    n3 = 0
    for nnn in arr:
        v = float(nnn)
        if(v < 75):
            n1 +=1
        elif(v<80):
            n2 += 1
        else:
            n3 += 1
            
    print(n1,n2,n3)
    y = [n1,n2,n3]
    adddd = 291 + innnn
    plt.subplot(adddd )
    plt.pie(y)
    plt.title("pie")
    innnn +=1
    plt.title("imshow")

plt.show()