export interface videoInfo extends animeInfo {
  video_sn: string;
}

export interface animeInfo {
  acg_sn: string;
  anime_sn: string;
  title: string;
  dc_c1: string;
  dc_c2: string;
  week: string;
  favorite: string;
  cover: string;
  info: string;
  popular: string;
  highlightTag: {
    bilingual: boolean;
    edition: string;
    vipTime: string;
  };
}

export interface aniChannel {
  title: string;
  img: string;
  status: number;
  uploadtime: string;
}

export interface videoType {
  sn: string;
  name: string;
  sort: number;
}

export interface category {
  title: string;
  intro: string;
  list: animeInfo[];
}

export interface gnn {
  url: string;
  title: string;
  pic: string;
}

export interface forum {
  url: string;
  title: string;
  pic: string;
}

export class animeIndexResponseBody {
  videoTypeList: videoType[] = [];
  new_anime: {
    date: videoInfo[];
    popular: videoInfo[];
  } = { date: [], popular: [] };
  ani_channel: aniChannel[] = [];
  new_added: animeInfo[] = [];
  category: category[] = [];
  gnn_list: gnn[] = [];
  forum_list: forum[] = [];
  ad = [];
}
