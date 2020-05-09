declare global {
  interface Window {
    getNewAnimeList: () => Promise<any>;
    getAnimesByPage: (input: number) => Promise<any>;
    getMaxPage: () => Promise<any>;
    getAnimesByFilter: (input: string) => Promise<any>;
    getRealSn: (ref: string) => Promise<string>;
    getAnimeAllSn: (sn: string) => Promise<any>;
    insertAnimeToQueue: (
      title: string,
      ep: string,
      sn: string,
      spacial: boolean
    ) => Promise<any>;
  }
}
export default Window;
