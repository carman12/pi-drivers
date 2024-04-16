import React from "react";
import Card from '../Card/index';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Pagination } from '../Paginate/index';
import { orderCards, filterCards } from '../../redux/action';
import '../Cards/cards.css';
import image from '../../assets/DriverNotFound.png'

const Cards = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const totalDrivers = drivers.length;

  const allTeams = useSelector((state) => state.allTeams);

  const [driversPerPage, setDriversPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * driversPerPage;
  const firstIndex = lastIndex - driversPerPage;

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
    setCurrentPage(1);
  };

  const filterByTeam = (event) => {
    dispatch(filterCards(event.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="filtros">
        <div>
          <label>Order: </label>
          <select name="driversOrder" onChange={handleOrder}>
            <option value="none">None</option>
            <option value="ascendant">LasName: Ascendant</option>
            <option value="decendent">LasName: Decendent</option>
            <option value="younger">Age: Younger</option>
            <option value="older">Age: Older</option>
          </select>
        </div>

        <div>
          <label>Filter: </label>
          <select name="driversFilter" onChange={filterByTeam}>
            <option value="allDrivers">All drivers</option>
            <option value="bdd">drivers created</option>
            <option value="api">API drivers</option>
            {allTeams.map((team) => (
              <option key={team.id} value={team.teamName}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>

      </div>


      <div className='general'>
        <div className='card-container'>
          {drivers
            .map((driver) => { 
              return (
                <Card
                  key={driver.id}
                  id={driver.id}
                  //forename={driver.name.forename ? driver.name.forename : driver.forename}
                  //surname={driver.name.surname ? driver.name.surname : driver.surname}
                  forename={driver.name ? (driver.name.forename ? driver.name.forename : driver.forename) : driver.forename}
                  surname={driver.name ? (driver.name.surname ? driver.name.surname : driver.surname) : driver.surname}   
                  image={driver.image.url ? driver.image.url : (driver.image ? driver.image : image)}
                  nationality={driver.nationality}
                  dob={driver.dob ? driver.dob : driver.birth}
                  description={driver.description}
                  teams={Array.isArray(driver.teams) ? driver.teams.join(', ') : driver.teams}className='card'
                />

              //   <div key={driver.id} className= {<Card/>}>
              //   <div className='card-info'>
              //     <p>{driver.name.forename} {driver.name.surname}</p>
              //   </div>
              //   <img src={driver.image ? driver.image.url : image} alt="Driver" className='card-image' />
              // </div>

              );
            })
            .slice(firstIndex, lastIndex)}
        </div>
      </div>
      <div>
        <Pagination
          driversPerPage={driversPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalDrivers={totalDrivers}
        />
      </div>
    </>
  );
};

export default Cards;