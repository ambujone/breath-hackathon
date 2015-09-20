
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
from django.conf import settings

from google.appengine.ext import ndb
from google.appengine.api import datastore_errors
from google.appengine.api.images import get_serving_url

from .abstract_base_models import AbstractBaseModel


class SendMessage(AbstractBaseModel):

    message_sid = ndb.TextProperty(indexed=True)
    phone_number = ndb.TextProperty(indexed=True)
    message_body = ndb.TextProperty()

# ---------
# Register the Listening Signals
# ---------
from .signals_handler import *
