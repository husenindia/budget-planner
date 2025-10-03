import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { DatePipe, provideImgixLoader } from '@angular/common';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from '../environment/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideImgixLoader('https://dummyimage.com/'),    
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()    ,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    { provide: DatePipe, useClass: DatePipe },  // Corrected provider for DatePipe
    provideAnimations(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // 👈 locale first
  ]
};
