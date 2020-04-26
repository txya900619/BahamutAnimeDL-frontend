declare global {
  interface Window {
    getNewAnimeList: () => Promise<any>;
    getAllAnimeList: () => Promise<any>;
    getAnimesByPage: (input: number) => Promise<any>;
    getMaxPage: () => Promise<any>;
    getAnimesByFilter: (input: string) => Promise<any>;
    getRealSn: (ref: string) => Promise<string>;
    getAnimeAllSn: (sn: string) => Promise<any>;
  }
}
export default Window;
