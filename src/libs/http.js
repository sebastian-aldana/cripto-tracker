class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      let request = await fetch(url);
      let json = await request.json();
      return json;
    } catch (error) {
      console.log('http get method err', error);
      throw Error(error);
    }
  };

  post = async (url, body) => {
    try {
      let request = fetch(url, {
        method: 'Post',
        body,
      });
      let json = await request.json();
      return json;
    } catch (error) {
      console.log('http post method err', error);
      throw Error(error);
    }
  };
}

export default Http;
