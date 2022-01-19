from django.shortcuts import render, redirect
import certifi
import ssl
import geopy.geocoders
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError
from django.core.exceptions import ImproperlyConfigured


def frontend_main(request):
    # App: Weather
    if request.method == "POST" and "btn-weather-location" in request.POST:
        search_text = request.POST.get('input-weather-location', None)
        if search_text is not None and len(search_text) > 0:
            try:
                # get coordinates from given address
                ctx = ssl.create_default_context(cafile=certifi.where())
                geopy.geocoders.options.default_ssl_context = ctx

                geolocator = Nominatim(scheme='http', user_agent="frontend")
                location = geolocator.geocode(search_text, timeout=5)
                geo_lat, geo_lon = str(location.latitude), str(location.longitude)

                return redirect("app-weather-result", search_text, geo_lat, geo_lon)
            except (AttributeError, GeocoderTimedOut, GeocoderServiceError, ImproperlyConfigured, KeyError, TypeError) as e:
                print(f"Error: geocode failed on input with message: {e}")
                return redirect("frontend-main")

    return render(request, 'frontend/main.html')