import React from 'react'
import './StatusBar.scoped.css'
export default function StatusBar({stage}) {
    return (
        <>
            <div className="stepper-wrapper">
                <div className="stepper-item completed active" >
                    <div className="step-counter">1</div>

                </div>
                <div className={`stepper-item ${(stage == 2 || stage == 3) && ' completed '}`}>
                    <div className="step-counter">2</div>

                </div>
                <div className={`stepper-item  ${(stage == 3) && '  completed'}`}>
                    <div className="step-counter">3</div>

                </div>
            </div>















        </>
    )
}
