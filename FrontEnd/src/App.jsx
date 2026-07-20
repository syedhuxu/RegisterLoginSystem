import { Route, Routes } from "react-router-dom";
import RegisterLogin from "./Component/RegisterLogin";
import Home from "./Component/Home";

const App = () => {
  return (
    <Routes>
      {/* Redirects root URL to login */}
      <Route path="/" element={<RegisterLogin />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
