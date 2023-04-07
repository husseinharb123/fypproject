import React, { useEffect, useState } from "react";
import "./style.scoped.css"
import { useParams } from "react-router-dom";
import axios from "axios";
function SettingSection() {

  const defaultSettings = {
    aboutUs: {
      section1: 'At our store, we are dedicated to providing you with the best products and service possible. Our team is passionate about bringing you quality items and ensuring your satisfaction.',
      section2: 'Our team is composed of experts in their respective fields, ensuring that you receive the best advice and guidance for your purchase. Whether you need help finding the perfect product or have questions about our services, we are here to help.',
      section3: 'We offer a wide variety of products to suit your needs, from household essentials to the latest gadgets. Our selection is carefully curated to ensure quality and value, and we are always adding new items to our inventory.',
    },
    storeProfileid: "6423c5ecdfc65f7ac4734105",
    storeBackgroundid: "6423c5ecdfc65f7ac4734105",
  };


  const [storename, setStoreName] = useState("");
  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Address, setAddress] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [industry, setindustry] = useState("");
  const [paymentopt1, setpaymentopt1] = useState(false);
  const [paymentopt2, setpaymentopt2] = useState(true);
  const [shippingopt1, setshippingopt1] = useState(false);
  const [shippingopt2, setshippingopt2] = useState(true);
  const [storeprofile, setstoreprofile] = useState(null);
  const [storebackground, setstorebackground] = useState(null);
  const [storeprofileid, setstoreprofileid] = useState(defaultSettings.storeProfileid);
  const [storebackgroundid, setstorebackgroundid] = useState(defaultSettings.storeBackgroundid);
  const [aboutus1, setaboutus1] = useState(defaultSettings.aboutUs.section1);
  const [aboutus2, setaboutus2] = useState(defaultSettings.aboutUs.section2);
  const [aboutus3, setaboutus3] = useState(defaultSettings.aboutUs.section3);
  const [facebookurl, setfacebookurl] = useState("");
  const [insturl, setinsturl] = useState("");
  const [twitterurl, settwitterurl] = useState("");
  const [shippingprice,setShippingPrice] = useState(0)
  const storeid  = useParams().id
  const [currentSection, setCurrentSection] = useState('general');

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/store-settings', {
          params: { storeid: storeid }
        });

        const data = response.data
        setStoreName(data.storename)
        setEmail(data.Email)
        setFirstName(data.FirstName)
        setLastName(data.LastName)
        setAddress(data.Address)
        setPhonenumber(data.Phonenumber)
        setindustry(data.industry)
        setpaymentopt1(data.paymentopt1)
        setpaymentopt2(data.paymentopt2)
        setshippingopt1(data.shippingopt1)
        setshippingopt2(data.shippingopt2)
        setstoreprofileid(data.storeprofileid || defaultSettings.storeProfileid)
        setstorebackgroundid(data.storebackgroundid || defaultSettings.storeBackgroundid)
        setstoreprofileid(data.storeprofileid || defaultSettings.storeProfileid)
        setstorebackgroundid(data.storebackgroundid || defaultSettings.storeBackgroundid)
        setaboutus1(data.aboutus1!="" || defaultSettings.aboutUs.section1)
        setaboutus2(data.aboutus2!="" || defaultSettings.aboutUs.section2)
        setaboutus3(data.aboutus3|| defaultSettings.aboutUs.section3)
        setfacebookurl(data.facebookurl)
        setinsturl(data.insturl)
        settwitterurl(data.twitterurl)
        setShippingPrice(data.shippingprice)

        
        console.log(data);



      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);




  const handleSectionChange = (event) => {
    setCurrentSection(event.target.value);


  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      storename,
      Email,
      FirstName,
      LastName,
      Address,
      Phonenumber,
      industry,
      paymentopt1,
      paymentopt2,
      shippingopt1,
      shippingopt2,
      aboutus1,
      aboutus2,
      aboutus3,
      facebookurl,
      insturl,
      twitterurl,
      shippingprice
    };

    if (storeprofile != null){
      data['storeprofile'] = storeprofile // this is a file 
    }
    if (storebackground != null){
      data['storebackground'] = storebackground // this is a file 
    }
  
    const formData = new FormData();
  
    // Append each key-value pair to the FormData object
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

  
    try {
      const response = await axios.post(`/store-settings/${storeid}`, formData);
      const result = response.data;
      console.log(result);
      setCurrentSection('general');
    } catch (error) {
      console.log(error);
    }
  };












  return (
    <div>
      <h1>Store Settings</h1>
      <label htmlFor="section-select">Select a section:</label>
      <select id="section-select" value={currentSection} onChange={handleSectionChange}>
        <option value="general">General</option>
        <option value="Paymentshiping">Payment & shiping</option>
        <option value="about">About Us</option>
        <option value="social">Social Media</option>
        <option value="profile">Profile & Wallpaper</option>
      </select>

      <hr />
      {currentSection === 'general' && (  
        <>
< label htmlFor="storename">Store Name:</label>
        <input
          type="text"
          id="storename"
          value={storename }
          onChange={(e) => setStoreName(e.target.value)}
        />

        <label htmlFor="Email">Email:</label>
        <input
          type="Email"
          id="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="FirstName">First Name:</label>
        <input
          type="text"
          id="FirstName"
          value={FirstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="LastName">Last Name:</label>
        <input
          type="text"
          id="LastName"
          value={LastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="Address">Address:</label>
        <input
          type="text"
          id="Address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
        />

    <label htmlFor="section-select">Select an industry:</label>
      <select id="section-select" value={industry} onChange={(e)=>{setindustry(e.target.value)}}>
  <option value="">industry</option>      
  <option value="grocery">Grocery stores</option>
  <option value="clothing">Clothing stores</option>
  <option value="electronics">Electronic stores</option>
  <option value="furniture">Furniture stores</option>
  <option value="beauty">Beauty and cosmetics stores</option>
  <option value="sporting">Sporting goods stores</option>
  <option value="books">Bookstores</option>
  <option value="home-improvement">Home improvement stores</option>
      </select>

        <label htmlFor="Phonenumber">Phone Number:</label>
        <input
          type="tel"
          id="Phonenumber"
          value={Phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
        />


        </>
      )}
      {currentSection === 'Paymentshiping' && (
        <>
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ marginRight: '10px' }}>Payment method :</label>
  
    <input
      type="checkbox"
      id="deliveryOption1"
      checked={paymentopt1}
      onChange={(e) => setpaymentopt1(e.target.checked)}
    />
    <label htmlFor="deliveryOption1" style={{ marginRight: '10px', marginLeft: '5px' }}>Option 1</label>
  
    <input
      type="checkbox"
      id="deliveryOption2"
      checked={paymentopt2}
      onChange={(e) => setpaymentopt2(e.target.checked)}
    />
    <label htmlFor="deliveryOption2" style={{ marginRight: '10px', marginLeft: '5px' }}>Option 2</label>
  

  </div>


  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ marginRight: '10px' }}>shipping method :</label>
  
    <input
      type="checkbox"
      id="shippingOption1"
      checked={shippingopt1}
      onChange={(e) => setshippingopt1(e.target.checked)}
    />
    <label htmlFor="shippingOption1" style={{ marginRight: '10px', marginLeft: '5px' }}>Option 1</label>
  
    <input
      type="checkbox"
      id="shippingOption2"
      checked={shippingopt2}
      onChange={(e) => setshippingopt2(e.target.checked)}
    />
    <label htmlFor="shippingOption2" style={{ marginRight: '10px', marginLeft: '5px' }}>Option 2</label>
  

  </div>








  <div style={{ marginTop: '20px' }}>
    <label htmlFor="shippingPrice">Shipping Price per kilometer :</label>
    <input
      type="tel"
      id="shippingPrice"
       value={shippingprice}
       onChange={(e) => setShippingPrice(e.target.value)}
    />
  </div>


</>

      )}




