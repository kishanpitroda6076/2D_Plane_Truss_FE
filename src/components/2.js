import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card,Text,Input,Button, Grid, Textarea,Switch } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'



export default function Page2({data,setData,nav,setNav}){
    // const [eR,seteR] = useState({n:true,e:true})
    const Numberstyle = {
        "input::-webkit-outer-spin-button":"{-webkit-appearance: none;margin: 0;}",
        "input::-webkit-inner-spin-button":"{-webkit-appearance: none;margin: 0;}",
        "input[type=number]":"{-moz-appearance: textfield;}"   
    }
    const [cArr,setcArr] = useState(Array(parseInt(data?.n)).fill(Array(2)))
    const [im,setIm] = useState(true)
    const [load,setLoad] = useState(false)
    const genN = () => {
        var inputs = []
        for(let i=0;i<parseInt(data.n);i++){
            inputs.push(
            <div key={i} style={{minWidth:'3rem',display:'grid',gridTemplateColumns:'auto',rowGap:'1vh'}}>
                <Input readOnly={im} placeholder={"x"+(i+1)} type={'number'} node={i} onKeyUp={(e)=>{
                    
                    
                    // var r = cArr.filter(v=>v[0]!=null && v[0]==cArr[t][0] && v[1]!=null && v[1]==cArr[t][1])
                    // if(r.length>0){

                    //     return;
                    // }
                    if(im) return;
                    setcArr(cArr.map((a,j)=>
                        j==i ? 
                            [parseInt(e.target.value),parseInt(a[1])]
                        : a
                    ))
                }} />
                <Input readOnly={im} placeholder={"y"+(i+1)} type={'number'} node={i} onKeyUp={(e)=>{
                    var t = parseInt(e.target.getAttribute('node'))
                    // var r = cArr.filter(v=>v[0]!=null && v[0]==cArr[t][0] && v[1]!=null && v[1]==cArr[t][1])
                    // if(r.length>0){

                    //     return;
                    // }
                    if(im) return;
                    setcArr(cArr.map((a,j)=>
                    j==i ? 
                        [parseInt(a[0]),parseInt(e.target.value)]
                    : a
                ))
                }} />
                </div>)
        }
        return inputs
    }


    const draw = () => {
        if(!load) return <></>;
        var y=0;
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
            var tc = height - 16
            var m = width/2 - (mx[0] - mn[0])*f/2
            for(var i=0;i<cArr.length;i++){
                
                if(isNaN(cArr[i][0]) || isNaN(cArr[i][1])) continue;
                
                items.unshift(<text key={"t"+i} x={m + cArr[i][0]*f} y={tc - cArr[i][1]*f} fontSize="10px" textAnchor="middle" stroke='white' alignmentBaseline='middle'>{++y}</text>)
                items.unshift(<circle key={"c"+i} cx={m + cArr[i][0]*f} cy={tc - cArr[i][1]*f} r="8" fill='black' />)
                
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
    const validation = ()=>{
        var t = cArr.filter((v)=> isNaN(v[0]) || isNaN(v[1]))
        if(t.length > 0) return false;
        var st = new Set(cArr.join('|').split('|'))
        
        return st.size == cArr.length && !isNaN(data.area) && parseInt(data.area) > 0 && !isNaN(data.modu) && parseInt(data.modu) > 0
    }

    useEffect(()=>{
        setLoad(true)
       setNav((prevNav)=>({...prevNav,label:"Step 2",prev:{...prevNav.prev,show:true,active:true},next:{...prevNav.next,label:'Next'}}))
    },[])

    useEffect(()=>{
        
        setData((prevData)=>({...prevData,cord:cArr}))
    },[cArr])

    useEffect(()=>{
        if(im){
            var str = cArr.map((v)=>v.join(' ')).join(",").replaceAll("NaN","")
        
            document.querySelector("textarea").value = (str.replaceAll(",","").trim()=="") ? "" : str
        }else{
            for(var i=0;i<cArr.length;i++){
                var lst = document.querySelectorAll("[node='"+i+"']")
                lst[0].value = cArr[i][0]
                lst[1].value = cArr[i][1]
            }
        }
    },[im])

    useEffect(()=>{
        setNav((prevNav)=>({...prevNav,next : {...prevNav.next,active:validation()}}))
    },[data])
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
        <Text h4>Enter the cordinates</Text>
        </Grid>
        
        <Grid xs={12} style={{display:im ? 'flex' : 'none',gap:'2vw',paddingTop:0}}>
                <Textarea readOnly={!im} fullWidth type="Text" helperText="Space Seperated Cordinates & Comma seperated pairs"
                onKeyUp={(e)=>{
                    if(!im){
                        return;
                    }
                    var arr = e.target.value.split(",")
            if(arr.length > 0){
                var tmpCArr = cArr
                let i=0

                for(var y of arr){
                    y = y.trim();
                    if(y.split(" ").filter((v)=>isNaN(v)).length > 0) return;
                    tmpCArr[i++] = y.split(" ").map((v)=>parseInt(v))
                }

                
                console.log(tmpCArr)
                setcArr(cArr.map((v,j)=>v = tmpCArr[j]))
            }
                }}/>
        </Grid>
        <Grid xs={12} style={{display:!im ? 'flex' : 'none',overflow:'auto',gap:'2vw',paddingTop:0}}>
                {genN()}
        </Grid>
        </Grid.Container>
        {/* <Input placeholder="Disabled" onChange={()=>{
            document
        }} /> */}
      </Card.Body>
    </Card>
    </Grid>
    <Grid xs={12} xl={6}>
        <Card variant="bordered">
            <Card.Body>
            <Grid.Container gap={2} justify="center">
            <Grid xs={12} style={{paddingTop:0,paddingBottom:0}}>
        <Text h4>Enter the Details</Text>
        </Grid>
        <Grid xs={6} xl={12}>
            <Input placeholder={"Area of cross section in mm2"} type={'number'} fullWidth onKeyUp={(e)=>{
                setData((prevData)=>({...prevData,area:parseFloat(e.target.value)}))
            }}/>
        </Grid>
        <Grid xs={6} xl={12}>
            <Input placeholder={"Modulous of elasticity in N/mm2"} type={'number'} fullWidth onKeyUp={(e)=>{
                setData((prevData)=>({...prevData,modu:parseFloat(e.target.value)}))
            }} />
        </Grid>
        
        

        </Grid.Container>        
        

            </Card.Body>
        </Card>
    </Grid>
    <Grid xs={12} xl>
        <Card variant="bordered">
            <Card.Body>
            <Grid.Container gap={2} justify="center">
            <Grid xs={12} style={{paddingTop:0,paddingBottom:0}}>
        <Text h4>Point Plot</Text>
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