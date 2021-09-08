import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  imgFile: string;
  usersToTag:any[] = []

  uploadForm = this.fb.group({
    description: [''],
    userTags: [],
    picture: ['', Validators.required]
  }); 

  constructor(private fb: FormBuilder, private postService: PostService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsersForTagging();
  }

  addNew() {
    let description: string = this.uploadForm.get('description').value;
    let image: string = this.uploadForm.get('picture').value;
    let taggedUsers: [] = this.uploadForm.get('userTags').value;
    let post = {
      description: description,
      image: image,
      taggedUsers: taggedUsers
    }
    console.log(post);
    this.postService.uploadPost(post).subscribe(
      post => {
        this.toastr.success('You have successfully uploaded a new photo');
        this.router.navigate(['/user-posts']);
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }

  getAllUsersForTagging() {
    this.postService.getAllUsersForTagging().subscribe(
      users => {
        this.usersToTag = users;
        console.log(users)
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }

  onImageChange(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.uploadForm.patchValue({
          picture: reader.result
        });
        console.log(this.uploadForm.get('picture').value);
        console.log(this.imgFile);
      };
    }
  }

}
