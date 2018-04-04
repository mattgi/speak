import * as fs from "fs";
import { promisify } from "util";
import * as moment from "moment";
import textToSpeech from "@google-cloud/text-to-speech";
import { Gender } from "../../Enumerations/Gender";

const writeFile = promisify(fs.writeFile);

export class Speech {
  public client: any;

  constructor() {
    this.client = new textToSpeech.TextToSpeechClient({
      projectId: "commando-pm",
      keyFilename: "./auth.json"
    });
  }

  async convertTextToAudio(text: string, gender: Gender = Gender.Male) {
    const request = {
      input: { text },
      voice: { languageCode: "en-AU", name: "en-AU-Standard-B" },
      audioConfig: {
        audioEncoding: "MP3",
        pitch: 0.8,
        speakingRate: 1.1
      }
    };
    const response = await this.synthesizeSpeech(request);
    const outputFilename = `.data/audio/${moment().unix()}.mp3`;
    const written = await writeFile(
      outputFilename,
      response.audioContent,
      "binary"
    );
    console.log(`saved audio to ${outputFilename}.`);
  }

  synthesizeSpeech(request: any): Promise<any> {
    return new Promise(resolve => {
      this.client.synthesizeSpeech(request, (err, response) => {
        if (err) {
          throw new Error(err);
        }
        resolve(response);
      });
    });
  }
}
