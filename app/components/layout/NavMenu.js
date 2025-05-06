import { BookUser } from "lucide-react"
import { Tags } from "lucide-react"
import { SquareSigma } from "lucide-react"
import { Users, Home, CircleDollarSign, PackageSearch, BookCheck, ChartNoAxesColumn, Map, BookMarked } from "lucide-react"

export const NAV_MENU = [
    {
        group: {text: "Tablero", icon: <BookMarked />},
        items: [
          {
            icon: <Home />,
            text: "Inicio",
            href: "/dashboard/home",
            alert: "false",
            resource: "/dashboard"
          },
        ]
    },
]

export const NAV_MENU_FINAL = [
    {
        group: {text: "Reportes", icon: <BookMarked />},
        items: [
          {
            icon: <BookMarked />,
            text: "Compras",
            href: "/dashboard/reports/purchase",
            alert: "false",
            resource: "/reports/purchase"
          },
          {
            icon: <BookMarked />,
            text: "Ventas",
            href: "/dashboard/reports/sale",
            alert: "false",
            resource: "/reports/sale"
          },
          {
            icon: <BookMarked />,
            text: "Almacenes",
            href: "/dashboard/reports/warehouse",
            alert: "false",
            resource: "/reports/warehouse"
          },
        ]
      },
      {
        group: {text: "Configuraciones", icon: <BookMarked />},
        items: [
          {
            icon: <SquareSigma />,
            text: "Formula",
            href: "/dashboard/formula",
            alert: "false",
            resource: "/formula"
          },
          {
            icon: <Tags />,
            text: "Etiqueta",
            href: "/dashboard/tag",
            alert: "false",
            resource: "/tags"
          },
          {
            icon: <BookUser />,
            text: "Perspectiva",
            href: "/dashboard/perspective/info",
            alert: "false",
            resource: "/perspectives"
          }
        ]
      }
]