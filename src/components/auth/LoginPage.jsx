import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(username, password)
      console.log(userData)
      if (userData.token) {
        localStorage.setItem('token', userData.token)
        localStorage.setItem('roles', JSON.stringify(userData.roles))
        navigate('/home')
      } else {
        setError(userData.message)
        console.log(error)
      }

    } catch (error) {
      console.log(error)
      setError(error.message)
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  }


  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <div
        className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${require('./vip1.jpg')})` }}>
        <div className="d-flex align-items-center justify-content-center w-100" >
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body" >
                  <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                    {/* <img src={'/assets/images/logos/mu.png'} style={{ width: '180px' }} alt="" /> */}
                  </a>
                  {/* <p className="text-center">Hello </p> */}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">Tài khoản</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-4">
                      <label for="exampleInputPassword1" className="form-label">Mật khẩu</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="form-check">
                        {/* <input className="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked />
                        <label className="form-check-label text-dark" for="flexCheckChecked">
                          Remeber this Device
                        </label> */}
                      </div>
                      {/* <a className="text-primary fw-bold" href="./index.html">Forgot Password ?</a> */}
                    </div>

                    <button type="submit" className="btn btn-primary m-1">Đăng nhập</button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">Chưa có tài khoản</p>
                      <a className="text-primary fw-bold ms-2" href="/register">Đăng ký</a>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default LoginPage;