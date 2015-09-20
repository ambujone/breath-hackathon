import os

from django.views.generic import TemplateView

class IndexView(TemplateView):
    if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine') or os.getenv('SETTINGS_MODE', '') in ['PRODUCTION']:
        template_name = 'index_dist.html'
    else:
        template_name = 'index.html'