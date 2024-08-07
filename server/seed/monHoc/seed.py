import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '.'))
import subjectSeeding

class Seed:
    
    def __init__(self, db, Subject):
        self.db = db
        self.Subject = Subject
         
    def seed_subjects(self):
        self.subjectSeeding = subjectSeeding.run(self.db,self.Subject)
        
    def run(self):
        self.seed_subjects()