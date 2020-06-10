exports.defaultPageTitle = 'Node JS';
exports.menu = [
    {name: 'Home', slug: '/', guest: true, logged: true},
    {name: 'New Post', slug: '/post/add', guest: false, logged: true},
    {name: 'Register', slug: '/users/register', guest: true, logged: false},
    {name: 'Login', slug: '/users/login', guest: true, logged: false},
    {name: 'Logout', slug: '/users/logout', guest: false, logged: true}
];