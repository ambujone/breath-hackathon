
import json
import datetime
import logging

from collections import OrderedDict

from django.utils.translation import ugettext_lazy as _
from django.conf import settings

from twilio.rest import TwilioRestClient

from rest_framework import serializers

from ..models import SendMessage as SendMessageModel

class SendMessageSerializer(serializers.Serializer):
    message_sid = serializers.ReadOnlyField()
    phone_number = serializers.CharField(max_length=15)
    message_body = serializers.CharField(max_length=150)

    def validate(self, data):
        return data

    def create(self, validated_data):
        # Your Account Sid and Auth Token from twilio.com/user/account
        account_sid = settings.TWILIO_ACCOUNT_SID
        auth_token  = settings.TWILIO_AUTH_TOKEN
        client = TwilioRestClient(account_sid, auth_token)

        phone_number = validated_data.get('phone_number', None)
        message_body = validated_data.get('message_body', None)
        app_number = settings.TWILIO_APP_NUMBER

        message = client.messages.create(body=message_body,
            to=phone_number,    # Replace with your phone number
            from_=app_number) # Replace with your Twilio number

        message = SendMessageModel(id=message.sid, **validated_data)
        message.put()
        return message

    #
    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.message = validated_data.get('message', instance.message)
    #     instance.put()
    #     return instance

