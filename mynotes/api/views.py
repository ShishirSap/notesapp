from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import NoteSerializer





# Create your views here.
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
    notes=user.note_set.all().order_by('-updated')
    serializer=NoteSerializer(notes,many=True)
    print(serializer)
    print(serializer.data)

    return Response(serializer.data)


@api_view(['GET'])
def getNote(request,pk):
    notes=Note.objects.get(id=pk)
    serializer=NoteSerializer(notes,many=False)

    return Response(serializer.data)
@api_view(['PUT'])
def updateNote(request,pk):
    data=request.data
    note=Note.objects.get(id=pk)
    serializer=NoteSerializer(instance=note,data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createNote(request):
    data=request.data
    userobject=User.objects.get(id=data['user']['user_id'])
   
    note=Note.objects.create(body=data['note'],user=userobject)
    
    serializer=NoteSerializer(note,many=False)

    return Response(serializer.data)

@api_view(['DELETE','GET'])
def deleteNote(request,pk):
    note =Note.objects.get(id=pk)
    note.delete()
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
