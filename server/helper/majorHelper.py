import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '.'))

from major import majors

def getId(_type):
    for _id, major in enumerate (majors):
        if major['type'] == _type:
            return _id
    return None
