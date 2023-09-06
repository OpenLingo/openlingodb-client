import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-recording',
  templateUrl: './add-recording.component.html',
  styleUrls: ['./add-recording.component.css']
})

export class AddRecordingComponent implements OnInit {

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
        this.mediaPromise = navigator.mediaDevices.getUserMedia({audio: true});
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

    start(): void {
        if (this.stream) {
            console.log("Existing Stream");
            return
        }

        navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
            this.stream = stream;
            this.mediaRecorder = new MediaRecorder(this.stream);
            this.mediaRecorder.addEventListener("dataavailable", event => {
                this.audioBlobs.push(event.data);
                console.log("New blob recorded", event);
            });

            this.mediaRecorder.start();
            console.log("Recording...");
        })
    }
    stop(): void {
        if (!this.mediaRecorder || !this.stream) return;

        let mimeType = this.mediaRecorder.mimeType;

        this.mediaRecorder.addEventListener("stop", () => {
            console.log("Mime: ", mimeType);
            this.audioBlob = new Blob(this.audioBlobs, {type: mimeType});
            console.log("Size: ", this.audioBlob.size)
        });

        this.mediaRecorder.stop();
        this.killStream(this.stream);
        this.stream = null;
        this.mediaRecorder = null;
    }
    play(): void {
        if (!this.audioBlob) {
            console.log("No audio blob.");
            return
        }

        if (!this.audio) {
            let reader = new FileReader();

            reader.onload = (e) => {
                let base64URL = e.target?.result?.toString();
                if (!base64URL) return;

                this.audio = new Audio();
                this.audio.src = base64URL;
                this.audio.load();
                this.audio.play().then(() => {
                    console.log("Played!");
                });
            };
            reader.readAsDataURL(this.audioBlob);
        } else {
            this.audio.play().then(() => {
                console.log("Played!");
            })
        }
    }
    download(): void {
        if (!this.audioBlob) {
            console.log("No audio blob.");
            return
        }

        const a = document.createElement('a');
        document.body.appendChild(a)
        const url = window.URL.createObjectURL(this.audioBlob);
        a.href = url;
        const d = new Date();
        a.download = d.toISOString()
            .replace("T", "_")
            .replace("Z", "UTC")
            + "."
            + this.audioBlob.type.split(";")[0].split("/")[1];
        a.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 0)
    }
}
