import './coach_dashboard_carousel.css'
import proficon from "../images/proficon.png"

function CoachCarousel (){
    return (
    <div class="container">
        <div className='clientbox1'>
        <div className='circularbox1'>
        <img src={proficon} alt="ProfIcon" className='proficon1' />
        <h3 className='clienttext1'> Ali Rehman</h3>
        </div>
        <div className='clientbox2'>
        <div className='circularbox1'>
        <img src={proficon} alt="ProfIcon" className='proficon1' />
        <h3 className='clienttext1'> Emaan Atique</h3>
        </div>
        <div className='clientbox3'>
        <div className='circularbox1'>
        <img src={proficon} alt="ProfIcon" className='proficon1' />
        <h3 className='clienttext1'> Salman Rehman</h3>
        </div> 
        </div> 
        </div>
    </div>
    </div>
        
    );
}
export default CoachCarousel;
