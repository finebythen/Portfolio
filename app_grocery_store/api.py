from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Einkaufsliste
from .serializers import *
from frontend.functions import get_user_name