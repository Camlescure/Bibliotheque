import { Component } from '@angular/core';
import * as firebase from 'firebase';	

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(){
		var firebaseConfig = {
		    apiKey: "AIzaSyAC0r14EZnv1U7FDeGUAKkheQ5YJE8Yvog",
		    authDomain: "bibliothequeangular-687e8.firebaseapp.com",
		    databaseURL: "https://bibliothequeangular-687e8.firebaseio.com",
		    projectId: "bibliothequeangular-687e8",
		    storageBucket: "",
		    messagingSenderId: "970394990299",
		    appId: "1:970394990299:web:1f827263a31f364f30befe"
  		};
  		firebase.initializeApp(firebaseConfig);
	}
}
