import { BrowserRouter } from "react-router-dom";
import { useSelector } from "./hooks/Store";

import Desktop from "./layouts/Desktop";
import Mobile from "./layouts/Mobile";

const OS = () => {
  const isMobile = useSelector((store) => store.os.isMobile);

  return (
    <BrowserRouter>
      {isMobile ? <Mobile></Mobile> : <Desktop></Desktop>}
    </BrowserRouter>
  );
};

export default OS;
