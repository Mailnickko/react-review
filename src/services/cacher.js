let instance = null;

class Cacher {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  cache = {};

  camelCase(string) {
    return string
      .split(" ")
      .map(word => {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
      })
      .join(" ");
  }

  cacheValue(key, val) {
    this.cache[this.camelCase(key)] = val;
  }

  getCacheValue(key) {
    return this.cache[this.camelCase(key)];
  }
}

export default Cacher;
