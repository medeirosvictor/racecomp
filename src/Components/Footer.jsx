import { translation } from '../constants/translation/en'

const  Footer = () => {
  return (
        <footer>
            <nav className='footer flex w-full place-content-around text-sm py-2'>
                <div>
                  {translation.COPYRIGHT}
                </div>
                <div>
                {translation.TERMS_OF_USE}
                </div>
                <div>
                {translation.PRIVACY_POLICY}
                </div>
            </nav>
        </footer>
  )
}

export default Footer