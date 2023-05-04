import { Card,Text,Input,Button, Grid,Switch,Textarea } from "@nextui-org/react"
import { useState,useEffect } from "react"

export default function Page3({data,setData,nav,setNav}){
    // const [eR,seteR] = useState({n:true,e:true})
    const Numberstyle = {
        "input::-webkit-outer-spin-button":"{-webkit-appearance: none;margin: 0;}",
        "input::-webkit-inner-spin-button":"{-webkit-appearance: none;margin: 0;}",
        "input[type=number]":"{-moz-appearance: textfield;}"   
    }
    const [eArr,seteArr] = useState(Array(parseInt(data?.e)).fill(Array(2)))
    const [im,setIm] = useState(true)
    const [load,setLoad] = useState(false)
    
    const validation = ()=>{
        var t = eArr.filter((v)=> isNaN(v[0]) || isNaN(v[1]))
        if(t.length > 0) return false;
        var st = new Set(eArr.join('|').split('|'))
        
        return st.size == eArr.length
    }

    useEffect(()=>{
        setLoad(true)
        setNav((prevNav)=>({...prevNav,label:"Step 3",prev:{...prevNav.prev,show:true,active:true},next:{...prevNav.next,label : "Calculate"}}))
     },[])
 
     useEffect(()=>{
        //  console.log(validation())
        
        setData((prevData)=>({...prevData,elem:eArr}))
        
        setNav((prevNav)=>({...prevNav,next : {...prevNav.next,active:validation()}}))
     },[eArr])

     useEffect(()=>{
        if(im){
            var str = eArr.map((v)=>v.join(' ')).join(",").replaceAll("NaN","")
        
            document.querySelector("textarea").value = (str.replaceAll(",","").trim()=="") ? "" : str
        }else{
            for(var i=0;i<eArr.length;i++){
                var lst = document.querySelectorAll("[elem='"+i+"']")
                lst[0].value = eArr[i][0]
                lst[1].value = eArr[i][1]
            }
        }
     },[im])

    const draw = () => {
        if(!load) return <></>;
        var y=0;
        const cArr = data.cord
        const items = []
        var mx = Array(2).fill(-Infinity)
        var mn = Array(2).fill(Infinity)
        var width = document.getElementById('draw').getBoundingClientRect().width
        var height = document.getElementById('draw').getBoundingClientRect().height
        var v = false
        for(var i=0;i<cArr.length;i++){
            if(isNaN(cArr[i][0]) || isNaN(cArr[i][1])) continue;
            mx = [Math.max(mx[0],cArr[i][0]),Math.max(mx[1],cArr[i][1])]
            mn = [Math.min(mn[0],cArr[i][0]),Math.min(mn[1],cArr[i][1])]
            v=true
        }
    // console.log(width - 14)
        if(v){
            var f = Math.min((height-28)/mx[1],(width-28)/mx[0])
            if(f==Infinity) f=0
            var m = width/2 - (mx[0] - mn[0])*f/2
            var tc = height - 16
            for(var i=0;i<cArr.length;i++){
                if(isNaN(cArr[i][0]) || isNaN(cArr[i][1])) continue;
                items.unshift(<text x={m + cArr[i][0]*f} y={tc - cArr[i][1]*f} fontSize="10px" textAnchor="middle" stroke='white' alignmentBaseline='middle'>{++y}</text>)
                items.unshift(<circle cx={m + cArr[i][0]*f} cy={tc - cArr[i][1]*f} r="8" fill='black' />)
            }
            for(var i of eArr){
                var from = cArr[i[0]-1]
                console.log(from)
                var to = cArr[i[1]-1]
                console.log(to)
                if(from==undefined || to==undefined || from[0]==null || from[0]==undefined || from[1]==null || from[1]==undefined 
                    || to[0]==null || to[0]==undefined || to[1]==null || to[1]==undefined) continue;
                // str+=`${from[0]*100} ${from[1]*100},${to[0]*100} ${to[1]*100},`
                items.unshift(<line key={"l1"+(++y)} x1={m + (from[0]*f)} y1={tc - (from[1]*f)} x2={m + (to[0]*f)} y2={tc - (to[1]*f)} stroke='black'/>)
                // str.push(<circle key={"c1"+y} cx={3 + (from[0]*f)} cy={3 + (from[1]*f)} r="2" stroke='black'/>)
                // str.push(<circle key={"c2"+y++} cx={3 + (to[0]*f)} cy={3 + (to[1]*f)} r="2" stroke='black' />)
            }
        // for(var i of cArr){
        //     if(i==undefined || i[0]==null || i[0]==undefined || i[1]==null || i[1]==undefined) continue;
        //     // str+=`${from[0]*100} ${from[1]*100},${to[0]*100} ${to[1]*100},`
        //     if(isNaN(i[0]) || isNaN(i[1])) continue; 
        //     str.push(<circle key={++y} cx={6 + (i[0]*f)} cy={6 + (i[1]*f)} r="2" stroke='black' strokeWidth="1"/>)
        // }
        }
        return items
    }
    const genE = () => {
        var inputs = []
        for(let i=0;i<parseInt(data.e);i++){
            var ky = `p3${i}`
            inputs.push(
            <div key={i} style={{minWidth:'3rem',display:'grid',gridTemplateColumns:'auto',rowGap:'1vh'}}>
                <Input readOnly={im} placeholder={"s"+(i+1)} type={'number'} max={data.n} min={1} elem={i} onKeyUp={(e)=>{
                    var t = parseInt(e.target.getAttribute('elem'))
                    // var r = cArr.filter(v=>v[0]!=null && v[0]==cArr[t][0] && v[1]!=null && v[1]==cArr[t][1])
                    // if(r.length>0){

                    //     return;
                    // }
                    if(im) return;
                    seteArr(eArr.map((a,j)=>
                        i==j ? 
                            [parseInt(e.target.value),parseInt(a[1])]
                        : a
                    ))
                }} />
                <Input readOnly={im} placeholder={"e"+(i+1)} type={'number'} max={parseInt(data.n)} min={"1"} elem={i} onKeyUp={(e)=>{
                    var t = parseInt(e.target.getAttribute('elem'))
                    // var r = cArr.filter(v=>v[0]!=null && v[0]==cArr[t][0] && v[1]!=null && v[1]==cArr[t][1])
                    // if(r.length>0){

                    //     return;
                    // }
                    if(im) return;
                    seteArr(eArr.map((a,j)=>
                        i==j ? 
                            [parseInt(a[0]),parseInt(e.target.value)]
                        : a
                    ))
                }} />
                </div>)
        }
        return inputs
    }
    return (
        <div>
    <Grid.Container direction="row" style={{rowGap:'1vh',columnGap:'1vh'}}>
    <Grid xl={12} xs={12} style={{paddingTop:0}}>
        <Card variant="bordered">
      <Card.Body>
        <Grid.Container gap={2} justify="center">
        <Grid xs={12} style={{paddingTop:0,paddingBottom:0,justifyContent:'space-between',alignItems:'center'}}>
        <Text style={{fontSize:'1.25rem',fontWeight:'500'}}>Direct Input Mode</Text>
        <Switch color={"secondary"} initialChecked={im} onChange={(e)=>setIm(e.target.checked)} />
        </Grid>
        </Grid.Container>
        </Card.Body>
        </Card>
        </Grid>
        <Grid xl={12} xs={12} style={{paddingTop:0}}>
        <Card variant="bordered">
      <Card.Body>
        <Grid.Container gap={2} justify="center">
        <Grid xs={12} style={{paddingTop:0,paddingBottom:0}}>
        <Text h4>Enter the Elements</Text>
        </Grid>
        <Grid xs={12} style={{display:im ? 'flex' : 'none',gap:'2vw',paddingTop:0}}>
                <Textarea readOnly={!im} fullWidth type="Text" helperText="Space Seperated Nodes & Comma seperated pairs"
                onKeyUp={(e)=>{
                    if(!im){
                        return;
                    }
                    var arr = e.target.value.split(",")
            if(arr.length > 0){
                var tmpCArr = eArr
                let i=0

                for(var y of arr){
                    y = y.trim();
                    if(y.split(" ").filter((v)=>isNaN(v)).length > 0) return;
                    tmpCArr[i++] = y.split(" ").map((v)=>parseInt(v))
                }

                
                console.log(tmpCArr)
                seteArr(eArr.map((v,j)=>v = tmpCArr[j]))
            }
                }}/>
        </Grid>
        
        <Grid xs={12} style={{display:!im ? 'flex' : 'none',overflow:'auto',gap:'2vw',paddingTop:0}}>
                {genE()}
        </Grid>
        </Grid.Container>
        {/* <Input placeholder="Disabled" onChange={()=>{
            document
        }} /> */}
      </Card.Body>
    </Card>
    </Grid>
    <Grid xs={12} xl>
        <Card variant="bordered">
            <Card.Body>
            <Grid.Container gap={2} justify="center">
            <Grid xs={12} style={{paddingTop:0,paddingBottom:0}}>
        <Text h4>Shape Plot</Text>
        </Grid>
        <Grid xs={12}>

        <svg id='draw' width="100%" height="30vh">
            {draw()}
        </svg>
        </Grid>
        </Grid.Container>
            </Card.Body>
        </Card>
    </Grid>
    </Grid.Container>
    </div>
    )
}