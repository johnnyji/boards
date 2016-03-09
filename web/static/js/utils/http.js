/*
  Methods for AJAX calls
 */
export default {

  get(path) {
    return new Promise((resolve, reject) => {
      fetch(path)
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    });
  },

  post(path, data) {
    return new Promise((resolve, reject) => {
      fetch(path, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    });
  } 

}