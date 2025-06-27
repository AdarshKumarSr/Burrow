import React from 'react'
// import car from '../assets/car.png'


const ConfirmedRide = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setVehiclePanel(false)
                // setpanelOpen(true)
            }} className='p-1 text-center w-[90%] absolute top-0  '>
                <i className="text-3xl text-gray-500 pt-14 ri-arrow-down-wide-fill"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm ur Ride</h3>
            <div className='flex gap-2 flex-col justify-between items-center'>
                <img className='h-20 ' src={car} alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5   p-3 border-b-2  '>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>564/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>

                     <div className='flex items-center gap-5   p-3 border-b-2   '>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>737/A-d</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5  p-3   '>
                    <i className="text-lg ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>$50</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>

                </div>
                <button onClick={() => {
                props.setvehicleFound(true)
            }}
                className='w-full bg-green-600 text-white p-3 rounded-lg font-semibold text-lg mt-5'>
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default ConfirmedRide
