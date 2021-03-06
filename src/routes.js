import Home from 'components/Home/home';
import Lang from 'components/Langs/index';

// import Posts from 'components/Posts/posts';
// import Post from 'components/Posts/post';
// import CreatePost from 'components/Posts/createPost';
// import EditPost from 'components/Posts/editPost';
import NotFound from 'components/NotFound/notFound';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '',
    component: Home
  },
  {
    path: '/annyeong',
    component: Home
  },
  {
    path: '/lang/:lang',
    name: 'lang',
    component: Lang
  },
  // {
  //   path: '/posts',
  //   component: Posts
  // },
  // {
  //   path: '/posts/create',
  //   name: 'createPost',
  //   component: CreatePost
  // },
  // {
  //   path: '/post/:id',
  //   name: 'post',
  //   component: Post
  // },
  // {
  //   path: '/post/:id/edit',
  //   name: 'editPost',
  //   component: EditPost
  // },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
