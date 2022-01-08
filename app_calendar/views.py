from django.shortcuts import render

# Create your views here.
def app_calendar_index(request):
    return render(request, 'app_calendar/index.html')
