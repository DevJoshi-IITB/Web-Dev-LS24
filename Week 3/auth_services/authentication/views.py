from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, get_backends
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LogoutView
from django.views import View
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from .forms import SignUpForm
from django.urls import reverse
# from allauth.account.views import SignupView

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            backend = get_backends()[0]
            user.backend = f'{backend.__module__}.{backend.__class__.__name__}'
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

@login_required
def home(request):
    return render(request, 'home.html')

class CustomLogoutView(LogoutView):
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return redirect('login')


# class CustomSignupView(SignupView):
#     def get_success_url(self):
#         return reverse('home')  

