
from django.http import Http404
from django.core.urlresolvers import reverse
from django.conf import settings
from django.utils.translation import ugettext_lazy as _

from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework import views

from twilio.rest import TwilioRestClient

from google.appengine.ext import blobstore
from google.appengine.ext import ndb
from google.net.proto import ProtocolBuffer

from .serializers import SendMessageSerializer

# from ..models import Subscription as SubscriptionModel


class SendMessageView(views.APIView):

    # def get_queryset(self, queryset=[0]):
    #     q = self.request.GET.get('q', None)
    #     # Quick workaround.. not sending the list to front end just the total lenght in a list
    #     count = SubscriptionModel.query().count()
    #     queryset[0] = count
    #     return queryset

    # def get(self, request, format=None, *args, **kwargs):
    #     self.queryset = subscriptions = self.get_queryset()
    #     #serializer = SubscriptionSerializer(subscriptions, many=True)
    #     return Response(subscriptions, status.HTTP_200_OK)

    def post(self, request, format=None, *args, **kwargs):
        serializer = SendMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


