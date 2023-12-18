from rest_framework import serializers
from .models import PlayerUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerUser
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = PlayerUser.objects.create_user(**validated_data)
        return user
