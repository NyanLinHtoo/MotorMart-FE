import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          icon={<HomeOutlined />}
          onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default ErrorPage;
