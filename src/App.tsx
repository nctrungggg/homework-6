import "./App.css";
import { Router } from "./routers/Router";
import SelectLang from "./modules/i18n/components/SelectLang";
import Layout from "./layout/Layout";

function App() {
  return (
    <div className="relative  pt-15">
      <Layout>
        <SelectLang />
        <Router />
      </Layout>
    </div>
  );
}

export default App;
