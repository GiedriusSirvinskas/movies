import CatSvg from "./CatSvg";
import { Link } from "react-router-dom";
import BasicMenu from "./NavMenu";

function Navigation() {
  return (
    <div className="navigation shadow-drop-bottom gradient-background">
      <Link
        to="https://media.tenor.com/jFn8sS1Et-0AAAAd/cat.gif"
        target="_blank"
      >
        <CatSvg width="4rem" height="4rem" />
      </Link>
      <BasicMenu />
    </div>
  );
}

export default Navigation;
