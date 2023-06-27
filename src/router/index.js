import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../views/Login.vue";
import Profile from "../components/Profile.vue";
import Note from "../components/Note.vue";
import Chat from "../components/Chat.vue";
import Statistics from "../components/Statistics.vue";
import Search from "../components/Search.vue";
import UserNote from "../components/UserNote.vue";
import User from "../views/User.vue";
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";

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
    components: {
      default: User,
      header: Header,
      menu: Menu,
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/notes_user",
    name: "note_user",
    components: {
      default: UserNote,
      header: Header,
      menu: Menu,
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    components: {
      default: Profile,
      header: Header,
      menu: Menu,
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/search",
    name: "search",
    components: {
      default: Search,
      header: Header,
      menu: Menu,
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/note",
    name: "note",
    components: {
      default: Note,
      header: Header,
      menu: Menu,
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chat",
    name: "chat",
    components: {
      default: Chat,
      header: Header,
      menu: Menu,
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/statistics",
    name: "statistics",
    components: {
      default: Statistics,
      header: Header,
      menu: Menu,
    },
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
