import axios from "axios";

export class Nba {
  constructor() {}

  getEvents() {
    var xmlstatsUrl = {
      host: "erikberg.com",
      sport: undefined,
      endpoint: "events",
      id: undefined,
      format: "json",
      params: {
        sport: "nba",
        date: ""
      }
    };
    xmlstatsUrl.params.date = "20180301";
    var url = buildUrl(xmlstatsUrl);

    axios.get(url).then(response => {
      console.log(response);
    });
  }

  getEvent(id: string) {
    return { id };
  }
}

// See https://erikberg.com/api/endpoints#requrl Request URL Convention (copied from his samples)
const buildUrl = (opts: any) => {
  const ary = [opts.sport, opts.endpoint, opts.id];
  const path = ary.filter(e => e !== undefined).join("/");
  let url = `https://${opts.host}/${path}.${opts.format}`;

  // check for parameters and create parameter string
  if (opts.params) {
    var paramList = [];
    for (var key in opts.params) {
      if (opts.params.hasOwnProperty(key)) {
        paramList.push(`${encodeURIComponent(key)}=${encodeURIComponent(opts.params[key])}`);
      }
    }
    var paramString = paramList.join("&");
    if (paramList.length > 0) {
      url += "?" + paramString;
    }
  }
  return url;
};
