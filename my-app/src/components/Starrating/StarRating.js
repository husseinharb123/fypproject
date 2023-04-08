import React  from 'react'
import { useImmerReducer } from 'use-immer'
import { useEffect } from 'react'


export default function StarRating({ reviews, allowclick, rating, viewreview, float, dispatchrating }) {

    const initialState = {
        s1: {
            value: 0,
            clickcount: 0
        },
        s2: {
            value: 0,
            clickcount: 0
        },
        s3: {
            value: 0,
            clickcount: 0
        },
        s4: {
            value: 0,
            clickcount: 0
        },
        s5: {
            value: 0,
            clickcount: 0
        },
        rating: 0,
        ratingsubmit:0

    }

    function ourReducer(draft, action) {
        switch (action.type) {
            case 'click1':

                draft.s2.value = 0;
                draft.s3.value = 0;
                draft.s4.value = 0;
                draft.s5.value = 0;
                if (draft.s1.clickcount === 0) {
                    draft.s1.value = 0.5
                    draft.s1.clickcount++;
                    draft.rating = 0.5
                }
                else if (draft.s1.clickcount === 1) {
                    draft.s1.value = 1
                    draft.s1.clickcount++;
                    draft.rating = 1
                }
                else if (draft.s1.clickcount === 2) {
                    draft.s1.value = 0;
                    draft.s1.clickcount = 0;
                    draft.rating = 0

                }

                draft.ratingsubmit++;
                break;
            case 'click2':
                draft.s1.value = 1;
                draft.s3.value = 0;
                draft.s4.value = 0;
                draft.s5.value = 0;
                if (draft.s2.clickcount === 0) {
                    draft.s2.value = 0.5
                    draft.s2.clickcount++
                    draft.rating = 1.5
                }
                else if (draft.s2.clickcount === 1) {
                    draft.s2.value = 1
                    draft.s2.clickcount++
                    draft.rating = 2
                }
                else if (draft.s2.clickcount === 2) {
                    draft.s2.value = 0;
                    draft.s2.clickcount = 0;
                    draft.rating = 1
                }
                draft.ratingsubmit++;
                break;
            case 'click3':
                draft.s1.value = 1;
                draft.s2.value = 1;
                draft.s4.value = 0;
                draft.s5.value = 0;
                if (draft.s3.clickcount === 0) {
                    draft.s3.value = 0.5
                    draft.s3.clickcount++
                    draft.rating = 2.5
                }
                else if (draft.s3.clickcount === 1) {
                    draft.s3.value = 1
                    draft.s3.clickcount++
                    draft.rating = 3
                }
                else if (draft.s3.clickcount === 2) {
                    draft.s3.value = 0;
                    draft.s3.clickcount = 0;
                    draft.rating = 2
                }
                draft.ratingsubmit++;
                break;
            case 'click4':
                draft.s1.value = 1;
                draft.s2.value = 1;
                draft.s3.value = 1;
                draft.s5.value = 0;
                if (draft.s4.clickcount === 0) {
                    draft.s4.value = 0.5
                    draft.s4.clickcount++
                    draft.rating = 3.5
                }
                else if (draft.s4.clickcount === 1) {
                    draft.s4.value = 1
                    draft.s4.clickcount++
                    draft.rating = 4
                }
                else if (draft.s4.clickcount === 2) {
                    draft.s4.value = 0;
                    draft.s4.clickcount = 0;
                    draft.rating = 3
                }
                draft.ratingsubmit++;
                break;
            case 'click5':
                draft.s1.value = 1;
                draft.s2.value = 1;
                draft.s3.value = 1;
                draft.s4.value = 1;
                if (draft.s5.clickcount === 0) {
                    draft.s5.value = 0.5
                    draft.s5.clickcount++
                    draft.rating = 4.5
                }
                else if (draft.s5.clickcount === 1) {
                    draft.s5.value = 1
                    draft.s5.clickcount++
                    draft.rating = 5
                }
                else if (draft.s5.clickcount === 2) {
                    draft.s5.value = 0;
                    draft.s5.clickcount = 0;
                    draft.rating = 4
                }
                draft.ratingsubmit++;
                break;

             case 'fetchdata':
                draft.rating = action.value                
                if (draft.rating === 0) {
                    draft.s1.value = 0;
                    draft.s2.value = 0;
                    draft.s3.value = 0;
                    draft.s4.value = 0;
                    draft.s5.value = 0;
                }
                else if (draft.rating <= 0.5) {
                    draft.s1.value = 0.5;
                    draft.s2.value = 0;
                    draft.s3.value = 0;
                    draft.s4.value = 0;
                    draft.s5.value = 0;
                }
                else if (0.5 < draft.rating && draft.rating <= 1) {

                    draft.s1.value = 1;
                    draft.s2.value = 0;
                    draft.s3.value = 0;
                    draft.s4.value = 0;
                    draft.s5.value = 0;
                }
                else if (1 < draft.rating && draft.rating <= 1.5) {
                    draft.s1.value = 1;
                    draft.s2.value = 0.5;
                    draft.s3.value = 0;
                    draft.s4.value = 0;
                    draft.s5.value = 0;
                }
                else if (1.5 < draft.rating && draft.rating <= 2) {
                    draft.s1.value = 1;
                    draft.s2.value = 1;
                    draft.s3.value = 0;
                    draft.s4.value = 0;
                    draft.s5.value = 0;
                }
                else if (2 < draft.rating && draft.rating <= 2.5) {
                    draft.s1.value = 1;
                    draft.s2.value = 1;
                    draft.s3.value = 0.5;
                    draft.s4.value = 0;
                    draft.s5.value = 0;
                }
                else if (2.5 < draft.rating && draft.rating <= 3) {
                    draft.s1.value = 1;
                    draft.s2.value = 1;
                    draft.s3.value = 1;
                    draft.s4.value = 0;
                    draft.s5.value = 0;
                }
                else if (3 < draft.rating && draft.rating <= 3.5) {

                    draft.s1.value = 1;
                    draft.s2.value = 1;
                    draft.s3.value = 1;
                    draft.s4.value = 0.5;
                    draft.s5.value = 0;
                }
                else if (3.5 < draft.rating && draft.rating <= 4) {

                    draft.s1.value = 1;
                    draft.s2.value = 1;
                    draft.s3.value = 1;
                    draft.s4.value = 1;
                    draft.s5.value = 0;
                }

                else if (4 < draft.rating && draft.rating <= 4.5) {
                    draft.s1.value = 1;
                    draft.s2.value = 1;
                    draft.s3.value = 1;
                    draft.s4.value = 1;
                    draft.s5.value = 0.5;
                }
                else if (4.5 < draft.rating && draft.rating <= 5) {
                    draft.s1.value = 1;
                    draft.s2.value = 1;
                    draft.s3.value = 1;
                    draft.s4.value = 1;
                    draft.s5.value = 1;
                }
                break
            default:
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(ourReducer, initialState)

    useEffect(() => {       
     dispatch({type:'fetchdata',value:rating})
    },[rating])
    useEffect(() => {
        
        if (state.ratingsubmit){
            dispatchrating({type:'fetchrating',value:state.rating})
        }

    }, [state.ratingsubmit])




    return (
        <>
            <div className={`d-flex mb-3 ${!float && 'float-end'}`}> 
                <div className="text-dark mr-2">                   
                    <small className={`bi  ${(state.s1.value === 0 && 'bi-star') || (state.s1.value === 0.5 && 'bi-star-half') || (state.s1.value === 1 && 'bi-star-fill')}`} onClick={() => {allowclick && dispatch({ type: "click1" }) }}  />
                    <small className={`bi  ${(state.s2.value === 0 && 'bi-star') || (state.s2.value === 0.5 && 'bi-star-half') || (state.s2.value === 1 && 'bi-star-fill')}`} onClick={() => { allowclick &&dispatch({ type: "click2" }) }}  />
                    <small className={`bi  ${(state.s3.value === 0 && 'bi-star') || (state.s3.value === 0.5 && 'bi-star-half') || (state.s3.value === 1 && 'bi-star-fill')}`} onClick={() => { allowclick &&dispatch({ type: "click3" }) }}  />
                    <small className={`bi  ${(state.s4.value === 0 && 'bi-star') || (state.s4.value === 0.5 && 'bi-star-half') || (state.s4.value === 1 && 'bi-star-fill')}`} onClick={() => { allowclick &&dispatch({ type: "click4" }) }}  />
                    <small className={`bi  ${(state.s5.value === 0 && 'bi-star') || (state.s5.value === 0.5 && 'bi-star-half') || (state.s5.value === 1 && 'bi-star-fill')}`} onClick={() => { allowclick &&dispatch({ type: "click5" }) }} />
                </div>
               {viewreview && <small className="pt-1">({reviews} Reviews)</small>}
            </div>



        </>
    )
}
