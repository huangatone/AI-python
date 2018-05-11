import pandas as pd
import sys
from datetime import date
import matplotlib.pyplot as plt
from PIL import Image

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
group_columns = ['Group','Sector']
sectors = ['Alpha','Beta','Gamma']
#设定日期列
date_column = 'Date'
#这里设定数值列 
data_column = 'Value'

#这里指定保存数据的变量
date_list = {}

#保存最总 Alfra，betal，gamma
final_data_map = {}

    
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

#计算 Alpha Beta， Gamma小于.7的百分比
for key,value in date_list.items():
    #print( key , "= ", value)
    arr = value.split(",")
    #print(arr)
    #print(float(arr[0]))
    n1 = 0
    n2 = 0
    n3 = 0
    for nnn in arr:
        v = float(nnn)
        if(v < 70):
            n1 +=1
        elif(v<80):
            n2 += 1
        else:
            n3 += 1
            
    #print(n1,n2,n3)
    
    #保存<70数字的百分比  
    key_arr = key.split(",")
    final_key = key_arr[0] + "," + key_arr[2]
    all_key = final_data_map.keys()
    if(  final_key in all_key):
        exist_dict = final_data_map[final_key]
        exist_dict[key_arr[1]] = n1/(n1+n2+n3)
        final_data_map[final_key] = exist_dict
    else:   
        exist_dict = {}
        exist_dict[key_arr[1]] = n1/(n1+n2+n3)
        final_data_map[final_key] =exist_dict


#取每个分组，同一周的三个值
for key,value in final_data_map.items():
    # Data to plot
    print("final", value)
    dd = value
    n1 = dd[ sectors[0] ]
    n2 = dd[ sectors[1] ]
    n3 = dd[ sectors[2] ]
    
    labels = [] 
    colors = []
    index = 0
    for s in sectors:
        labels.append(s)
        n1 = dd[s]        
        if(n1 < 0.7):
            colors.append("green")
        elif(n1 <0.8):
            colors.append("yellow")
        else:
            colors.append( "red")
        

        
    exp = (0.2, 0.2, 0.2, 0.2)  # explode 1st slice
    y = [10,10,10]
    #plt.subplot(adddd )
    patches = plt.pie(y, labels=labels, colors=colors,autopct='%1.1f%%', shadow=True, startangle=90)
   
    
    plt.axis('equal')
    plt.legend( labels, loc="3")
   
    plt.title(key)
    plt.savefig(key + '.png')
    Image.open(key +'.png').save(key +'.png','png')
    plt.tight_layout()
    plt.show()