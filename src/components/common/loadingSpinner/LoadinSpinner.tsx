import './LoadingSpinner.css'
import LoadingSpinnerSrc from '../../../assets/loadingGif.gif'

export default function Spinner() {
    return (
        <div className='Spinner'>
            <img src={LoadingSpinnerSrc} />
        </div>
    )
}