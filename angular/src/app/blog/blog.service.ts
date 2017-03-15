import {Injectable} from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observer} from 'rxjs/Observer'

import { Post } from './post'

@Injectable()
export class BlogService {

	_wpBase = "http://blog.kydeveloper.com/wp-json/wp/v2/"

	post: Post;
	posts: Post[];

	postsChange$: any;
	private _postsObserver: Observer<any>;

	postChange$: any;
	private _postObserver: Observer<any>;

	constructor(private http: Http) {
		this.postsChange$ = new Observable(observer =>
		this._postsObserver = observer).share();

		this.postChange$ = new Observable(observer =>
		this._postObserver = observer).share();
	}

	getPosts(): Observable<any> {
		let url =  this._wpBase + "posts?_embed"
		let headers    = new Headers({'Content-Type': 'application/json'})
		let options    = new RequestOptions({ headers: headers })			
		return this.http.get(url, options)
			.map(response => this.setPosts(response.json()))

	}

	setPosts(posts: Post[]) {
		console.log(posts)
		this.posts = posts;
		this._postsObserver.next(this.posts);
	}

	retPosts() {
		return this.posts;
	}

	getPostById(id: string): Observable<any> {
		let url =  this._wpBase + "posts/" + id
		let headers    = new Headers({'Content-Type': 'application/json'})
		let options    = new RequestOptions({ headers: headers })			
		return this.http.get(url, options)
				.map((res:Response) => res.json())

	}

}