import axios from 'axios'
const baseUrl = '/api/persons'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then((result) => {
  return result.data
  })
}

const update = (id, personObject) => {
  // console.log('id =',id, ' persoona', personObject)
  const request = axios.put(`${baseUrl}/${id}`, personObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((result) => {
  return result.data
  })
  
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deletePerson: deletePerson,
}