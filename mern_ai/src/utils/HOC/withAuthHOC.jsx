import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const withAuthHOC = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { setLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      const isLogin = localStorage.getItem("isLogin");

      if (isLogin !== "true") {
        setLogin(false);
        navigate("/");
      }
    }, [navigate, setLogin]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuthHOC;
