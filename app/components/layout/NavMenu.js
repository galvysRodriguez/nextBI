import { BookUser } from "lucide-react"
import { Tags } from "lucide-react"
import { SquareSigma } from "lucide-react"
import { Users, Home, CircleDollarSign, PackageSearch, BookCheck, ChartNoAxesColumn, Map, BookMarked } from "lucide-react"

export const NAV_MENU = [
    {icon: <Home/>, text:'Inicio', href:'/dashboard/home', alert:'false', resource:'/dashboard'},
    //{icon: <CircleDollarSign/>, text:'Finanzas', href:'/dashboard/finance', alert:'false'},
    //{icon: <PackageSearch/>, text:'Procesos', href:'/dashboard/process', alert:'false'},
    //{icon: <Users/>, text:'Clientes', href:'/dashboard/client', alert:'false'},
    //{icon: <BookCheck/>, text:'Aprendizaje', href:'/dashboard/innovation', alert:'false'},
    //{icon: <BookMarked/>, text:'Analitica', href:'/dashboard/analytic', alert:'false'},
   // {icon: <ChartNoAxesColumn/>, text:'Predicciones', href:'/dashboard/regresion', alert:'false'},
    //{icon: <Map/>, text:'Mapa', href:'/dashboard/map', alert:'false'}
]

export const NAV_MENU_FINAL = [
    {icon: <BookMarked/>, text:'Rep2', href:'/dashboard/reports/purchase', alert:'false', resource:'/reports/purchase'},
    {icon: <BookMarked/>, text:'Rep3', href:'/dashboard/reports/sale', alert:'false', resource:'/reports/sale'},
    {icon: <BookMarked/>, text:'Rep1', href:'/dashboard/reports/warehouse', alert:'false', resource:'/reports/warehouse'},
    {icon: <SquareSigma/>, text:'Formula', href:'/dashboard/formula', alert:'false', resource:'/formula'},
    {icon: <Tags/>, text:'Etiqueta', href:'/dashboard/tag', alert:'false', resource:'/tags'},
    {icon: <BookUser/>, text:'Perspectiva', href:'/dashboard/perspective/info', alert:'false', resource:'/perspectives'}
   // {icon: <ChartNoAxesColumn/>, text:'Predicciones', href:'/dashboard/regresion', alert:'false'},
    //{icon: <Map/>, text:'Mapa', href:'/dashboard/map', alert:'false'}
]