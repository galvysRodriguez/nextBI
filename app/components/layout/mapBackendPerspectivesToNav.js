import * as Icons from "lucide-react";
import { BookMarked } from "lucide-react";

export const mapBackendPerspectivesToNav = (data) => {
  const items = data
    .filter(item => item.icon)
    .map(item => {
      const IconComponent = Icons[item.icon] || Icons["CircleHelp"];
      return {
        icon: <IconComponent />,
        text: item.perspective,
        href: `/dashboard/target/perspective/${item.id}`,
        alert: 'false',
        resource: `/targets/perspective/${item.id}`
      };
    });

  return {
    group: {
      text: "Objetivos",
      icon: <BookMarked />
    },
    items
  };
};
