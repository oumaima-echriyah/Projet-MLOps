import { Component } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-image-based',
  templateUrl: './image-based.component.html',
  styleUrls: ['./image-based.component.css']
})
export class ImageBasedComponent {
  malwareResults: any = {}; // Déclaration de malwareResults


  constructor(private fileUploadService: FileUploadService) { }

  triggerFileInput() {
    const fileInput = document.getElementById('fileup') as HTMLInputElement;
    fileInput.click();
  }

  fileChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const filename = file.name;
      const filext = '.' + filename.split('.').pop()?.toLowerCase();
      const valid = ['.jpg', '.png', '.jpeg', '.bmp'];

      const imgUpload = document.querySelector('.imgupload') as HTMLElement;
      const imgUploadOk = document.querySelector('.imgupload.ok') as HTMLElement;
      const imgUploadStop = document.querySelector('.imgupload.stop') as HTMLElement;
      const namefile = document.getElementById('namefile') as HTMLElement;
      const submitbtn = document.getElementById('submitbtn') as HTMLElement;
      const fakebtn = document.getElementById('fakebtn') as HTMLElement;

      if (valid.indexOf(filext) === -1) {
        imgUpload.style.display = 'none';
        imgUploadOk.style.display = 'none';
        imgUploadStop.style.display = 'block';

        namefile.style.color = 'red';
        namefile.style.fontWeight = '700';
        namefile.textContent = `File ${filename} is not a pic!`;

        submitbtn.style.display = 'none';
        fakebtn.style.display = 'inline-block';
      } else {
        imgUpload.style.display = 'none';
        imgUploadStop.style.display = 'none';
        imgUploadOk.style.display = 'block';

        namefile.style.color = 'green';
        namefile.style.fontWeight = '700';
        namefile.textContent = filename;

        submitbtn.style.display = 'inline-block';
        fakebtn.style.display = 'none';
      }
    }
  }

  onFileSelected(event: any): void {
    this.fileChanged(event); // Appel de la fonction fileChanged
    const file: File = event.target.files[0];
    if (file) {
      this.fileUploadService.uploadFile(file).subscribe(
        (response: any) => {
          console.log('Response:', response);
          this.malwareResults = response.probabilities; // Mise à jour de malwareResults avec les résultats
        },
        (error) => {
          console.error('Error:', error);
          // Gestion des erreurs ici
        }
      );
    }
  }

}
