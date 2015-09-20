from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
#from django.contrib import admin
#admin.autodiscover()

from .views import IndexView

urlpatterns = patterns('',

    url(r'^$', IndexView.as_view(), name='index'),
    # url(r'^', include('gae.apps.twilio_ndb.urls', namespace='twilio_ndb', app_name='twilio_ndb')),
    url(r'^', include('gae.apps.breath_ndb.urls', namespace='breath_ndb', app_name='breath_ndb')),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

)
