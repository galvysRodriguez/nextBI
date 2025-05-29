import { BookUser } from "lucide-react"
import { BookLock } from "lucide-react"
import { Store } from "lucide-react"
import { BookType } from "lucide-react"
import { Tags } from "lucide-react"
import { SquareSigma } from "lucide-react"
import { Users, Home, CircleDollarSign, PackageSearch, BookCheck, ChartNoAxesColumn, Map, BookMarked } from "lucide-react"

export const NAV_MENU = [
    {
        group: {text: "Tablero", icon: <BookCheck />},
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
        group: {text: "Reportes", icon: <BookType/>},
        items: [
          
           {
            icon: <CircleDollarSign />,
            text: "Ordenes",
            href: "/dashboard/reports/order",
            alert: "false",
            resource: "/reports/sale"
          },
          {
            icon: <Store />,
            text: "Compras",
            href: "/dashboard/reports/purchase",
            alert: "false",
            resource: "/reports/purchase"
          },
          {
            icon: <PackageSearch/>,
            text: "Almacenes",
            href: "/dashboard/reports/warehouse",
            alert: "false",
            resource: "/reports/warehouse"
          },
          {
            icon: <CircleDollarSign />,
            text: "Cotizaciones",
            href: "/dashboard/reports/quote",
            alert: "false",
            resource: "/reports/sale"
          },
          {
            icon: <CircleDollarSign />,
            text: "Ventas",
            href: "/dashboard/reports/sale",
            alert: "false",
            resource: "/reports/sale"
          },
        ]
      },
      {
        group: {text: "Configuraciones", icon: <BookLock />},
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