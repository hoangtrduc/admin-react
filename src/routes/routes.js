import config from "../config";


// Page
import Home from "../pages/Home/Home";
import Employees from "../pages/Employees";
import Products from "../pages/Products";


// không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.employees, component: Employees },
    { path: config.routes.products, component: Products },

]

// phải đăng nhập mới vào được
const privateRoutes = [


]

export { publicRoutes, privateRoutes }