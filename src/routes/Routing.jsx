import { createBrowserRouter } from "react-router-dom";
import Root from '../pages/Root'
import NotFoundRoute from "../pages/NotFoundRoute";
import Clienti from "../pages/Clienti";
import Servizi from "../pages/Servizi";
import Calendario from "../pages/Calendario";
import Appuntamenti from "../pages/Appuntamenti";
import Report from "../pages/Report";
import GoogleCal from "../pages/GoogleCal";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <GoogleCal />
            },
            {
                path: "appuntamenti",
                element: <Appuntamenti />,
            },
            {
                path: "clienti",
                element: <Clienti />,
            },
            {
                path: "servizi",
                element: <Servizi />,
            },
            {
                path: "report",
                element: <Report />,
            },

        ],
    },
    {
        path: "*",
        element: <NotFoundRoute />
    }
]);

export default router;