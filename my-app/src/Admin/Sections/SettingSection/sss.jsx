import React, { useState } from "react";
import "./style.scoped.css"
function SettingSection() {
  const [storename, setStoreName] = useState("husseinstore");
  const [email, setEmail] = useState("hzh09@mail.aub.edu");
  const [firstName, setFirstName] = useState("hussein");
  const [lastName, setLastName] = useState("harb");
  const [address, setAddress] = useState("Afghanistan");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("1");
  const [industry, setIndustry] = useState("1");
  const [deliveryOpt1, setDeliveryOpt1] = useState(false);
  const [deliveryOpt2, setDeliveryOpt2] = useState(true);
  const [deliveryOpt3, setDeliveryOpt3] = useState(false);
  const [storeProfileUrl, setStoreProfileUrl] = useState("");
  const [storeBackgroundUrl, setStoreBackgroundUrl] = useState("");
  const [aboutUs1, setAboutUs1] = useState("");
  const [aboutUs2, setAboutUs2] = useState("");
  const [aboutUs3, setAboutUs3] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instaUrl, setInstaUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");





  const [currentSection, setCurrentSection] = useState('general');
  const handleSectionChange = (event) => {
    setCurrentSection(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the form submission and update the store settings
    // using the values of the state variables
  };

  return (
    <div>
      <h1>Store Settings</h1>
      <label htmlFor="section-select">Select a section:</label>
      <select id="section-select" value={currentSection} onChange={handleSectionChange}>
        <option value="general">General</option>
        <option value="delivery">Delivery Options</option>
        <option value="about">About Us</option>
        <option value="social">Social Media</option>
        <option value="profile">Profile & Wallpaper</option>
      </select>
      {currentSection === 'general' && (
        <>
<label htmlFor="storename">Store Name:</label>
        <input
          type="text"
          id="storename"
          value={storename}
          onChange={(e) => setStoreName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </>
      )}
      {currentSection === 'delivery' && (
        <>
<label>Delivery Options:</label>
    <div>
      <input
        type="checkbox"
        id="deliveryopt1"
        checked={deliveryOpt1}
        onChange={(e) => setDeliveryOpt1(e.target.checked)}
      />
      <label htmlFor="deliveryopt1">Option 1</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="deliveryopt2"
        checked={deliveryOpt2}
        onChange={(e) => setDeliveryOpt2(e.target.checked)}
      />
      <label htmlFor="deliveryopt2">Option 2</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="deliveryopt3"
        checked={deliveryOpt3}
        onChange={(e) => setDeliveryOpt3(e.target.checked)}
      />
      <label htmlFor="deliveryopt3">Option 3</label>
    </div>
        </>
      )}




{currentSection === 'profile' && (
        <>


<label htmlFor="storeProfileUrl">Store Profile URL:</label>
    <input
      type="text"
      id="storeProfileUrl"
      value={storeProfileUrl}
      onChange={(e) => setStoreProfileUrl(e.target.value)}
    />

    <label htmlFor="storeBackgroundUrl">Store Background URL:</label>
    <input
      type="text"
      id="storeBackgroundUrl"
      value={storeBackgroundUrl}
      onChange={(e) => setStoreBackgroundUrl(e.target.value)}
    />
        </>
      )}




      {currentSection === 'about' && (
        <>
 <label htmlFor="aboutUs1">About Us:</label>
    <textarea
      id="aboutUs1"
      value={aboutUs1}
      onChange={(e) => setAboutUs1(e.target.value)}
    />

    <label htmlFor="aboutUs2">About Us:</label>
    <textarea
      id="aboutUs2"
      value={aboutUs2}
      onChange={(e) => setAboutUs2(e.target.value)}
    />

    <label htmlFor="aboutUs3">About Us:</label>
    <textarea
      id="aboutUs3"
      value={aboutUs3}
      onChange={(e) => setAboutUs3(e.target.value)}
    />








        </>
      )}
      {currentSection === 'social' && (
        <>
    <label htmlFor="facebookUrl">Facebook URL:</label>
    <input
      type="text"
      id="facebookUrl"
      value={facebookUrl}
      onChange={(e) => setFacebookUrl(e.target.value)}
    />

    <label htmlFor="instaUrl">Instagram URL:</label>
    <input
      type="text"
      id="instaUrl"
      value={instaUrl}
      onChange={(e) => setInstaUrl(e.target.value)}
    />

    <label htmlFor="twitterUrl">Twitter URL:</label>
    <input
      type="text"
      id="twitterUrl"
      value={twitterUrl}
      onChange={(e) => setTwitterUrl(e.target.value)}
    />
        </>
      )}
      <button type="submit">Save Changes</button>
    </div>
  );
}

export default SettingSection;