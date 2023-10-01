import ImageMap from "../../config/ImageMap";

interface Props {}

function Logo({}: Props) {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <img src={ImageMap.get("logo")} style={{ width: "330px" }}></img>
    </div>
  );
}

export default Logo;
