import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const host = "http://localhost:5000";

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let history = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/signup`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history("/");
    } else {
      credentials.password.length < 5
        ? alert("required atleast 5 character password")
        : alert(json.error);
    }
  };

  return (
    <div
      className="px-4 py-5 px-md-5 text-center text-lg-start"
      style={{
        backgroundColor: "#000000",
        backgroundImage: "linear-gradient(147deg, #000000 0%, #04619f 74%)",

        height: "92vh",
      }}
    >
      <div className="container">
        <div className="row gx-lg-5 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h1 className="my-5 display-3 fw-bold text-light">
              The best Recipes <br />
              <span className="text-primary">for your Taste</span>
            </h1>
            <p style={{ color: "#f5f5f5", fontSize: "large" }}>
              CookBook is here to help you cook delicious meals with less stress
              and more joy. We offer recipes and cooking advice for home cooks,
              by home cooks. Helping create “kitchen wins” is what we’re all
              about.
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card">
              <div className="card-body py-5 px-md-5">
                <h1 className="my-4">Registration form</h1>
                <form>
                  <div className="row">
                    <div className="col-md-8 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={credentials.nmae}
                          onChange={onChange}
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="name">
                          Your name
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      value={credentials.email}
                      name="email"
                      onChange={onChange}
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={onChange}
                      className="form-control"
                      minLength={5}
                      required
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block mb-4"
                    onClick={handleClick}
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
