import icons from "../../assets/icons/index.json";
import { type AllHTMLAttributes, useEffect, useRef } from "react";
import type { IconsName } from "./iconUtils";

type Size = 20 | 24 | 32 | number;

interface IconProps extends Omit<AllHTMLAttributes<HTMLSpanElement>, "size"> {
  name: IconsName;
  size?: Size;
  width?: Size;
  height?: Size;
}

export function Icon({
  name,
  size = 20,
  className,
  width,
  height,
  ...rest
}: IconProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const existedIcon = Object.prototype.hasOwnProperty.call(icons, name);

    if (!existedIcon) return;

    if (ref.current?.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }

    const domParser = new DOMParser();

    const doc = domParser.parseFromString(icons[name], "image/svg+xml");
    const element = doc.documentElement;
    element.setAttribute("width", width ? width.toString() : size.toString());
    element.setAttribute(
      "height",
      height ? height.toString() : size.toString(),
    );
    element.style.position = "absolute";
    element.style.height = "100%";
    element.style.width = "100%";
    element.style.color = "inherit";

    ref.current?.append(element);
  }, [name, size, width, height]);

  return (
    <span
      ref={ref}
      className={`relative block align-middle ${className || ""}`}
      style={{
        height: height || size,
        width: width || size,
      }}
      {...rest}
    ></span>
  );
}
