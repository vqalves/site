import React from "react"
import SiteTheme from "../models/site.theme";

export class GlobalContextData {
    theme: SiteTheme = SiteTheme.light;
}

export class GlobalContextHolder {
    data: GlobalContextData;
    update: (newData: GlobalContextData) => void;

    constructor(
        {data, update} : 
        { 
            data: GlobalContextData, 
            update: (newData: GlobalContextData) => void
        }
    ) {
        this.data = data;
        this.update = update;
    }
}

export const GlobalContext = React.createContext(new GlobalContextHolder({
    data: new GlobalContextData(),
    update: (newData: GlobalContextData) => { }
}));