import axios from 'axios'
import { useState } from 'react';

function Login() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");


  const onclickHandler = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8080/api/login',  {
      username: username,
      password: password
    })
    .then(res => {
      console.log(res);
      console.log(res.data.data)
    })
    .catch(err => {
      console.error(err);
    });
  };
  return (
    <div>
      <h1>로그인</h1>
      <div className="px-12">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Username address</label>
            <input type="username" className="form-control" id="exampleInputEmail1" aria-describedby="usernameHelp" onChange={e => setUsername(e.target.value)}></input>
            <div id="emailHelp" className="form-text">We'll never share your username with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={e => setPassword(e.target.value)}></input>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={onclickHandler}>Submit</button>
        </form>
      </div>
      

    </div>
  )
}

export default Login
