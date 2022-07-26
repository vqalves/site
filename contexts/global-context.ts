import React from "react"

export class GlobalContextData {
    theme: string = "light";
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