import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  role: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/nistagram",
    title: "Nistagram",
    icon: "icon-chart-pie-36",
    class: "",
    role: "USER"
  },
  {
    path: "/user-posts",
    title: "My posts",
    icon: "icon-bullet-list-67",
    class: "",
    role: "REG_USER"
  },
  {
    path: "/liked-disliked",
    title: "Liked and disliked posts",
    icon: "icon-heart-2",
    class: "",
    role: "REG_USER"
  },
  {
    path: "/saved-posts",
    title: "Favourites",
    icon: "icon-shape-star",
    class: "",
    role: "REG_USER"
  },
  {
    path: "/reported-posts",
    title: "Reported posts",
    icon: "icon-alert-circle-exc",
    class: "",
    role: "ADMIN"
  },
  {
    path: "/following-requests",
    title: "Following requests",
    icon: "icon-single-02",
    class: "",
    role: "REG_USER"
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    let role = this.authService.getRole();
    switch (role) {
      case "":
        this.menuItems = ROUTES.filter(menuItem => menuItem.role == "USER");
        break;
      case "ROLE_REGISTERED_USER":
        this.menuItems = ROUTES.filter(menuItem => menuItem.role == "REG_USER" || menuItem.role == "USER");
        break;
      case "ROLE_ADMIN":
        this.menuItems = ROUTES.filter(menuItem => menuItem.role == "ADMIN" || menuItem.role == "USER");
      default:
        break;
    }
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}

