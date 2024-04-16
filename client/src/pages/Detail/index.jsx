import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDriverDetail, cleanDetail } from '../../redux/action/index';
import { useParams, useNavigate } from "react-router-dom";
import '../Detail/detail.css';

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const driver = useSelector((state) => state.driver);

  useEffect(() => {
    dispatch(getDriverDetail(id));

    return () => dispatch(cleanDetail());
  }, [id]);

    // Agrega este efecto para mostrar el estado driver en la consola
    useEffect(() => {
      console.log("Driver State:", driver);
    }, [driver]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className='detail'>
        <img          
          src={isNaN(driver.id) ? driver.image : driver.image?.url}
          alt={driver.name?.forename}
          className='pic'
        />
        <h1>ID {driver.id}</h1>
        <h1>Name: 
          {isNaN(driver.id) ? driver.forename : driver.name?.forename}{" "}
          {isNaN(driver.id) ? driver.surname : driver.name?.surname}
        </h1>
        <h2>Nationality: {driver.nationality}</h2>
        <h3>Birth: {driver.dob}</h3>
        <p className='paragraph'>Description: {driver.description}</p>
        <h2>Teams: {driver.teams} </h2>
      
        
        <button className="button-flag" onClick={handleGoBack}>Go Back</button>
      </div>
    </>
  );
};

export default Details;