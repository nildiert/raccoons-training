import { useRef } from "react"

const Login = ({setCurrUser, setShow}) =>{
  const formRef=useRef()
  const login = async (userInfo) => {
    const url = "http://localhost:3000/login";
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });
      const data = await response.json();
      if (!response.ok) throw data.error;
      localStorage.setItem("token", response.headers.get("Authorization"));
      setCurrUser(true);        
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      "user": { email: data.email, password: data.password }
    };
    login(userInfo);
  };
  const handleClick=e=>{
    e.preventDefault()
    setShow(false)
  }
  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 col-sm-9">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                        <h3 className="text-center font-weight-light my-4">Inicio de Sesión</h3>
                    </div>
                    <div className="card-body">
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" name="email" placeholder="name@example.com" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" name="password" placeholder="Password" />
                                <label htmlFor="password">Contraseña</label>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                <button className="btn btn-primary" type="submit">Iniciar Sesión</button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-center py-3">
                        <div className="small">
                            ¿No estás registrado? <a href="#signup" onClick={handleClick}>Regístrate</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Login;