import pandas as pd
import folium
from folium.plugins import HeatMap
from folium.features import DivIcon
import requests
from requests.auth import HTTPBasicAuth
from datetime import date
import matplotlib.pyplot as plt
from PIL import Image
import os
import sys
import json
import time
#read from coIoT server

response = requests.get('https://coiotehub.avsystem.com:8087/api/ump/v3/cachedDataModels/866425030420212?parameters=Location.0.Latitude%2CLocation.0.Longitude%2CConnectivity%20Monitoring.', auth=HTTPBasicAuth('username', 'pass'))

mlat = 0
mlng = 0
mrsrp = 0
mcell = 0
content = json.loads(response.text)
for i in range (len(content)):
    
    if (content[i]['name'] == 'Location.0.Latitude'):
        mlat = content[i]['value']
    if (content[i]['name'] == 'Location.0.Longitude'):
        mlng = content[i]['value']
    if (content[i]['name'] == 'Connectivity Monitoring.0.Radio Signal Strength'):
        mrsrp = content[i]['value']
    if (content[i]['name'] == 'Connectivity Monitoring.0.Cell ID'):
        mcell = content[i]['value']

c_id = int(mcell)
h_id = str( hex(c_id) )
hh_id = h_id[0:7]
hh_sid = h_id[7:9]

senb_id = int(hh_id,16)
scell_id = int(hh_sid,16)

#print (mlat, mlng, mrsrp, mcell)
#mark LTE-M enb on the map
enb_clr = 'blue'
iot_clr = 'red'
colorborder = 'None'
perccolor = "#CF2828"
lineweight = 2.5

map_iot = folium.Map(location=[43.643794, -79.613486], tiles='cartodbpositron',zoom_start=10)

xl = pd.read_excel('Geo_eMTC_RollOut_H&N_origin.xlsx')

for i in xl.index:
    
    elat = float(xl['Lat'][i])
    elng = float(xl['Long'][i])
    enum = xl['ENUM'][i]
    folium.CircleMarker([elat,elng],popup= str(enum), radius=5,fill_opacity=1,
                        fill_color=enb_clr,color=colorborder,fill=True).add_to(map_iot)
    if (xl['ENODEBID'][i] == senb_id ):
        folium.PolyLine(locations=[[float(mlat),float(mlng)],[elat,elng]],color=perccolor,weight=lineweight).add_to(map_iot)
        
folium.CircleMarker([float(mlat),float(mlng)],popup= "RSRP =" + str(mrsrp), radius=5,fill_opacity=1, fill_color=iot_clr,color=colorborder,fill=True).add_to(map_iot)

map_iot.save('GOA_ltem_live.html')   
