import Cards from "../../components/Cards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDrivers, getTeams } from '../../redux/action/index';
import "../Home/home.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, []);


  return (
    <>
      <div id="cards" className='container'>
        <Cards />
      </div>
    </>
  );
};

export default Home;