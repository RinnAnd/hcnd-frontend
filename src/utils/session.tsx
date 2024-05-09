import { FC } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SessionCheck: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const session = {
      user: sessionStorage.getItem("user"),
      token: sessionStorage.getItem("token"),
    };
    if (!session.user || !session.token) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return null;
};

export default SessionCheck;
