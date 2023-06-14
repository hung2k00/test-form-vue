import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../views/Login.vue";
import Profile from "../components/Profile.vue";
import Note from "../components/Note.vue";
import Chat from "../components/Chat.vue";
import Statistics from "../components/Statistics.vue";
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
    path: "/user",
    name: "user",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/User.vue"),
    meta: {
      requiresAuth: true,
    },
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
    path: "/statistics",
    name: "statistics",
    component: Statistics,
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
  if (to.path === "/" && isLoggedIn) {
    next({ name: "user" });
  } else if (requiresAuth && !isLoggedIn) {
    next("/"); // Chuyển hướng về trang đăng nhập nếu không đăng nhập
  } else {
    next(); // Cho phép chuyển đến trang tiếp theo
  }
});

export default router;
