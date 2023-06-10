import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../views/Login.vue";
import Profile from "../components/Profile.vue";
import Note from "../components/Note.vue";
import Chat from "../components/Chat.vue";
import Stafication from "../components/Stafication.vue";
import Detail from "../components/Detail.vue";
import Search from "../components/Search.vue";
import UserNote from "../components/UserNote.vue";
import ListUser from "../views/User.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/list-users",
    name: "list-users",
    component: ListUser,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/notes_user",
    name: "note_user",
    component: UserNote,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/note",
    name: "note",
    component: Note,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/detail",
    name: "detail",
    component: Detail,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/stafication",
    name: "stafication",
    component: Stafication,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user",
    name: "user",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/User.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("user"));
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isLoggedIn) {
    next("/"); // Chuyển hướng về trang đăng nhập nếu không đăng nhập
  } else {
    next(); // Cho phép chuyển đến trang tiếp theo
  }
});

export default router;
