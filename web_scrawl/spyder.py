# import libraries

from bs4 import BeautifulSoup
import json
import sys
import datetime
#python 3
from urllib.request import urlopen 
#python 2
#import urllib2

import xlsxwriter

ss = datetime.datetime.now().strftime("%Y-%m-%d-%H%M%S")

workbook = xlsxwriter.Workbook('house-'+ ss+'.xlsx')
#global worksheet
worksheet = workbook.add_worksheet()
txt_file = open('house-'+ ss+'.txt','w') 

allrow = 0

def write_excel(sheet, text, url,row ):
    words2 = text.split('/')
    col = 0
    for s in words2:
        sheet.write(row, col, s)
        col +=1
    print(row)
    print(col)
    sheet.write(row, col, url)
    global txt_file
    txt_file.write(text)
    txt_file.write('\n')
    txt_file.write(url)
    txt_file.write('\n')
    return

def find_houses( str ):
    global allrow
    global worksheet
    #python 2
    #page = urllib2.urlopen(str)
    #python 3
    page = urlopen(str)
    # parse the html using beautiful soup and store in variable `soup`
    soup = BeautifulSoup(page, 'html.parser')

    # Take out the <div> of name and get its value
    box_list = soup.find_all('li', attrs={'class': 'clear'})

    for box in box_list:
        print (box.text)# strip() is used to remove starting and trailing
        idl = box.find('a')
        u1 = idl.get('href')
        #id = idl.split('/')[4]
        print(u1)
        write_excel(worksheet,box.text, u1,allrow)
        allrow +=1
        #print (box.name)# strip() is used to remove starting and trailing
    return

def find_web(s_address):
    #python 2
    #page = urllib2.urlopen(s_address)
    #python 3
    page = urlopen(s_address)
    # parse the html using beautiful soup and store in variable `soup`
    soup = BeautifulSoup(page, 'html.parser')

    # Take out the <div> of name and get its value
    page_list = soup.find('div', attrs={'class': 'page-box house-lst-page-box'})
    u_head = "https://bj.lianjia.com/"
    u12 = page_list.get('page-url')
    u13 = page_list.get('page-data')

    obj = json.loads(u13)  
    for distro in obj:
        print(distro)

    print(obj["totalPage"])
    print(obj["curPage"])

    total = obj["totalPage"]
    for i in range(1,total+1):
        find_houses (u_head + u12.replace("{page}",str(i)))
    return

if __name__ == "__main__":
    print("start job:")
    if len(sys.argv ) == 1:
        find_web("https://bj.lianjia.com/ershoufang/chaoyang/bp200ep250ba0ea20000/")  
    else:
        find_web(sys.argv[1])
    workbook.close()
    txt_file.close()
    print("end job")