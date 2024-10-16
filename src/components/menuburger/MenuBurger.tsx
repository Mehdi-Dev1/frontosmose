import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
const MenuBurger :React.FC = () => {
  const [menuOeuvre, setMenuOeuvre] = useState(false)
    const hideMenu = () => {
        const menuElements = document.querySelectorAll('.menu');
        menuElements.forEach((menuElement) => {
          (menuElement as HTMLElement).style.display = 'none';
        });
        const sousMenu = document.querySelectorAll('.sousmenu');
        sousMenu.forEach((menuElement) => {
          (menuElement as HTMLElement).style.display = 'none';
        });
      };
    const toggleOeuvre =()=>{
      setMenuOeuvre(state=>!state)
    }
  return (
    <div className="flex flex-col w-80 items-center absolute bg-orange-300 z-50">
      <div className="menu" onClick={toggleOeuvre} >Oeuvres</div>
        {menuOeuvre && 
        <NavLink to="/oeuvres/listing/1"><div onClick={hideMenu} className=" sousmenu h-14 flex flex-row justify-center items-center" >Peintures</div></NavLink>
      
        
        }
      <NavLink to="/oeuvres/listing/1"><div onClick={hideMenu} className="menu" >Expositions</div></NavLink>
      <NavLink to="/artistes/listing"><div onClick={hideMenu} className="menu" >Artistes</div></NavLink>
      <NavLink to="/oeuvres"><div onClick={hideMenu} className="menu" >Contact</div></NavLink>
      <NavLink to="/oeuvres"><div onClick={hideMenu} className="menu" >A propos</div></NavLink>
    </div>
  )
}

export default MenuBurger
