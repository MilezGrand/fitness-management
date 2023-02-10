import React from 'react';
import s from './AddClient.module.scss';
import InputMask from 'react-input-mask';
import DBService from '../../controller/http/service/DBService';
import { useDispatch } from 'react-redux';
import { fetchClients } from '../../redux/slices/clients.js';
import { useNavigate } from 'react-router-dom';

const AddClient = (props) => {
  const [clientName, setClientName] = React.useState('');
  const [clientPassport, setClientPassport] = React.useState('');
  const [clientPhone, setClientPhone] = React.useState('');
  const [clientAbonement, setClientAbonement] = React.useState('1');
  const [abonementExpires, setAbonementExpires] = React.useState('1');

  const [nameDirty, setNameDirty] = React.useState(false);
  const [passportDirty, setPassportDirty] = React.useState(false);
  const [phoneDirty, setPhoneDirty] = React.useState(false);

  const [nameError, setNameError] = React.useState('Введите ФИО');
  const [passportError, setPassportError] = React.useState('Неккоректные паспортные данные');
  const [phoneError, setPhoneError] = React.useState('Неккоректный номер телефона');

  const [formValid, setFormValid] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (nameError || passportError || phoneError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, passportError, phoneError]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const id = Date.now();

    await DBService.addNewClient({
      id: id,
      name: clientName,
      passport: clientPassport,
      phone: clientPhone,
      abonementType: clientAbonement,
      expires: new Date(new Date().setDate(new Date().getDate() + Number(abonementExpires))),
    });

    await DBService.addService({
      client_id: id,
      service_id: parseService(abonementExpires),
      id: Date.now(),
    });

    props.setShowForm(false);

    dispatch(fetchClients());
    navigate(`/clients/${id}`);
  };

  const parseService = (days) => {
    if (days === '1') {
      return 1;
    } else if (days === '30') {
      return 2;
    } else if (days === '180') {
      return 3;
    } else if (days === '365') {
      return 4;
    }
  };
  const cancelHandler = (e) => {
    e.preventDefault();
    props.setShowForm(false);
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'passport':
        setPassportDirty(true);
        break;
      case 'phone':
        setPhoneDirty(true);
        break;
    }
  };

  const nameHandler = (e) => {
    setClientName(e.target.value);

    if (e.target.value === '') {
      setNameError('Введите ФИО');
    } else {
      setNameError('');
    }
  };

  const passportHandler = (e) => {
    setClientPassport(e.target.value);

    if (e.target.value.length < 10 || !/^\d+$/.test(e.target.value)) {
      setPassportError('Неккоректные паспортные данные');
    } else {
      setPassportError('');
    }
  };

  const phoneHandler = (e) => {
    setClientPhone(e.target.value);

    if (e.target.value.includes('_') || e.target.value === '') {
      setPhoneError('Неккоректный номер телефона');
    } else {
      setPhoneError('');
    }
  };

  return (
    <>
      <div className={s.background}>
        <div className={s.container__new_client}>
          <h3>Новый клиент</h3>
          <form onSubmit={submitHandler}>
            {nameDirty && nameError && <div className={s.form_error}>{nameError}</div>}
            <input
              type="text"
              placeholder="ФИО"
              value={clientName}
              onBlur={(e) => blurHandler(e)}
              name="name"
              onChange={(e) => nameHandler(e)}
            />

            {passportDirty && passportError && <div className={s.form_error}>{passportError}</div>}
            <input
              type="text"
              placeholder="Паспорт"
              maxLength="10"
              value={clientPassport}
              onBlur={(e) => blurHandler(e)}
              name="passport"
              onChange={(e) => passportHandler(e)}
            />

            {phoneDirty && phoneError && <div className={s.form_error}>{phoneError}</div>}
            <InputMask
              mask="+7 (999) 999-99-99"
              maskChar="_"
              value={clientPhone}
              onBlur={(e) => blurHandler(e)}
              name="phone"
              onChange={(e) => phoneHandler(e)}
            >
              {(inputProps) => (
                <input type="tel" placeholder="+7 (___) ___-__-__" {...inputProps} />
              )}
            </InputMask>

            <div className={s.section__select}>
              <select value={clientAbonement} onChange={(e) => setClientAbonement(e.target.value)}>
                <option value="1">Взрослый</option>
                <option value="2">Студенческий</option>
                <option value="3">Детский</option>
              </select>

              <select
                value={abonementExpires}
                onChange={(e) => setAbonementExpires(e.target.value)}
              >
                <option value="1">1 день</option>
                <option value="30">месяц</option>
                <option value="180">6 месяцев</option>
                <option value="365">год</option>
              </select>
            </div>

            <div className={s.container__new_client_buttons}>
              <button type="submit" disabled={!formValid}>
                Добавить
              </button>
              <button onClick={(e) => cancelHandler(e)}>Отмена</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddClient;
