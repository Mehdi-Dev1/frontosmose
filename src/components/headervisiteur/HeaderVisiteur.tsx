import React, { useState } from 'react';
import MenuBurger from '../menuburger/MenuBurger';

const HeaderVisiteur: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <>
      <header className="w-80 h-40 relative flex justify-center ">
        <div>
          <div className='logoHeader flex justify-center  flex-col items-center'>
            <div className='nameLogo'>OSEMOSE</div>
            <div className='domaine'>Peinture ̇Sculpture ̇Photographie</div>
          </div>
        </div>
        <img 
          className="menuburger" 
          onClick={toggleMenu} 
          src="http://localhost:3000/assets/images/Vector.png" 
          alt="Menu Toggle" 
        />
      </header>
      {isMenuOpen && <MenuBurger />}
    </>
  );
};

export default HeaderVisiteur;
