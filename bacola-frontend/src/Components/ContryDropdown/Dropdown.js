import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { Mycontext } from "../../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dropdown = () => {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [selectedTab, setselectedTab] = useState(null);
  const [countryList, setcountryList] = useState([]);
  const context = useContext(Mycontext);

  const selectCountry = (index, country) => {
    setselectedTab(index);
    setisOpenModal(false);
    context.setselectedCountry(country)
  }
  useEffect(() => {
    setcountryList(context.countrylist);
  }, [context.countrylist]);

  const filterlist = (e) => {
    const keyword = e.target.value.toLowerCase();
    if (keyword !== "") {
      const list = countryList.filter((item) => {
        return item.country.toLowerCase().includes(keyword)
      });
      setcountryList(list);
    } else {
      setcountryList(context.countrylist);
    }
  }

  return (
    <div className="mr-2">
      <Button className="countryDrop mr-2" onClick={() => setisOpenModal(true)}>
        <div className="info d-flex flex-column">
          <span className="lable">your location</span>
          <span className="name text-xs">{context.selectedCountry !== "" ? context.selectedCountry : 'Select location '}</span>
        </div>
        <span>
          <FaAngleDown />
        </span>
      </Button>
      <Dialog
        open={isOpenModal}
        onClose={() => setisOpenModal(false)}
        TransitionComponent={Transition}
        className="locationModal"
      >
        <h4>Choose your Delivery Location</h4>
        <p>Enter your address and we will specify the offer for your area.</p>
        <Button className="close_" onClick={() => setisOpenModal(false)}>
          <IoCloseCircleOutline />
        </Button>
        <div className="headerSearch w-100">
          <input type="text" placeholder="search your area...." onChange={filterlist} />
          <Button className="searchButton">
            <FaSearch />
          </Button>
        </div>
        <ul className="countrylist mt-2">
          {countryList?.length !== 0 &&
            countryList?.map((item, index) => {
              return (
                <li key={index}>
                  {" "}
                  <Button onClick={() => selectCountry(index, item.country)} className={`${selectedTab === index ? 'active' : ''}`}>
                    {item.country}
                  </Button>
                </li>
              );
            })}
        </ul>
      </Dialog>
    </div>
  );
};

export default Dropdown;