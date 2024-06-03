import { Component } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-signature-based',
  templateUrl: './signature-based.component.html',
  styleUrls: ['./signature-based.component.css']
})
export class SignatureBasedComponent {
  isDragging = false;
  response: any;

  constructor(private fileUploadService: FileUploadService) {}

  triggerFileInput(event: Event) {
    event.preventDefault();
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.uploadFile(file);
      event.dataTransfer.clearData();
    }
  }

  uploadFile(file: File) {
    this.fileUploadService.uploadFile2(file).subscribe(
      (response) => {
        this.response = response;
      },
      (error) => {
        console.error('Error:', error);
        // Handle errors here
      }
    );
  }

  // Function to check if the file is legitimate
  isLegitimate(): boolean {
    return this.response && this.response.result === 'legitimate';
  }

  // Function to check if the file is malware
  isMalware(): boolean {
    return this.response && this.response.result === 'malware';
  }


}
