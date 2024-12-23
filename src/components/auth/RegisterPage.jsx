import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.register(email, username, password);
      if (response.message === "oke") {
        // Giả sử API trả về 201 Created khi thành công
        window.alert("Đăng ký thành công");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <div
        className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundImage: `url(${require("./vip1.jpg")})` }}
      >
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <a
                    href="./index.html"
                    className="text-nowrap logo-img text-center d-block py-3 w-100"
                  >
                    {/* <img src={'/assets/images/logos/mu.png'} style={{ width: '180px' }} alt="" /> */}
                  </a>
                  {/* <p className="text-center">Hello </p> */}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Tài khoản
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label for="exampleInputPassword1" className="form-label">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
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

                    <button type="submit" className="btn btn-primary m-1">
                      Đăng ký
                    </button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">
                        Hehe tôi đã có tài khoản rồi
                      </p>
                      <a className="text-primary fw-bold ms-2" href="/login">
                        Đăng nhập
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
