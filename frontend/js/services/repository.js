const { post } = require("jquery");

const API_URL = "http://localhost:5000/";
const REPOSITORY_ENDPOINT = `${API_URL}/repositories`;

const listarRepositorios = () => {
    return fetch(REPOSITORY_ENDPOINT)
    .then(res => res.json())
    .then((data) => {
      return data;
    })
    .catch(console.log);
}

const cadastrarRepositorio = (title, author) => {
    return fetch(REPOSITORY_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            title, author
        }
    })
    .then(res => res.json())
    .then(data => {
        return data
    })
    .catch(console.log);
}


export default listarRepositorios;