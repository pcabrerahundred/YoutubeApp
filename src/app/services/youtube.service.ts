import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl: string = 'https://www.googleapis.com/youtube/v3';
  private apiKey: string = 'AIzaSyC1sBFW-mBUv_iKj7pHCQWJetu_vxolYsE';
  private playListId: string = 'UUYmmrwaDX4tlbBIkRC2AeMA';
  private nextPageToken: string = '';

  constructor(private http: HttpClient) { }

  getVideos() {
    let url = `${this.youtubeUrl}/playlistItems?part=snippet&maxResults=10&playlistId=${this.playListId}&key=${this.apiKey}`;

    if (this.nextPageToken) {
      url = url + `&pageToken=${this.nextPageToken}`;
    }
    /*
    let params = new HttpParams();
    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playListId);
    params.set('key', this.apiKey);
    */

    return this.http.get(url)
      .pipe(map((res: any) => {
        console.log(res);
        this.nextPageToken = res.nextPageToken;

        let videos: any[] = [];

        for (let video of res.items) {
          let snippet = video.snippet;
          videos.push(snippet);
        }

        return videos;

      }))
  }
}
