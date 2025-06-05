import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "pps-login-01", appId: "1:736484906096:web:78b4e25efb045938d7d0b5", storageBucket: "pps-login-01.firebasestorage.app", apiKey: "AIzaSyDq7uksApRvscfKKegMUZGtdX1XwR9-IoY", authDomain: "pps-login-01.firebaseapp.com", messagingSenderId: "736484906096" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
