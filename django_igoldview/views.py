from django.shortcuts import render

from django.shortcuts import render, render_to_response, HttpResponse, redirect
from django.http import JsonResponse
import datetime, timeago, time
import pymongo

# Create your views here.
#

uri = "mongodb://192.168.1.104:27017/config"
client = pymongo.MongoClient(uri)
db = client['config']
collect0 = db['html_options']
switch_db = collect0.find({})
switchers = []
for i in switch_db:
    switcher = i['switcher']
    switcher1 = i['switcher1']


def index(request):
    return render(request, 'index.html')


def update_errors(request):
    collect = db['wonderful']

    errors, ings = [], []
    cta = collect.find({})
    re_json = {}
    for options in cta:
        re_json[options['_id']] = options
        for test_option in options:
            if test_option == '_id':
                pass
            else:
                try:
                    if options[test_option][0] == "error":
                        errors.append(test_option)
                    elif options[test_option][0] == "":
                        ings.append(test_option)
                except:
                    pass
    content = ''

    for i in errors:
        content += '<div class="ui button red' + switcher1[i] + '</div>'

    for i in ings:
        content += '<div class="ui button' + switcher1[i] + '</div>'

    return HttpResponse(content)


def index_content(request):
    company = request.GET.get('company')
    options_content = switcher.get(company)
    content = ''

    for i in options_content:
        content += '<div class="ui button' + switcher1[i] + '</div>'

    return HttpResponse(content)


def update_status(request):
    collect1 = db['wonderful']
    cta = collect1.find({})
    re_json = {}
    count1 = []
    for options in cta:
        re_json[options['_id']] = options
        for test_option in options:
            if test_option == '_id':
                pass
            else:
                try:
                    count1.append(options[test_option][0])
                except:
                    pass
    total_count = (count1.count("ok") + count1.count("error") + count1.count(""))
    re_json['count'] = {
        "ok": count1.count("ok"), "error": count1.count("error"), "space": count1.count(""), "total": total_count
    }
    re_json['bibgold']['bib'] = re_json['bibgold']['web_price']
    bb = datetime.datetime.fromtimestamp(int(str(re_json['igold']['ratedetail'][1])[:10]))
    re_json['igold']['ratedetail'][1] = (
        timeago.format(bb, (time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())), 'zh_TW'))
    return JsonResponse(re_json)
