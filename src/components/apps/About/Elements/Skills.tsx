import classes from "./Skills.module.scss";
import React, { FunctionComponent, memo } from "react";
import Paper from "../../../UI/Paper";
import Typography from "../../../UI/Typography";
import Rating from "../../../UI/Input/Rating";

interface IProps {
  pid: string;
}

interface ISKill {
  level: number;
  name: string;
}

const languageSkills: ISKill[] = [
  {
    level: 3,
    name: "HTML"
  },
  {
    level: 3,
    name: "CSS"
  },
  {
    level: 3,
    name: "Scss"
  },
  {
    level: 5,
    name: "Javascript"
  },
  {
    level: 4,
    name: "Typescript"
  },
  {
    level: 2,
    name: "C++"
  },
  {
    level: 2,
    name: "C#"
  },
  {
    level: 2,
    name: "Python"
  },
  {
    level: 2,
    name: "PHP"
  }
];
const softwareSkills: ISKill[] = [
  {
    level: 1,
    name: "Adobe Photoshop"
  },
  {
    level: 1,
    name: "Adobe InDesign"
  },
  {
    level: 1,
    name: "Adobe Illustrator"
  },
  {
    level: 3,
    name: "Adobe XD"
  },
  {
    level: 3,
    name: "Figma"
  }
];
const frameworkSkills: ISKill[] = [
  {
    level: 3,
    name: "Electron"
  },
  {
    level: 3,
    name: "Express"
  },
  {
    level: 1,
    name: "Angular"
  },
  {
    level: 4,
    name: "Vue"
  },
  {
    level: 3,
    name: "React"
  }
];

const Skills: FunctionComponent<IProps> = () => {
  return (
    <div className={classes["root"]}>
      <Typography noWrap variant="h4">
        Compétences
      </Typography>
      <Typography noWrap variant="h5">
        Langages
      </Typography>
      <Paper spaced blur background="paper">
        <div className={classes["cat"]}>
          {languageSkills.map((skill) => (
            <React.Fragment key={skill.name}>
              <Typography noWrap variant="body">
                {skill.name}
              </Typography>
              <Rating
                readOnly
                defaultValue={skill.level}
                min={1}
                max={5}
              ></Rating>
            </React.Fragment>
          ))}
        </div>
      </Paper>
      <Typography noWrap variant="h5">
        Frameworks
      </Typography>
      <Paper spaced blur background="paper">
        <div className={classes["cat"]}>
          {frameworkSkills.map((skill) => (
            <React.Fragment key={skill.name}>
              <Typography noWrap variant="body">
                {skill.name}
              </Typography>
              <Rating
                readOnly
                defaultValue={skill.level}
                min={1}
                max={5}
              ></Rating>
            </React.Fragment>
          ))}
        </div>
      </Paper>
      <Typography noWrap variant="h5">
        Logiciels
      </Typography>
      <Paper spaced blur background="paper">
        <div className={classes["cat"]}>
          {softwareSkills.map((skill) => (
            <React.Fragment key={skill.name}>
              <Typography noWrap variant="body">
                {skill.name}
              </Typography>
              <Rating
                readOnly
                defaultValue={skill.level}
                min={1}
                max={5}
              ></Rating>
            </React.Fragment>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default memo(Skills);
