import Button from '../../components/Button';
import Layout from '../../components/Layout';
import { NavLink } from 'react-router-dom';
import '../LandingPage/landingPage.css';


function LandingPage() {
  return (
    <Layout>
    <div className='containerLanding'>
      <div className='container-words'>
      <h1>Welcome Driver APP</h1>      
      </div>
      <NavLink to={'/home'}>
        <Button name={'Login'} />
      </NavLink>
    </div>
    </Layout>
    
  )
}

export default LandingPage