import { ConfigProvider } from "antd";

import BaseRoute from "./BaseRoute";
import { theme } from "./utils/theme";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <BaseRoute />
    </ConfigProvider>
  );
}

export default App;
