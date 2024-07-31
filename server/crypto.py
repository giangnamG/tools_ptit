from cryptography.fernet import Fernet
import base64

class Crypto:
    def __init__(self):
        key = Fernet.generate_key()
        self.cipher_suite = Fernet(key)

    def encrypt_id(self, _id):
        try:
            _id_bytes = str(_id).encode('utf-8')
            encrypted_id = self.cipher_suite.encrypt(_id_bytes)
            return base64.b64encode(encrypted_id).decode('utf-8')
        except Exception:
            return None
        
    def decrypt_id(self, encrypted_id):
        try:
            encrypted_id_bytes = base64.urlsafe_b64decode(encrypted_id)
            decrypted_id_bytes = self.cipher_suite.decrypt(encrypted_id_bytes)
            decrypted_id = int(decrypted_id_bytes.decode('utf-8'))
            return decrypted_id
        except Exception as e:
            print(f"Error decrypting ID: {str(e)}")
            return -1

cryptApp = Crypto()