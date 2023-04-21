import './speech_techniques.css'
import { useNavigate } from 'react-router-dom';
import butterflyaud from '../audios/butterfly.mp3';
import cinnamonaud from '../audios/cinnamon.mp3';
import cookieaud from '../audios/Cookie.mp3';
import cucumberaud from '../audios/cucumber.mp3';
import cupcakeaud from '../audios/cupcake.mp3';
import popsicleaud from '../audios/popsicle.mp3';
import lemonaud from '../audios/lemon.mp3';
import restaurantaud from '../audios/restaurant.mp3';
import sisteraud from '../audios/sister.mp3';
import synonymsaud from '../audios/synonyms.mp3';
import tomatoaud from '../audios/tomato.mp3';
import wakeaud from '../audios/wake.mp3';
import whisperaud from '../audios/whisper.mp3';
import cross from "../images/cross.svg";
import sensitiveaud from '../audios/sensitive.mp3'
import torchaud from '../audios/torch.mp3'
import frightenaud from '../audios/frighten.mp3'
import thousandaud from '../audios/thousand.mp3'
import NavbarClient from './client_navbar';


import React, { useState } from 'react';

function ImageWithAudio(props) {
    const [isPlaying, setIsPlaying] = useState(false);
  
    function handleClick() {
      setIsPlaying(!isPlaying);
  
      const audio = new Audio(props.audioFile);
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
    return (
        <button className='lol' onClick={handleClick}></button>
    );
  }


function SpeechTechniques(){
    const navigate = useNavigate();

    function GoBack(){
        navigate("/client/dashboard")
    }
    if (!localStorage.getItem("token")){
        return (
          <div>
            <h1> Not Authorized</h1>
          </div>
        )
      }
      else{
    return(
        <div className='speechTechBack'>
            <NavbarClient />
             <h3 className='titlequestion3'>Speech Techniques</h3>  
             <img className="gobackcross"src={cross} onClick={GoBack}/>
            <h3 className='please'>Click on the tiles to practice your sounds</h3>
            <div className='overallBack'>
                <div className='wordBox'>
                    <p className='wordToSpeak'>Butterfly</p>
                    <ImageWithAudio
                        audioFile={butterflyaud}
                    />
                </div>

                <div className='wordBox2'>
                    <p className='wordToSpeak'>Cinnamon</p>
                    <ImageWithAudio
                        audioFile={cinnamonaud}
                    />
                </div>

                <div className='wordBox3'>
                    <p className='wordToSpeak'>Cucumber</p>
                    <ImageWithAudio
                        audioFile={cucumberaud}
                    />
                </div>

                <div className='wordBox4'>
                    <p className='wordToSpeak'>Cupcake</p>
                    <ImageWithAudio
                        audioFile={cupcakeaud}
                    />
                </div>

                <div className='wordBox5'>
                    <p className='wordToSpeak'>Popsicle</p>
                    <ImageWithAudio
                        audioFile={popsicleaud}
                    />
                </div>

                <div className='wordBox6'>
                    <p className='wordToSpeak'>Lemon</p>
                    <ImageWithAudio
                        audioFile={lemonaud}
                    />
                </div>

                <div className='wordBox7'>
                    <p className='wordToSpeak'>Restaurant</p>
                    <ImageWithAudio
                        audioFile={restaurantaud}
                    />
                </div>

                <div className='wordBox8'>
                    <p className='wordToSpeak'>Sister</p>
                    <ImageWithAudio
                        audioFile={sisteraud}
                    />
                </div>

                <div className='wordBox9'>
                    <p className='wordToSpeak'>Synonym</p>
                    <ImageWithAudio
                        audioFile={synonymsaud}
                    />
                </div>

                <div className='wordBox10'>
                    <p className='wordToSpeak'>Tomato</p>
                    <ImageWithAudio
                        audioFile={tomatoaud}
                    />
                </div>

                <div className='wordBox12'>
                    <p className='wordToSpeak'>Whisper</p>
                    <ImageWithAudio
                        audioFile={whisperaud}
                    />
                </div>

                
                <div className='wordBox11'>
                    <p className='wordToSpeak'>Wake</p>
                    <ImageWithAudio
                        audioFile={wakeaud}
                    />
                </div>

                <div className='wordBox13'>
                    <p className='wordToSpeak'>Torch</p>
                    <ImageWithAudio
                        audioFile={torchaud}
                    />
                </div>

                <div className='wordBox14'>
                    <p className='wordToSpeak'>Frighten</p>
                    <ImageWithAudio
                        audioFile={frightenaud}
                    />
                </div>

                <div className='wordBox15'>
                    <p className='wordToSpeak'>Sensitive</p>
                    <ImageWithAudio
                        audioFile={sensitiveaud}
                    />
                </div>

                <div className='wordBox16'>
                    <p className='wordToSpeak'>Thousand</p>
                    <ImageWithAudio
                        audioFile={thousandaud}
                    />
                </div>


            </div>      
      </div>
    );

}
}

export default SpeechTechniques