import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cafes from "./components/Cafes";
import Employees from "./components/Employees";
import PageNotFound from "./components/PageNotFound";

import _withLayout from "./components/Layouts/Main";

import { ROUTE } from "./utils/constant";

const withLayout = _withLayout();

const CafesRoute = withLayout(Cafes);
const EmployeesRoute = withLayout(Employees);
const PageNotFoundRoute = withLayout(PageNotFound);

const BaseRoute = () => {
  return (
    <Router>
      <Routes>
        <Route element={<CafesRoute />} path={ROUTE.CAFES} />
        <Route element={<EmployeesRoute />} path={`${ROUTE.EMPLOYEES}/:cafeId` } />
        <Route element={<EmployeesRoute />} path={ROUTE.EMPLOYEES} />
        <Route element={<PageNotFoundRoute />} path="*" />
      </Routes>
    </Router>
  );
};

export default BaseRoute;
