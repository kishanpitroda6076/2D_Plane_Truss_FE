import { Card,Text,Input,Button, Grid,Table } from "@nextui-org/react"
import { useState,useEffect } from "react"

export default function Page4({data,setData,nav,setNav}){
    // const [eR,seteR] = useState({n:true,e:true})
    const [mat,setMat] = useState([[[[0]]]])
    const [load,setLoad] = useState(false)
    const Numberstyle = {
        "input::-webkit-outer-spin-button":"{-webkit-appearance: none;margin: 0;}",
        "input::-webkit-inner-spin-button":"{-webkit-appearance: none;margin: 0;}",
        "input[type=number]":"{-moz-appearance: textfield;}"   
    }
    
    const generation = ()=>{
        var snofel = [] 
        var enofel = [] 
        var lenofel = [] 
        var elcon = [] 
        var cosofel = [] 
        var sinofel = [] 

    for(var i in data.elem){  
        var a = parseInt(data.elem[i][0])
        var b = parseInt(data.elem[i][1])
        var x1 = parseFloat(data.cord[a-1][0])
        var y1 = parseFloat(data.cord[a-1][1])
        var x2 = parseFloat(data.cord[b-1][0])
        var y2 = parseFloat(data.cord[b-1][1])
        var l = parseFloat(Math.sqrt((x2-x1)**2+(y2-y1)**2))
        var con = parseFloat(data.area)*parseFloat(data.modu)/l
        var cos = (x2-x1)/l
        var sin = (y2-y1)/l
        snofel.push(a)
        enofel.push(b)
        lenofel.push(l)
        elcon.push(con)
        cosofel.push(cos)
        sinofel.push(sin)
    }
    var elstmat = []

    for(var i in data.elem){
        var cc = parseFloat(cosofel[i])**2
        var ss = parseFloat(sinofel[i])**2
        var cs = parseFloat(cosofel[i])*parseFloat(sinofel[i])
    
        var mat = [[elcon[i]*cc, elcon[i]*cs, elcon[i]*(-cc), elcon[i]*(-cs)],
                      [elcon[i]*cs, elcon[i]*ss, elcon[i]*(-cs), elcon[i]*(-ss)],
                      [elcon[i]*(-cc), elcon[i]*(-cs), elcon[i]*cc, elcon[i]*cs],
                      [elcon[i]*(-cs), elcon[i]*(-ss), elcon[i]*cs, elcon[i]*ss]]

        elstmat.push(mat)
    }
    
    var gstmatmap = []
    var GSM = Array.from({ length: parseInt(data.n)*2 }, () => Array.from({ length: parseInt(data.n)*2 }, () => 0))
    
    console.log(elstmat)
    for(var i in data.elem){
        var m = snofel[i]*2                     
        var n = enofel[i]*2                     
        var add = [m-1, m, n-1, n] 
        console.log(add)
        var gmat = Array.from({ length: parseInt(data.n)*2 }, () => Array.from({ length: parseInt(data.n)*2 }, () => 0))
        var elmat = elstmat[i]
    
        for(var y=0;y<4;y++){                  
            for(var u=0;u<4;u++){              
                var q = add[y]-1                
                var w = add[u]-1                
                gmat[q][w] = elmat[y][u]
                console.log(i,q,w,y,u,gmat[q][w],elmat[y][u])
                console.log(gmat)
            }
        }      
        gstmatmap.push(gmat)
        
    }
    console.log(gstmatmap)
    for(var mt of gstmatmap){
        console.log(mt)
        for(var i=0;i<parseInt(data.n)*2;i++){
            for(var j=0;j<parseInt(data.n)*2;j++){
                GSM[i][j] += mt[i][j]
            }   
        }
    }
    console.log(GSM)
    setData((prevData)=>({...prevData,globalSM : GSM}))
    }

    const validate = () => {
        const n = parseInt(data.n)
        const s = parseInt(data.sn)
        if(isNaN(s)) return false;
        return (s>0 && s<n)
    }


    useEffect(()=>{
        setLoad(true)
        generation()
        setNav((prevNav)=>({...prevNav,label:"Step 4",prev:{...prevNav.prev,show:true,active:true},next:{...prevNav.next,label : "Next",active:false}}))
     },[])
 
     useEffect(()=>{
        
        // setNav((prevNav)=>({...prevNav,next : {...prevNav.next,active:validation()}}))
        setNav((prevNav)=>({...prevNav,next:{...prevNav.next,active:validate()}}))
     },[data])

    const draw = () => {
        if(!load) return <></>;
        var y=0;
        const cArr = data.cord
        const eArr = data.elem
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
    const stifMat = () => {
        if(data.globalSM.length==0) return <></>
        return (<table style={{border:"1px solid black",borderCollapse:'collapse'}}>
            <tbody>
            {data.globalSM.map((v,i)=>{
                return (<tr key={i+1}>{v.map((v2)=>{
                    return(<td key={i*159} style={{border:"1px solid black",borderCollapse:'collapse',textAlign:'center',padding:2}}>{v2}</td>)
                })}</tr>) 
            })}
            </tbody>
            </table>)
    }
    return (
        <div>
    <Grid.Container direction="row" style={{rowGap:'1vh',columnGap:'1vh'}}>
    <Grid xl={12} xs={12} style={{paddingTop:0}}>
        <Card variant="bordered">
      <Card.Body>
        <Grid.Container gap={2} justify="center">
        <Grid xs={12} style={{paddingTop:0,paddingBottom:0}}>
        <Text h4>Support Specifications</Text>
        </Grid>
        <Grid xs style={{alignItems:'center'}}>
        <Input fullWidth label="Number of nodes having supports" type={'number'} onKeyUp={(e)=>{
            setData((prevData) => ({...prevData,sn : parseInt(e.target.value),ln : parseInt(prevData.n)-parseInt(e.target.value)}))
        }} />
        </Grid>
        <Grid xs style={{alignItems:'center'}}>
        <Input fullWidth label="Number of nodes having loads" type={'number'} value={data.ln} readOnly/>
        </Grid>
        </Grid.Container>
        {/* <Input placeholder="Disabled" onChange={()=>{
            document
        }} /> */}
      </Card.Body>
    </Card>
    </Grid>
        <Grid xl={12} xs={12} style={{paddingTop:0}}>
        <Card variant="bordered">
      <Card.Body>
        <Grid.Container gap={2} justify="center">
        <Grid xs={12} style={{paddingTop:0,paddingBottom:0}}>
        <Text h4>Global Stifness Matrix</Text>
        </Grid>
        <Grid xs style={{alignItems:'center'}}>
            <Text style={{fontFamily:'monospace'}}>{stifMat()}</Text>
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