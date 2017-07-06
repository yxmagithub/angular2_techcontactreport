import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class postsService {
    private _url_0 = "http://jsonplaceholder.typicode.com/posts"
	private _url = "./app/posts.json"
    private getPostUrl(PostId) {
		return this._url + "/" + PostId;
	}

    constructor(private _http: Http) { }

    getPosts(filter?) {
		var url = this._url;
		if (filter && filter.userId)
			url += "?userId=" + filter.userId;
				return this._http.get(url).map(res => res.json());
    }

    getPost(PostId) {
		return this._http.get(this.getPostUrl(PostId))
			.map(res => res.json());
	}

	getComment(PostId) {
		return this._http.get(this._url_0 + "/" + PostId + "/comments")
			.map(res => res.json());
	}
}
