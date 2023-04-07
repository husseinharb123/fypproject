/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import { BuildStoredispatchcontext } from '../../../Contexts/BuildStorecontextProvider'
import StatusBar from '../../Components/StatusBar/StatusBar'
import image from './logo.JPG'
import './S2.scoped.css'

export default function S2() {
    const dispatch = useContext(BuildStoredispatchcontext)
    const navigate = useNavigate();
    const initialState = {
        FirstName: {
            value: '',
            hasErrors: false,
            message: ''
        },
        LastName: {
            value: '',
            hasErrors: false,
            message: ''
        },
        Address: {
            value: '',
            hasErrors: false,
            message: ''
        },
        Email: {
            value: '',
            hasErrors: false,
            message: '',
            isUnique: true,
            CheckCount: 0
        },
        Password: {
            value: '',
            hasErrors: false,
            message: ''
        },
        Phonenumber:'',
        submitCount: 0,
        submitError: false
    }

    function ourReducer(draft, action) {
        switch (action.type) {
            case 'FirstNameImed':
                draft.FirstName.hasErrors = false
                draft.FirstName.value = action.value

                return
            case 'FirstNameDelay':
                if (!/^[a-zA-Z][a-zA-Z .,'-]*$/.test(draft.FirstName.value)) {
                    draft.FirstName.hasErrors = true;
                    draft.FirstName.message = 'no special characters or numbers are allowed'
                    return
                }
                if (draft.FirstName.value.length < 3) {
                    draft.FirstName.hasErrors = true;
                    draft.FirstName.message = 'first name must be at least 3 characters'
                    return
                }
                if (draft.FirstName.value.length > 15) {
                    draft.FirstName.hasErrors = true;
                    draft.FirstName.message = 'first name must be less than 15 characters'
                }
                return

            case 'LastNameImed':
                draft.LastName.hasErrors = false
                draft.LastName.value = action.value
                return
            case 'LastNameDelay':
                if (!/^[a-zA-Z][a-zA-Z .,'-]*$/.test(draft.LastName.value)) {
                    draft.LastName.hasErrors = true;
                    draft.LastName.message = 'no special characters or numbers are allowed'
                    return
                }
                if (draft.LastName.value.length < 3) {
                    draft.LastName.hasErrors = true;
                    draft.LastName.message = 'last name must be at least 3 characters'
                    return
                }
                if (draft.LastName.value.length > 15) {
                    draft.LastName.hasErrors = true;
                    draft.LastName.message = 'last name must be less than 15 characters'
                }
                return
            case 'EmailImed':
                draft.Email.hasErrors = false
                draft.Email.value = action.value
                return
            case 'EmailDelay':
                if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(draft.Email.value)) {
                    draft.Email.hasErrors = true;
                    draft.Email.message = 'ex: something@someserver.something'
                }
                if (!draft.Email.hasErrors) { draft.Email.isUnique = true; draft.Email.CheckCount++ };


                return
            case 'EmailUnique':
                if (action.value) {
                    draft.Email.isUnique = false
                    draft.Email.hasErrors = true
                    draft.Email.message = 'found an existing account using the same email address'
                }

                return

            case 'PasswordImed':
                draft.Password.hasErrors = false
                draft.Password.value = action.value
                return

            case 'PasswordDelay':
                if (draft.Password.value.length < 8) {
                    draft.Password.hasErrors = true;
                    draft.Password.message = 'password must be at least 8 characters'
                    return
                }
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(draft.Password.value)) {
                    draft.Password.hasErrors = true;
                    draft.Password.message = 'password must have least one uppercase , one lowercase letter, one number and one special character'
                    return
                }

                return
            case 'AddressImed':
                draft.Address.hasErrors = false
                draft.Address.value = action.value
                if (draft.Address.value === "Select Country") {
                    draft.Address.hasErrors = true
                    draft.Address.message = 'you must select a Country'
                }
                return

            case 'SubmitForm':
                draft.submitError = false
                if (!draft.FirstName.hasErrors && !draft.LastName.hasErrors && !draft.LastName.hasErrors && !draft.Address.hasErrors && !draft.Email.hasErrors && draft.Email.isUnique
                    && draft.FirstName.value && draft.LastName.value && draft.LastName.value && draft.Address.value && draft.Email.value
                ) {
                    draft.submitCount++;
                }
                else {

                    draft.submitError = true;
                }
                break;
            case 'phoneimd':
                draft.Phonenumber = action.value
                break
            case 'submiterror':

                if (!action.value) {
                    draft.submitError = true
                }

                return
            default:
                break;
        }
    }



    const [informationstate, informationdispatch] = useImmerReducer(ourReducer, initialState)

    useEffect(() => {
        if (informationstate.FirstName.value) {
            const delay = setTimeout(() => informationdispatch({ type: 'FirstNameDelay' }), 800)
            return () => clearTimeout(delay);
        }
    }, [informationstate.FirstName.value])

    useEffect(() => {
        if (informationstate.LastName.value) {
            const delay = setTimeout(() => informationdispatch({ type: 'LastNameDelay' }), 800)
            return () => clearTimeout(delay);
        }
    }, [informationstate.LastName.value])

    useEffect(() => {
        if (informationstate.Password.value) {
            const delay = setTimeout(() => informationdispatch({ type: 'PasswordDelay' }), 800)
            return () => clearTimeout(delay);
        }
    }, [informationstate.Password.value])

    useEffect(() => {
        if (informationstate.Email.value) {
            const delay = setTimeout(() => informationdispatch({ type: 'EmailDelay' }), 800)
            return () => clearTimeout(delay);
        }
    }, [informationstate.Email.value])

    useEffect(() => {
        if (informationstate.Email.CheckCount) {

            async function fetchdata() {
                try {
                    const url = '/CheckifstoreEmailExist'
                    const config = {
                        headers: {}
                    };
                    const body = { Email: informationstate.Email.value }
                    const response = await axios.post(url, body, config)
                    informationdispatch({ type: 'EmailUnique', value: response.data })
                } catch (error) {
                    console.log(error);
                }

            }

            fetchdata()
        }
    }, [informationstate.Email.CheckCount])



    useEffect(() => {
        if (informationstate.submitCount) {
            console.log('no error');
            const data = {
                Email : informationstate.Email.value,
                FirstName: informationstate.FirstName.value,
                LastName: informationstate.LastName.value,
                Address: informationstate.Address.value,
                Phonenumber: informationstate.Phonenumber,
                Password: informationstate.Password.value,
            }
        dispatch({ type:'setinformation',value:data})
        }
    }, [informationstate.submitCount])

    function nextSubmit(e) {
        e.preventDefault();
        informationdispatch({ type: 'SubmitForm' })

    }
    function previousSubmit(e) {
        e.preventDefault();
        dispatch({ type: 'show1' })


    }




    return (
        <>
           

                <div className="main">
                    <section className="signup">
                        <div className="container">
                            <div className="signup-content">
                               
                                <div className='text-center'><Link rel="stylesheet" to="/" ><img src={image} alt="" srcSet="" className='logoimage' /></Link></div>
                                 <StatusBar stage={2} />
                                    <div className="row">
                                        <div className="col-md-12 mb-4">
                                            <div className="card mb-4">
                                                <div className="card-header py-3">
                                                    <h5 className="mb-0">Information</h5>
                                                </div>
                                                <div className="card-body">
                                                    <form>
                                                        <div className="row mb-4">
                                                            <div className="col">
                                                                <div className="form-outline">
                                                                <label className="form-label" htmlFor="form7Example1">First name <span style={{ color: 'red' }}>*</span></label>
                                                                    <input 
                                                                    type="text" id="form7Example1" className={`form-control ${informationstate.FirstName.hasErrors && 'form-control-error border-danger'}`}
                                                                    onChange={e => { informationdispatch({ type: "FirstNameImed", value: e.target.value }) }}
                                                                    />
                                                                    
                                                                </div>
                                                            <div className='text-center'> {informationstate.FirstName.hasErrors ? <span className='text-danger small '> {informationstate.FirstName.message}</span> : <span > </span>} </div>

                                                            </div>
                                                            <div className="col">
                                                                <div className="form-outline">
                                                                <label className="form-label" htmlFor="form7Example2">Last name<span style={{ color: 'red' }}>*</span></label>
                                                                <input type="text" id="form7Example2" className={`form-control ${informationstate.LastName.hasErrors && 'form-control-error border-danger'}` }
                                                                    onChange={e => { informationdispatch({ type: "LastNameImed", value: e.target.value }) }}
                                                                    />
                                                                    
                                                                </div>
                                                            <div className='text-center'> {informationstate.LastName.hasErrors ? <span className='text-danger small'>{informationstate.LastName.message}</span> : <span > </span>} </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form7Example3">Password<span style={{ color: 'red' }}>*</span></label>
                                                        <input type="text" id="form7Example3" className={`form-control  ${informationstate.Password.hasErrors && 'form-control-error border-danger'}` }
                                                            onChange={e => { informationdispatch({ type: "PasswordImed", value: e.target.value }) }}
                                                            />
                                                             <div > {informationstate.Password.hasErrors ? <span className='text-danger small'>{informationstate.Password.message}</span> : <span > </span>} </div>

                                                        </div>
                                                   
                                                        <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form7Example4">Address<span style={{ color: 'red' }}>*</span></label>

                                                        <select name="Country" className={`form-control mt-1 ${informationstate.Address.hasErrors && 'form-control-error border-danger'}`} onChange={e => informationdispatch({ type: 'AddressImed', value: e.target.value })}>
                                                        <option value="Select Country" >Select Country</option>
                                                        <option value="Afghanistan">Afghanistan</option>
                                                        <option value="Albania">Albania</option>
                                                        <option value="Algeria">Algeria</option>
                                                        <option value="American Samoa">American Samoa</option>
                                                        <option value="Andorra">Andorra</option>
                                                        <option value="Angola">Angola</option>
                                                        <option value="Anguilla">Anguilla</option>
                                                        <option value="Antarctica">Antarctica</option>
                                                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                                        <option value="Argentina">Argentina</option>
                                                        <option value="Armenia">Armenia</option>
                                                        <option value="Aruba">Aruba</option>
                                                        <option value="Australia">Australia</option>
                                                        <option value="Austria">Austria</option>
                                                        <option value="Azerbaijan">Azerbaijan</option>
                                                        <option value="Bahamas">Bahamas</option>
                                                        <option value="Bahrain">Bahrain</option>
                                                        <option value="Bangladesh">Bangladesh</option>
                                                        <option value="Barbados">Barbados</option>
                                                        <option value="Belarus">Belarus</option>
                                                        <option value="Belgium">Belgium</option>
                                                        <option value="Belize">Belize</option>
                                                        <option value="Benin">Benin</option>
                                                        <option value="Bermuda">Bermuda</option>
                                                        <option value="Bhutan">Bhutan</option>
                                                        <option value="Bolivia">Bolivia</option>
                                                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                                        <option value="Botswana">Botswana</option>
                                                        <option value="Bouvet Island">Bouvet Island</option>
                                                        <option value="Brazil">Brazil</option>
                                                        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                                        <option value="Brunei Darussalam">Brunei Darussalam</option>
                                                        <option value="Bulgaria">Bulgaria</option>
                                                        <option value="Burkina Faso">Burkina Faso</option>
                                                        <option value="Burundi">Burundi</option>
                                                        <option value="Cambodia">Cambodia</option>
                                                        <option value="Cameroon">Cameroon</option>
                                                        <option value="Canada">Canada</option>
                                                        <option value="Cape Verde">Cape Verde</option>
                                                        <option value="Cayman Islands">Cayman Islands</option>
                                                        <option value="Central African Republic">Central African Republic</option>
                                                        <option value="Chad">Chad</option>
                                                        <option value="Chile">Chile</option>
                                                        <option value="China">China</option>
                                                        <option value="Christmas Island">Christmas Island</option>
                                                        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                                        <option value="Colombia">Colombia</option>
                                                        <option value="Comoros">Comoros</option>
                                                        <option value="Congo">Congo</option>
                                                        <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                                        <option value="Cook Islands">Cook Islands</option>
                                                        <option value="Costa Rica">Costa Rica</option>
                                                        <option value="Cote D'ivoire">Cote D'ivoire</option>
                                                        <option value="Croatia">Croatia</option>
                                                        <option value="Cuba">Cuba</option>
                                                        <option value="Cyprus">Cyprus</option>
                                                        <option value="Czech Republic">Czech Republic</option>
                                                        <option value="Denmark">Denmark</option>
                                                        <option value="Djibouti">Djibouti</option>
                                                        <option value="Dominica">Dominica</option>
                                                        <option value="Dominican Republic">Dominican Republic</option>
                                                        <option value="Ecuador">Ecuador</option>
                                                        <option value="Egypt">Egypt</option>
                                                        <option value="El Salvador">El Salvador</option>
                                                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                                                        <option value="Eritrea">Eritrea</option>
                                                        <option value="Estonia">Estonia</option>
                                                        <option value="Ethiopia">Ethiopia</option>
                                                        <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                                        <option value="Faroe Islands">Faroe Islands</option>
                                                        <option value="Fiji">Fiji</option>
                                                        <option value="Finland">Finland</option>
                                                        <option value="France">France</option>
                                                        <option value="French Guiana">French Guiana</option>
                                                        <option value="French Polynesia">French Polynesia</option>
                                                        <option value="French Southern Territories">French Southern Territories</option>
                                                        <option value="Gabon">Gabon</option>
                                                        <option value="Gambia">Gambia</option>
                                                        <option value="Georgia">Georgia</option>
                                                        <option value="Germany">Germany</option>
                                                        <option value="Ghana">Ghana</option>
                                                        <option value="Gibraltar">Gibraltar</option>
                                                        <option value="Greece">Greece</option>
                                                        <option value="Greenland">Greenland</option>
                                                        <option value="Grenada">Grenada</option>
                                                        <option value="Guadeloupe">Guadeloupe</option>
                                                        <option value="Guam">Guam</option>
                                                        <option value="Guatemala">Guatemala</option>
                                                        <option value="Guinea">Guinea</option>
                                                        <option value="Guinea-bissau">Guinea-bissau</option>
                                                        <option value="Guyana">Guyana</option>
                                                        <option value="Haiti">Haiti</option>
                                                        <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                                        <option value="Holy See (Vatican City informationstate)">Holy See (Vatican City informationstate)</option>
                                                        <option value="Honduras">Honduras</option>
                                                        <option value="Hong Kong">Hong Kong</option>
                                                        <option value="Hungary">Hungary</option>
                                                        <option value="Iceland">Iceland</option>
                                                        <option value="India">India</option>
                                                        <option value="Indonesia">Indonesia</option>
                                                        <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                                        <option value="Iraq">Iraq</option>
                                                        <option value="Ireland">Ireland</option>
                                                        <option value="Israel">Israel</option>
                                                        <option value="Italy">Italy</option>
                                                        <option value="Jamaica">Jamaica</option>
                                                        <option value="Japan">Japan</option>
                                                        <option value="Jordan">Jordan</option>
                                                        <option value="Kazakhstan">Kazakhstan</option>
                                                        <option value="Kenya">Kenya</option>
                                                        <option value="Kiribati">Kiribati</option>
                                                        <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                                        <option value="Korea, Republic of">Korea, Republic of</option>
                                                        <option value="Kuwait">Kuwait</option>
                                                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                        <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                                        <option value="Latvia">Latvia</option>
                                                        <option value="Lebanon">Lebanon</option>
                                                        <option value="Lesotho">Lesotho</option>
                                                        <option value="Liberia">Liberia</option>
                                                        <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                                        <option value="Liechtenstein">Liechtenstein</option>
                                                        <option value="Lithuania">Lithuania</option>
                                                        <option value="Luxembourg">Luxembourg</option>
                                                        <option value="Macao">Macao</option>
                                                        <option value="North Macedonia">North Macedonia</option>
                                                        <option value="Madagascar">Madagascar</option>
                                                        <option value="Malawi">Malawi</option>
                                                        <option value="Malaysia">Malaysia</option>
                                                        <option value="Maldives">Maldives</option>
                                                        <option value="Mali">Mali</option>
                                                        <option value="Malta">Malta</option>
                                                        <option value="Marshall Islands">Marshall Islands</option>
                                                        <option value="Martinique">Martinique</option>
                                                        <option value="Mauritania">Mauritania</option>
                                                        <option value="Mauritius">Mauritius</option>
                                                        <option value="Mayotte">Mayotte</option>
                                                        <option value="Mexico">Mexico</option>
                                                        <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                                        <option value="Moldova, Republic of">Moldova, Republic of</option>
                                                        <option value="Monaco">Monaco</option>
                                                        <option value="Mongolia">Mongolia</option>
                                                        <option value="Montserrat">Montserrat</option>
                                                        <option value="Morocco">Morocco</option>
                                                        <option value="Mozambique">Mozambique</option>
                                                        <option value="Myanmar">Myanmar</option>
                                                        <option value="Namibia">Namibia</option>
                                                        <option value="Nauru">Nauru</option>
                                                        <option value="Nepal">Nepal</option>
                                                        <option value="Netherlands">Netherlands</option>
                                                        <option value="Netherlands Antilles">Netherlands Antilles</option>
                                                        <option value="New Caledonia">New Caledonia</option>
                                                        <option value="New Zealand">New Zealand</option>
                                                        <option value="Nicaragua">Nicaragua</option>
                                                        <option value="Niger">Niger</option>
                                                        <option value="Nigeria">Nigeria</option>
                                                        <option value="Niue">Niue</option>
                                                        <option value="Norfolk Island">Norfolk Island</option>
                                                        <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                                        <option value="Norway">Norway</option>
                                                        <option value="Oman">Oman</option>
                                                        <option value="Pakistan">Pakistan</option>
                                                        <option value="Palau">Palau</option>
                                                        <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                                        <option value="Panama">Panama</option>
                                                        <option value="Papua New Guinea">Papua New Guinea</option>
                                                        <option value="Paraguay">Paraguay</option>
                                                        <option value="Peru">Peru</option>
                                                        <option value="Philippines">Philippines</option>
                                                        <option value="Pitcairn">Pitcairn</option>
                                                        <option value="Poland">Poland</option>
                                                        <option value="Portugal">Portugal</option>
                                                        <option value="Puerto Rico">Puerto Rico</option>
                                                        <option value="Qatar">Qatar</option>
                                                        <option value="Reunion">Reunion</option>
                                                        <option value="Romania">Romania</option>
                                                        <option value="Russian Federation">Russian Federation</option>
                                                        <option value="Rwanda">Rwanda</option>
                                                        <option value="Saint Helena">Saint Helena</option>
                                                        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                                        <option value="Saint Lucia">Saint Lucia</option>
                                                        <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                                        <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                                        <option value="Samoa">Samoa</option>
                                                        <option value="San Marino">San Marino</option>
                                                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                                        <option value="Senegal">Senegal</option>
                                                        <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                                                        <option value="Seychelles">Seychelles</option>
                                                        <option value="Sierra Leone">Sierra Leone</option>
                                                        <option value="Singapore">Singapore</option>
                                                        <option value="Slovakia">Slovakia</option>
                                                        <option value="Slovenia">Slovenia</option>
                                                        <option value="Solomon Islands">Solomon Islands</option>
                                                        <option value="Somalia">Somalia</option>
                                                        <option value="South Africa">South Africa</option>
                                                        <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                                        <option value="Spain">Spain</option>
                                                        <option value="Sri Lanka">Sri Lanka</option>
                                                        <option value="Sudan">Sudan</option>
                                                        <option value="Suriname">Suriname</option>
                                                        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                                        <option value="Swaziland">Swaziland</option>
                                                        <option value="Sweden">Sweden</option>
                                                        <option value="Switzerland">Switzerland</option>
                                                        <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                                        <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                                                        <option value="Tajikistan">Tajikistan</option>
                                                        <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                                        <option value="Thailand">Thailand</option>
                                                        <option value="Timor-leste">Timor-leste</option>
                                                        <option value="Togo">Togo</option>
                                                        <option value="Tokelau">Tokelau</option>
                                                        <option value="Tonga">Tonga</option>
                                                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                                        <option value="Tunisia">Tunisia</option>
                                                        <option value="Turkey">Turkey</option>
                                                        <option value="Turkmenistan">Turkmenistan</option>
                                                        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                                        <option value="Tuvalu">Tuvalu</option>
                                                        <option value="Uganda">Uganda</option>
                                                        <option value="Ukraine">Ukraine</option>
                                                        <option value="United Arab Emirates">United Arab Emirates</option>
                                                        <option value="United Kingdom">United Kingdom</option>
                                                        <option value="United States">United States</option>
                                                        <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                                        <option value="Uruguay">Uruguay</option>
                                                        <option value="Uzbekistan">Uzbekistan</option>
                                                        <option value="Vanuatu">Vanuatu</option>
                                                        <option value="Venezuela">Venezuela</option>
                                                        <option value="Viet Nam">Viet Nam</option>
                                                        <option value="Virgin Islands, British">Virgin Islands, British</option>
                                                        <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                                        <option value="Wallis and Futuna">Wallis and Futuna</option>
                                                        <option value="Western Sahara">Western Sahara</option>
                                                        <option value="Yemen">Yemen</option>
                                                        <option value="Zambia">Zambia</option>
                                                        <option value="Zimbabwe">Zimbabwe</option>
                                                    </select>
                                                        </div>

                                

                                                        <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form7Example5">Email<span style={{ color: 'red' }}>*</span></label>
                                                        <input type="email" id="form7Example5" className={`form-control  ${informationstate.Email.hasErrors && 'form-control-error border-danger'}`}
                                                            onChange={e => { informationdispatch({ type: "EmailImed", value: e.target.value }) }}
                                                            />
                                                            <div> {informationstate.Email.hasErrors ? <span className='text-danger small'>{informationstate.Email.message}</span> : <span > </span>} </div>
                                                        </div>
                                                    
                                                        <div className="form-outline mb-4">
                                                            <label className="form-label" htmlFor="form7Example6">Phone{'(optional)'}</label>
                                                            <input type="number" id="form7Example6" className="form-control" 
                                                            onChange={(e)=>informationdispatch({type:'phoneimd',value:e.target.value})}
                                                            />
                                                            
                                                        </div>
                    
                                                    </form>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                <div className='nextback '>
                                    <Link to="" className="next float-end" onClick={nextSubmit} >Next &raquo;</Link>       
                                    <Link to="" className="previous float-end"  onClick={previousSubmit}>&laquo; Previous</Link>
                                    
                                </div>
                            </div>
                        </div>
                    </section>

                </div>



          
        </>
    )
}
