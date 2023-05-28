import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../views/Login.vue";
import Profile from "../components/Profile.vue";
import Note from "../components/Note.vue";
import Chat from "../components/Chat.vue";
import Stafication from "../components/Stafication.vue";
import Detail from "../components/Detail.vue";
import Search from "../components/Search.vue";
import PopupRegis from "../components/Popup_regis.vue";
import UserNote from "../components/UserNote.vue";
import PopupDetail from "../components/Popup_detail.vue";
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
  },
  {
    path: "/pop-up-details",
    name: "popupdetails",
    component: PopupDetail,
  },
  {
    path: "/notes_user",
    name: "note_user",
    component: UserNote,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/create_user",
    name: "createUser",
    component: PopupRegis,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/note",
    name: "note",
    component: Note,
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
  },
  {
    path: "/detail",
    name: "detail",
    component: Detail,
  },
  {
    path: "/stafication",
    name: "stafication",
    component: Stafication,
  },
  {
    path: "/user",
    name: "user",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/User.vue"),
    meta: {
      authRequired: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
