import icons from "../../assets/icons/index.json";

export const iconsName = Object.keys(icons) as (keyof typeof icons)[];
export type IconsName = keyof typeof icons;
