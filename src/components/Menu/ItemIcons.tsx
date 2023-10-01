import Icon from "../../classes/Icons";
import Colors from "../../config/Colors";
import ImageMap from "../../config/ImageMap";

interface Props<T> {
  list: T[];
  offset?: number;
  selectedItem: number;
  setSelectedItem: (i: number) => void;
  setSelected: (i: T) => void;
  toggleGame?: () => void;
  icons: Icon[];
}

function ItemIcons<T>({
  list,
  offset = 0,
  selectedItem,
  setSelectedItem,
  setSelected,
  toggleGame = () => {},
  icons,
}: Props<T>) {
  const size = 75;
  const small = 60;

  return (
    <div className="d-flex justify-content-center position-relative mt-4">
      {list.map((opp, i) => (
        <div
          className="d-flex justify-content-center align-items-center"
          key={i}
          style={{
            width: size + "px",
            height: size + "px",
          }}
        >
          <div
            className="btn rounded position-relative d-flex justify-content-center align-items-center"
            style={{
              width: (i + offset === selectedItem ? size : small) + "px",
              height: (i + offset === selectedItem ? size : small) + "px",
              backgroundColor: icons[i].color,
              transitionProperty: "height, width, opacity",
              transitionDuration: "0.1s, 0.1s, 0.2s",
              overflow: "hidden",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: Colors.dark,
            }}
            onClick={() => {
              setSelectedItem(i + offset);
              setSelected(opp);
              if (i + offset === selectedItem) toggleGame();
            }}
          >
            <img
              src={ImageMap.get(icons[i].imageName)}
              style={{
                width: (i + offset === selectedItem ? size : small) + "px",
                opacity: i + offset === selectedItem ? "1" : "0.5",
                transitionProperty: "height, width, opacity",
                transitionDuration: "0.1s, 0.1s, 0.2s",
              }}
            ></img>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemIcons;
