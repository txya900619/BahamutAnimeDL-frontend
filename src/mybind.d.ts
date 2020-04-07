declare global {
  interface Window {
    getNewAnimeList: () => Promise<any>;
    getAllAnimeList: () => Promise<any>;
  }
}
export default Window;
