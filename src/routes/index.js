import Login from '~/papes/Login';

// không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: '/Login', component: Login }

]

// phải đăng nhập mới vào được
const privateRoutes = [

]

export { publicRoutes, privateRoutes }