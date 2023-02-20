import React from 'react';
import s from './Info.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientInfo, fetchClientServices } from '../../redux/slices/clients.js';
import DBService from '../../controller/http/service/DBService';
import Skeleton from './Skeleton';

const Info = () => {
  const dispatch = useDispatch();
  const [newServiceID, setNewServiceID] = React.useState('1');

  const { info } = useSelector((state) => state.clients);
  const { services } = useSelector((state) => state.clients);
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(fetchClientInfo(id));
    dispatch(fetchClientServices(id));
  }, [id, dispatch]);

  const addHandle = async () => {
    await DBService.addService({
      clientId: id,
      serviceId: newServiceID,
      id: Date.now(),
    });

    await DBService.updateClient({ clientId: id, serviceId: newServiceID });
    dispatch(fetchClientServices(id));
    dispatch(fetchClientInfo(id));
  };

  return (
    <>
      <div className={s.container__info}>
        <h3>Информация</h3>

        {info.status === 'loaded' ? (
          <div className={s.info}>
            <span>
              <b>ФИО: </b>
              {info.items[0]?.name}
            </span>
            <span>
              <b>Паспортные данные: </b>
              {info.items[0]?.passport}
            </span>
            <span>
              <b>Номер телефона: </b>
              {info.items[0]?.contact}
            </span>
            <span className={s.label__expires}>
              <b>Абонемент: </b>
              {`${info.items[0]?.abonement_name} `}
              {new Date(info.items[0].expires) > Date.now() ? (
                <>
                  (Истекает:{' '}
                  {String(
                    new Date(info.items[0]?.expires).getDate() +
                      '/' +
                      (new Date(info.items[0]?.expires).getMonth() + 1) +
                      '/' +
                      new Date(info.items[0]?.expires).getFullYear(),
                  )}
                  )
                </>
              ) : (
                <>(Абонемент просрочен!)</>
              )}
            </span>
          </div>
        ) : (
          <Skeleton type="info" />
        )}

        <hr />

        <h3>Услуги</h3>

        <div className={s.section__add_service}>
          <select value={newServiceID} onChange={(e) => setNewServiceID(e.target.value)}>
            <option value="1">Абонемент на 1 день</option>
            <option value="2">Абонемент на месяц</option>
            <option value="3">Абонемент на 6 месяцев</option>
            <option value="4">Абонемент на год</option>
            <option value="5">EMS тренировка</option>
            <option value="6">Персональная консультация тренера</option>
          </select>

          <button onClick={addHandle}>Добавить</button>
        </div>

        <div className={s.container__header_services}>
          <p>Дата</p>
          <p>Название</p>
          <p>Стоимость</p>
        </div>

        {info.status === 'loaded' ? (
          <ul>
            {services.items.map((item, i) => (
              <li key={i}>
                {item.service_name}
                <div>
                  {new Date(parseInt(item.timestamp)).getDate() +
                    '/' +
                    (new Date(parseInt(item.timestamp)).getMonth() + 1) +
                    '/' +
                    new Date(parseInt(item.timestamp)).getFullYear() +
                    ' ' +
                    new Date(parseInt(item.timestamp)).getHours() +
                    ':' +
                    new Date(parseInt(item.timestamp)).getMinutes()}
                </div>
                <div>{services.items[i].price.split('$')}</div>
              </li>
            ))}
          </ul>
        ) : (
          [...new Array(3)].map((_, i) => <Skeleton key={i} type="services" />)
        )}
      </div>
    </>
  );
};

export default Info;
