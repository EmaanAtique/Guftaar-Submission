import { useState, useEffect, memo } from "react";
import "./questions.css"
/* ADD TAB CHARACTER IN HTML */


const Questions = (props) => {
    const quesInd = props.quesInd;
    const markedAns = props.ans;
    const quesList = props.quesList;
    const ansList = props.ansList;
    const [value, setValue] = useState(null);

    function handleQ(val){
        

        if (val == ansList[quesInd]){
            markedAns.push(1);
            // console.log(document.getElementById("next"))
            document.getElementsByClassName("quiz")[0].disabled = false;
            let ansInd = quesList[quesInd].indexOf(val);
            document.getElementsByClassName("option")[ansInd].style.backgroundColor = "#CBEFEE";
            document.getElementsByClassName("label-q")[ansInd].style.backgroundColor = "#469FA3";            
        }
        else{
            let ansInd = quesList[quesInd].indexOf(ansList[quesInd]);   
            document.getElementsByClassName("quiz")[0].disabled = false;
            document.getElementsByClassName("option")[ansInd].style.backgroundColor = "#CBEFEE";
            document.getElementsByClassName("label-q")[ansInd].style.backgroundColor = "#469FA3";     
            let rAns = quesList[quesInd].indexOf(val);
            document.getElementsByClassName("option")[rAns].style.backgroundColor = 'rgba(233, 180, 180, 0.75)';
            document.getElementsByClassName("label-q")[rAns].style.backgroundColor = "rgba(162, 129, 133, 0.75)"; 
        }
        let ansInd = quesList[quesInd].indexOf(ansList[quesInd]);
        let options = document.getElementsByClassName("option")
            for (let i = 0; i < options.length; i++){
                if (i != ansInd){
                options[i].disabled = true;
                }
                options[i].style.cursor = "default";
        }
    }

    // function clickNext(){
    //     console.log("clicked")
    //     if (quesInd < 2){
    //         props.handle(quesInd+1);
    //     }
    //     else {
    //     return;
    //     }}

    useEffect(() => {
        document.getElementsByClassName("quiz")[0].disabled = true;
    }, [])

    console.log(quesList)
    if (!localStorage.getItem("token")){
        return (
          <div>
            <h1> Not Authorized</h1>
          </div>
        )
      }
      else{
    return(
        <div className="questions">
                <button className="option" onClick={() => {handleQ(`${quesList[quesInd][0]}`)}}>
                        <div className="label-q" > A </div>
                        {/* <button className> Option 1 </button> */}
                        {quesList[quesInd][0]}
                    </button>
                    <button className="option" onClick={() => {handleQ(`${quesList[quesInd][1]}`)}}>
                        <div className="label-q"> B </div>
                        {/* <button className> Option 1 </button> */}
                        {quesList[quesInd][1]}
                    </button>
                    <button className="option" onClick={() => {handleQ(`${quesList[quesInd][2]}`)}}>
                        <div className="label-q"> C </div>
                        {/* <button className> Option 1 </button> */}
                        {quesList[quesInd][2]}
                    </button>
                    <button className="quiz" id="next" onClick={() => {
                        if (quesInd == 2){
                           props.handle()
                        }  
                        let options = document.getElementsByClassName("option")
                        for (let i = 0; i < options.length; i++){
                            options[i].disabled = false;
                            options[i].style.cursor = "pointer";
                            options[i].style.backgroundColor = "white";
                            document.getElementsByClassName("label-q")[i].style.backgroundColor = "#E1DEE5";}
                        document.getElementsByClassName("quiz")[0].disabled = true;
                        props.handle();
                        props.render();
                        

                            
                        
                    }}> CONTINUE </button>
                </div>

    )
}
}

export default Questions;