import React from 'react'
import { translation } from '../constants/translation/en'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <>
        <footer>
            <nav className='footer flex w-full place-content-around text-sm py-2'>
                <div>
                  <NavLink to="/copyright" >
                    {translation.COPYRIGHT}
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/terms-of-use" >
                    {translation.TERMS_OF_USE}
                  </NavLink>
                </div>
                <div>
                  <NavLink to='/privacy-policy'>
                    {translation.PRIVACY_POLICY}
                  </NavLink>
                </div>
                <div>
                    <NavLink to='/about-us'>
                      {translation.ABOUT_US}
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/contact-us'>
                      {translation.CONTACT_US}
                    </NavLink>
                </div>
            </nav>
        </footer>
    </>
  )
}

export default Footer