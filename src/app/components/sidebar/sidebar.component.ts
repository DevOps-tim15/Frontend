import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/nistagram",
    title: "Nistagram",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/user-posts",
    title: "My posts",
    icon: "icon-bullet-list-67",
    class: ""
  },
  {
    path: "/liked-disliked",
    title: "Liked and disliked posts",
    icon: "icon-heart-2",
    class: ""
  },
  {
    path: "/saved-posts",
    title: "Saved posts",
    icon: "icon-shape-star",
    class: ""
  },
  {
    path: "/edit-profile",
    title: "Edit profile",
    icon: "icon-pencil",
    class: "",
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}

