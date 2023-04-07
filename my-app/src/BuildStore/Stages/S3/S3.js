import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import { BuildStorecontext, BuildStoredispatchcontext } from '../../../Contexts/BuildStorecontextProvider'
import StatusBar from '../../Components/StatusBar/StatusBar'
import image from './logo.JPG'
import './S3.scoped.css'

export default function S3() {

    const dispatch = useContext(BuildStoredispatchcontext)
    const state  = useContext(BuildStorecontext)
    const navigate = useNavigate()
    const initialState={
        industry: 'Open this select menu',
        deliveryopt1:'0',
        deliveryopt2: '0',
        deliveryopt3: '0',
        haserror1:false,
        haserror2: false,
        errormsg :'',
        submitcount:0        



    }

    function ourReducer(draft,action) {
        switch (action.type) {
            case 'industry':
                draft.haserror1 = false
                draft.industry = action.value
                break;
            case 'deliveryopt1':
                draft.haserror2 = false
                if(action.value=== '1'){draft.deliveryopt1='0'}                
                else { draft.deliveryopt1 = '1' }
                break;
            case 'deliveryopt2':
                draft.haserror2 = false
                if (action.value === '2') { draft.deliveryopt2 = '0' }
                else { draft.deliveryopt2 = '2' }
                break;
            case 'deliveryopt3':
                draft.haserror2 = false
                if (action.value === '3') { draft.deliveryopt3= '0' }
                else { draft.deliveryopt3= '3' }
                break;
            case 'submiterror1':
                draft.haserror1 = true;
                draft.errormsg = 'select a selling industory'
                break
            case 'submiterror2':
               draft.haserror2 = true;
               draft.errormsg = 'select a selling tecq option'
                break
            case 'submit':
                draft.submitcount++;
                break
            default:
                break;
        }
        
    }



    const [addformationstate, addformationdispatch] = useImmerReducer(ourReducer, initialState)

function handleit(e){
e.preventDefault();
    if (addformationstate.industry !=='Open this select menu' && (addformationstate.deliveryopt1 !== '0' || addformationstate.deliveryopt2 !== '0' || addformationstate.deliveryopt3 !== '0'))
    {
        addformationdispatch({type:'submit'})}
else{   
        if (addformationstate.industry ==='Open this select menu') { addformationdispatch({ type: 'submiterror1' }) }
       else if (addformationstate.deliveryopt1 === '0' && addformationstate.deliveryopt2 === '0' && addformationstate.deliveryopt3 === '0'){addformationdispatch({type:'submiterror2'})}    
}

}

useEffect(() => {
    if (addformationstate.submitcount){
        const data = {
            industry:addformationstate.industry,
            deliveryopt1: (addformationstate.deliveryopt1 !=='0')&& true,
            deliveryopt2: (addformationstate.deliveryopt2 !== '0') && true,
            deliveryopt3: (addformationstate.deliveryopt3 !== '0') && true,
        }
        dispatch({ type:'setaddinformation',value:data})
    }

}, [addformationstate.submitcount])


    function previoussubmit(e){
        e.preventDefault();
        dispatch({type:'show2'})
    }
    useEffect(() => {
        if (state.navigatecount){
            navigate(`/admin/${state.storeid}`)
        }
    }, [state.navigatecount])
    
    return (
        <>
     

                <div className="main">
                    <section className="signup">
                        <div className="container">
                            <div className="signup-content">
                                <div className='text-center'><Link rel="stylesheet" to="/" ><img src={image} alt="" srcSet="" className='logoimage' /></Link></div>
                                <StatusBar stage={3}/>
                                    <div className="row">
                                        <div className="col-md-12 mb-4">
                                            <div className="card mb-4">
                                                <div className="card-header py-3">
                                                    <h5 className="mb-0"> Aditional Information</h5>
                                                </div>
                                                <div className="card-body">
                                                    <form>
                                                        <div className="row mb-4">
                                                            <div className="col">
                                                                <div className="form-outline">
                                                                <label className="form-label" htmlFor="form7Example1">Which industry will you be operating in? <span style={{ color: 'red' }}>*</span></label>
                                                                <select className={`form-select  ${addformationstate.haserror1 && 'form-control-error border-danger'}`} aria-label="Default select example" onChange={(e) => addformationdispatch({ type:'industry',value:e.target.value})}>
                                                                <option value='Open this select menu'>Open this select menu</option>
                                                                    <option value="1">One</option>
                                                                    <option value="2">Two</option>
                                                                    <option value="3">Three</option>
                                                                </select>      
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                            <label className="form-label" htmlFor="form7Example2">Techniques For Selling <span style={{ color: 'red' }}>*</span></label>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox"  id="defaultCheck1" value={addformationstate.deliveryopt1} onChange={(e) => addformationdispatch({ type: 'deliveryopt1', value: e.target.value })} />
                                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Delivery
                                                                    </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="defaultCheck2" value={addformationstate.deliveryopt2} onChange={(e) => addformationdispatch({ type: 'deliveryopt2', value: e.target.value })} />
                                                                    <label className="form-check-label" htmlFor="defaultCheck2">
                                                                        Reserve & pickup
                                                                    </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="defaultCheck3" value={addformationstate.deliveryopt3} onChange={(e) => addformationdispatch({ type: 'deliveryopt3', value: e.target.value })} />
                                                                <label className="form-check-label" htmlFor="defaultCheck3">
                                                                    In Store
                                                                </label>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <div className='text-center'> {(addformationstate.haserror1 || addformationstate.haserror2) && <span className='text-danger '>{addformationstate.errormsg}</span> }</div>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                <div className='nextback '>
                                    <Link   className="next float-end"  onClick={handleit}>Finsh</Link>       
                                <Link className="previous float-end" onClick={previoussubmit}>&laquo; Previous</Link>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                    </section>

                </div>

        </>
    )
}
