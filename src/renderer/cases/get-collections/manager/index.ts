export default interface CollectionsManager<T> {
  getCollections(): Promise<T | undefined>;
}