{currentSection === 'profile' && (
        <>




<div>
  <div>
    <label htmlFor="storeprofileUrl">Store Profile URL:</label>
    <input type="file" autoComplete="off" id="storeprofileUrl" onChange={(e) => setstoreprofile(e.target.files[0])} />
  </div>

  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '150px', height: '150px', border: '1px solid black' }}>
    <img src={storeprofile ? URL.createObjectURL(storeprofile) : `http://localhost:8070/images/${storeprofileid}`} alt="store profile" style={{ maxWidth: '100%', maxHeight: '100%' }} />
  </div>

  <div>
    <label htmlFor="storebackgroundUrl">Store Background URL:</label>
    <input type="file" autoComplete="storebackgroundUrl" id="storebackgroundUrl" onChange={(e) => setstorebackground(e.target.files[0])} />
  </div>

  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '300px', height: '150px', border: '1px solid black' }}>
    <img src={storebackground ? URL.createObjectURL(storebackground) : `http://localhost:8070/images/${storebackgroundid}`} alt="store background" style={{ maxWidth: '100%', maxHeight: '100%' }} />
  </div>
</div>


        </>
      )}




      {currentSection === 'about' && (
        <>
 <label htmlFor="aboutus1">About Us:</label>
    <textarea
      id="aboutus1"
      value={aboutus1}
      onChange={(e) => setaboutus1(e.target.value)}
    />

    <label htmlFor="aboutus2">About Us:</label>
    <textarea
      id="aboutus2"
      value={aboutus2}
      onChange={(e) => setaboutus2(e.target.value)}
    />

    <label htmlFor="aboutus3">About Us:</label>
    <textarea
      id="aboutus3"
      value={aboutus3}
      onChange={(e) => setaboutus3(e.target.value)}
    />








        </>
      )}
      {currentSection === 'social' && (
        <>
    <label htmlFor="facebookurl">Facebook URL:</label>
    <input
      type="text"
      id="facebookurl"
      value={facebookurl}
      onChange={(e) => setfacebookurl(e.target.value)}
    />

    <label htmlFor="insturl">Instagram URL:</label>
    <input
      type="text"
      id="insturl"
      value={insturl}
      onChange={(e) => setinsturl(e.target.value)}
    />

    <label htmlFor="twitterurl">Twitter URL:</label>
    <input
      type="text"
      id="twitterurl"
      value={twitterurl}
      onChange={(e) => settwitterurl(e.target.value)}
    />
        </>
      )}
      <button  onClick={handleSubmit}>Save Changes</button>
    </div>
  );
}

export default SettingSection;