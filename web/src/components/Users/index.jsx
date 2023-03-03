import React from 'react';
import s from './Users.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import AddClient from '../AddClient/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../../redux/slices/clients.js';
import DBService from '../../controller/http/service/DBService';

const Users = (props) => {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.clients);
  const isClientsLoading = clients.status === 'loading';
  const [searchValue, setSearchValue] = React.useState('');
  const navigate = useNavigate();

  const onAddHandler = () => {
    props.setShowForm(true);
  };

  React.useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const deleteHandler = async (e, id) => {
    e.preventDefault();

    await DBService.deleteClient(id);
    dispatch(fetchClients());

    if (window.location.pathname.split('/clients/')[1] === id) {
      navigate(`/`);
    } 
  };

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const renderClients = () => {
    const filteredItems = clients.items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return (isClientsLoading === 'loaded' ? [...Array(3)] : filteredItems).map((item, i) => (
      <li key={item.id} activeClassName='active'>
        <Link to={`/clients/${item.id}`} >
          {item.name}
          <img src="/delete.svg" alt="Удалить" onClick={(e) => deleteHandler(e, item.id)} />
        </Link>
      </li>
    ));
  };

  return (
    <>
      <div className={s.container__clients}>
        <h3>Клиенты</h3>
        <div className={s.container__inputs}>
          <input
            className={s.container__search_bar}
            onChange={(e) => searchHandler(e)}
            value={searchValue}
            placeholder="Поиск..."
          ></input>
          <button onClick={onAddHandler}>Добавить</button>
        </div>
        <ul>{renderClients()}</ul>
      </div>
      {props.showForm ? <AddClient setShowForm={props.setShowForm} /> : null}
    </>
  );
};

export default Users;
