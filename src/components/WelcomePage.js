import { useState } from 'react'
import lang from '../json_lib/language.json'
function WelcomePage(){
    const [keyword, setKeyword] = useState('')
    const [recommendList, setRecommendList] = useState([])
    var recommend = function(k){

        for(var i = 0 ; i < lang.length; i++){
            var lan = lang[i] //json에 있는 element
            var add = true
            let list = document.getElementById('recommend_list')
            //index에있는거끼리 맞아야추가함.
            for(var j = 0; j< k.length; j++){
                if(k[j] !== lan[j]){//글자가 다르면 추천안해.
                    add =false
                    //글자가다르면.. 제거해야하는데..
                    let copy = recommendList
                    let index = -1
                    for(let l = 0; l < recommendList.length; l++){
                        if(recommendList[l] === lan){
                            index = l;
                            console.log('rem', lan , " ,remv" + lan + "lan j"+ lan[j] + " kj"+ k[j])
                            document.getElementById(lan).remove()
                            copy.splice(index, 1)
                            break;
                        }
                    }
                    
                    setRecommendList([...copy])
                   
                }
            }
            if(add && !recommendList.includes(lan)){
               console.log(recommendList , recommendList.includes(lan) , lan )

                let copy = recommendList
                copy.push(lan)
                console.log('add', lan)
                let newone = document.createElement('div')
                newone.id = lan
                newone.innerText = lan
                list.appendChild(newone)
                setRecommendList([...copy])
            }
           
        }
    }
    var search_recommend = function(e){
        let forbiddenKeys = ['Shift', 'Control', 'Delete', 'CapsLock', 'Alt','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Tab','Space']
        var k = e.target.value
        
        if(!forbiddenKeys.includes(e.key)){
            if(e.key == 'Backspace'){
                if(keyword.length !=0){
                    k = keyword.substring(0, keyword.length-1)  
                }
            }
            else{
                k+= e.key
            }
        }
        if(k.length!=0){
            recommend(k) //json에 일치하는것들표시
        }
        setKeyword(k)
        
        
    } 
    //prevent form default function
    const stopEvent = (e) => {
          e.preventDefault();
    }
    
    return (
        <div>
            안녕안녕
            <form onSubmit={stopEvent}>
                <input onKeyDown={search_recommend} ></input>
            </form>
            <div id='recommend_list'></div>
        </div>
    )
}
export default WelcomePage;