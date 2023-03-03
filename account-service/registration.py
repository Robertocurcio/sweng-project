import json
import hashlib
import os
import binascii

def salt_password(pwd):
    # Generate a random salt
    salt = os.urandom(4)

    # Combine the salt and password
    salted_password = salt + pwd.encode()

    # Hash the salted password using SHA256
    hashed_password = hashlib.sha256(salted_password).hexdigest()

    # Convert salt to hex string
    salt_hex = binascii.hexlify(salt).decode()

    # Return the hashed password and salt
    return (hashed_password, salt_hex)

def Registration (email, password, name, surname):
    with open ('users.json', 'r') as f:
        contents = f.read()
        user_data = json.loads(contents)
    user_list = [user['email'] for user in user_data]
    if email in user_list:
        return False
    
    else:
        
        new_user = {
            'email': email,
            'password': salt_password(password),
            'name': name,
            'surname': surname
        }
        
        user_data.append(new_user)
        with open ('users.json', 'w') as f:
            json.dump(user_data, f, indent=4)
        return True

def verify_password(email, password):
    with open('users.json') as f:
        data = json.load(f)
    for user in data:
        if user['email'].strip() == email:  #check for the correct user

            salt = bytes.fromhex(user['password'][1]) #get the salt and convert it to bytes

            salted_password = salt + password.encode() #create the salted password to be checked
            hashed_password = hashlib.sha256(salted_password).hexdigest() #hash the password to be checked

            if hashed_password == user['password'][0]: #compare the pwd to be checked with the stored pwd
                return 2 #user found and pwd match
            else:
                return 1  #user found but pwd doesn't match
    return 0 #user not found

