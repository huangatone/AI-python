import pandas as pd
import sys





# 'qq' is column name
# 0 is row index
#date = xl['qq'][0] + xl['this'][0] + xl['that'][0]


date_list = []
sum_list = []
total_list = []

src_file_name='test.xlsx'
dst_file_name = "dst.xlsx"
src_sheet_name = "Sheet1"

if len(sys.argv) >1:
    src_file_name = sys.argv[1]

if len(sys.argv) >2:
    src_sheet_name = sys.argv[2]


xl = pd.read_excel(src_file_name,sheetname=src_sheet_name)
#xl = pd.read_excel( src_file_name, sheetname=src_sheet_name)

for i in xl.index:
    tmp = "{0},{1},{2}".format(xl['Line1'][i] , xl['Line2'][i] , xl['Line3'][i])
# 'qq' 'this' 'that is column name
# i is row index   
    count = date_list.count(tmp)
    if(count == 0):
        date_list.append(tmp)
        total_list.append(0)
        sum_list.append(0)
        
    index = date_list.index(tmp)
    total_list[index] +=1
    
    if xl['Line4'][i] > 4:
        sum_list[index] +=1
        
group_list1 = []
group_list2 = []
group_list3 = []
per_list =[]

  
for m in range(len(date_list)):
    print(date_list[m], total_list[m],sum_list[m])
    per_list.append( "{0}%".format(sum_list[m]/total_list[m]))
    g = date_list[m].split(",")
    group_list1.append(g[0])
    group_list2.append(g[1])    
    group_list3.append(g[2])

#print (date_list)
#print (total_list)
#print (sum_list)



df = pd.DataFrame({'band':group_list1,
                   'site':group_list2,
                   'date':group_list3,
                  'total':total_list,
                  'sum':sum_list})

# Create a Pandas Excel writer using XlsxWriter as the engine.
writer = pd.ExcelWriter(dst_file_name, engine='xlsxwriter')

# Convert the dataframe to an XlsxWriter Excel object.
df.to_excel(writer, sheet_name='Sheet1')

# Close the Pandas Excel writer and output the Excel file.
writer.save()