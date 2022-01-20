from django.shortcuts import render
from django.http import HttpResponse
from openpyxl import Workbook
from openpyxl.writer.excel import save_virtual_workbook
import datetime as dt

# Create your views here.
def index(request):
    return render(request, 'app_grocery_store/index.html')


def export_xls(request):
    wb = Workbook()

    response = HttpResponse(content=save_virtual_workbook(wb), content_type='application/ms-excel')
    response['Content-Disposition'] = f'attachment; filename=ExportedExcel-{dt.datetime.now().strftime("%Y%m%d%H%M")}.xlsx'
    return response