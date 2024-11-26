import localFont from "next/font/local";
import {Anonymous_Pro} from "next/dist/compiled/@next/font/dist/google";

export const anderson = localFont({
    src: [
        {
            path: "../../public/font/AndersonGrotesk-Black.otf",
            weight: "700",
        },
    
    ],
    display: "swap",
    variable: "--font-anderson",
});

export const fonts = {
    anderson: anderson,
    anonymous: Anonymous_Pro,
};

export default fonts;