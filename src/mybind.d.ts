declare global {
  interface Window {
    getAnimeList: () => Promise<any>;
  }
}
export default Window;
