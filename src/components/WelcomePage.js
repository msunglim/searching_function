import { useState } from 'react'
import lang from '../json_lib/language.json'
import '../styles/style.css'
function WelcomePage(){
    const [keyword, setKeyword] = useState('')
    const [recommendList, setRecommendList] = useState([])
    const [relatedWordIndex, setrelatedWordIndex] = useState(0)
    
    var removeList = function(lan, index,copy){
        for(let l = 0; l < recommendList.length; l++){
            if(recommendList[l] === lan){
                index = l;
                document.getElementById(lan).remove()
                copy.splice(index, 1)
                break;
            }
        }
    }
    var recommend = function(k){ //k:입력값.
        
        for(var i = 0 ; i < lang.length; i++){
            var lan = lang[i] //json에 있는 element
            var add = true
            let list = document.getElementById('recommend_list')
            //index에있는거끼리 맞아야추가함.
            for(var j = 0; j< k.length; j++){
                if(lan[j]=== undefined  || k[j].toLowerCase() !== lan[j].toLowerCase()){//글자가 다르면 추천안해.
                    add =false
                    //글자가다르면.. 제거해야하는데..
                    let copy = recommendList
                    let index = -1
                    //연관된 단어를 추천리스트에서 지운다
                    removeList(lan, index,copy)
                    // for(let l = 0; l < recommendList.length; l++){
                    //     if(recommendList[l] === lan){
                    //         index = l;
                    //         // console.log('rem', lan , " ,remv" + lan + "lan j"+ lan[j] + " kj"+ k[j])
                    //         document.getElementById(lan).remove()
                    //         copy.splice(index, 1)
                    //         break;
                    //     }
                    // }
                    
                    setRecommendList([...copy])
                   
                }
            }
            //넣어야하고 list에 연관된 단어가없을경우 추가한다.
            if(add && !recommendList.includes(lan)){
               console.log(recommendList , recommendList.includes(lan) , lan )

                let copy = recommendList
                copy.push(lan)
                console.log('add', lan)
                let newone = document.createElement('div')
                newone.class = 'relatedWord'
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
        // if(k.length!=0){
            recommend(k) //json에 일치하는것들표시
        // }else{ //지워졌거나 없을경우
        //     removeList()
        //     setRecommendList([])
        // }
        setKeyword(k)
        
        
    }
    window.addEventListener('keydown', (e)=>{
        var rec_list = document.getElementById('recommend_list')
        var removeOld = function(index){ //예전에 하이라이트됐던것을 제거함.
            let oldhighlightword = rec_list.children[index]
                if(oldhighlightword!==undefined)
                    oldhighlightword.classList.remove('selectedWord')
        }
        
        if(e.key === 'ArrowDown'){
            let rwi = relatedWordIndex 
            if(rwi>0 ){
                removeOld(rwi-1);
            }
            let highlightword = rec_list.children[rwi]
            highlightword.classList.add('selectedWord')
            if(rwi+1 < rec_list.children.length)
                setrelatedWordIndex(relatedWordIndex+1)
        }else if(e.key ==='ArrowUp'){
            let rwi = relatedWordIndex 
            if(rwi < rec_list.children.length){
                removeOld(rwi+1);
            }
            let highlightword = rec_list.children[rwi]
            highlightword.classList.add('selectedWord')
            if(rwi-1 > 0)
                setrelatedWordIndex(relatedWordIndex-1)
        }
    })
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