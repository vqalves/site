import Project from "../models/project/project";

import { owlistiq } from "./projects/owlistiq";
import { agrity } from "./projects/agrity";
import { telefonica } from "./projects/telefonica";
import { sigear } from "./projects/sigear";
import { unidesk } from "./projects/unidesk";
import { fmaConsulting } from "./projects/fmaconsulting";
import { sinergyRH } from "./projects/sinergyrh";

const ProjectSource = {
    listAll(): Project[] { 
        return [owlistiq, agrity, telefonica, sigear, unidesk, fmaConsulting, sinergyRH];
    }
}

export default ProjectSource;