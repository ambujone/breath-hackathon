from django.conf.urls import patterns, include, url

from . import views

urlpatterns = patterns('',

        url(r'^send-message/$',
            views.SendMessageView.as_view(),
            name='send-message'),

)

    # User - RESTful Service

    # Task              Method  URL                     Accepts             Returns                 Status
    # List objects      GET     /accounts               Nothing             An array of objects     Not Implemented
    # Create an object  POST    /accounts               A single object     The saved object        Not Implemented
    # Get an object     GET     /account/<username>     Nothing             A single object         Available
    # Update an object  PUT     /account/<username>     Nothing             The saved object        Not Implemented
    # Delete an object  DELETE  /account/<username>     A single object     Nothing                 Not Implemented
