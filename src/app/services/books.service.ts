import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';
import { Book } from '../models/book.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class BooksService {

	books: Book[] = [];
	booksSubject = new Subject<Book[]>();

	emitBooks(){
		this.booksSubject.next(this.books);
	}

	saveBooks() {
    firebase.database().ref('/books').set(this.books);
	}

	getBooks(){
		firebase.database().ref('/books')
		.on('value', (data: DataSnapshot) => {
			this.books = data.val() ? data.val(): [];
			this.emitBooks();
		});
	}

	getSingleBook(id: number){
		return new Promise(
			(resolve, reject) => {
				firebase.database().ref('/books/' + id).once('value').then(
					(data: DataSnapshot) => {
						resolve(data.val());
					}, (error) => {
						reject(error);
					}
				);
			}
		);
	}

	createNewBook(book: Book){
		this.books.push(book);
		this.saveBooks();
		this.emitBooks();
	}

	removeBook(book: Book){
		 if(book.photo) {
	      const storageRef = firebase.storage().refFromURL(book.photo);
	      storageRef.delete().then(
	        () => {
	          console.log('Photo removed!');
	        },
	        (error) => {
	          console.log('Could not remove photo! : ' + error);
	        }
	      );
	    }
		const indexBookToRemove = this.books.findIndex(
			(bookE1) => {
				if(bookE1 === book){
					return true;
				}
			}
		);
		this.books.splice(indexBookToRemove, 1);
		this.saveBooks();
		this.emitBooks();
	}

	uploadFile(file: File){
		return new Promise(
			(resolve, reject) => {
				const uniqueFileName = Date.now().toString();
				const upload = firebase.storage().ref()
					.child('images/' + uniqueFileName + file.name).put(file);
				upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
					() => {
						console.log('Chargement...');
					}, 
					(error) => {
						console.log('Erreur de chargement : ' + error);
						reject();
					}, 
					() => {
						resolve(upload.snapshot.ref.getDownloadURL());
					}
				);
			}
		);
	}

  constructor() {
  	this.getBooks();
   }
}
