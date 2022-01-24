from django.shortcuts import render
import folium
import numpy as np
import pandas as pd
import requests

from .api import api_key
from .functions import get_list_hours

URL = "https://api.openweathermap.org/data/2.5/onecall"


def result(request, adr, lat, lon):
    # convert geo addresses
    geo_lat = float(lat)
    geo_lon = float(lon)

    # use requests to get weather data from 'api.openweathermap.org'
    PARAMS = {
        "lat": geo_lat,
        "lon": geo_lon,
        "appid": api_key
    }
    response = requests.get(url=URL, params=PARAMS)
    response.raise_for_status()
    data = response.json()

    # weather alerts
    try:
        dict_alerts = data["alerts"][0]
        str_alert_from = dict_alerts.get("sender_name", "-")
        str_alert_event = dict_alerts.get("event", "-")
        str_alert_msg = dict_alerts.get("description", "-")
    except KeyError:
        str_alert_from, str_alert_event, str_alert_msg = "-", "-", "-"

    # convert json to dataframe
    df = pd.json_normalize(data["hourly"])
    df_header = [item for item in df.columns]

    # edit dataframe
    df["rain.1h"] = df["rain.1h"].replace(np.nan, 0) if "rain.1h" in df_header else 0

    # filter for 24 instead of given 48 hours
    df = df.head(24)

    # extract needed informations as lists
    l_temp_kelvin = df["temp"].tolist()
    l_temp_celcius = [ele - 273.15 for ele in l_temp_kelvin]
    l_temp_celcius = [round(item, 0) for item in l_temp_celcius]
    l_rain_amount = df["rain.1h"].tolist()
    l_wind_speed = df["wind_speed"].tolist()
    l_wind_speed = [int(round(item * 3.6, 0)) for item in l_wind_speed]
    l_pop = df["pop"].tolist()
    l_pop = [int(round(ele * 100, 0)) for ele in l_pop]
    temp_min = min(l_temp_celcius) - 5
    temp_max = max(l_temp_celcius) + 5

    # create list of next 48 hours
    l_list_hours = get_list_hours()

    # create map (folium) and add marker
    m = folium.Map(location=[geo_lat, geo_lon], zoom_start=14, control_scale=True)
    folium.Marker([geo_lat, geo_lon], popup=adr).add_to(m)
    m = m._repr_html_()

    context = {
        "alert_from": str_alert_from, "alert_event": str_alert_event, "alert_msg": str_alert_msg, "map": m,
        "temp_celcius": l_temp_celcius, "rain_amount": l_rain_amount, "wind_speed": l_wind_speed, "pop": l_pop,
        "address": adr, "l_list_hours": l_list_hours, "geo_lat": geo_lat, "geo_lon": geo_lon,
        "temp_min": temp_min, "temp_max": temp_max
    }
    return render(request, 'app_weather/result.html', context)