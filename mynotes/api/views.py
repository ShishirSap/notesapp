from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import NoteSerializer
from django.db import connection
from .helpers import dictfetchall





@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user=request.user
    # notes=user.note_set.all().order_by('-updated')
    # serializer=NoteSerializer(notes,many=True)
    # print(serializer)
    # print(serializer.data)
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM api_note WHERE user=%s",(str(user.id)))
        data=dictfetchall(cursor)
    return Response(data)


@api_view(['GET'])
def getNote(request,pk):
    # notes=Note.objects.get(id=pk)
    # serializer=NoteSerializer(notes,many=False)
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM api_note WHERE id=%s ORDER BY updated ASC",(str(pk)))
        data=dictfetchall(cursor)
    return Response(data)
@api_view(['PUT'])
def updateNote(request,pk):
    data=request.data
    note=Note.objects.get(id=pk)
    # serializer=NoteSerializer(instance=note,data=data)

    # if serializer.is_valid():
    #     serializer.save()
    with connection.cursor() as cursor:
            cursor.execute("UPDATE api_note SET data=%s WHERE id=%s",[data,pk])
            cursor.execute("SELECT * FROM api_note WHERE id=%s ORDER By updated DESC",(str(pk)))

            response=dictfetchall(cursor)
            print(response)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createNote(request):
    data=request.data
    userobject=User.objects.get(id=data['user']['user_id'])
   
    # note=Note.objects.create(body=data['note'],user=userobject)
    
    # serializer=NoteSerializer(note,many=False)
    with connection.cursor() as cursor:
            cursor.execute("INSERT INTO api_note(user,body) VALUES (%s,%s)",(str(userobject.id),data['note']))
            cursor.execute("SELECT * FROM api_note WHERE user=%s",(str(user.id)))
            data=dictfetchall(cursor)

    return Response(data)

@api_view(['DELETE','GET'])
def deleteNote(request,pk):
    # note =Note.objects.get(id=pk)
    # note.delete()
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM api_note WHERE id=%s",[pk])
    return Response("Note was deleted")





from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
