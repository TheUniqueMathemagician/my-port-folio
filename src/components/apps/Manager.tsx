import { useApplications } from "../../data/Applications";
import { useInstances } from "../../data/Instances";

import styles from "./Manager.module.scss";

export default function Manager() {
  const { applications } = useApplications();
  const { instances } = useInstances();
  return (
    <section className={styles["manager"]}>
      <h2>Applications</h2>
      <ul>
        {applications.map((app) => (
          <li>{app.displayName}</li>
        ))}
      </ul>
      <h2>Instances</h2>
      <ul>
        {instances
          .sort((a, b) => {
            if (a.displayName < b.displayName) {
              return -1;
            }
            if (a.displayName > b.displayName) {
              return 1;
            }
            return 0;
          })
          .map((instance) => (
            <li>
              <button onClick={() => instance.close()}>
                {instance.displayName}
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
