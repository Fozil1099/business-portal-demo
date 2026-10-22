export interface NavItem {
  name: string;
  path: string;
  key: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    name: "navigation.main",
    path: "/",
    key: "main",
  },
  {
    name: "navigation.services",
    path: "/services",
    key: "services",
  },
  {
    name: "navigation.news",
    path: "/news",
    key: "news",
  },
  {
    name: "navigation.questions",
    path: "/questions",
    key: "questions",
  },
];
