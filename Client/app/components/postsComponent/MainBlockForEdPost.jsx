'use clirnt'

const options = require('../image/options.png')
const exitOptions = require('../image/exitOptions.png')
const { useState, useEffect } = require("react")
import Image from 'next/image'


const EditAndDel = () => {
    const [BlockOptions, setBlockOptions] = useState(true)
    const [buttOptions, setButtOptions] = useState(options)
    const [allOptions, setAllOptions] = useState({stateOptions: '', classOptionsBlock: ''})

    return(
        <div className="conteiner editAndDelBlock">
           <Image alt='Проблема с картинкой' className='options' onClick={() => {
                setBlockOptions(!BlockOptions)
                if (BlockOptions == false){
                    setButtOptions(exitOptions)
                    setAllOptions({stateOptions:<><div className='buttonDelPost'>delete</div><div className='edit buttonDelPost'  >edit</div></>, classOptionsBlock: "optionsBlock"})
                }
                else {
                    setButtOptions(options)
                    setAllOptions({stateOptions: '', classOptionsBlock: ""})
                }
           }} src={buttOptions} />
           
            <div className={allOptions.classOptionsBlock} id="optionsBlock">{allOptions.stateOptions}</div>
            {/* <div className='buttonDelPost'>delete</div>
            <div className='edit buttonDelPost'  >edit</div> */}
            
        </div>
    )
}

export default EditAndDel