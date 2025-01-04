import { Layout } from "antd";
import { Toaster } from "sonner";
import { Content, Footer } from "antd/es/layout/layout";
import SiteFooter from "./components/Footer";
import NavBar from "./components/NavBar";
import AppRouter from "./route/AppRouter";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <Toaster richColors position="top-right" />
      <Layout>
        <NavBar />
        <Content>
          <AppRouter />
        </Content>
        <Footer style={{ padding: 0 }}>
          <SiteFooter />
        </Footer>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
