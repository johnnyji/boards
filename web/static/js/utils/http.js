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

  get(path) {
    return new Promise((resolve, reject) => {
      fetch(path, {
        headers: buildHeaders() 
      })
        .then((res) => res.json())
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
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    });
  } 

}
