// Sets the JWT as the authorizations headers so
// Guardian.Plug.VerifyHeader can detect it 
const buildHeaders = () => {
  return {
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('jwt'),
    'Content-Type': 'application/json'
  };
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) return response;
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const parseJson = (response) => response.json();

/*
  Methods for AJAX calls
 */
export default {

  get(path) {
    return new Promise((resolve, reject) => {
      fetch(path, {
        headers: buildHeaders() 
      })
        .then(checkStatus)
        .then(parseJson)
        .then(resolve)
        .catch(reject);
    });
  },

  post(path, data) {
    return new Promise((resolve, reject) => {
      fetch(path, {
        method: 'post',
        headers: buildHeaders(),
        body: JSON.stringify(data)
      })
        .then(checkStatus)
        .then(parseJson)
        .then(resolve)
        .catch(reject);
    });
  } 

}
