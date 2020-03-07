import Update from "./views/profile-sections/Upload.jsx";
import RecordList from "./views/profile-sections/PatientTableList.jsx";
import UserPage from "./views/profile-sections/PatientUserpage.jsx";

var dashRoutes = [
  {
    path: "/profile/:id",
    name: "My Profile",
    icon: "users_single-02",
    component: UserPage,
    layout: "/patient"
  },
  {
    path: "/view/:id",
    name: "View Records",
    icon: "files_paper",
    component: RecordList,
    layout: "/patient"
  },
  {
    path: "/upload/:id",
    name: "Upload Records",
    icon: "arrows-1_cloud-upload-94",
    component: Update,
    layout: "/patient"
  },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: Upgrade,
  //   layout: "/patient"
  // }
];
export default dashRoutes;