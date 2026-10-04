import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import {setTheme } from "./themeSlice";
import { IoSunnyOutline ,IoMoonOutline,IoContrastSharp  } from "react-icons/io5";
export default function ThemeBtn() {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatchTheme = useDispatch();
  return (
    <>  
        <button onClick={()=>dispatchTheme(setTheme())}
          className={` rounded-full m-auto flex cursor-pointer text-black dark:text-white *:size-6 size-8 p-1 `}>
            {/* <IoColorPaletteOutline/> */}
            {theme === "light" ? <IoSunnyOutline/> : theme==="dark"?<IoMoonOutline/>:<IoContrastSharp/>} 
        </button>
    </>
  );
}
