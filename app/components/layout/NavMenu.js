import { Users, Home, CircleDollarSign, PackageSearch, BookCheck, ChartNoAxesColumn, Map, BookMarked } from "lucide-react"

export const NAV_MENU = [
    {icon: <Home/>, text:'Inicio', href:'/dashboard/home', alert:'false'},
    {icon: <CircleDollarSign/>, text:'Finanzas', href:'/dashboard/finance', alert:'false'},
    {icon: <PackageSearch/>, text:'Procesos', href:'/dashboard/process', alert:'false'},
    {icon: <Users/>, text:'Clientes', href:'/dashboard/client', alert:'false'},
    {icon: <BookCheck/>, text:'Aprendizaje', href:'/dashboard/innovation', alert:'false'},
    {icon: <BookMarked/>, text:'Analitica', href:'/dashboard/analytic', alert:'false'},
    {icon: <ChartNoAxesColumn/>, text:'Predicciones', href:'/dashboard/regresion', alert:'false'},
    {icon: <Map/>, text:'Mapa', href:'/dashboard/map', alert:'false'}
]

