import * as Icons from "lucide-react";

export const mapBackendPerspectivesToNav = (data) => {
    return data
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
  };
  