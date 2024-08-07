import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '../'))
from clone import main
from helper.major import majors 
import time
def store(db, Subject, major_id, major_type):
    try:
        attt_major_subjects = main.get(os.path.join(os.path.dirname(__file__),'clone/{}.txt'.format(major_type.upper())))
        
        for subject in attt_major_subjects:
                _subject = Subject(
                    major_id=major_id,
                    name_subject=subject['NameSubjects'],
                    code_subject=subject['CodeSubjects'],
                    stc=subject['STC']
                )
                db.session.add(_subject)
                db.session.commit()
    except Exception as e:
        print(e)
def run(db, Subject):
    for _id, major in enumerate(majors):
        store(db=db, Subject=Subject, major_id=_id, major_type=major['type'])