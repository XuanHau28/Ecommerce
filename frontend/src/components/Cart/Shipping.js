import React, {Fragment, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import MetaData from '../Layout/MetaData';
import PinDropIcon from '@material-ui/icons/PinDrop';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import PhoneIcon from '@material-ui/icons/Phone';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import { Country, State} from 'country-state-city';
import { useAlert} from 'react-alert';
import CheckoutSteps from '../Cart/CheckoutSteps';



const Shipping = ({ history }) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);

  const shippingSubmit = (e) => {

    e.preventDefault();
    
    if (phoneNo.length < 10 || phoneNo.length > 10 ) {
      alert.error('Phone Number should be 10 digits Long');
      return;
    }
    dispatch(saveShippingInfo({address, city, pinCode, phoneNo, country, state})
    );
    history.push('/order/confirm');

  }

  return (
    <Fragment>
    <MetaData title="Shipping Details" />

    <CheckoutSteps activeStep={0} />

    <div className="shippingContainer w-[100vw] max-w-[100%] flex justify-center items-center flex-col pt-[2vmax] lg:pt-[1vmax]">
      <div className="shippingBox bg-white w-[100vw] lg:w-[25vw] h-[95vh] lg:h-[90vh] box-border overflow-hidden">
        <h2 className="shippingHeading text-center text-primary font-normal text-[4vw] lg:text-[1.3vmax] p-[5vw] lg:p-[1.3vmax] border-b border-b-[rgba(0,0,0,0.205)]
        w-[50%] m-auto">Shipping Details</h2>

        <form
          className="shippingForm flex flex-col items-center m-auto pt-[0vw] p-[11vw] lg:p-[2vmax] justify-evenly h-[80%] transition-all"
          encType="multipart/form-data"
          onSubmit={shippingSubmit}
        >
          <div className='w-[100%] flex items-center'>
            <HomeIcon
            className='absolute translate-x-[1vmax] text-[6vw] lg:text-[1.6vmax] text-[rgba(0,0,0,0.623)]' />
            <input
              className='p-[3vw_7vw] md:p-[0_0] lg:p-[1vmax_4vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded font-light text-[4vw] lg:text-[0.9vmax] outline-none'
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className='w-[100%] flex items-center'>
            <LocationCityIcon
             className='absolute translate-x-[1vmax] text-[6vw] lg:text-[1.6vmax] text-[rgba(0,0,0,0.623)]' />
             <input
               className='p-[3vw_7vw] lg:p-[1vmax_4vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded font-light text-[4vw] lg:text-[0.9vmax] outline-none'
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className='w-[100%] flex items-center'>
            <PinDropIcon 
             className='absolute translate-x-[1vmax] text-[6vw] lg:text-[1.6vmax] text-[rgba(0,0,0,0.623)]' />
             <input
               className='p-[3vw_7vw] lg:p-[1vmax_4vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded font-light text-[4vw] lg:text-[0.9vmax] outline-none'
              type="number"
              placeholder="Pin Code"
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>

          <div className='w-[100%] flex items-center'>
            <PhoneIcon
             className='absolute translate-x-[1vmax] text-[6vw] lg:text-[1.6vmax] text-[rgba(0,0,0,0.623)]' />
             <input
               className='p-[3vw_7vw] lg:p-[1vmax_4vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded font-light text-[4vw] lg:text-[0.9vmax] outline-none'
              type="number"
              placeholder="Phone Number"
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              size="10"
            />
          </div>

          <div className='w-[100%] flex items-center'>
            <PublicIcon 
             className='absolute translate-x-[1vmax] text-[6vw] lg:text-[1.6vmax] text-[rgba(0,0,0,0.623)]' />

            <select
            className='p-[3vw_7vw] lg:p-[1vmax_4vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded font-light text-[4vw] lg:text-[0.9vmax] outline-none'
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {country && (
            <div className='w-[100%] flex items-center'>
              <TransferWithinAStationIcon 
              className='absolute translate-x-[1vmax] text-[6vw] lg:text-[1.6vmax] text-[rgba(0,0,0,0.623)]' />

              <select
              className='p-[3vw_7vw] lg:p-[1vmax_4vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded font-light text-[4vw] lg:text-[0.9vmax] outline-none'
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <input
            type="submit"
            value="Continue"
            className="shippingBtn border-none bg-[#367057] text-white font-light text-[3vw] lg:text-[1vmax] w-[100%] p-[4vw] lg:p-[1vmax] cursor-pointer
            transition-all outline-none m-[2vmax] hover:bg-[#0f5536] "
            disabled={state ? false : true}
          />
        </form>
      </div>
    </div>
  </Fragment>
);
};

export default Shipping