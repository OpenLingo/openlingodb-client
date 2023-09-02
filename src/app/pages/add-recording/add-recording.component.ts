import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-recording',
  templateUrl: './add-recording.component.html',
  styleUrls: ['./add-recording.component.css']
})

export class AddRecordingComponent implements OnInit{

    private mediaPromise!: Promise<MediaStream>;

    inputs: MediaDeviceInfo[] = [];
    private stream: MediaStream | null = null;
    private mediaRecorder: MediaRecorder | null = null;
    private audioBlobs: Blob[] = [];
    private audioBlob: Blob | null = null;
    private audio!: HTMLAudioElement;

    ngOnInit(): void {
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            console.log("No browser support");
            return
        }

        this.mediaPromise = navigator.mediaDevices.getDisplayMedia({audio: true});
        this.mediaPromise.then(stream => {
            navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                    devices.forEach(device => {
                        console.log(device);
                        if (device.kind === 'audioinput') {
                            this.inputs.push(device);
                        }
                    });
                })
                .catch(err => {
                    console.error(`${err.name}: ${err.message}`);
                });
            this.killStream(stream)
        });
    }

    killStream(stream: MediaStream): void {
        stream.getTracks().forEach(track => {
            track.stop()
        })
    }
}
