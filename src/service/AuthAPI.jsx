import ClientAPI from '../configs/clientAPI'

const AuthAPI = {
  register(props) {
    const formData = new FormData()

    formData.append('email', props.email)
    formData.append('username', props.username)
    formData.append('password', props.password)

    return ClientAPI.post('/register', formData)
  },

  login(props) {
    const formData = new FormData();

    formData.append('username', props.username);
    formData.append('password', props.password);

    return ClientAPI.post('/login', formData);
  }
}

export default AuthAPI
