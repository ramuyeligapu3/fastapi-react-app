

from mongoengine import Document, StringField, EmailField, ReferenceField, DecimalField, DateTimeField, connect

from mongoengine import connect

connect(
    db="paisatracker",
    host="mongodb+srv://ramuyeligapu6:180611Ram@cluster0.zrru1.mongodb.net/paisatracker?retryWrites=true&w=majority"
)




class Users(Document):
    userName = StringField(required=True)
    password = StringField(required=True)
    email = EmailField(required=True, unique=True)

class Transactions(Document):
    userId = ReferenceField(Users, required=True, reverse_delete_rule=2)
    amount = StringField()
    category = StringField()
    transactionType=StringField()
    description = StringField()
    createdOn = DateTimeField()

