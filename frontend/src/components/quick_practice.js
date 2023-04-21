import './quick_practice.css'
import NavbarClient from './client_navbar';
import cross from "../images/cross.svg";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from "react";

function Quick_Practice(){
    const navigate = useNavigate();
    function GoBack(){
        navigate("/client/dashboard")
    }

    const content = new Map()
    content.set(1, "Zander was proud of his new costume. He was excited to wear it for the play on Friday night. The bones looked like a real skeleton, the eyes were beady and red, and the claws were long and sharp.He thought it would be fun to scare his Mom, so he walked quietly down the hall toward the kitchen. Suddenly, he screamed Ahhhhhhh! He saw his reflection in the mirror and forgot he was wearing his costume.")
    content.set(2, "Over the weekend the vultures got into the presidential palace by pecking through the screens on the balcony windows and the flapping of their wings stirred up the stagnant time inside, and at dawn on Monday the city awoke out of its lethargy of centuries with the warm, soft breeze of a great man dead and rotting grandeur.")
    content.set(3, "Dudley's birthday - how could he have forgotten? Harry got slowly out of bed and started looking for socks. He found a pair under his bed and, after pulling a spider off one of them, put them on. Harry was used to spiders, because the cupboard under the stairs was full of them, and that was where he slept.")
    content.set(4, "Just then, the doorbell rang - Oh, good Lord, they're here! said Aunt Petunia frantically - and a moment later, Dudley's best friend, Piers Polkiss, walked in with his mother. Piers was a scrawny boy with a face like a rat. He was usually the one who held people's arms behind their backs while Dudley hit them. Dudley stopped pretending to cry at once.")
    content.set(5, "I sat on a park bench near a willow tree. I thought about something Rahim Khan said just before he hung up, almost as an afterthought. There is a way to be good again. I looked up at those twin kites. I thought about Hassan. Thought about Baba. Ali. Kabul. I thought of the life I had lived until the winter of 1975 came along and changed everything. And made me what I am today.")
    content.set(6, "When we were children, Hassan and I used to climb the poplar trees in the driveway of my father’s house and annoy our neighbors by reflecting sunlight into their homes with a shard of mirror. We would sit across from each other on a pair of high branches, our naked feet dangling, our trouser pockets filled with dried mulberries and walnuts. We took turns with the mirror as we ate mulberries, pelted each other with them, giggling, laughing.")
    content.set(7, "Jack tries hard to fit in at his new school - and tries even harder to win the affections of his Latin classmate and friend, Cora. In an effort to impress her, Jack leads Cora to the entrance of the underworld and makes a terrible mistake. Soon they have crossed the threshold, and there may be no getting back.")
    content.set(8, "When Isabella Swan moves to the gloomy town of Forks and meets the mysterious, alluring Edward Cullen, her life takes a thrilling and terrifying turn. With his porcelain skin, golden eyes, mesmerizing voice, and supernatural gifts, Edward is both irresistible and impenetrable. Up until now, he has managed to keep his true identity hidden, but Bella is determined to uncover his dark secret.")
    content.set(9, "At school, Harry had no one. Everybody knew that Dudley's gang hated that odd Harry Potter in his baggy old clothes and broken glasses, and nobody liked to disagree with Dudley's gang.")
    content.set(10, "Malfoy let out a terrible scream and bolted—so did Fang. The hooded figure raised its head and looked right at Harry—unicorn blood was dribbling down its front. It got to its feet and came swiftly toward Harry—he couldn’t move for fear.")
    let randomNumber = Math.floor(Math.random() * 10) + 1;

    function SpeechText({ text, speed }) {
        const [highlightedLength, setHighlightedLength] = useState(0);
      
        useEffect(() => {
          let timer;
          if (highlightedLength < text.length+1) {
            timer = setTimeout(() => {
              setHighlightedLength((prevLength) => prevLength + 1);
            }, speed);
          }else {
            setHighlightedLength(0); 
          }
          return () => clearTimeout(timer);
        }, [highlightedLength, speed, text.length]);
      
        return (
          <div className="shaded-text">
            <span className="highlighted">{text.slice(0, highlightedLength)}</span>
            {text.slice(highlightedLength)}
          </div>
        );
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
      <div className='quickBack'>
       <NavbarClient />
       <h3 className='titlequestion2'>Quick Practice</h3>  
        <img className="gobackcross2"src={cross} onClick={GoBack}/>
        <h3 className='please2'>Follow the highlighted text practice your speech</h3>
        <div className='paragraphBack'>
        <SpeechText text= {content.get(randomNumber)} speed={100} />
        </div>
          </div>
    );
}
}

export default Quick_Practice;