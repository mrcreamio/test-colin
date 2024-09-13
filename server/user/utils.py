from web3 import Web3
from django.conf import settings

def get_web3():
    return Web3(Web3.HTTPProvider(settings.WEB3_INFURA_URL))
