# import libraries
# -*- coding: UTF-8 -*-
from bs4 import BeautifulSoup
import json
import sys
import datetime
#python 3
from urllib.request import Request, urlopen
#python 2
import urllib
#import urllib2




def find_web(s_address):
    #python 2
    #page = urllib2.urlopen(s_address)
    #python 3
   
    req = Request( s_address, headers={'User-Agent': 'Mozilla/5.0'})
    page = urlopen(req).read()

    # parse the html using beautiful soup and store in variable `soup`
    soup = BeautifulSoup(page, 'html.parser')

    # Take out the <div> of name and get its value
    page_list = soup.find('div', attrs={'class': 'item-list'})
     

    print("next ------------------")
    list1 = soup.findAll('span', {'class':"views-field views-field-title"})
    for l in list1:
        print("Result: - ")
        #print(l)
        print(l.find('a').get('href'))
   

   
        
        
print ("你好，世界");
s="史海漫步"
s=urllib.parse.quote(s)
print(s)
url='https://botanwang.com/taxonomy/%s.html'%(s)
print(url)

find_web(url)  


print ("end job")
    
if __name__ == "__main__":
    if len(sys.argv) > 1:
        find_web(sys.argv[1])