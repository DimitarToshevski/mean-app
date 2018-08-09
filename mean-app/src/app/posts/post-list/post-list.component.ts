import { Component, OnInit, OnDestroy } from '@angular/core';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private subscription: Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.subscription = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
