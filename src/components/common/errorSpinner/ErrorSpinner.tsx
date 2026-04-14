import './ErrorSpinner.css'
import ErrorSpinnerSrc from '../../../assets/ErrorGif.gif'

export default function Spinner() {
    return (
        <div className='Spinner'>
            <img src={ErrorSpinnerSrc} />
        </div>
    )
}