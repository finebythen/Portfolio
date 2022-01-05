from django.shortcuts import render

# Create your views here.
def frontend_main(request):
    return render(request, 'frontend/main.html')

def frontend_languages(request):
    return render(request, 'frontend/languages.html')

def frontend_resume(request):
    return render(request, 'frontend/resume.html')
