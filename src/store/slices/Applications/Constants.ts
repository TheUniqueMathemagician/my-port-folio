import { FunctionComponent } from "react";

import { Applications } from "./Types";

import About from "../../../components/apps/About";
import Contact from "../../../components/apps/Contact";
import Image from "../../../components/apps/Image";
import Manager from "../../../components/apps/Manager";
import Maps from "../../../components/apps/Maps";
import Projects from "../../../components/apps/Projects";
import Randit from "../../../components/apps/Randit";
import Settings from "../../../components/apps/Settings";
import Snake from "../../../components/apps/Snake";
import Welcome from "../../../components/apps/Welcome";

export const defaultDimensions = {
  height: 600,
  width: 800
};
export const defaultMaxDimensions = {
  height: 900,
  width: 1600
};
export const defaultMinDimensions = {
  height: 300,
  width: 400
};

interface RunApp {
  args: any;
  pid: string;
}

export const applicationsMap = new Map<Applications, FunctionComponent<RunApp>>(
  [
    [Applications.About, About],
    [Applications.Contact, Contact],
    [Applications.Image, Image],
    [Applications.Manager, Manager],
    [Applications.Maps, Maps],
    [Applications.Randit, Randit],
    [Applications.Projects, Projects],
    [Applications.Settings, Settings],
    [Applications.Snake, Snake],
    [Applications.Welcome, Welcome]
  ]
);
