from pymongo import MongoClient
from django.conf import settings

def get_db():
    client = MongoClient(settings.MONGODB_SETTINGS['host'])
    return client[settings.MONGODB_SETTINGS['db']]

def get_collection(collection_name):
    db = get_db()
    return db[collection_name]
