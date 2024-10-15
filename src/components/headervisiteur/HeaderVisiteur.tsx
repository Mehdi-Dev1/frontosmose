import React from 'react'

const HeaderVisiteur: React.FC = () => {
  return (
    <header className="w-80 h-40 relative  flex justify-center  border-2">
      <div>
        <div className='logoHeader flex justify-center items-center flex-col'>
          <div className='nameLogo'>OSEMOSE</div>
          <div className='domaine'>Peinture ̇Sculpture ̇Photographie</div>
        </div>
      </div>

        
          <img className="menuburger " src="http://localhost:3000/assets/images/Vector.png"/>
        
  
      
    </header>
  )
}

export default HeaderVisiteur
