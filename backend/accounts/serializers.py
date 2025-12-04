from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "email", "name"]

    def get_name(self, obj):
        return obj.first_name or obj.username


class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "password", "name"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_email(self, value):
        email = value.lower()
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError(_("User with this email already exists."))
        return email

    def create(self, validated_data):
        name = validated_data.pop("name").strip()
        email = validated_data.get("email")
        user = User(
            username=email,
            email=email,
            first_name=name,
        )
        user.set_password(validated_data.get("password"))
        user.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.USERNAME_FIELD

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["email"] = serializers.EmailField()
        self.fields.pop("username", None)

    def validate(self, attrs):
        email = attrs.pop("email", None)
        if email:
            try:
                user = User.objects.get(email__iexact=email)
                attrs[self.username_field] = getattr(user, User.USERNAME_FIELD)
            except User.DoesNotExist:
                attrs[self.username_field] = email
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token["name"] = user.first_name or user.username
        return token

