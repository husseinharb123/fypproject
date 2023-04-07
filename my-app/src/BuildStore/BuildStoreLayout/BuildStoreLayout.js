import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { BuildStorecontext, BuildStoredispatchcontext } from '../../Contexts/BuildStorecontextProvider'
import BuildStoreStartPage from '../Stages/BuildStoreStartPage/BuildStoreStartPage'
import S1 from '../Stages/S1/S1'
import S2 from '../Stages/S2/S2'
import S3 from '../Stages/S3/S3'
import './BuildStoreLayout.scoped.css'


export default function BuildStoreLayout() {
  const state = useContext(BuildStorecontext)
  const dispatch = useContext(BuildStoredispatchcontext)

  return (


    <>
      {state.start.show && <BuildStoreStartPage />}
      {!state.start.show &&


        <div className='stagescontainer'>
          {state.s1.show && <S1 />}
          {state.s2.show && <S2 />}
          {state.s3.show && <S3 />}
        </div>

      }


    </>

  )
}
