import { Speech } from "./Services";

const speech = new Speech();
speech.convertTextToAudio(`
  <speak>
  What's up everybody?!
  <break time="900ms" />
  We need to build.
  </speak>
`);
