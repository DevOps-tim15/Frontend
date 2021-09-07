import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  imgFile: string;
  public model: any;
  tags:any[] = []

  uploadForm = this.fb.group({
    description: [''],
    userTags: [],
    picture: ['', Validators.required]
  }); 

  constructor(private fb: FormBuilder, private postService: PostService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }
  addTag(r){
    this.tags.push(r);
    alert(this.model);
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
        this.router.navigate(['/nistagram']);
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
        // this.imgFile = 
        console.log(this.uploadForm.get('picture').value);
        console.log(this.imgFile);
      };
    }
  }

}
