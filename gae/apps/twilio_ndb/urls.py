
from django.conf.urls import patterns, include, url


urlpatterns = patterns('',


            url(r'^api/', include('gae.apps.twilio_ndb.api.urls')),


)