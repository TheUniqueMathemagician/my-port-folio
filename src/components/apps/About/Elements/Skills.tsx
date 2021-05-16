import classes from "./Skills.module.scss";
import React, { FunctionComponent, memo, useCallback, useState } from "react";
import Paper from "../../../UI/Paper";
import Typography from "../../../UI/Typography";
import Rating from "../../../UI/Input/Rating";

import { FaFilter } from "react-icons/fa";

interface IProps {
  pid: string;
}

interface ISKill {
  level: number;
  name: string;
}

enum EEqualityOption {
  smallerOrEqual,
  equal,
  greaterOrEqual
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
  },
  {
    level: 2,
    name: "SQL"
  },
  {
    level: 2,
    name: "noSQL"
  },
  {
    level: 2,
    name: "Dart"
  }
];
const technoSkills: ISKill[] = [
  {
    level: 2,
    name: "Git"
  },
  {
    level: 2,
    name: "GraphQL"
  },
  {
    level: 2,
    name: "WebPack"
  },
  {
    level: 1,
    name: "Vite"
  },
  {
    level: 3,
    name: "NodeJS"
  },
  {
    level: 1,
    name: "Docker"
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
  },
  {
    level: 3,
    name: "Microsoft Word"
  },
  {
    level: 3,
    name: "Microsoft Excel"
  },
  {
    level: 2,
    name: "Microsoft PowerPoint"
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
  },
  {
    level: 2,
    name: "Flutter"
  }
];
const incommingSkills: { name: string }[] = [
  {
    name: "WordPress ( et oui, le fameux... )"
  },
  {
    name: "NextJS"
  },
  {
    name: "Gatsby"
  },
  {
    name: "Angular"
  },
  {
    name: "Svelte"
  },
  {
    name: "Gulp - Grunt"
  },
  {
    name: "Docker"
  },
  {
    name: "Kubernetes"
  },
  {
    name: "AWS"
  }
];
const ripSkills: { name: string }[] = [
  {
    name: "LUA"
  },
  {
    name: "C"
  },
  {
    name: "Pascal"
  },
  {
    name: "VB .NET"
  },
  {
    name: "Forth"
  },
  {
    name: "ASM"
  },
  {
    name: "Scratch"
  },
  {
    name: "Xamarin"
  },
  {
    name: "Unity"
  },
  {
    name: "STM32"
  },
  {
    name: "VHDL - Verilog"
  }
];

const Filter = memo(() => (
  <FaFilter style={{ color: "var(--cvos-text)" }}></FaFilter>
));

const Skills: FunctionComponent<IProps> = () => {
  const [ratingFilter, setRatingFilter] = useState<number>(1);
  const [ratingFilterType, setRatingFilterType] = useState<EEqualityOption>(
    EEqualityOption.greaterOrEqual
  );

  const filter = useCallback(
    (skill: ISKill) => {
      switch (ratingFilterType) {
        case EEqualityOption.smallerOrEqual:
          return skill.level <= ratingFilter;
        case EEqualityOption.equal:
          return skill.level === ratingFilter;
        case EEqualityOption.greaterOrEqual:
          return skill.level >= ratingFilter;
        default:
          return false;
      }
    },
    [ratingFilter, ratingFilterType]
  );

  const map = useCallback(
    (skill) => (
      <React.Fragment key={skill.name}>
        <Typography noWrap variant="body">
          {skill.name}
        </Typography>
        <Rating readOnly defaultValue={skill.level} min={1} max={5}></Rating>
      </React.Fragment>
    ),
    []
  );

  return (
    <div className={classes["root"]}>
      <Typography noWrap variant="h4">
        Compétences
      </Typography>
      {/* TOTO: add rating filter field */}
      <form action="" method="post">
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            columnGap: "1rem",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Filter></Filter>
          <Typography tag="span" variant="body">
            Compétences
          </Typography>
          {/* TODO: make a select component */}
          <select
            onChange={(e) => setRatingFilterType(parseInt(e.target.value))}
          >
            <option value={EEqualityOption.greaterOrEqual}>{">="}</option>
            <option value={EEqualityOption.equal}>{"="}</option>
            <option value={EEqualityOption.smallerOrEqual}>{"<="}</option>
          </select>
          <Rating
            defaultValue={1}
            min={1}
            max={5}
            onChange={(e) => setRatingFilter(parseInt(e.target.value))}
          ></Rating>
        </div>
      </form>
      <Typography noWrap variant="h5">
        Langages
      </Typography>
      <Paper spaced blur background="paper">
        <div className={classes["cat"]}>
          {languageSkills.filter(filter).map(map)}
        </div>
      </Paper>
      <Typography noWrap variant="h5">
        Frameworks
      </Typography>
      <Paper spaced blur background="paper">
        <div className={classes["cat"]}>
          {frameworkSkills.filter(filter).map(map)}
        </div>
      </Paper>
      <Typography noWrap variant="h5">
        Logiciels
      </Typography>
      <Paper spaced blur background="paper">
        <div className={classes["cat"]}>
          {softwareSkills.filter(filter).map(map)}
        </div>
      </Paper>
      <Typography noWrap variant="h5">
        Technologies
      </Typography>
      <Paper spaced blur background="paper">
        <div className={classes["cat"]}>
          {technoSkills.filter(filter).map(map)}
        </div>
      </Paper>
      <Typography noWrap variant="h5">
        Sur ma liste
      </Typography>
      <Paper spaced blur background="paper">
        {incommingSkills.map((skill) => (
          <React.Fragment key={skill.name}>
            <Typography noWrap variant="body">
              {skill.name}
            </Typography>
          </React.Fragment>
        ))}
      </Paper>
      <Typography noWrap variant="h5">
        R.I.P.
      </Typography>
      <Typography variant="p">
        Je tiens à laisser un mention honorable à tout ce qui me servit fut un
        temps et dont je n'ai plus l'utilité.
      </Typography>
      <Paper spaced blur background="paper">
        {ripSkills.map((skill) => (
          <React.Fragment key={skill.name}>
            <Typography noWrap variant="body">
              {skill.name}
            </Typography>
          </React.Fragment>
        ))}
      </Paper>
    </div>
  );
};

export default memo(Skills);
