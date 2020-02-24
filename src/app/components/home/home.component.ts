import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  videos:any[] = [];
  videoSel: any;

  constructor(private yts: YoutubeService) { 
    this.yts.getVideos().subscribe( data => {
      this.videos = data;
    });
  }

  ngOnInit(): void {
  }

  verVideo(video: any) {
    this.videoSel = video;
    $('#exampleModal').modal('show');
  }

  cerrarModal() {
    this.videoSel = null;
    $('#exampleModal').modal('hide');
  }

  cargarMas() {
    this.yts.getVideos().subscribe( data => {
      this.videos.push.apply(this.videos, data);
    });
  }


}
