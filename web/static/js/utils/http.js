// Sets the JWT as the authorizations headers so
// Guardian.Plug.VerifyHeader can detect it 
const buildHeaders = () => {
  return {
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('jwt'),
    'Content-Type': 'application/json'
  };
};

/*
  Methods for AJAX calls
 */
export default {

  delete(path) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        method: 'delete',
        headers: buildHeaders()
      })
        .then((response) => {
          // We must retrieve the status first, it will be lost after we call `response.json`
          const {status} = response;
          // Parse and return the JSON representation
          response.json()
            .then((json) => {
              if (status >= 200 && status < 300) return resolve(json);
              reject(json);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  },

  get(path) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        headers: buildHeaders() 
      })
        .then((response) => {
          // We must retrieve the status first, it will be lost after we call `response.json`
          const {status} = response;
          // Parse and return the JSON representation
          response.json()
            .then((json) => {
              if (status >= 200 && status < 300) return resolve(json);
              reject(json);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  },

  post(path, data) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        method: 'post',
        headers: buildHeaders(),
        body: JSON.stringify(data)
      })
        .then((response) => {
          // We must retrieve the status first, it will be lost after we call `response.json`
          const {status} = response;
          // Parse and return the JSON representation
          response.json()
            .then((json) => {
              if (status >= 200 && status < 300) return resolve(json);
              reject(json);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

};
