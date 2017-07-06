import {Component, NgModule, OnInit} from '@angular/core';
//import { ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import { HttpModule } from '@angular/http';
//import {HTTP_PROVIDERS} from '@angular/http';
import {Observable} from "rxjs/Observable";

import {UsersService} from '../user/user.service';
import {postsService} from './post.service';
import {SpinnerComponent} from '../resources/spinner.component';
import {PaginationComponent} from '../resources/pagination.component';

import 'rxjs/add/observable/forkJoin';

@NgModule({
    imports: [
        HttpModule
    ]
})
@Component({
    selector: 'post',
    templateUrl: 'app/post/post.component.html',
    styleUrls: [ 'app/shared/bootstrap.css','https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'],
    styles: [".mouse { cursor: pointer; }"],
    providers: [postsService, UsersService, HttpModule],
})

export class PostComponent implements OnInit {
    users: any[];
    posts = [];
    pagedPosts = [];
    postLoading = true;
    usersLoading = true;
    currentPost;
    commentsLoading;
    pageSize = 10;

    constructor(private _postservice: postsService, private _userService: UsersService) { }


    ngOnInit() {
        this.loadUsers();
        this.loadPosts();
    }

    private loadUsers() {
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }

    private loadPosts(filter?) {
        this.postLoading = true;
        this._postservice.getPosts(filter).subscribe(posts => {this.posts = posts;this.pagedPosts = this.getPostsInPage(1);},null,() => { this.postLoading = false; });
    }

    select(post) {
        this.currentPost = post;
        this.commentsLoading = true;

        this._postservice.getComment(post.id)
            .subscribe(comments => {
                this.currentPost.comments = comments
            },
            null,
            () => { this.commentsLoading = false; });
    }

    filterName(filter) {
        this.currentPost = null;

        this.loadPosts(filter);
    }


    onPageChanged(page) {
        this.pagedPosts = this.getPostsInPage(page);
    }

    private getPostsInPage(page) {
        var result = [];
        var startingIndex = (page - 1) * this.pageSize;
        var endIndex = Math.min(startingIndex + this.pageSize, this.posts.length);

        for (var i = startingIndex; i < endIndex; i++)
            result.push(this.posts[i]);

        return result;
    }
}