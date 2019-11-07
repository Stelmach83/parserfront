import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadResponse } from '../model/upload-response.model';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  form: FormGroup;
  error: string;
  uploadResponse = new UploadResponse();
  showSummary: boolean;
  showLoading = false;
  result = { status: '', message: '', filePath: '' };

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      csv: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('csv').setValue(file);
    }
  }

  onSubmit() {
    this.showLoading = true;
    const formData = new FormData();
    formData.append('file', this.form.get('csv').value);
    this.uploadService.upload(formData).subscribe(
      result => {
        this.showSummary = true;
        this.uploadResponse = result;
        this.result = result;
      },
      error => {
        this.error = `(${error.error.status}): ${error.error.message}`;
        this.showSummary = false;
        this.showLoading = false;
      },
      () => this.showLoading = false
    );
  }

}
