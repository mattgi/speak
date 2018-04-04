const { Nba } = require("./Services");

// const speech = new Speech();
// speech.convertTextToAudio("Hello world");

const nba = new Nba();
nba.getEvents();
